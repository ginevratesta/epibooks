import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Blogs = () => {
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:3030/getBlogs");
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <Container>
      <Row>
        {blogs?.map((blog) => (
          <Col key={blog._id}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={blog.cover} />
              <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                <Card.Text>
                  {blog.content}
                </Card.Text>
                <Button variant="primary">Delete</Button>
                <Button variant="primary">Modify</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Blogs;
