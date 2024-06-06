import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, ListGroup, Card, Spinner, Alert, Pagination } from 'react-bootstrap';

const rowsPerPage = 10;

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);


  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get('https://602e7c2c4410730017c50b9d.mockapi.io/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      });
  }, [page]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  // Handler for page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Container fluid style={{ padding: '20px' }}>
      <Row>
        <Col xs={6}>
          <h2 style={{ margin: '20px', color: "grey" }}>Users List</h2>
          {loading ? (
            <Spinner animation="border" role="status" style={{ width: '3rem', height: '3rem', color: 'grey', margin: "20px" }}>
            </Spinner>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <>
              <ListGroup>
                {users.length ? (
                  // users.map(user => (
                  users.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map(user => (
                    <Row key={user.id}>
                      <Col xs={12}>
                        <ListGroup.Item
                          action
                          onClick={() => handleUserClick(user)}
                          active={selectedUser && selectedUser.id === user.id}
                          style={{
                            marginBottom: '10px',
                            backgroundColor: selectedUser && selectedUser.id === user.id ? 'grey' : '',
                            borderColor: selectedUser && selectedUser.id === user.id ? 'grey' : '',
                            borderRadius: '5px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          <img src={user.avatar} alt={user.profile.username} style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                          {user.profile.username}
                        </ListGroup.Item>
                      </Col>
                    </Row>
                  ))
                ) : (
                  <p>No data to show</p>
                )}
              </ListGroup>
              <Pagination>
                {Array.from({ length: Math.ceil(users.length / rowsPerPage) }, (_, i) => (
                  <Pagination.Item
                    key={i}
                    active={i === page}
                    onClick={() => handleChangePage(null, i)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </>
          )}
        </Col>
        <Col xs={6}>
          <h2 style={{ margin: '20px', color: "grey" }}>User Details</h2>
          {loading ? (
            <Spinner animation="border" role="status" style={{ width: '3rem', height: '3rem', color: 'grey', margin: "20px" }}>
            </Spinner>
          ) : (
            selectedUser ? (
              <Card>
                <Card.Img variant="top" src={selectedUser.avatar} />
                <Card.Body>
                  <Card.Title>{selectedUser.profile.username}</Card.Title>
                  <Card.Text>
                    <strong>Email:</strong> {selectedUser.profile.email}
                  </Card.Text>
                  <Card.Text>
                    <strong>Job Title:</strong> {selectedUser.jobTitle}
                  </Card.Text>
                  <Card.Text>
                    <strong>Bio:</strong> {selectedUser.Bio}
                  </Card.Text>
                </Card.Body>
              </Card>
            ) : (
              <p style={{ margin: "30px", color: "grey", fontSize: "20px" }}>No user selected</p>
            )
          )}
        </Col>
      </Row>
    </Container >
  );
}

export default App;