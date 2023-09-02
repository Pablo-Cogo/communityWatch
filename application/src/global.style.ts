import styled, { createGlobalStyle, css } from "styled-components";

export const GlobalStyle = createGlobalStyle`

:root{
  ${(props) =>
    !props.theme.existsRoutes &&
    css`
      --color-primary: 235, 135, 44;
      --primary-text: 0, 0, 0;
      --primary-background: 255, 255, 255;

      --primary-button: 235, 135, 44;
      --primary-button-hover: 239, 159, 86;
      --primary-button-active: 237, 147, 65;

      --secondary-text: 115, 115, 115;
      --secondary-background: 250, 250, 250;

      --secondary-button: 38, 38, 38;
      --secondary-button-hover: 59, 59, 59;
      --secondary-button-active: 93, 93, 93;

      --link: 235, 135, 44;
      --header-link: 235, 135, 44;

      --gray-100: 243, 244, 246;
      --gray-300: 209, 213, 219;
      --gray-400: 156, 163, 175;
      --gray-700: 55, 65, 81;

      --separator: 219, 219, 219;
      --stroke: 219, 219, 219;

      --bg-toast: #fff;
      --color-success: green;
      --color-error: red;
      --color-warning: #ffc107;
      --color-info: blue;

      --font-family-system: -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, Helvetica, Arial, sans-serif;
      --system-10-font-size: 10px;
      --system-10-line-height: 12px;
      --system-11-font-size: 11px;
      --system-11-line-height: 13px;
      --system-12-font-size: 12px;
      --system-12-line-height: 16px;
      --system-13-font-size: 13px;
      --system-14-font-size: 14px;
      --system-14-line-height: 18px;
      --system-15-font-size: 15px;
      --system-16-font-size: 16px;
      --system-16-line-height: 24px;
      --system-18-font-size: 18px;
      --system-18-line-height: 24px;
      --system-20-line-height: 25px;
      --system-22-font-size: 22px;
      --system-22-line-height: 26px;
      --system-24-font-size: 24px;
      --system-24-line-height: 27px;
      --system-26-font-size: 26px;
      --system-26-line-height: 28px;
      --system-28-font-size: 28px;
      --system-28-line-height: 32px;
      --system-32-font-size: 32px;
      --system-32-line-height: 40px;

      --scrollbar-thumb: rgba(235, 135, 44, 0.9);
      --scrollbar-track: rgb(17, 28, 59);
      --scrollbar-thumb-hover: rgb(235, 135, 44);
    `}

  ${(props) => props.theme.existsRoutes && css``}
}

*{
    margin: 0;
    padding: 0;
    font-family: var(--font-family-system);
    font-weight: 400;
    scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
    scrollbar-width: thin;
    scroll-behavior: smooth;
}
html{
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
    height: 100%;
    overflow: hidden;
}
body{
    box-sizing: border-box;
    overflow-x: hidden;
    height: 100%;
}
table{
    border-collapse: collapse;
}
th,td{
    outline: 1px solid var(--border-table);
    border: 0;
}
th{
    color: var(--color-th-table);
}
td{
    color: var(--color-td-table);
}
li{
    list-style: none;
}
a{
    text-decoration: none;
}
#root{
    height: 100%;
}
button{
    border: none;
    outline: none;
    cursor: pointer;
    background: transparent;
}

input{
    width: 100%;
    box-sizing:border-box;
    border: none;
    outline:none;
    background: transparent;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input[type="number"] {
    -moz-appearance: textfield;
}

input[type=password]::-ms-reveal,
input[type=password]::-ms-clear {
  display: none;
}
::selection {
    color: var(--color-select);
    background: var(--bg-select);
}
/* scrollbars */
::-webkit-scrollbar{
    width: 5px;
    height: 6px;
}

::-webkit-scrollbar-track{
    box-shadow: inset 0 0 5px var(--scrollbar-track);
    border-radius: 10px;
}

::-webkit-scrollbar-thumb{
    background: var(--scrollbar-thumb);
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover{
    background: var(--scrollbar-thumb-hover);//#888;
}

`;
export const Container = styled.div`
  display: grid;
  height: 100%;
  min-height: 100vh;
  grid-template-columns: 0fr repeat(3, 1fr);
  grid-template-rows: 0fr 3fr;
  grid-template-areas:
    "title nav nav nav"
    "sidebar main main main";

  &.sidebarClose {
    grid-template-columns: 1fr;
    grid-template-areas: "nav" "main";
  }

  @media only screen and (max-width: 1055px) {
    transition: grid-template-areas 2s;
    grid-template-columns: 0fr 1fr;
    grid-template-rows: 0fr 3fr;
    grid-template-areas: "title nav" "sidebar main";
  }
  @media only screen and (max-width: 589px) {
    grid-template-rows: 0fr 0fr 0fr 3fr !important;
    grid-template-columns: 0fr !important;
    grid-template-areas: "title" "nav" "links" "main" !important;

    &.sidebarClose {
      grid-template-columns: 1fr !important;
    }
  }
`;
