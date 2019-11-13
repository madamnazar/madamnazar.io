/** @jsx jsx */
import React, { Component } from "react"
import { css, jsx } from "@emotion/core"
import ReactGA from "react-ga"
import Cookies from "js-cookie"

import RDAppear from "../components/RDAppear/RDAppear"
import Map from "../components/Map/Map"
import Context from '../components/Context'

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { formatDate } from "../scripts/helpers"


//// Define apis
import mockData from "../data/mock"
import { DEV_API, PROD_API, MOCK_API } from "../scripts/constants"

import styles from "./Finder.css"
const bgMainSml = "/images/bgMainSml.jpg"

const url = process.env.NODE_ENV === "development" ? DEV_API : PROD_API

const capitalize = string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const date = new Date();
const today = formatDate(new Date());

const InfoBox = props => {
  return (
    <>
      <div
        className={`modal pos-absolute w-800 h-auto bgc-mars-0 left-0 right-0 top-0 bot-0 m-auto z-max bxs-default p-16 ${
          props.parent.state.modal === true ? "d-block" : "d-none"
        }`}
        css={css`
          z-index: 9999999999;
          border: 4px solid var(--Armadillo);
          box-shadow: 0 0 32px rgba(0, 0, 0, 0.2);
          max-width: 90%;
          max-height: 60%;
          position: fixed;
          left: 0;
          right: 0;
          margin: auto;

          background-image: url(${props.parent.state.modalImage}),
            url(${bgMainSml});
          background-repeat: no-repeat, repeat;
          background-position: center center, center;
          background-size: contain, auto;
          border-width: 6px;

          margin: auto;
          z-index: 100;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2),
            0 6px 22px rgba(0, 0, 0, 0.5), 0 0 45px rgba(0, 0, 0, 0.25);

          @media (max-width: 960px) {
            width: 80%;
            height: auto;
          }
        `}
      >
        <button
          onClick={() => {
            props.parent.setState({
              modal: !props.parent.state.modal,
              modalImage: null,
            })
          }}
        >
          Close window
        </button>
        <div className="w-100p h-100p "></div>
      </div>

      <div css={styles.posterWrapper} className="pv-32">
        <div css={[styles.posterGrid, styles.posterLayout]}>
          <section
            css={css`
              text-align: center;
            `}
          >
            <div>
              <div>
                <h2>
                  {props.dataFor ===
                  `${date.getFullYear()}/${date.getMonth() +
                    1}/${date.getDate()}` ? (
                    <>Madam Nazar was found today {today}!</>
                  ) : (
                    <span
                      css={css`
                        color: var(--Tabasco);
                      `}
                    >
                      Madam Nazar was not found yet...
                    </span>
                  )}
                </h2>
                <h2
                  className="m-0 p-0 pl-24"
                  css={css`
                    display: inline-block;
                    font-size: 38px;
                    vertical-align: middle;
                  `}
                >
                  In {capitalize(props.region_precise)} in the region of{" "}
                  {capitalize(props.region)}
                </h2>
              </div>
              <div>
                <p>
                  In the {capitalize(props.cardinals.split(" ")[0])} 
                  {capitalize(props.cardinals.split(" ")[1])} side of the map.
                  nearby{" "}
                  {props.nearby.map((poi, id) => (
                    <>
                      {id === props.nearby.length - 1 && " & "}

                      <b
                        key={id}
                        css={css`
                          border-bottom: 2px solid var(--Tabasco);
                          display: inline-block;
                          margin: 0 2px;
                        `}
                      >
                        {capitalize(poi)}
                      </b>
                      {id !== props.nearby.length - 1 &&
                        (id !== props.nearby.length - 2 && ", ")}
                    </>
                  ))}
                  .
                </p>
                <a href={props.link}>{props.link}</a>
              </div>
            </div>

            <div>
              <div
                className="cursor-pointer d-grid md:g-2"
                css={css`
                  padding: 8px;
                `}
              >
                <RDAppear
                  image={props.media["tilt_shift"].full}
                  width={props.parent.state.frameWidth / 2}
                  height={480}
                  onClick={() => {
                    props.parent.setState({
                      modal: true,
                      modalImage: props.media.normal.full,
                      modalImageDarkMode: props.media.negative.full,
                    })
                    ReactGA.event({
                      category: "click.finder.modal",
                      action: "Open First image",
                    })
                  }}
                  childrenStyle={css`
                    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.4);
                    transform: rotate(-0.3deg);
                    filter: sepia(1) saturate(0.65);

                    @media (max-width: 960px) {
                      width: 100% !important;
                    }
                  `}
                />

                <RDAppear
                  image={props.media["tilt_shift"].zoom}
                  width={props.parent.state.frameWidth / 2}
                  height={480}
                  onClick={() => {
                    props.parent.setState({
                      modal: true,
                      modalImage: props.media.normal.zoom,
                      modalImageDarkMode: props.media.negative.zoom,
                    })
                    ReactGA.event({
                      category: "click.finder.modal",
                      action: "Open Second image",
                    })
                  }}
                  childrenStyle={css`
                    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.4);
                    transform: rotate(-0.3deg);
                    filter: sepia(1) saturate(0.65);

                    @media (max-width: 960px) {
                      width: 100% !important;
                    }
                  `}
                />
              </div>
            </div>
          </section>
          <section
            onClick={() => {
              ReactGA.event({
                category: "click.finder.map",
                action: "Clicked the map",
              })
            }}
          >
            <Map localisation={props.id} />
          </section>
        </div>
      </div>
    </>
  )
}

class Finder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      fetched: false,
    }
  }

  setSize = () => {
    this.setState({
      frameWidth:
        document.getElementById("frame").getBoundingClientRect().width - 100,
    })

    window.addEventListener("resize", () => {
      this.setState({
        frameWidth:
          document.getElementById("frame").getBoundingClientRect().width - 100,
      })
    })
  }

  fetchData = () => {
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
        this.setState({
          today: data.date,
          data: data.current_location.data,
          dataFor: data.current_location.dataFor,
          cycle: data.cycle,
          fetched: true,
        })
      })
      .catch(function(err) {
        console.log("error", err)
      })
  }

  componentDidMount() {
    console.log(this.props)

    if (!Cookies.get("finderApiResponse")) {
      this.fetchData()
    }

    this.setSize()
  }

  render() {
    const isStoredAlready =
      Cookies.get("finderApiResponse") !== undefined ? true : false
    const API = JSON.parse(Cookies.get("finderApiResponse"));

    console.log(API)
    return (
      <>
        {isStoredAlready ? (
          <InfoBox
            id={API.data._id}
            media={API.data.location.image}
            region={API.data.location.region.name}
            region_precise={API.data.location.region.precise}
            nearby={API.data.location["near_by"]}
            cardinals={API.data.location.cardinals.full}
            isNewlocation={true}
            dataFor={API.dataFor}
            parent={this}
          />
        ) : (
          <InfoBox
            id={this.state.data._id}
            media={this.state.data.location.image}
            region={this.state.data.location.region.name}
            region_precise={this.state.data.location.region.precise}
            nearby={this.state.data.location["near_by"]}
            cardinals={this.state.data.location.cardinals.full}
            isNewlocation={this.state}
            dataFor={this.state.dataFor}
            parent={this}
          />
        )}
      </>
    )
  }
}
export default Finder
