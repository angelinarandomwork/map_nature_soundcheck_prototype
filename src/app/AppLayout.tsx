import type { JSX } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'
import { Outlet, useLocation } from 'react-router'
import './style.css'

const isMapRoute = (pathname: string): boolean => {
  return pathname.startsWith('/map')
}

export const AppLayout = (): JSX.Element => {
  const { pathname } = useLocation()
  const mapRouteActive = isMapRoute(pathname)

  const siteMainClassName = mapRouteActive
    ? 'siteMain siteMain-map'
    : 'siteMain'

  return (
    <div className="siteShell">
      <Header />
      <main className={siteMainClassName}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}