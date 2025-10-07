
import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import type { EmotionChartProps } from '../types';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const EmotionChart: React.FC<EmotionChartProps> = ({ data }) => {
  const chartData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        data: [data.positive, data.neutral, data.negative],
        backgroundColor: ['#00FF87', '#FFD700', '#FF3B5C'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: '感情分析',
        color: '#FFFFFF',
        font: { size: 12 },
        align: 'start' as const,
        padding: { bottom: 5 }
      },
    },
    cutout: '60%',
  };

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-1.5 sm:p-2 h-full min-h-[100px] flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
                <div className="text-green-400 font-bold text-base sm:text-lg">{data.positive}%</div>
                <div className="text-[10px] sm:text-xs text-gray-400">Positive</div>
            </div>
        </div>
      <div className="w-full h-full">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};

export default EmotionChart;
