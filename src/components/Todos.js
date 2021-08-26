import React, { useState } from "react";
import { Col, Row, Button, Form, Modal } from "react-bootstrap";

const Todos = ({
  filteredTodo,
  todos,
  setTodos,
  todoTitleText,
  setTodoTitleText,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editTaskTitleBtnHandler = (e) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => {
        if (todo.id === filteredTodo.id) {
          return {
            ...todo,
            title: todoTitleText,
          };
        }
        return todo;
      })
    );
    handleClose();
  };

  const editTodoTitleHander = (e) => {
    setTodoTitleText(e.target.value);
  };

  const editStatus = (e) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => {
        if (todo.id === filteredTodo.id) {
          return {
            ...todo,
            status: e.target.value,
          };
        }
        return todo;
      })
    );
  };

  let radioClassName = "";
  let statusClassName = "";

  if (filteredTodo.status === "pending") {
    statusClassName = "pendingStatus";
  } else if (filteredTodo.status === "in progress") {
    statusClassName = "inProgressStatus";
  }

  if (filteredTodo.urgency === "minor") {
    radioClassName = "minorRadio";
  } else if (filteredTodo.urgency === "normal") {
    radioClassName = "normalRadio";
  } else if (filteredTodo.urgency === "critical") {
    radioClassName = "criticalRadio";
  }

  return (
    <>
      <Row>
        <Col md={6}>
          <p>{filteredTodo.title}</p>
        </Col>
        <Col md={{ offset: 0 }}>
          <div className={statusClassName}>
            <select
              name="todos"
              value={filteredTodo.status}
              onChange={editStatus}
            >
              <option value="pending">Pending</option>
              <option value="in progress">In progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </Col>
        <Col md={{ offset: 0 }}>
          <div className="urgency">
            <div className={radioClassName}></div>
            <p>{filteredTodo.urgency}</p>
          </div>
        </Col>

        <Col md={{ offset: 0 }}>
          <span className="material-icons moreMenuBtn" onClick={handleShow}>
            more_horiz
          </span>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Task:</Form.Label>
              <Form.Control
                type="text"
                defaultValue={filteredTodo.title}
                onChange={editTodoTitleHander}
                onKeyPress={(event) => {
                  if (event.charCode === 13) {
                    editTaskTitleBtnHandler();
                  }
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={editTaskTitleBtnHandler}>
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

export default Todos;
