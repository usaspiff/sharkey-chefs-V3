import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header
  let footer

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}
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
        </Link>
      </h1>
    )

    footer = (
      ``
      )
  } else {
    header = (
        <Link className="header-link-home" to="/">
          <StaticImage
            className="bio-avatar-blog"
            layout="constrained"
            formats={["auto", "webp", "avif"]}
            src="../images/logo.png"
            width={50}
            height={50}
            quality={95}
            alt="logo"
          />Menu
        </Link>
    )

    footer = (
      ``
      )
      
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer className="footer flex">{footer}</footer>
    </div>
  )
}

export default Layout
