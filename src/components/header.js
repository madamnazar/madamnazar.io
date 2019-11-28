/** @jsx jsx */
import { Link } from "gatsby"
import { jsx, css } from "@emotion/core"
import Cookies from "js-cookie"
import PropTypes from "prop-types"
import React from "react"
import Navigation from "./Navigation/Navigation"
import styles from "./Frame/Frame.css"
import { formatDate, isBrowser, getCycleDay } from "../scripts/helpers"

const today = formatDate(new Date())
const cycle = getCycleDay(today)

const Header = ({ siteTitle, date }) => (
  <header
    css={css`
      height: auto;
      text-align: center;
      position: relative;
    `}
  >
    <div
      style={{
        margin: `0 auto`,
        padding: `1rem 0`,
      }}
      css={styles.root}
    >
      <div className="d-flex maw-1200 m-auto">
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

