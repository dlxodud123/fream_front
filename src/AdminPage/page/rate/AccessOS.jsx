import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import axios from "axios";

const AccessOS = ({
  isCustomLineColors = false,
  isDashboard = false,
  setOs,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
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
        const response = await axios.get("/api/Access/os");

        const transformedData = response.data.map((item) => ({
          ...item,
          data: item.data.map((point) => ({
            x: new Date(point.x), // x 값을 Date 객체로 변환하기 전에 시간 추가
            y: point.y,
          })),
        }));
        console.log(response.data);
        console.log(transformedData);
        // setData(transformedData);
        if (isDashboard) {
          const currentDate = new Date();
          const tenDaysAgo = new Date();
          tenDaysAgo.setDate(currentDate.getDate() - 10);

          const filteredData = transformedData.map((item) => ({
            ...item,
            data: item.data.filter((point) => point.x >= tenDaysAgo),
          }));

          setData(filteredData);
          setOs(calculateDifference(filteredData));
        } else {
          setData(transformedData);
          setOs(calculateDifference(transformedData));
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
      setLoading(false); // 데이터를 모두 처리한 후 loading 상태를 false로 설정
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
        console.log("data:",data)
        if (loading) {
          return <div>Loading...</div>; // 로딩 중일 때 표시할 컴포넌트
        }
  return (
    <div
      style={{
        height: isDashboard ? 300 : 1000,
        width: "100%",
        overflowX: "scroll",
      }}
    >
      <div
        style={{
          width: isDashboard
            ? data[2]?.data.length * 80 || 800
            : data[2]?.data.length * 50 || 1000,
          height: isDashboard ? 300 : "800px",
          paddingTop: "80px",
          paddingRight: isDashboard ? "50px" : "30px",
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
            min: 0,
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
            tickRotation: isDashboard ? 0 : 45,
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

export default AccessOS;
