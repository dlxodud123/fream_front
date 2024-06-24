import React from 'react';
import { CanvasJSChart } from 'canvasjs-react-charts';

const LineChart = () => {
  const options = {
    title: {
      text: ""
    },
    data: [
      {
        type: "line",
        dataPoints: [
          { x: 10, y: 71 },
          { x: 20, y: 55 },
          { x: 30, y: 50 },
          { x: 40, y: 65 },
          { x: 50, y: 95 },
          { x: 60, y: 68 },
          { x: 70, y: 28 },
          { x: 80, y: 34 },
          { x: 90, y: 14 },
        ]
      }
    ]
  };

  return (
    <div>
      <div style={{textAlign:"left", fontWeight:"bold", fontSize:"19px", height:"40px"}}>시세</div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default LineChart;
