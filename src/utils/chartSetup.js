import {
  Chart as ChartJS,

  // Scales
  CategoryScale,
  LinearScale,

  // Elements
  BarElement,
  LineElement,
  PointElement,
  ArcElement,

  // Controllers (🔥 REQUIRED in production)
  BarController,
  LineController,
  DoughnutController,
  PieController,

  // Plugins
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  // Scales
  CategoryScale,
  LinearScale,

  // Elements
  BarElement,
  LineElement,
  PointElement,
  ArcElement,

  // Controllers
  BarController,
  LineController,
  DoughnutController,
  PieController,

  // Plugins
  Tooltip,
  Legend
);
