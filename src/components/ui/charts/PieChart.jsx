import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ stats }) {
  const data = {
    labels: ["Filed", "In-Progress", "Resolved", "Rejected"],
    datasets: [
      {
        data: [stats.filed, stats.inProgress, stats.resolved, stats.rejected],
        backgroundColor: [
          "#60a5fa", // blue
          "#facc15", // yellow
          "#22c55e", // green
          "#ef4444", // red
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 14,
          font: {
            size: 14,
            weight: "600",
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm w-full max-w-md h-full">
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default PieChart;
