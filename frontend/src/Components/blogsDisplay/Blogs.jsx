import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./Blogs.css";
import Comments from "../comments/Comments";

const Blogs = () => {
  const [blogs, setBlogs] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`http://localhost:3030/getBlogs?page=${page}`);
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBlogs();
  }, [page]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <main>
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
                <p>Read time: {blog.readTime} mins</p>
                <div className="d-flex justify-content-around">
                  <Card.Img src={blog.author.cover}/>
                  <Card.Text>
                    {blog.author.name}
                  </Card.Text>
                </div>
                <Comments id ={blog._id}/>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="pagination-buttons d-flex justify-content-between">
        <Button onClick={handlePrevPage} disabled={page === 1}>Previous Page</Button>
        <Button onClick={handleNextPage}>Next Page</Button>
      </div>
    </Container>
    </main>
  );
};

export default Blogs;
