
import * as fs from 'node:fs'
import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import * as XLSX from 'xlsx/xlsx.mjs'

XLSX.set_fs(fs)

type PrimitiveValue = string | number | boolean | null
type JsonRecord = Record<string, PrimitiveValue>

type CliOptions = {
  input: string
  output: string
  exportName: string
}
const pad = (value: number): string => value < 10 ? `0${value}` : String(value)

const main = async (): Promise<void> => {
  const options = parseCliOptions(process.argv.slice(2))
  const inputPath = resolveFromProjectRoot(options.input)
  const outputPath = resolveFromProjectRoot(options.output)

  if (!existsSync(inputPath)) throw new Error(`Cannot access file ${inputPath}`)

  const rows = readTabularFile(inputPath)
  const normalisedRows = rows.map(normaliseRow)
  const fileContent = buildTypeScriptModule(options.exportName, normalisedRows)

  await ensureOutputDirectory(outputPath)
  await writeFile(outputPath, fileContent, 'utf8')

  process.stdout.write(`Created ${outputPath} with ${normalisedRows.length} records.\n`)
}

const parseCliOptions = (argumentsList: string[]): CliOptions => {
  const flagMap = toFlagMap(argumentsList)
  const input = flagMap.get('input') ?? flagMap.get('i')

  if (!input) throw new Error('Missing required argument: --input <path-to-file>')

  const output = flagMap.get('output') ?? flagMap.get('o') ?? buildDefaultOutputPath(input)
  const exportName = flagMap.get('exportName') ?? flagMap.get('e') ?? buildDefaultExportName(output)

  return {
    input,
    output,
    exportName,
  }
}

const toFlagMap = (argumentsList: string[]): Map<string, string> => {
  const flagMap = new Map<string, string>()

  for (let index = 0; index < argumentsList.length; index += 1) {
    const currentArgument = argumentsList[index]

    if (!currentArgument.startsWith('--') && !currentArgument.startsWith('-')) continue

    const normalisedKey = currentArgument.replace(/^-{1,2}/, '')
    const nextArgument = argumentsList[index + 1]

    if (!nextArgument || nextArgument.startsWith('-')) throw new Error(`Missing value for argument: ${currentArgument}`)

    flagMap.set(normalisedKey, nextArgument)
    index += 1
  }

  return flagMap
}

const resolveFromProjectRoot = (targetPath: string): string => {
  if (path.isAbsolute(targetPath))return targetPath
  return path.resolve(process.cwd(), targetPath)
}

const buildDefaultOutputPath = (inputPath: string): string => {
  const parsedPath = path.parse(inputPath)
  return path.join(parsedPath.dir, `${parsedPath.name}.ts`)
}

const buildDefaultExportName = (outputPath: string): string => {
  const baseName = path.parse(outputPath).name
  const camelCaseName = toCamelCase(baseName)
  return isValidIdentifier(camelCaseName) ? camelCaseName : 'records'
}

const readTabularFile = (inputPath: string): JsonRecord[] => {
  const workbook = XLSX.readFile(inputPath, {
    cellDates: false,
    raw: true,
  })

  const firstSheetName = workbook.SheetNames[0]

  if (!firstSheetName) throw new Error(`No sheets found in file: ${inputPath}`)

  const worksheet = workbook.Sheets[firstSheetName]
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, {
    defval: null,
    raw: true,
  })

  return rows.map(convertUnknownRecord)
}

const convertUnknownRecord = (row: Record<string, unknown>): JsonRecord => {
  return Object.fromEntries(
    Object.entries(row).map(([key, value]) => [key, toPrimitiveValue(value)]),
  )
}

