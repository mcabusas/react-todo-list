import React, { useState } from "react";
import { Col, Row, Form, Modal, Button } from "react-bootstrap";

const NotesReminders = ({
  note,
  notes,
  setNotes,
  noteContent,
  setNoteContent,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let classType = "";

  const deleteNote = () => {
    setNotes(notes.filter((el) => el.id !== note.id));
  };

  const noteContentHander = (e) => {
    setNoteContent(e.target.value);
  };

  const editNoteHandler = () => {
    if (noteContent !== "") {
      setNotes(
        notes.map((el) => {
          if (el.id === note.id) {
            return {
              ...el,
              content: noteContent,
            };
          }
          return el;
        })
      );
      handleClose();
    } else {
      alert("please insert content before submitting");
    }
  };

  if (note.type === "reminder") {
    classType = "reminders";
  } else if (note.type === "note") {
    classType = "notes";
  }
  return (
    <>
      <Col md={11}>
        <div className={classType}>
          <Row>
            <Col md={10}>
              <div className="reminderNoteTitle">
                <h6>{note.type}</h6>
              </div>
            </Col>
            <Col md={{ offset: 0 }}>
              <Row>
                <span className="material-icons deleteBtn" onClick={deleteNote}>
                  delete_outline
                </span>

                <span className="material-icons deleteBtn" onClick={handleShow}>
                  mode_edit
                </span>
              </Row>
            </Col>
          </Row>
          <p>{note.content}</p>
        </div>
        <hr />
      </Col>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note/Reminder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Content.</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={noteContentHander}
                defaultValue={note.content}
                onKeyPress={(event) => {
                  if (event.charCode === 13) {
                    editNoteHandler();
                  }
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={editNoteHandler}>
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

export default NotesReminders;
