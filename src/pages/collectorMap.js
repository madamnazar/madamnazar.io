/** @jsx jsx */
import React, { Component } from "react";
import ReactGA from "react-ga";
import Iframe from "react-iframe";
import { jsx, css } from "@emotion/core";
import Infos from "../components/Infos";

import { COLLECTOR_MAP_URL } from "../scripts/constants";

const styles = {
  iframe: css`
    background: var(--EcruWhite);
    background: #d2b790;
    width: 100%;

    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.3);
    z-index: 4;
    position: relative;

    &:after {
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.3),
        inset 0 2px 4px rgba(0, 0, 0, 0.3), inset 0 4px 8px rgba(0, 0, 0, 0.3),
        inset 0 8px 16px rgba(0, 0, 0, 0.3), inset 0 -4px 8px rgba(0, 0, 0, 0.3),
        inset 0 -8px 16px rgba(0, 0, 0, 0.3);
      z-index: 50000;
      user-select: none;
      pointer-events: none;
    }
  `,
}


class CollectorMap extends Component {
  constructor(props) {
    super(props);
    this.state = { expandMap: false, iframeUrl: false };
  }

  render() {
    return (
      <>
        <div
          css={css`
            max-width: 960px;
            margin: auto;
            width: 100%;
          `}
        >
          <Infos>
            Read dead redemption collectors map from{" "}
            <a
              href="https://twitter.com/_jeanropke"
              onClick={() => {
                ReactGA.event({
                  category: "click.map.link",
                  action: "Click on jean ropke twitter profile",
                })
              }}
            >
              @JeanRopke
            </a>{" "}
            <br />
            <span role="img" aria-label="information icon">
              ℹ️
            </span>{" "}
            If the map is not loading, please visit{" "}
            <a
              href={COLLECTOR_MAP_URL}
              onClick={() => {
                ReactGA.event({
                  category: "click.map.link",
                  action: "🛑 Click on map resolver",
                })
              }}
            >
              this link
            </a>{" "}
            and come back
          </Infos>
        </div>
        <div
          className="pos-relative"
          css={
            this.state.expandMap === true &&
            css`
              position: fixed;
              top: 0;
              z-index: 9999999999;
              left: 2px;
              width: 100%;
              height: 100vh;
            `
          }
        >
          <button
            onClick={() => this.setState({ expandMap: !this.state.expandMap })}
            css={css`
              position: absolute;
              bottom: 32px;
              left: 16px;
              appearance: none;
              border: none;
              background: rgba(0, 0, 0, 0.8);
              padding: 1em;
              font-size: 16px;
              border-radius: 4px;
              color: white;
              z-index: 99999999999;
              cursor: pointer;
            `}
          >
            {this.state.expandMap === false ? "Expand Map" : "Reduce Map"}
          </button>

          <Iframe
            url={`/poggers/`}
            title="Jean Ropke RDR2 Collector Map"
            height={this.state.expandMap === false ? 700 : "100%"}
            frameBorder="border: 4px solid var(--Armadillo);"
            id="myId"
            display="initial"
            position="relative"
            css={styles.iframe}
          />
        </div>
        <h4>
          Credit:{" "}
          <a
            href="https://github.com/jeanropke/RDR2CollectorsMap"
            onClick={() => {
              ReactGA.event({
                category: "click.map.link",
                action: "Click onjean RDR2CollectorsMap github project",
              })
            }}
          >
            @JeanRopke
          </a>
        </h4>
      </>
    )
  }
}
export default CollectorMap;
