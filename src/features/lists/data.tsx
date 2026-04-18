import type { ListSection, StepperStep } from './types'

const powerSetupSteps: Array<StepperStep> = [
  {
    id: 'power-strip',
    label: 'Power the breadboard rails',
    description:
      'Use the ESP32 3V and GND pins to energise the breadboard power rails before wiring the other parts.',
    content: (
      <>
        <p>Connect the ESP32 3V pin to the red positive rail.</p>
        <p>Connect the ESP32 GND pin to the blue negative rail.</p>
        <p>The full red rail now carries 3.3V and the full blue rail is ground.</p>
      </>
    ),
  },
  {
    id: 'sd-power',
    label: 'Power the SD card breakout',
    description: 'Feed the SD card board from the same rails.',
    content: (
      <>
        <p>Connect SD card 3V3 to the red positive rail.</p>
        <p>Connect SD card GND to the blue negative rail.</p>
      </>
    ),
  },
  {
    id: 'mic-power',
    label: 'Power the microphone',
    description: 'Give the microphone a stable supply and lock it to the left channel.',
    content: (
      <>
        <p>Connect microphone VDD directly to the spare ESP32 3V pin.</p>
        <p>Connect microphone GND to the blue negative rail.</p>
        <p>Connect microphone L/R to ground so the microphone presents the left channel.</p>
      </>
    ),
  },
]

const sdCardWiringSteps: Array<StepperStep> = [
  {
    id: 'sd-clk',
    label: 'Clock line',
    content: <p>Connect SD card CLK to ESP32 SCK.</p>,
  },
  {
    id: 'sd-cmd',
    label: 'Command line',
    content: <p>Connect SD card CMD to ESP32 MO (MOSI).</p>,
  },
  {
    id: 'sd-data',
    label: 'Data line',
    content: <p>Connect SD card D0 to ESP32 MI (MISO).</p>,
  },
  {
    id: 'sd-select',
    label: 'Chip select',
    content: <p>Connect SD card D3 to ESP32 D8.</p>,
  },
]

const microphoneWiringSteps: Array<StepperStep> = [
  {
    id: 'mic-sck',
    label: 'Bit clock',
    content: <p>Connect microphone SCK to ESP32 A0.</p>,
  },
  {
    id: 'mic-ws',
    label: 'Word select',
    content: <p>Connect microphone WS to ESP32 A1.</p>,
  },
  {
    id: 'mic-sd',
    label: 'Data out',
    content: <p>Connect microphone SD to ESP32 A2.</p>,
  },
]

export const hardwareSection: ListSection = {
  id: 'hardware',
  title: 'Hardware list',
  subtitle: 'Core components and links to examples',
  items: [
    {
      id: 'esp32',
      number: 1,
      title: 'Microcontroller',
      description: 'Adafruit ESP32-S2 Feather with BME280 sensor and STEMMA QT.',
      links: [
        {
          label: 'microcontroller',
          href: 'https://evelta.com/adafruit-esp32-s2-feather-with-bme280-sensor-stemma-qt-4mb-flash-2-mb-psram/',
        },
      ],
    },
    {
      id: 'battery',
      number: 2,
      title: 'Battery',
      description: 'A 10,000 mAh power bank is a practical portable supply.',
    },
    {
      id: 'microphone',
      number: 3,
      title: 'Microphone',
      description: 'INMP441 MEMS high precision omnidirectional microphone module.',
      links: [
        {
          label: 'microphone',
          href: 'https://robu.in/product/inmp441-mems-high-precision-omnidirectional-microphone-module-i2s/',
        },
      ],
    },
    {
      id: 'jumper-wires',
      number: 4,
      title: 'Jumper wires',
      description: 'Male to male jumper wires, 40 pieces at 20 cm.',
      links: [
        {
          label: 'jumper wires',
          href: 'https://robu.in/product/male-to-male-jumper-wires-40pcs-20cm/',
        },
      ],
    },
    {
      id: 'breadboard',
      number: 5,
      title: 'Breadboard',
      description: 'A 400 point breadboard works, although a larger board may be more comfortable.',
      links: [
        {
          label: 'breadboard',
          href: 'https://robu.in/product/bread-board-jumper-wire-20-cm-x-20-female-to-female/',
        },
      ],
    },
    {
      id: 'sd-breakout',
      number: 6,
      title: 'Micro SD breakout board',
      description: '3V only SPI or SDIO micro SD breakout board.',
      links: [
        {
          label: 'SD breakout board',
          href: 'https://robu.in/product/micro-sd-spi-or-sdio-card-breakout-board-3v-only/',
        },
      ],
    },
    {
      id: 'sd-card',
      number: 7,
      title: 'SD card and reader',
      description: '32GB SanDisk card with a USB-C card reader.',
      links: [
        {
          label: 'SD card',
          href: 'https://www.amazon.in/dp/B08L5HMJVW?th=1',
        },
        {
          label: 'USB-C reader',
          href: 'https://www.amazon.in/dp/B0D9H3W8V6?th=1',
        },
      ],
    },
    {
      id: 'tools',
      number: 8,
      title: 'Soldering kit and multimeter',
      description: 'Use the multimeter in continuity mode to validate each soldered connection.',
      links: [
        {
          label: 'soldering kit',
          href: 'https://www.amazon.in/dp/B0FC2YM1RY',
        },
        {
          label: 'multimeter',
          href: 'https://www.amazon.in/dp/B07KK5LZBK',
        },
      ],
    },
  ],
}

export const buildPreparationSection: ListSection = {
  id: 'build-preparation',
  title: 'Build preparation',
  subtitle: 'The setup phase before permanent wiring',
  items: [
    {
      id: 'tutorials',
      number: 1,
      title: 'Watch a build tutorial',
      description: 'Review a similar build before soldering or wiring to avoid common pin mapping mistakes.',
      links: [
        {
          label: 'Open tutorial video',
          href: 'https://www.youtube.com/watch?v=3jAw41LRBxU',
        },
      ],
      media: [
        {
          kind: 'video',
          src: 'https://www.youtube.com/watch?v=3jAw41LRBxU',
          title: 'Assembly tutorial',
        },
      ],
    },
    {
      id: 'solder-headers',
      number: 2,
      title: 'Solder header pins',
      description: 'Solder headers onto the ESP32, microphone board, and SD breakout before mounting them on the breadboard.',
    },
    {
      id: 'continuity-check',
      number: 3,
      title: 'Validate continuity',
      description:
        'Use continuity mode to confirm intended connections and detect accidental solder bridges between adjacent pins.',
    },
  ],
}

export const wiringSection: ListSection = {
  id: 'wiring',
  title: 'Wiring guide',
  subtitle: 'Grouped step-by-step connections',
  items: [
    {
      id: 'power-setup',
      number: 1,
      title: 'Power setup',
      description: 'Prepare a shared 3.3V and ground distribution across the build.',
      stepperSteps: powerSetupSteps,
    },
    {
      id: 'sd-card-wiring',
      number: 2,
      title: 'SD card wiring',
      description: 'Wire the SD card breakout onto the SPI bus.',
      stepperSteps: sdCardWiringSteps,
    },
    {
      id: 'microphone-wiring',
      number: 3,
      title: 'Microphone wiring',
      description: 'Wire the microphone onto the I2S bus.',
      stepperSteps: microphoneWiringSteps,
    },
  ],
}
