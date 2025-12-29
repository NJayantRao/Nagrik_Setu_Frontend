import { Chart } from "react-chartjs-2";

function DepartmentPerformanceChart({ data }) {
  const chartData = {
    labels: data.departments,
    datasets: [
      {
        type: "bar",
        label: "Filed",
        data: data.filed,
        backgroundColor: "#60a5fa",
        borderRadius: 6,
        barPercentage: 1,
        categoryPercentage: 0.6,
        barThickness: 12,
      },
      {
        type: "bar",
        label: "Resolved",
        data: data.resolved,
        backgroundColor: "#22c55e",
        borderRadius: 6,
        barPercentage: 1,
        categoryPercentage: 0.6,
        barThickness: 12,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 10,
          font: { size: 11, weight: "500" },
        },
      },
      tooltip: {
        titleFont: { size: 11 },
        bodyFont: { size: 11 },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 11 } },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
          font: { size: 11 },
        },
        grid: {
          color: "#f1f5f9",
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm w-full h-[300px]">
      <Chart type="bar" data={chartData} options={options} />
    </div>
  );
}

export default DepartmentPerformanceChart;
