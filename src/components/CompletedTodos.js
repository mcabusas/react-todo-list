import React from "react";
import { Row, Col } from "react-bootstrap";

const CompletedTodos = ({ filteredTodo, todos, setTodos }) => {
  let statusClassName = "";

  if (filteredTodo.status === "completed") {
    statusClassName = "completeStatus";
  } else if (filteredTodo.status === "cancelled") {
    statusClassName = "cancelledStatus";
  }

  const deleteTodo = () => {
    setTodos(todos.filter((el) => el.id !== filteredTodo.id));
  };

  return (
    <Row>
      <Col md={6}>
        <p>{filteredTodo.title}</p>
      </Col>
      <Col md={{ offset: 0 }}>
        <div className={statusClassName}>{filteredTodo.status}</div>
      </Col>

      <Col md={{ offset: 2 }}>
        <span className="material-icons deleteBtn" onClick={deleteTodo}>
          delete_outline
        </span>
      </Col>
    </Row>
  );
};

export default CompletedTodos;
