import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

function LineChart({ dataByDate }) {
  const [graphCases, setGraphCases] = useState({
    labels: [],
    data: [],
  });

  const [graphLabels, setGraphLabels] = useState([]);
  const [graphCase, setGraphCase] = useState([]);
  const [graphDeaths, setGraphDeaths] = useState([]);
  const [graphRecovered, setGraphRecovered] = useState([]);

  //   const [GD,setGD]=useState({});
  //   setGD(dataByDate);
  useEffect(() => {
    const AllCases = dataByDate.cases;
    const AllDeaths = dataByDate.deaths;
    const AllRecovered = dataByDate.recovered;
    const labels = [];
    const cases = [];
    const deaths = [];
    const recovered = [];
    // console.log(dataByDate);
    for (const property in AllCases) {
      //   console.log(`${property}: ${AllCases[property]}`);
      labels.push(property);
      cases.push(AllCases[property]);
      deaths.push(AllDeaths[property]);
      recovered.push(AllRecovered[property]);
    }

    setGraphLabels(labels);
    setGraphDeaths(deaths);
    setGraphCase(cases);
    setGraphRecovered(recovered);
  }, [dataByDate]);

  const data = {
    labels: graphLabels,
    datasets: [
      {
        label: "Cases",
        data: graphCase,
        fill: false,
        backgroundColor: "orange",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Casulaties",
        data: graphDeaths,
        fill: false,
        backgroundColor: "red",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Recovered",
        data: graphRecovered,
        fill: false,
        backgroundColor: "green",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div>
      this is chart
      <Line data={data} options={options} />
    </div>
  );
}

export default LineChart;
