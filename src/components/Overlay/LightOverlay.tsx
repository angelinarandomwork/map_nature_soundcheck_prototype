import type { JSX } from 'react'
import { animate, motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { useEffect } from 'react'

const MotionDiv = motion.div

export const HeroWithRevolvingLight = (): JSX.Element => {
  const turn = useMotionValue(0)

  useEffect(() => {
    const controls = animate(turn, 1, {
      duration: 30,
      ease: 'linear',
      repeat: Infinity,
    })

    return () => controls.stop()
  }, [turn])

// const backgroundImage = useMotionTemplate`
//   conic-gradient(
//     from ${turn}turn,
//     rgba(55, 160, 123, 0) 0deg,
//     rgba(55, 160, 123, 0) 260deg,
//     rgba(55, 160, 123, 0.18) 300deg,
//     rgba(85, 200, 150, 0.35) 320deg,
//     rgba(244, 162, 97, 0.25) 340deg,
//     rgba(244, 162, 97, 0) 360deg
//   )
// `
// const backgroundImage = useMotionTemplate`
//   conic-gradient(
//     from ${turn}turn,
//     rgba(55, 160, 123, 0) 0deg,
//     rgba(55, 160, 123, 0) 220deg,

//     rgba(55, 160, 123, 0.08) 250deg,
//     rgba(55, 160, 123, 0.18) 280deg,

//     rgba(85, 200, 150, 0.28) 305deg,
//     rgba(85, 200, 150, 0.35) 325deg,

//     var(--amber-low) 345deg,
//     rgba(244, 162, 97, 0.18) 355deg,

//     rgba(244, 162, 97, 0) 360deg
//   )
// `
const backgroundImage = useMotionTemplate`
  conic-gradient(
    from ${turn}turn,
    rgba(55, 160, 123, 0) 0deg,
    rgba(55, 160, 123, 0) 180deg,

    rgba(55, 160, 123, 0.06) 210deg,
    rgba(55, 160, 123, 0.14) 240deg,
    rgba(55, 160, 123, 0.22) 270deg,

    rgba(85, 200, 150, 0.3) 300deg,
    rgba(85, 200, 150, 0.35) 320deg,

    rgba(244, 162, 97, 0.28) 340deg,
    var(--amber-dark-low) 350deg,

    rgba(244, 162, 97, 0) 360deg
  )
`

  return (
    <MotionDiv
      aria-hidden="true"
      style={{
        backgroundImage,
        position: 'absolute',
        inset: '-25%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.6,
        filter: 'blur(28px)'
      }}
    />
  )
}