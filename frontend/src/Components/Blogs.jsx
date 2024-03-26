import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Blogs.css";

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
    <Container className="py-5">
      <Row className="gap-3 justify-content-center">
        {blogs?.map((blog) => (
          <Col xs={12} md={6} lg={3} key={blog._id}>
            <Card>
              <Card.Img className="img_" variant="top" src={blog.cover} />
              <Card.Body className="card_body d-flex flex-column justify-content-between">
                <Card.Title className="text-truncate">{blog.title}</Card.Title>
                <Card.Text className="text-truncate">
                  {blog.content}
                </Card.Text>
                <p>Read time: {blog.readTime}</p>
                <div className="d-flex justify-content-around">
                <Card.Img src={blog.author.cover}/>
                <Card.Text>
                  {blog.author.name}
                </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Blogs;
