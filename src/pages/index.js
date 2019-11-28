/** @jsx jsx */

import React from "react"
import { css, jsx } from "@emotion/core"
import Cookies from "js-cookie"

import Layout from "../components/layout"
import Image from "../components/Img"
import SEO from "../components/seo"
import Section from "../components/Section"
import {isBrowser} from "../scripts/helpers"


const background = isBrowser && Cookies.get("finderApiResponse")
  ? JSON.parse(Cookies.get("finderApiResponse")).data.location.image.tilt_shift
      .full
  : "/images/index-background.png"
const IndexPage = () => (
  <>
    <SEO title="Home" />
    <section>
      <header
        className="ta-center h-400 pos-relative z-1 color-white d-flex ai-center jc-center"
        css={css`
          background: url(${background}) no-repeat center center / cover;

          &:after {
            display: block;
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.5);
          }
        `}
      >
        <div className="pos-relative z-5">
          <h1 className="p-0 m-0">Welcome to MadamNazar.io</h1>
          <h2>Here you'll find resources for Red Dead Redemption online</h2>
        </div>
      </header>
    </section>
    <Section>
      <p>
        We've built MadamNazar.io in order to help the Red dead redemption
        community by providing tools &amp; resources
      </p>
      
    </Section>
  </>
)


// <div style={{ maxWidth: `300px`, marginBottom: `1.45rem auto` }}>
//   <Image alt="Gatsby in Space" filename="gatsby-astronaut.png" />
// </div>

export default IndexPage