const toPrimitiveValue = (value: unknown): PrimitiveValue => {
  if (value === null || value === undefined)return null

  if (typeof value === 'number' || typeof value === 'boolean')return value

  if (typeof value === 'string') {
    const trimmedValue = value.trim()

    if (trimmedValue.length === 0) return ''

    const timestampValue = toUnixMilliseconds(trimmedValue)
    if (timestampValue !== null) return timestampValue

    const numericValue = Number(trimmedValue)
    if (!Number.isNaN(numericValue) && /^-?\d+(\.\d+)?$/.test(trimmedValue)) return numericValue

    return trimmedValue
  }

  return String(value)
}

const toUnixMilliseconds = (value: string): number | null => {
  const trimmedValue = value.trim()

  const shortDateMatch = trimmedValue.match(
    /^(\d{1,2})\/(\d{1,2})\/(\d{2,4})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?(?:\s*([+-]\d{2}:?\d{2}))?$/
  )

  if (shortDateMatch) {
    const [
      ,
      monthString,
      dayString,
      yearString,
      hourString,
      minuteString,
      secondString,
      timezoneString,
    ] = shortDateMatch

    const month = Number(monthString) - 1
    const day = Number(dayString)

    const year =
      yearString.length === 2
        ? 2000 + Number(yearString)
        : Number(yearString)

    const hours = hourString ? Number(hourString) : 0
    const minutes = minuteString ? Number(minuteString) : 0
    const seconds = secondString ? Number(secondString) : 0

    if (timezoneString) {
      const normalisedTz = timezoneString.replace(/([+-]\d{2})(\d{2})$/, '$1:$2')
      const isoString = `${year}-${pad(month + 1)}-${pad(day)}T${pad(hours)}:${pad(minutes)}:${pad(seconds)}${normalisedTz}`
      const timestamp = Date.parse(isoString)
      return Number.isNaN(timestamp) ? null : timestamp
    }

    return new Date(year, month, day, hours, minutes, seconds).getTime()
  }

  const isoLike =
    /\d{4}[-/]\d{1,2}[-/]\d{1,2}/.test(trimmedValue) ||
    /\d{1,2}:\d{2}/.test(trimmedValue)

  if (isoLike) {
    const normalised = trimmedValue.replace(/([+-]\d{2})(\d{2})$/, '$1:$2')
    const parsed = Date.parse(normalised)
    return Number.isNaN(parsed) ? null : parsed
  }

  return null
}

const normaliseRow = (row: JsonRecord): JsonRecord => {
  return Object.fromEntries(
    Object.entries(row).map(([key, value]) => [normaliseKey(key), value]),
  )
}

const normaliseKey = (key: string): string => {
  const withoutSymbols = key
    .replace(/[%()]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()

  const camelCaseKey = toCamelCase(withoutSymbols)
  return isValidIdentifier(camelCaseKey) ? camelCaseKey : `field${camelCaseKey}`
}

const toCamelCase = (value: string): string => {
  const parts = value
    .split(/[^a-zA-Z0-9]+/)
    .filter((part) => part.length > 0)

  if (parts.length === 0) return 'value'

  return parts
    .map((part, index) => {
      const lowerCasePart = part.toLowerCase()
      if (index === 0) return lowerCasePart
      return lowerCasePart.charAt(0).toUpperCase() + lowerCasePart.slice(1)
    })
    .join('')
}

const isValidIdentifier = (value: string): boolean => {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(value)
}

const buildTypeScriptModule = (exportName: string, rows: JsonRecord[]): string => {
  const recordTypeName = `${capitalise(exportName)}Record`
  const serialisedRows = JSON.stringify(rows, null, 2)

  return [
    `export type ${recordTypeName} = Record<string, string | number | boolean | null>`,
    '',
    `export const ${exportName}: ${recordTypeName}[] = ${serialisedRows}`,
    '',
    `export default ${exportName}`,
    '',
  ].join('\n')
}

const capitalise = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

const ensureOutputDirectory = async (outputPath: string): Promise<void> => {
  const directoryPath = path.dirname(outputPath)
  await mkdir(directoryPath, { recursive: true })
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : 'Unknown error'
  process.stderr.write(`${message}\n`)
  process.exit(1)
})