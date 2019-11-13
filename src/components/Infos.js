/** @jsx jsx */
import React from "react";
import ReactGA from "react-ga";
import { jsx, css } from "@emotion/core";

const Infos = ({ children, styles, className }) => (
  <span
    className={`mb-16 ph-16 d-inline-block ${className}`}
    css={[
      css`
        color: var(--Armadillo);
      `,
      styles
    ]}
  >
    {children}
  </span>
);

export default Infos;
