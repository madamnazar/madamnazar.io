/** @jsx jsx */
import React from "react"
import { Link } from "gatsby"
import { css, jsx } from "@emotion/core"
import { navigation } from "../../data/navigation"
import * as Icon from "react-feather"
const frame = "./images/frame.png"


const NavLink = ({ item }) => {
  const Tag = item.appLink ? Link : "a";
  const Icon = item.icon;
  return (
    <Tag
      to={item.appLink && item.url}
      href={!item.appLink && item.url}
      onClick={item.onclick}
      className="color-current td-none d-block h-100p"
      target={!item.appLink && "_blank"}
      rel={!item.appLink && "noopener noreferrer"}
      css={css`
        font-size: 36px;
        padding-top: 4px;
        letter-spacing: 0.045em;
      `}
    >
      <Icon/>{" "}
      {item.title}
    </Tag>
  )
}

const Navigation = props => {
  const { parent, navOpen } = props

  return (
    <div
      className={`md:d-block md:pos-relative pos-fixed md:w-100p color-white${
        navOpen ? "d-flex fxd-column jc-center" : "d-none"
      }`}
      css={css`
        padding: 0;
        margin: 0;
        text-transform: uppercase;
        text-decoration: none;
        font-size: 1em;
        list-style: none;
        font-family: "RDRCatalogueBold-Bold";
        background: url("/images/bgMainSml.png") no-repeat center center / cover;
        border-color: #2e2e2e;
        border-image-repeat: all;
        border-image-slice: 14;
        border-image-outset: 0;
        border-image-source: url(${frame});
        border-style: solid;
        border-width: 3px 0;

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
      <ul className="lis-none p-0 m-0 maw-1200 m-auto d-flex jc-around bdrw-1 bdrs-solid bdlw-1 bdls-solid bdc-black">
        {navigation.map((item, index) => (
          <li
            className="pos-relative d-inline-block lh-big d-block h-100p w-100p ta-center bdrw-1 bdrs-solid bdc-black"
            css={[
              index === navigation.length - 1 &&
                css`
                  border-right: none;
                `,
              window.location.pathname === item.url
                ? css`
                    color: var(--EcruWhite);
                    background: url("/images/bgStory.png")
                      no-repeat center center / 100% 100%;
                  `
                : css`
                    color: #2e2e2e;
                  `,
              css`
                transform: scaleY(1.029);
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
    </div>
  )
}

export default Navigation
