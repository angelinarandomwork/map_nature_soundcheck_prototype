import { type JSX } from 'react'
import type { AccordionSectionProps } from './types';
import './accordion-section.css'

export const AccordionSection = ({
  title,
  intro,
  children,
}: AccordionSectionProps): JSX.Element => {
  return (
    <section className="accordionSection">
      {(title || intro) && (
        <div className="accordionSectionHeader">
          {title && <h2 className="accordionSectionTitle">{title}</h2>}
          {intro && <div className="accordionSectionIntro">{intro}</div>}
        </div>
      )}

      <div className="accordionList">{children}</div>
    </section>
  )
}

