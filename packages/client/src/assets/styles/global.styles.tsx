import { GlobalStyles, useTheme } from "@mui/material";

const MuiGlobal = () => {
  const theme = useTheme();

  return (
    <>
      <GlobalStyles
        styles={`
        body {
          margin: 0;
          color:  ${theme.palette.common.black};
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      
        *, *::before, *::after {
          box-sizing: border-box;
        }
        
        body, html {
          height: 100%;
          min-height: 100%;
          scroll-behavior: smooth;
        }
      
        #root {
          height: 100%;
          width: 100%;
        }
      
        div, input, form, header, button, textarea {
          box-sizing: border-box;
          background: transparent;
          font: inherit;
        }
      
        ul, ol, li {
          list-style: none;
          margin: 0;
          padding: 0;
        }
      
        button {
          color: ${theme.palette.common.black};
          border: 0;
          outline: 0;
          margin: 0;
          padding: 0;
        }
      
        /* remove the arrows from number inputs*/
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          /* stylelint-disable-next-line */
          -webkit-appearance: none;
          margin: 0;
        }
      
        /* Firefox */
        input[type="number"] {
          /* stylelint-disable-next-line */
          -moz-appearance: textfield;
        }

        // MUI Datagrid

        .MuiDataGrid-columnHeaders {
          background: ${theme.palette.grey[100]} !important;
          height: 60px !important;
        }

        .MuiDataGrid-footerContainer {
          height: 60px !important;
        }
      `}
      />
    </>
  );
};
export default MuiGlobal;
