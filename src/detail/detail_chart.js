import React, { useEffect, useRef, useState } from 'react';

const Detail_Chart = () => {
  const chartContainer = useRef(null);
  const [dataPoints1, setDataPoints1] = useState([]);
  const [dataPoints2, setDataPoints2] = useState([]);
  const [dataPoints3, setDataPoints3] = useState([]);

  useEffect(() => {
    // Load CanvasJS script dynamically
    const script = document.createElement('script');
    script.src = 'https://cdn.canvasjs.com/canvasjs.stock.min.js';
    script.async = true;
    script.onload = () => {
      fetchDataAndRenderChart();
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const fetchDataAndRenderChart = () => {
    fetch('https://canvasjs.com/data/docs/ltceur2018.json')
      .then(response => response.json())
      .then(data => {
        const dp1 = [];
        const dp2 = [];
        const dp3 = [];
        data.forEach(item => {
          dp1.push({ x: new Date(item.date), y: [Number(item.open), Number(item.high), Number(item.low), Number(item.close)], color: item.open < item.close ? 'blue' : 'red' });
          dp2.push({ x: new Date(item.date), y: Number(item.volume_eur), color: item.open < item.close ? 'blue' : 'red' });
          dp3.push({ x: new Date(item.date), y: Number(item.close) });
        });
        setDataPoints1(dp1);
        setDataPoints2(dp2);
        setDataPoints3(dp3);
      });
  };

  useEffect(() => {
    if (chartContainer.current && window.CanvasJS) {    
      const stockChart = new window.CanvasJS.StockChart(chartContainer.current, {
        exportEnabled: true,
        theme: 'light2',
        title: {
          text: '시세'
        },
        charts: [{
          toolTip: {
            shared: true
          },
          axisX: {
            lineThickness: 5,
            tickLength: 0,
            labelFormatter: function(e) {
              return '';
            },
            crosshair: {
              enabled: true,
              snapToDataPoint: true,
              labelFormatter: function(e) {
                return '';
              }
            }
          },
          axisY2: {
            title: 'Litecoin Price',
            prefix: '€'
          },
          legend: {
            verticalAlign: 'top',
            horizontalAlign: 'left'
          },
          data: [{
            name: 'Price (in EUR)',
            yValueFormatString: '€#,###.##',
            axisYType: 'secondary',
            type: 'candlestick',
            risingColor: 'blue',
            fallingColor: 'red',
            dataPoints: dataPoints1
          }]
        }, {
          height: 100,
          toolTip: {
            shared: true
          },
          axisX: {
            crosshair: {
              enabled: true,
              snapToDataPoint: true
            }
          },
          axisY2: {
            prefix: '€',
            title: 'LTC/EUR'
          },
          legend: {
            horizontalAlign: 'left'
          },
          data: [{
            yValueFormatString: '€#,###.##',
            axisYType: 'secondary',
            name: 'LTC/EUR',
            dataPoints: dataPoints2
          }]
        }],
        navigator: {
          data: [{
            color: 'grey',
            dataPoints: dataPoints3
          }],
          slider: {
            minimum: new Date(2018, 6, 1),
            maximum: new Date(2018, 8, 1)
          }
        }
      });

      stockChart.render();
    }
  }, [dataPoints1, dataPoints2, dataPoints3]);

  return (
    <div id="chartContainer" style={{ height: '400px', width: '550px', margin:"auto" }} ref={chartContainer}></div>
  );
};

export default Detail_Chart;
