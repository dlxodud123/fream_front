import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import axios from "axios";

const AccessBrowser = ({
  isCustomLineColors = false,
  isDashboard = false,
  setBrowser,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const calculateDifference = (data) => {
    if (!data || data.length === 0) return 0;

    const currentDate = new Date();
    const yesterday = new Date(currentDate);
    const twoDaysAgo = new Date(currentDate);

    yesterday.setDate(currentDate.getDate() - 1);
    twoDaysAgo.setDate(currentDate.getDate() - 2);

    const yesterdayData = data.map((item) => ({
      ...item,
      data: item.data.filter(
        (point) => point.x.toDateString() === yesterday.toDateString()
      ),
    }));

    const twoDaysAgoData = data.map((item) => ({
      ...item,
      data: item.data.filter(
        (point) => point.x.toDateString() === twoDaysAgo.toDateString()
      ),
    }));

    const yesterdayTotal = yesterdayData.reduce(
      (sum, item) => sum + (item.data[0]?.y || 0),
      0
    );
    const twoDaysAgoTotal = twoDaysAgoData.reduce(
      (sum, item) => sum + (item.data[0]?.y || 0),
      0
    );

    return yesterdayTotal - twoDaysAgoTotal;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/api/Access/browser"
        );

        const transformedData = response.data.map((item) => ({
          ...item,
          data: item.data.map((point) => ({
            x: new Date(point.x), // x 값을 Date 객체로 변환 (날짜 포함)
            y: point.y,
          })),
        }));
        if (isDashboard) {
          const currentDate = new Date();
          const tenDaysAgo = new Date();
          tenDaysAgo.setDate(currentDate.getDate() - 10);

          const filteredData = transformedData.map((item) => ({
            ...item,
            data: item.data.filter((point) => point.x >= tenDaysAgo),
          }));

          setData(filteredData);
          setBrowser(calculateDifference(filteredData));
        } else {
          setData(transformedData);
          setBrowser(calculateDifference(transformedData));
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [isDashboard]);

  // 현재 날짜 기준 기본 범위 설정
  const currentDate = new Date();
  const defaultStartDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - 30
  ); // 30일 전
  const defaultEndDate = currentDate;

  // 데이터가 있을 때의 범위 설정
  const xMin =
    data.length > 0
      ? new Date(
          Math.min(...data.flatMap((item) => item.data.map((point) => point.x)))
        )
      : defaultStartDate;
  const xMax =
    data.length > 0
      ? new Date(
          Math.max(...data.flatMap((item) => item.data.map((point) => point.x)))
        )
      : defaultEndDate;
        console.log("Xmin:",xMin);
        console.log("Xmax:",xMax);
        console.log("data:",data);
  return (
    <div
      style={{
        height: isDashboard ? 450 : 1000,
        width: "100%",
        overflowX: "scroll",
      }}
    >
      <div
        style={{
          width: isDashboard
            ? data[1]?.data.length * 80 || 800
            : data[0]?.data.length * 50 || 1000,
          height: isDashboard ? 300 : 800,
          paddingTop: "80px",
          paddingRight: isDashboard ? "50px" : "30px", // 더 많은 오른쪽 패딩 추가
        }}
      >
        <ResponsiveLine
          data={data}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: colors.grey[100],
                },
              },
              legend: {
                text: {
                  fill: colors.grey[100],
                },
              },
              ticks: {
                line: {
                  stroke: colors.grey[100],
                  strokeWidth: 1,
                },
                text: {
                  fill: colors.grey[100],
                },
              },
            },
            legends: {
              text: {
                fill: colors.grey[100],
              },
            },
            tooltip: {
              container: {
                color: colors.primary[500],
              },
            },
          }}
          colors={isDashboard ? { scheme: "nivo" } : { scheme: "nivo" }}
          margin={
            isDashboard
              ? { left: 30, bottom: 100, right: 100 }
              : { top: 50, right: 110, bottom: 100, left: 60 }
          }
          xScale={{
            type: "time",
            format: "%Y-%m-%d %H:%M:%S",
            precision: "minute",
            min: xMin,
            max: xMax,
          }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto", // y축 최대 값을 20으로 설정
            stacked: false,
            reverse: false,
          }}
          yFormat=" >-.2f"
          curve="linear" // 선을 직선으로 설정
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: isDashboard ? 1 : 5,
            tickPadding: isDashboard ? 1 : 5,
            tickRotation: isDashboard ? 10 : 45,
            legend: isDashboard ? undefined : "Date",
            legendOffset: 36,
            legendPosition: "middle",
            format: isDashboard ? "%m-%d" : "%Y-%m-%d %H:%M:%S", // Format the ticks to show the full date and time
            tickValues: "every 1 day", // Set tick values to display every day
          }}
          axisLeft={{
            orient: "left",
            tickValues: isDashboard ? 10 : 5,
            tickSize: 3,
            tickPadding: isDashboard ? 3 : 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : "count",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          enableGridX={false}
          enableGridY={false}
          pointSize={8}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          tooltip={({ point }) => (
            <div
              style={{
                background: "white",
                padding: "5px 10px",
                border: "1px solid #ccc",
                color: "black",
                
              }}
            >
              <strong>{point.serieId}</strong>
              <br />
              x: {point.data.xFormatted || point.data.x}
              <br />
              y: {point.data.yFormatted || point.data.y}
            </div>
          )}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
};

export default AccessBrowser;
