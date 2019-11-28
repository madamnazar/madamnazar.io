/** @jsx jsx */
import React, { Component } from "react"
import { css, jsx } from "@emotion/core"
import ReactGA from "react-ga"
import Cookies from "js-cookie"

import RDAppear from "../components/RDAppear/RDAppear"
import Map from "../components/Map/Map"
import Context from '../components/Context'

import Layout from "../components/layout"
import Image from "../components/Img"
import SEO from "../components/seo"
import Section from "../components/Section"
import { formatDate, isBrowser} from "../scripts/helpers"

//// Define apis
import mockData from "../data/mock"
import { DEV_API, PROD_API, MOCK_API } from "../scripts/constants"

const bgMainSml = "/images/bgMainSml.jpg"
const sheet = "/images/sheet.png"

const url = process.env.NODE_ENV === "development" ? DEV_API : PROD_API

const styles = {
  posterGrid: css``,
  posterWrapper: css`
    filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.4));
  `,
  posterLayout: css`
    position: relative;

    margin: auto;
    border-radius: 138px;
    z-index: 2;

    .header {
      text-align: center;
    }

    @media (min-width: 960px) {
      padding: 0 2em;
    }
  `,
  badge: css`
    width: 120px;
    height: 120px;
    border-radius: 100px;
    border: 4px solid var(--Armadillo);
    background: var(--Twine);
    box-shadow: 0 0 32px rgba(0, 0, 0, 0.2);
    display: block;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 100px auto;
    animation: roll 2s ease infinite;
    filter: sepia(1) saturate(0.65);

    img {
      width: 100%;
      height: auto;
      vertical-align: middle;
    }

    @keyframes roll {
      from {
        transform: rotate(0);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `,
  avatar: css`
    animation: blur 5s forwards;
    height: 100px;
    max-height: 640px;
    max-width: 640px;
    position: relative;
    width: 100px;
    overflow: hidden;

    div {
      height: 100%;
      position: absolute;
      width: 100%;
    }

    .normal {
      background-size: cover;
    }

    .invert {
      animation: mask 5s steps(69) forwards;
      background-size: cover;
      filter: invert(1) grayscale(1);
      -webkit-mask: url(${sheet});
      -webkit-mask-size: 7000% 100%;
      mask: url(${sheet});
      mask-size: 7000% 100%;
    }

    @keyframes blur {
      from {
        filter: blur(3px);
        opacity: 0;
      }
      to {
        filter: blur(0px);
        opacity: 1;
      }
    }

    @keyframes mask {
      from {
        -webkit-mask-position: 0% 0;
        mask-position: 0% 0;
      }
      to {
        -webkit-mask-position: 100% 0;
        mask-position: 100% 0;
      }
    }
  `,
}


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
        document.getElementById("container").getBoundingClientRect().width - 100,
    })

    window.addEventListener("resize", () => {
      this.setState({
        frameWidth:
          document.getElementById("container").getBoundingClientRect().width - 100,
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
      isBrowser && Cookies.get("finderApiResponse") !== undefined ? true : false
    const API = isBrowser && JSON.parse(Cookies.get("finderApiResponse"))

    console.log(API)
    return (
      <>
        <Section id="container">
          {isBrowser && (
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
          )}
        </Section>
      </>
    )
  }
}
export default Finder
