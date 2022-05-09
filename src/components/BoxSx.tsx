import * as React from "react";
import Box from "@mui/material/Box";

type PropsFunction = () => void;

interface Props {
  boxValue: string;
  handleClick: PropsFunction;
  boxDisabled: boolean;
  boxSize: number;
}

function BoxSx({ boxValue, handleClick, boxDisabled, boxSize }: Props) {
  const boxBtn = {
    width: "100%",
    height: "100%",
    color: "white",
    backgroundColor: "transparent",
    outline: "none",
    padding: 0,
    margin: 0,
  };

  return (
    <Box
      sx={{
        width: "25px",
        height: "25px",
        backgroundColor: "primary.light",
        margin: "1px",

        "&:hover": {
          backgroundColor: "primary.main",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
      //   component="span"
      //   sx={{ w: 25, h: 25, m: 0.5, border: "1px solid grey" }}
    >
      {/* <h4 style={{ outline: "1px solid black" }}> */}
      {/* {boxValue !== "□" ? boxValue : ""} */}
      {/* </h4> */}
      <button
        onClick={(e) => handleClick()}
        style={boxBtn}
        disabled={boxDisabled}
      >
        {boxValue !== "□" ? boxValue : null}
      </button>
    </Box>
  );
}

export default React.memo(BoxSx);
