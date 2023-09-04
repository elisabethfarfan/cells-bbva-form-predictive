/* eslint-disable no-unused-vars */
import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`:host {
  display: block;
  box-sizing: border-box;
}

:host([hidden]), [hidden] {
  display: none !important;
}

*, *:before, *:after {
  box-sizing: inherit;
}

bbva-web-form-search {
  padding: 13px;
}

bbva-web-form-radio-button,
bbva-web-form-predictive,
bbva-web-form-select,
bbva-form-input,
bbva-web-form-checkbox,
label {
  padding-left: 13px;
  padding-right: 13px;
  padding-bottom: 8px;
}

.container {
  width: 320px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

p, h4 {
  padding-left: 13px;
  padding-right: 13px;
}

.button {
  padding: 15px;
}

.radiogroupGLP {
  display: flex;
  flex-direction: row;
}
`;