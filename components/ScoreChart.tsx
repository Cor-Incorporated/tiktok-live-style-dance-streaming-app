
import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';
import type { ScorePoint } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ScoreChartProps {
  data: ScorePoint[];
}

const ScoreChart: React.FC<ScoreChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((_, i) => `${(i - (data.length-1)) * 5}s`),
    datasets: [
      {
        label: 'Score',
        data: data.map(d => d.score),
        borderColor: '#00D9FF',
        backgroundColor: 'rgba(0, 217, 255, 0.2)',
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { 
        display: false,
        grid: { display: false },
      },
      y: {
        min: 0,
        max: 100,
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#00D9FF', font: { size: 10 }, stepSize: 50 },
      },
    },
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Score',
        color: '#FFFFFF',
        font: { size: 12 },
        align: 'start' as const,
        padding: { bottom: 5 }
      },
    },
    animation: false as const,
  };

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-1.5 sm:p-2 h-full min-h-[100px]">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ScoreChart;
