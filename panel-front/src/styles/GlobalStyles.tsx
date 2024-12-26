import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        --main-color: #4293E0;
        --main-hover: #2e79bf;
        --main-light: #deebf7;
        --secondary-color: #4A5568;
        --secondary-light: #d1d5d9;
        --thirdy-color: #eda532;
        --thirdy-hover: #ce8d25;
        --bg-public: #FFFFFF;
        --bg-auth: #F9FAFB;
        --bg-dashboard: #e7e9ec;
        --light-gray-color: #c7cbd2;
        --error-color: #f56565;
    }
    
    :root {
        font-family: "Inter", serif !important;
        font-weight: 400;
        color: var(--secondary-color);
    }

    .size-width-page {
        width: 100%;
        padding-left: 30px;
        padding-right: 30px;
    }

`;

export default GlobalStyle;
