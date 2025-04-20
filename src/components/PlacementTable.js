// src/components/PlacementTable.js
import React, { useState } from 'react';
import placementData from '../data/placements.json';

const PlacementTable = () => {
  const [companyFilter, setCompanyFilter] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [minCTC, setMinCTC] = useState('');
  const [maxCTC, setMaxCTC] = useState('');

  const filteredData = placementData.filter((item) => {
    const matchCompany = companyFilter === '' || item.company.toLowerCase().includes(companyFilter.toLowerCase());
    const matchDept = deptFilter === '' || item.department.toLowerCase().includes(deptFilter.toLowerCase());
    const matchMinCTC = minCTC === '' || item.ctc >= parseFloat(minCTC);
    const matchMaxCTC = maxCTC === '' || item.ctc <= parseFloat(maxCTC);
    return matchCompany && matchDept && matchMinCTC && matchMaxCTC;
  });

  return (
    <div>
      <h3 className="mb-3">📄 Placement Records</h3>

      {/* Filters */}
      <div className="d-flex gap-3 flex-wrap mb-3">
        <input
          className="form-control"
          style={{ maxWidth: '200px' }}
          type="text"
          placeholder="Filter by company"
          value={companyFilter}
          onChange={(e) => setCompanyFilter(e.target.value)}
        />
        <input
          className="form-control"
          style={{ maxWidth: '200px' }}
          type="text"
          placeholder="Filter by department"
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
        />
        <input
          className="form-control"
          style={{ maxWidth: '150px' }}
          type="number"
          placeholder="Min CTC"
          value={minCTC}
          onChange={(e) => setMinCTC(e.target.value)}
        />
        <input
          className="form-control"
          style={{ maxWidth: '150px' }}
          type="number"
          placeholder="Max CTC"
          value={maxCTC}
          onChange={(e) => setMaxCTC(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Department</th>
              <th>CTC (LPA)</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((entry, idx) => (
              <tr key={idx}>
                <td>{entry.name}</td>
                <td>{entry.company}</td>
                <td>{entry.department}</td>
                <td>{entry.ctc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlacementTable;
