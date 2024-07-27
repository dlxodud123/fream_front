// import React from 'react';
// import { CanvasJSChart } from 'canvasjs-react-charts';

// const LineChart = () => {
//   const options = {
//     title: {
//       text: ""
//     },
//     data: [
//       {
//         type: "line",
//         dataPoints: [
//           { x: 10, y: 71 },
//           { x: 20, y: 55 },
//           { x: 30, y: 50 },
//           { x: 40, y: 65 },
//           { x: 50, y: 95 },
//           { x: 60, y: 68 },
//           { x: 70, y: 28 },
//           { x: 80, y: 34 },
//           { x: 90, y: 14 },
//         ]
//       }
//     ]
//   };

//   return (
//     <div>
//       <div style={{textAlign:"left", fontWeight:"bold", fontSize:"19px", height:"40px"}}>시세</div>
//       <CanvasJSChart options={options} />
//     </div>
//   );
// };

// export default LineChart;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const LineChart = ({ productId }) => {
  console.log("prid:", productId);
  const [data, setData] = useState([["Date", "Price"]]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endDate = new Date().toISOString().split("T")[0];
        const startDate = new Date(
          new Date().setDate(new Date().getDate() - 15)
        )
          .toISOString()
          .split("T")[0];
        console.log("productId:", productId);
        console.log("startDate:", startDate);
        console.log("endDate:", endDate);
        const response = await axios.get("/api/Access/price-history", {
          params: {
            productId,
            startDate,
            endDate,
          },
        });
        console.log("response.data:", response.data);
        const fetchedData = response.data.map((item) => [
          item.historyDate,
          item.newPrice,
        ]);

        setData((prevData) => [...prevData, ...fetchedData]);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [productId]);

  // const data = [
  //   ["X", "시세"],
  //   ["June 1", 300000],
  //   ["June 2", 310000],
  //   ["June 3", 320000],
  //   ["June 4", 290000],
  //   ["June 5", 310000],
  //   ["June 6", 310000],
  //   ["June 7", 300000],
  //   ["June 8", 320000],
  //   ["June 9", 280000],
  //   ["June 10", 270000],
  //   ["June 11", 320000],
  //   ["June 12", 290000],
  //   ["June 13", 310000],
  //   ["June 14", 300000],
  //   ["June 15", 320000],
  //   ["June 16", 320000],
  //   ["June 17", 290000],
  //   ["June 18", 300000],
  //   ["June 19", 320000],
  //   ["June 20", 290000],
  //   ["June 21", 270000],
  //   ["June 22", 280000],
  //   ["June 23", 290000],
  //   ["June 24", 290000],
  //   ["June 25", 300000],
  //   ["June 26", 310000],
  //   ["June 27", 320000],
  //   ["June 28", 290000],
  //   ["June 29", 300000],

  //   ["July 1", 300000],
  //   ["July 2", 310000],
  //   ["July 3", 320000],
  //   ["July 4", 290000],
  //   ["July 5", 310000],
  //   ["July 6", 310000],
  //   ["July 7", 300000],
  //   ["July 8", 320000],
  //   ["July 9", 280000],
  //   ["July 10", 270000],
  //   ["July 11", 320000],
  //   ["July 12", 290000],
  //   ["July 13", 310000],
  //   ["July 14", 300000],
  //   ["July 15", 320000],
  //   ["July 16", 320000],
  //   ["July 17", 290000],
  //   ["July 18", 300000],
  //   ["July 19", 320000],
  //   ["July 20", 290000],
  //   ["July 21", 270000],
  //   ["July 22", 280000],
  //   ["July 23", 290000],
  //   ["July 24", 290000],
  //   ["July 25", 300000],
  //   ["July 26", 310000],
  //   ["July 27", 320000],
  //   ["July 28", 290000],
  //   ["July 29", 300000],
  //   ["July 30", 290000],
  //   ["July 31", 290000],
  // ];

  const options = {
    hAxis: {
      title: "",
    },
    vAxis: {
      title: "",
    },
    series: {
      1: { curveType: "function" },
    },
  };

  return (
    <Chart
      width={"600px"}
      height={"400px"}
      chartType="LineChart"
      loader={<div>Loading Chart</div>}
      data={data}
      options={options}
    />
  );
};

export default LineChart;
