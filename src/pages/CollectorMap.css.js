import { css } from "@emotion/core"
const frame = "/images/frame.png"

export default {
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
        inset 0 8px 16px rgba(0, 0, 0, 0.3),
        inset 0 -4px 8px rgba(0, 0, 0, 0.3),
        inset 0 -8px 16px rgba(0, 0, 0, 0.3);
      z-index: 50000;
      user-select: none;
      pointer-events: none;
    }
  `,
}
