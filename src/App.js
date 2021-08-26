import React, { useState, useEffect } from "react";
import "./css/App.css";
import Header from "./components/Header";
import TodoNotes from "./components/Todos-Notes";
function App() {
  const [urgency, setUrgency] = useState("");
  const [todos, setTodos] = useState([]);
  const [todoTitleText, setTodoTitleText] = useState("");
  const [status, setStatus] = useState("pending");

  const [noteType, setNoteType] = useState("");
  const [noteContent, setNoteContent] = useState("");

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getTodosFromLocalStorage();
    getNotesFromLocalStorage();
  }, []);

  useEffect(() => {
    saveTodosToLocalStorage();
  }, [todos]);

  useEffect(() => {
    saveNotesToLocalStorage();
  }, [notes]);

  const saveTodosToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getTodosFromLocalStorage = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let localTodos = JSON.parse(localStorage.getItem("todos"));
      setTodos(localTodos);
    }
  };

  const saveNotesToLocalStorage = () => {
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  const getNotesFromLocalStorage = () => {
    if (localStorage.getItem("notes") === null) {
      localStorage.setItem("notes", JSON.stringify([]));
    } else {
      let localNotes = JSON.parse(localStorage.getItem("notes"));
      setNotes(localNotes);
    }
  };

  return (
    <div className="mainContainer">
      {/*header component*/}
      <Header
        urgency={urgency}
        setUrgency={setUrgency}
        setTodos={setTodos}
        todos={todos}
        todoTitleText={todoTitleText}
        setTodoTitleText={setTodoTitleText}
        status={status}
      />

      {/*Todo's & notes/reminders row*/}

      <TodoNotes
        todos={todos}
        setTodos={setTodos}
        setTodoTitleText={setTodoTitleText}
        todoTitleText={todoTitleText}
        noteType={noteType}
        setNoteType={setNoteType}
        noteContent={noteContent}
        setNoteContent={setNoteContent}
        notes={notes}
        setNotes={setNotes}
      />
    </div>
  );
}

export default App;
