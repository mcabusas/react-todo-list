import React, { useState } from "react";
import { Col, Row, Button, Form, Modal } from "react-bootstrap";
import NotesReminders from "./NotesReminders";
import Todos from "./Todos";
import { v4 as uuidv4 } from "uuid";
import CompletedTodos from "./CompletedTodos";

const TodoNotes = ({
  todos,
  noteContent,
  setNoteContent,
  noteType,
  setNoteType,
  notes,
  setNotes,
  setTodoTitleText,
  todoTitleText,
  setTodos,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setNoteTypeHander = (e) => {
    e.preventDefault();
    setNoteType(e.target.value);
  };
  const setNoteContentHandler = (e) => {
    setNoteContent(e.target.value);
  };

  const submitNoteHandler = (e) => {
    if (noteContent !== "" && noteType !== "") {
      setNotes([
        ...notes,
        {
          type: noteType,
          content: noteContent,
          id: uuidv4(),
        },
      ]);
      setNoteType("");
      setNoteContent("");
      handleClose();
    } else {
      alert(
        "Please insert note/reminder content and select if its a note or reminder."
      );
    }
  };
  return (
    <>
      <Row>
        <Col md={8}>
          <div>
            <div className="subHeaders">
              <h6>On Hold</h6>
            </div>

            <div id="pendingDiv">
              {todos
                .filter(
                  (todo) =>
                    todo.status === "pending" || todo.status === "in progress"
                )
                .map((filteredTodo) => (
                  <Todos
                    filteredTodo={filteredTodo}
                    key={filteredTodo.id}
                    todoTitleText={todoTitleText}
                    setTodoTitleText={setTodoTitleText}
                    todos={todos}
                    setTodos={setTodos}
                  />
                ))}
            </div>
          </div>
          <div>
            <div className="subHeaders">
              <h6>Completed/Cancelled</h6>
            </div>
            <div id="completedDiv">
              {todos
                .filter(
                  (todo) =>
                    todo.status === "completed" || todo.status === "cancelled"
                )
                .map((filteredTodo) => (
                  <CompletedTodos
                    filteredTodo={filteredTodo}
                    key={filteredTodo.id}
                    todos={todos}
                    setTodos={setTodos}
                  />
                ))}
            </div>
          </div>
        </Col>
        <Col md={4}>
          <Row>
            <Col md={7}>
              <div className="notesTitle">
                <h5>Notes and Reminders</h5>
              </div>
            </Col>
            <Col md={{ offset: 1 }}>
              <Button
                variant="primary"
                id="addNoteBtn"
                size="sm"
                onClick={handleShow}
              >
                <span
                  className="material-icons"
                  id="addIcon"
                  style={{ fontSize: "20px" }}
                >
                  add
                </span>
              </Button>
            </Col>
          </Row>

          <div id="notesAndReminder">
            {notes.map((note) => (
              <NotesReminders
                note={note}
                key={note.id}
                notes={notes}
                setNotes={setNotes}
                noteContent={noteContent}
                setNoteContent={setNoteContent}
              />
            ))}
          </div>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note/Reminder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col className="mb-3">
                <select onChange={setNoteTypeHander} name="todos">
                  <option value="" disabled selected>
                    Type
                  </option>
                  <option value="note">Note</option>
                  <option value="reminder">Reminder</option>
                </select>
              </Col>
            </Row>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description.</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={setNoteContentHandler}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={submitNoteHandler}>
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

export default TodoNotes;
