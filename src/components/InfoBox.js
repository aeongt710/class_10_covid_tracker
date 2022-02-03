import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import NumberFormat from "react-number-format";
function InfoBox({ title, cases, total }) {
  let col = "";
  if (title === "Cases") col = "orange";
  else if (title === "Deaths") col = "red";
  else if (title==="Recovered") col="green"
  return (
    <Card className="infoBox">
      <CardContent>
        <Typography
          color={col}
          className="infoBox_title"
          fontFamily={"monospace"}
          fontSize={15}
        >
          {title}
        </Typography>

        <h2 className="infoBox_cases">
          <NumberFormat
            value={cases}
            displayType={"text"}
            thousandSeparator={true}
            prefix={""}
          /><sup>+</sup>
        </h2>
        <Typography color="textSecondary" className="infoBox_total">
          <NumberFormat
            value={total}
            displayType={"text"}
            thousandSeparator={true}
            prefix={""}
          />
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
