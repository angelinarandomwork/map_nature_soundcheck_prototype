import type { JSX } from 'react'
import { CodeSnippet } from './CodeSnippet'
import { step3 } from './step3';
import { step4 } from './step4';
import { step5 } from './step5';
import { step6 } from './step6';

export const Step3PythonExtract = (): JSX.Element => {
  return (
    <CodeSnippet
      title="arduino.py"
      code={step3}
      language="python"
      showLineNumbers
    />
  )
}
export const Step4PythonExtract = (): JSX.Element => {
  return (
    <CodeSnippet
      title="birdClassification.py"
      code={step4}
      language="python"
      showLineNumbers
    />
  )
}
export const Step5PythonExtract = (): JSX.Element => {
  return (
    <CodeSnippet
      title="visualisation.py"
      code={step5}
      language="python"
      showLineNumbers
    />
  )
}
export const Step6PythonExtract = (): JSX.Element => {
  return (
    <CodeSnippet
      title="ndsi.py"
      code={step6}
      language="python"
      showLineNumbers
    />
  )
}