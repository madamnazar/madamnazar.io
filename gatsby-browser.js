import React from "react"
import Layout from "./src/components/layout"

import "./src/styles/fonts.css"
import "./src/styles/App.css"
import "./src/styles/layout.css"
import "./src/styles/fragments.css"
import "./src/styles/index.css"
import "./src/styles/theme.css"

export const wrapRootElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
)
