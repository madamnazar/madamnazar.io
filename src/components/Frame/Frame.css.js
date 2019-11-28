import { css } from "@emotion/core";
const frame = "./images/frame.png";
const blueBg = "./images/bgOnline.png";

export default {
  root: css`
    border-color: #2e2e2e;
    border-image-repeat: all;
    border-image-slice: 14;
    border-image-outset: 0;
    border-image-source: url(${frame});
    border-style: solid;
    border-width: 1px 0;
    padding: 16px;
    text-align: center;
    font-family: "RDRrocks-sg";
    letter-spacing: 2px;
    color: white;
    -webkit-font-smoothing: antialiased;
    background: url(${blueBg});
    position: relative;
    left: 0;
    z-index: 10;

    h1,
    h4 {
      font-size: 2em;
    }

    p {
      font-family: "RDRHapna-Regular";
    }

    h1 {
      text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.6);
      a::before,
      a::after {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        width: 40px;
        left: -40px;
        background: url('./images/header-left.png') no-repeat
          center center / 22px;
        z-index: 999999;
      }

      a::after {
        left: inherit;
        right: -40px;
        background: url('./images/header-right.png') no-repeat
          center center / 22px;
      }
    }

    @media (max-width: 960px) {
      position: fixed;
      h4 {
        font-size: 1.05em;
      }
      h1 {
        font-size: 1.45em;
      }
    }
  `
};
