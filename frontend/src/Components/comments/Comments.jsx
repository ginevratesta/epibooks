import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Comments.css";

const Comments = ({ id }) => {
  const [show, setShow] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3030/getComments/${id}/comments`);
      setComments(res.data);
    } catch (error) {
      setError("No comments available for this article yet.");
      console.error("No comments available for this article yet:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (show) {
      fetchComments();
    }
  }, [id, show]);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Comments
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <p>Loading comments...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            comments.map((comment, index) => (
              <div key={index} className="d-flex gap-2">
                <p className="user">{comment.user}:</p>
                <p>{comment.comment}</p>
              </div>
            ))
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Comments;
