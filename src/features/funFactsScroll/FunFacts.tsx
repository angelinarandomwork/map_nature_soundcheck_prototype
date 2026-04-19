import { useRef, type JSX } from 'react'
import { useScroll } from 'framer-motion'
import { useViewportMatch } from '../../hooks/useViewportMatch'
import { FactContent } from './FactContent'
import { MediaRail } from './MediaRail'
import { factItems } from './factData'
import { innerStyle, mobileInnerStyle, mobileScrollStyle, oppoScrollRootStyle, scrollStyle, shellStyle } from './style'

const FunFacts = (): JSX.Element => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const targetRef = useRef<HTMLDivElement | null>(null)
  const isMobile = useViewportMatch('(max-width: 960px)')

  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: targetRef,
    offset: ['start start', 'end end']
  })

  return (
    <section style={shellStyle}>
      <div ref={containerRef} style={isMobile ? { ...scrollStyle, ...mobileScrollStyle, ...oppoScrollRootStyle } : { ...scrollStyle, ...oppoScrollRootStyle }}>
        <div ref={targetRef} style={isMobile ? { ...innerStyle, ...mobileInnerStyle } : innerStyle}>
          <FactContent content={factItems} isMobile={isMobile} />
          {!isMobile ? <MediaRail content={factItems} scrollYProgress={scrollYProgress} /> : null}
        </div>
      </div>
    </section>
  )
}

export default FunFacts
