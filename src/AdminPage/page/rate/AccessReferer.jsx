import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import axios from "axios";

const AccessReferer = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("유저유입");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/api/Access/referer"
        );

        const transformedData = response.data.map((item) => {
          // 기본 날짜 범위 설정
          const currentDate = new Date();
          const startDate = new Date("2024-04-01");
          const endDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + 1
          );

          // 더미 데이터 생성
          let dummyData = [];
          for (
            let date = new Date(startDate);
            date <= endDate;
            date.setDate(date.getDate() + 1)
          ) {
            dummyData.push({ x: new Date(date), y: 0 });
          }

          // 실제 데이터와 더미 데이터 병합
          const realData = item.data.map((point) => ({
            x: new Date(point.x),
            y: point.y,
          }));

          const mergedData = dummyData.map((dummyPoint) => {
            const realPoint = realData.find(
              (point) =>
                point.x.toISOString().split("T")[0] ===
                dummyPoint.x.toISOString().split("T")[0]
            );
            return realPoint || dummyPoint;
          });

          return {
            ...item,
            data: mergedData,
          };
        });

        console.log(response.data);
        console.log(transformedData);
        setData(transformedData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

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

  return (
    <div style={{ height: 1000, width: "100%", overflowX: "scroll" }}>
      <div
        style={{
          width: data[0]?.data.length * 50 || 1000,
          height: "800px",
          paddingTop: "30px",
          paddingRight: "30px",
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
          colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }}
          margin={{ top: 50, right: 110, bottom: 100, left: 60 }}
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
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          yFormat=" >-.2f"
          curve="linear"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 45,
            legend: isDashboard ? undefined : "Date",
            legendOffset: 36,
            legendPosition: "middle",
            format: "%Y-%m-%d %H:%M:%S",
            tickValues: "every 1 day",
          }}
          axisLeft={{
            orient: "left",
            tickValues: 5,
            tickSize: 3,
            tickPadding: 5,
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

export default AccessReferer;
