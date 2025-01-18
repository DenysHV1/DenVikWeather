// npm i chart.js react-chartjs-2 chartjs-plugin-datalabels
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { selectData } from "../../redux/selectors";
import { useMemo } from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart, registerables } from "chart.js";

// Регистрация всех компонентов Chart.js и плагинов
Chart.register(...registerables, ChartDataLabels);

const ChartBlock = () => {
  const data = useSelector(selectData);

  const chartData = useMemo(() => {
    if (!data || !data.length) return { labels: [], datasets: [] };

    return {
      labels: data.map((item) => {
        switch (Number(item.time)) {
          case 24:
            return "00";
          case 27:
            return 3;
          case 30:
            return 6;
          case 33:
            return 9;
          case 36:
            return 12;
          case 39:
            return 15;
          case 42:
            return 18;
          case 45:
            return 21;
          case 48:
            return "00";
          default:
            return item.time;
        }
      }), // x-axis
      datasets: [
        {
          label: "Temperature",
          data: data.map((item) => item.temp), //y-axis
          fill: true,
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          borderColor: "rgba(255, 255, 255, 1)",
          borderWidth: 2,
          tension: 0.3,
          pointBackgroundColor: "rgba(255, 255, 255, 1)",
        },
      ],
    };
  }, [data]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      datalabels: {
        color: "#3cff00",
        font: {
          size: 16,
          weight: "middle",
        },
        anchor: "end", // Расположение подписей
        align: "top", // Выравнивание подписей
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff",
        },
      },
      y: {
        ticks: {
          color: "#ffffff",
        },
      },
    },
  };

  return (
    <div className="chart-container">
      {chartData.labels.length > 0 ? (
        <Line data={chartData} options={options} />
      ) : (
        <p>Loading data or no data available</p>
      )}
    </div>
  );
};

export default ChartBlock;
