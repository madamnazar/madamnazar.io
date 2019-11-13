import React from "react"
import Layout from "../components/layout"
import Image from "../components/Image"
import SEO from "../components/seo"


const IndexPage = () => (
  <>
    <SEO title="Home" />
    <section>
      <header className="ta-center">
        <h1>Welcome to MadamNazar.io</h1>
        <h2>Here you'll find resources for Red Dead Redemption online</h2>
      </header>
    </section>
    <section>
      <p>We've built MadamNazar.io in order to help the Red dead redemption community by providing tools &amp; resources</p>
    </section>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem auto` }}>
      <Image alt="Gatsby in Space" filename="gatsby-astronaut.png" />
    </div>
  </>
)

export default IndexPage
