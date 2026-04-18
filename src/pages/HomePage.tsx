import type { JSX } from 'react'
import { HomeNavGrid } from '../components/NavGrid/HomeNavGrid'
import { HeroWithRevolvingLight } from '../components/Overlay/LightOverlay'

export const HomePage = (): JSX.Element => {
  return (
    <section className="homePage">
      <HeroWithRevolvingLight />
      <div className="homePageInner">
        <h1 className="homePageTitle">Nature Sound Check</h1>
        <HomeNavGrid />
      </div>
    </section>
  )
}