import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        
        <Link to="/">{title}</Link>
        <StaticImage
          className="bio-avatar"
          layout="constrained"
          formats={["auto", "webp", "avif"]}
          src="../images/logo.png"
          width={50}
          height={50}
          quality={95}
          alt="logo"
        />
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer className="footer flex">
        <section className="container">
          <nav className="flex">
            <a
              href="https://github.com/usaspiff/sharkey-chefs-V3"
              title="Open Source on Github"
              target="_blank"
              rel="noopener noreferrer"
              className="img"
            >
              <StaticImage
                className="footer-icon"
                layout="constrained"
                formats={["auto", "webp", "avif"]}
                src="../images/github.png"
                width={30}
                height={30}
                quality={100}
                alt="github"
              />
            </a>
            <a
              href="https://netlify.com"
              title="Hosted on Netlify"
              target="_blank"
              rel="noopener noreferrer"
              className="img"
            >
              <StaticImage
                className="footer-icon"
                layout="constrained"
                formats={["auto", "webp", "avif"]}
                src="../images/netlify.png"
                width={30}
                height={30}
                quality={100}
                alt="netlify"
              />
            </a>
          </nav>
        </section>
      </footer>
    </div>
  )
}

export default Layout
