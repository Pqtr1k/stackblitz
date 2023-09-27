import { FC, useState } from 'react';

import './style.css';

export const App: FC<{ name: string }> = ({ name }) => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');
  const [task, setTask] = useState('');
  const [open, setOpen] = useState(false);
  const [changeTask, setChangeTask] = useState();
  const [id, setID] = useState(null);

  const handleNewTask = () => {
    const isTask = todos.find((t) => t == task);

    if (!isTask) {
      const newTask = {
        value: task,
        id: new Date().getTime(),
        change: false,
      };

      setTodos((prev) => [...prev, newTask]);
      setTask('');
    }
  };

  const handleDelete = (id) => {
    const newArry = todos.filter((t) => t.id !== id);
    setTodos(newArry);
  };

  const handleChangeTask = () => {
    const replaceTask = todos.find((t) => t.id == id);
    replaceTask.value = changeTask;
    const newArray = todos.find((t) => t.id == id);
    setChangeTask('');
    setOpen(false);
  };

  return (
    <div className="App">
      <fieldset className="first_frame">
        <h1>To Do List</h1>
        <input value={task} onChange={(event) => setTask(event.target.value)} />
        <button onClick={handleNewTask} className="addnewtask">
          Add New Task
        </button>
      </fieldset>
      <fieldset className="second_frame">
        {open && (
          <div>
            <h1>Zmiana tekstu</h1>
            <input
              value={changeTask}
              onChange={(event) => setChangeTask(event.target.value)}
            />
            <button onClick={handleChangeTask} className="addnewtask">
              Zapisz
            </button>
          </div>
        )}

        <div className="flex-col">
          {todos.map((task) => (
            <div className="card" key={task.id}>
              <p>{task.value}</p>
              <div className="actions">
                <p onClick={() => handleDelete(task.id)} className="x">
                  ✘
                </p>
                <p
                  onClick={() => {
                    setOpen(true);
                    setChangeTask(task.value);
                    setID(task.id);
                  }}
                  className="change"
                >
                  ✎
                </p>
                <p className="checkmark">
                  <input type="checkbox" />
                </p>
              </div>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
};
