
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import type { DonationChartProps } from '../types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DonationChart: React.FC<DonationChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((_, i) => `${(i - (data.length -1)) * 30}s`),
    datasets: [
      {
        label: '¥100',
        data: data.map(d => d.amount100),
        backgroundColor: '#CD7F32',
      },
      {
        label: '¥500',
        data: data.map(d => d.amount500),
        backgroundColor: '#C0C0C0',
      },
      {
        label: '¥1000',
        data: data.map(d => d.amount1000),
        backgroundColor: '#FFD700',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { 
        stacked: true,
        display: false,
        grid: { display: false }
      },
      y: {
        stacked: true,
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#FFD700', font: { size: 10 }, stepSize: 1 },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: '投げ銭推移',
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
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default DonationChart;
