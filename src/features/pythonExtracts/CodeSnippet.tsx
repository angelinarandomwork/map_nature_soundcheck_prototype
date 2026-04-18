import type { JSX } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

type CodeSnippetProps = {
  code: string
  language?: 'python' | 'typescript' | 'javascript' | 'json' | 'bash'
  showLineNumbers?: boolean
  title?: string
}

export const CodeSnippet = ({
  code,
  language = 'python',
  showLineNumbers = true,
  title,
}: CodeSnippetProps): JSX.Element => {
  return (
    <section
      style={{
        border: 'var(--border-default)',
        borderRadius: 'var(--radius-4)',
        overflow: 'hidden',
        background: 'var(--greenish-gradient)',
        boxShadow: 'var(--shadow-none)',
      }}
    >
      {title ? (
        <div
          style={{
            padding: '12px 16px',
            borderBottom: 'var(--border-subtle)',
            fontSize: 'var(--font-size-13)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--color-text-secondary)',
            background: 'rgba(255,255,255,0.2)',
          }}
        >
          {title}
        </div>
      ) : null}

      <SyntaxHighlighter
        language={language}
        style={oneLight}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          padding: '16px',
          background: 'transparent',
          fontSize: '14px',
          lineHeight: 1.5,
          borderRadius: 0,
        }}
        codeTagProps={{
          style: {
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </section>
  )
}