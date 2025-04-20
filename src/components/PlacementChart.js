// src/components/PlacementChart.js
import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import placementData from '../data/placements.json';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const PlacementChart = () => {
  // === Aggregate: Company-wise and Dept-wise ===
  const companyMap = {};
  const deptMap = {};

  placementData.forEach(({ company, department }) => {
    companyMap[company] = (companyMap[company] || 0) + 1;
    deptMap[department] = (deptMap[department] || 0) + 1;
  });

  const companyLabels = Object.keys(companyMap);
  const companyCounts = Object.values(companyMap);

  const deptLabels = Object.keys(deptMap);
  const deptCounts = Object.values(deptMap);

  const barData = {
    labels: companyLabels,
    datasets: [
      {
        label: 'No. of Students Placed',
        data: companyCounts,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: deptLabels,
    datasets: [
      {
        label: 'Dept-wise Placements',
        data: deptCounts,
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        ],
      },
    ],
  };

  return (
    <div>
      <h2 className="text-center mb-4">📈 Placement Overview</h2>

      <div className="row">
        <div className="col-md-6 mb-4">
          <h5 className="text-center">Company-wise Placements</h5>
          <Bar data={barData} />
        </div>

        <div className="col-md-6 mb-4">
          <h5 className="text-center">Department-wise Distribution</h5>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default PlacementChart;
