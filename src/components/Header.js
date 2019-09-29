import React, { useEffect, useState } from "react"
import { window } from "browser-monads" // fallback for Gatsby SSR
import headerSvgDark from "../images/BlogHeaderDark.svg"
import headerSvgLight from "../images/BlogHeaderLight.svg"
import headerSvgMobileDark from "../images/BlogHeaderMobileDark.svg"
import headerSvgMobileLight from "../images/BlogHeaderMobileLight.svg"
import Navigation from "./Navigation"
let firstPageLoad = true
const Header = ({ colorMode }) => {
  /*
  React components re-render when the state changes. I want
  this header to swap out the image with a mobile sized version
  when it reaches 720px in width. The following code accomplishes that.
  */

  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    firstPageLoad = false
    function handleResize() {
      setWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)
  }, [])
  const getSvg = () => {
    // 720 is the Width of the mobile SVG image
    if (width >= 720) {
      return colorMode === "dark" ? headerSvgDark : headerSvgLight
    } else {
      return colorMode === "dark" ? headerSvgMobileDark : headerSvgMobileLight
    }
  }
  return (
    <header>
      <img
        className={colorMode === "dark" ? "fadeOutIn" : "fadeIn"}
        src={
          firstPageLoad
            ? window.innerWidth > 720
              ? headerSvgLight
              : headerSvgMobileLight
            : getSvg()
        }
        alt="Hand-drawn city at night with stars and ufo abducting a cow"
      />
      <Navigation />
    </header>
  )
}

export default Header
