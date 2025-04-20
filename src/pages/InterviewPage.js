// InterviewPage.js  
import React, { useState } from 'react';
import interviews from '../data/interviews.json';
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';

const InterviewPage = () => {
  const [filterDept, setFilterDept] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const departments = [...new Set(interviews.map((i) => i.department))];

  const filtered = interviews.filter((i) => {
    const matchesDept = filterDept === '' || i.department === filterDept;
    const matchesCompany = searchTerm === '' || i.company.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesCompany;
  });

  const resetFilters = () => {
    setFilterDept('');
    setSearchTerm('');
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">📘 Interview Experiences</h2>

      <Form className="mb-4">
        <Row className="g-3 align-items-end">
          <Col md={4}>
            <Form.Group controlId="departmentFilter">
              <Form.Label>Filter by Department</Form.Label>
              <Form.Select
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
              >
                <option value="">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="searchCompany">
              <Form.Label>Search by Company</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., Infosys, Amazon"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={2}>
            <Button variant="outline-secondary" onClick={resetFilters} className="w-100">
              🔄 Reset
            </Button>
          </Col>
        </Row>
      </Form>

      {filtered.length === 0 ? (
        <p className="text-center">🚫 No interview experiences match your filters.</p>
      ) : (
        <Row>
          {filtered.map((exp, idx) => (
            <Col md={6} lg={4} key={idx} className="mb-4">
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title>{exp.studentName} ({exp.department})</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {exp.company} - {exp.year}
                  </Card.Subtitle>
                  <Card.Text>{exp.experience}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small>🌀 Rounds: {exp.roundCount}</small>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default InterviewPage;
