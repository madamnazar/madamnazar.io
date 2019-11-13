/** @jsx jsx */
import React from "react"
import { Link } from "gatsby"
import { css, jsx } from "@emotion/core"
import { navigation } from "../../data/navigation"
import styles from "../../styles/globalStyles.css"

const NavLink = ({ item }) => {
  const Tag = item.appLink ? Link : "a"
  return (
    <Tag
      to={item.appLink && item.url}
      href={!item.appLink && item.url}
      onClick={item.onclick}
      className="color-current td-none fsz-24"
      target={!item.appLink && "_blank"}
      rel={!item.appLink && "noopener noreferrer"}
    >
      {item.title}
    </Tag>
  )
}

const Navigation = props => {
  const { parent, navOpen } = props

  return (
    <ul
      className={`md:d-block md:pos-relative pos-fixed md:w-100p color-white lis-none p-0 m-0 ${
        navOpen ? "d-flex fxd-column jc-center" : "d-none"
      }`}
      css={css`
        padding: 0;
        margin: 0;
        text-transform: uppercase;
        text-decoration: none;
        font-size: 1em;
        letter-spacing: 0.045em;
        list-style: none;
        font-family: "RDRrocks-sg";

        @media (max-width: 960px) {
          height: 50vh;
          background: var(--EcruWhite);
          border-width: 6px;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          margin: auto;
          z-index: 100;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2),
            0 6px 22px rgba(0, 0, 0, 0.5), 0 0 45px rgba(0, 0, 0, 0.25);
        }

        li {
          display: inline-block;
        }
        a {
          text-decoration: none;
        }
      `}
    >
      {navigation.map((item, index) => (
        <li
          className="md:pv-32 pos-relative md:d-flex ai-center jc-center md:w-auto d-inline-block p-16"
          css={[
            index !== navigation.length - 1 &&
              css`
                &:after {
                  content: "";
                  display: block;
                  position: absolute;
                  background: url("./images/bullet.png") no-repeat center center /
                    contain;
                  width: 12px;
                  height: 12px;
                  top: 50%;
                  right: -6px;
                  transform: translateY(-50%);

                  @media (max-width: 960px) {
                    display: none;
                  }
                }
              `,
            window.location.pathname === item.url
              ? css`
                  color: var(--Tabasco);
                `
              : css`
                  color: var(--Armadillo);
                `,
            css`
              @media (max-width: 960px) {
                font-size: 32px;
              }
            `,
          ]}
        >
          <NavLink key={item.title} item={item} />
        </li>
      ))}
    </ul>
  )
}

export default Navigation
