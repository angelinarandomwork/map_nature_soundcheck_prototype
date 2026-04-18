import type { JSX } from 'react'
import { Link } from 'react-router'

export const NotFoundPage = (): JSX.Element => {
  return (
    <section className="contentPage">
      <div className="contentPageInner">
        <h1>Page not found</h1>
        <p>The page you requested does not exist.</p>
        <Link to="/">Return home</Link>
      </div>
    </section>
  )
}