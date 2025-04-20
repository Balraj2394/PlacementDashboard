import React, { useState } from 'react';
import data from '../data/placements.json';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedCompany, setSelectedCompany] = useState('All');
  const [minCGPA, setMinCGPA] = useState('');

  // Data for chart - full data
  const companyCounts = data.reduce((acc, curr) => {
    acc[curr.company] = (acc[curr.company] || 0) + 1;
    return acc;
  }, {});

  const deptCounts = data.reduce((acc, curr) => {
    acc[curr.department] = (acc[curr.department] || 0) + 1;
    return acc;
  }, {});

  const barData = {
    labels: Object.keys(companyCounts),
    datasets: [
      {
        label: 'Students Placed',
        data: Object.values(companyCounts),
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
      },
    ],
  };

  const pieData = {
    labels: Object.keys(deptCounts),
    datasets: [
      {
        label: 'Department-wise',
        data: Object.values(deptCounts),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  // Unique values for filters
  const years = [...new Set(data.map(d => d.year))];
  const departments = [...new Set(data.map(d => d.department))];
  const companies = [...new Set(data.map(d => d.company))];

  // Filtered data for table only
  const filteredTableData = data.filter((student) => {
    return (
      (selectedYear === 'All' || student.year.toString() === selectedYear) &&
      (selectedDept === 'All' || student.department === selectedDept) &&
      (selectedCompany === 'All' || student.company === selectedCompany) &&
      (minCGPA === '' || student.cgpa >= parseFloat(minCGPA))
    );
  });

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📊 Placement Insights Dashboard</h2>

      {/* Charts Section */}
      <div className="row mb-5">
        <div className="col-md-6">
          <h5 className="text-center mb-3">Company-wise Placements</h5>
          <Bar data={barData} />
        </div>
        <div className="col-md-6">
          <h5 className="text-center mb-3">Department-wise Distribution</h5>
          <Pie data={pieData} />
        </div>
      </div>

      {/* Filters Section */}
      <div className="row mb-3">
        <div className="col-md-3">
          <label>Year</label>
          <select
            className="form-control"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option>All</option>
            {years.map((year, idx) => (
              <option key={idx}>{year}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label>Department</label>
          <select
            className="form-control"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
          >
            <option>All</option>
            {departments.map((dept, idx) => (
              <option key={idx}>{dept}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label>Company</label>
          <select
            className="form-control"
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
          >
            <option>All</option>
            {companies.map((comp, idx) => (
              <option key={idx}>{comp}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label>Minimum CGPA</label>
          <input
            type="number"
            className="form-control"
            placeholder="e.g., 8.0"
            value={minCGPA}
            onChange={(e) => setMinCGPA(e.target.value)}
          />
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-12">
          <button
            className="btn btn-secondary w-100"
            onClick={() => {
              setSelectedYear('All');
              setSelectedDept('All');
              setSelectedCompany('All');
              setMinCGPA('');
            }}
          >
            Reset All Filters
          </button>
        </div>
      </div>

      {/* Placement Table */}
      <h5 className="text-center mb-3">📋 Placement Records</h5>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>CGPA</th>
              <th>Company</th>
              <th>Package (LPA)</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {filteredTableData.length > 0 ? (
              filteredTableData.map((student, idx) => (
                <tr key={idx}>
                  <td>{student.name}</td>
                  <td>{student.department}</td>
                  <td>{student.cgpa}</td>
                  <td>{student.company}</td>
                  <td>{student.package}</td>
                  <td>{student.year}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
