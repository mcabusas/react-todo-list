import React, { useState } from "react";
import { Row, Button, Col, Modal, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const Header = ({
  urgency,
  setUrgency,
  todos,
  setTodos,
  todoTitleText,
  setTodoTitleText,
  setDescriptionText,
  status,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const todoTitleTextHandler = (e) => {
    setTodoTitleText(e.target.value);
  };

  // const descriptionTextHandler = (e) => {
  //   setDescriptionText(e.target.value);
  // };

  const setUrgencyHandler = (e) => {
    console.log(e.target.value);
    e.preventDefault();
    setUrgency(e.target.value);
  };

  const getLength = () => {
    let length = 0;
    todos.forEach((todo) => {
      if (todo.status === "pending" || todo.status === "in progress") {
        length++;
      }
    });
    return length.toString();
  };

  const submitTodoHander = (e) => {
    e.preventDefault();

    if (urgency !== "" && todoTitleText !== "") {
      setTodos([
        ...todos,
        {
          id: uuidv4(),
          title: todoTitleText,
          urgency: urgency,
          status: status,
        },
      ]);
      setTodoTitleText("");
      setUrgency("");
      handleClose();
    } else {
      alert("Input title and/or urgency of task");
    }
  };
  return (
    <>
      <Row>
        <Col md={6}>
          <h3 style={{ fontWeight: "700" }}>You've got {getLength()} left</h3>
        </Col>
        <Button variant="primary" id="addTaskBtn" onClick={handleShow}>
          <span className="material-icons" id="addIcon">
            add
          </span>
          <p>Add Task</p>
        </Button>

        <Col md={{ offset: 2 }}>
          <p>Aug 18, 2021</p>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Task:</Form.Label>
              <Form.Control type="text" onChange={todoTitleTextHandler} />
            </Form.Group>
            {/* <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description.</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={descriptionTextHandler}
              />
            </Form.Group> */}
            <Row>
              <Col className="mb-3">
                <select onChange={setUrgencyHandler} name="todos">
                  <option value="" disabled selected>
                    Urgency
                  </option>
                  <option value="minor">Minor</option>
                  <option value="normal">Normal</option>
                  <option value="critical">Critical</option>
                </select>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={submitTodoHander}>
            Save Changes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;
