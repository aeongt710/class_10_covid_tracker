import React from "react";
import "./Table.css";
function Table({ countriesData }) {
  return (
    <div className="table">
      {/* <tbody> */}
        {/* <tr>
            <td><strong>Countries</strong></td>
            <td><strong>Cases</strong></td>
        </tr> */}
      {countriesData.map((country) => (
        <tr className="tr">
          <td>
            {country.country}&nbsp;&nbsp;&nbsp;
            <img src={country.countryInfo.flag} width="20" height="13" />
          </td>
          <td>
            <strong>{country.cases}</strong>
          </td>
        </tr>
      ))}
      {/* </tbody> */}
    </div>
  );
}
// tr>td*2
export default Table;
