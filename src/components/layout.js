/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import ReactGA from "react-ga"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import ContextConsumer from "./Context"
import Cookies from "js-cookie"

import { DEV_API, PROD_API, MOCK_API } from "../scripts/constants"
import mockData from "../data/mock"

import Header from "./header"
import NetworkInfo from "./NetworkInfo"
import { SupportBanner } from "./SupportBanner"
import PatreonModal from "./PatreonModal/PatreonModal"
import Footer from "./Footer/Footer"

import { isOnline } from "../scripts/helpers"

import "../styles/fonts.css"
import "../styles/App.css"
import "../styles/layout.css"
import "../styles/fragments.css"
import "../styles/index.css"
import "../styles/theme.css"

const dateEvent = new Date()
const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
}
const todayDate = dateEvent.toDateString("us-EN", dateOptions)

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showPatreonAd: true,
    }
  }

  setupData = data => {
    if (Cookies.get("finderApiResponse") === undefined) {
      Cookies.set("finderApiResponseValidFor", data.current_location.dataFor)
      Cookies.set("finderApiResponse", {
        data: data.current_location.data,
        cycle: data.cycle,
        fetched: true,
        dataFor: data.current_location.dataFor,
      })
    } else {
      if (Cookies.get("finderApiResponseValidFor") !== todayDate) {
        Cookies.set("finderApiResponse", {
          data: data.current_location.data,
          cycle: data.cycle,
          fetched: true,
          isDataValid: true,
          dataFor: data.current_location.dataFor,
        })
      } else {
        Cookies.set("finderApiResponse", {
          data: data.current_location.data,
          cycle: data.cycle,
          fetched: true,
          isDataValid: false,
          dataFor: data.current_location.dataFor,
        })
      }
    }
  }
  fetchData = () => {
    const url = process.env.NODE_ENV === "development" ? DEV_API : PROD_API
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",
        "Accept-Encoding": "gzip, deflate",

        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
      .then(response => response.json())
      .then(json => {
        const data = json.data
        this.setupData(data)
      })
      .catch(function(err) {
        console.log("error", err)
      })
  }

  componentDidMount() {
    if (Cookies.get("patreon-ad") === undefined) {
      Cookies.set("patreon-ad", true, { expires: 7 })
    }

    Cookies.get("patreon-ad") === true
      ? this.setState({ showPatreonAd: true })
      : Cookies.get("patreon-ad") === false
      ? this.setState({ showPatreonAd: false })
      : this.setState({ updated: true })

    if (process.env.NODE_ENV === "production") {
      ReactGA.initialize("UA-148400737-1")
      ReactGA.pageview(this.state.currentPage)
      this.fetchData()
    } else {
      isOnline === false && mockData !== false
        ? this.setState({
            today: mockData.date,
            data: mockData.current_location.data,
            dataFor: mockData.current_location.dataFor,
            cycle: mockData.cycle,
            fetched: true,
            apiUrl: isOnline === true ? DEV_API : MOCK_API,
          })
        : this.fetchData()
    }

    if (Cookies.get("finderApiResponse") === undefined) {
      this.fetchData()
    } else {
      // Nothing to do
    }
  }

  render() {
    const { children } = this.props

    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={gqlData => (
          <ContextConsumer>
            {({ data }) => {
              return (
                <div className="pos-relative z-5">
                  {process.env.NODE_ENV === "development" && <NetworkInfo />}
                  {this.state.showPatreonAd === true && (
                    <SupportBanner parent={this} />
                  )}
                  {this.state.showPatreonAbout === true && (
                    <PatreonModal parent={this} />
                  )}
                  <Header
                    siteTitle={gqlData.site.siteMetadata.title}
                    date={data.dateOfTheDay}
                  />
                  <div
                    style={{
                      margin: `0 auto`,
                      maxWidth: "100%",
                      padding: `0`,
                      paddingTop: 0,
                    }}
                  >
                    <main id="frame">{children}</main>
                  </div>
                  <Footer />
                </div>
              )
            }}
          </ContextConsumer>
        )}
      />
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
