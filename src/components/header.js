/** @jsx jsx */
import { Link } from "gatsby"
import { jsx, css } from "@emotion/core"
import Cookies from "js-cookie"
import PropTypes from "prop-types"
import React from "react"
import Navigation from "./Navigation/Navigation"
import styles from "./Frame/Frame.css"
import {formatDate, isBrowser} from "../scripts/helpers"

const today = formatDate(new Date())
const cycle = JSON.parse(Cookies.get("finderApiResponse")) &&
          JSON.parse(Cookies.get("finderApiResponse")).cycle

const Header = ({ siteTitle, date }) => (
  <header
    css={css`
      height: auto;
      padding-bottom: 2em;
      text-align: center;
      position: relative;

      &:after {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        content: "";
        display: block;
        background: url("./images/bgRip.png") repeat-x bottom 10px center;
        pointer-events: none;
        user-select: none;
      }
    `}
  >
    <div
      style={{
        margin: `0 auto`,
        padding: `1.45rem 0`,
      }}
      css={styles.root}
      className="d-flex"
    >
      <div className="fx-2 fsz-36 d-flex jc-center ai-center">{today}</div>
      <div
        className="fx-8 md:fx-8 mb-16 md:mb-0"
        css={css`
          order: 1;
        `}
      >
        <h1
          className="p-0 m-0 pos-relative ph-8 d-block w-auto"
          css={css`
            order: 1;
          `}
        >
          <Link
            to="/"
            className="pos-relative"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        <p className="d-none md:d-block  label p-0 m-0">
          Resources for Red dead redemption online
        </p>
      </div>

      <div
        className="fx-2 fsz-36 d-flex jc-center ai-center"
        css={css`
          order: 1;
        `}
      >
        Cycle {cycle}
      </div>
    </div>
    <Navigation />
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

/**
 * 
 *  <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle} - {date}
        </Link>
      </h1>
 */
