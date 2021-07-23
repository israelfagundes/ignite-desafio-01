import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";
import { useEffect } from "react";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask() {
    if (newTaskTitle === "") return;

    setTasks((prev): Task[] => [
      ...prev,
      {
        id: Number(Date.now().toFixed()),
        title: newTaskTitle,
        isComplete: false,
      },
    ]);

    setNewTaskTitle("");
  }

  function handleToggleTaskCompletion(id: number) {
    let newTasksArray = tasks.map((task) => {
      if (task.id !== id) return task;

      return {
        ...task,
        isComplete: task.isComplete ? false : true,
      };
    });

    setTasks(newTasksArray);
  }

  function handleRemoveTask(id: number) {
    const newTasksArray = tasks.filter((task) => task.id !== id);

    setTasks(newTasksArray);
  }

  useEffect(() => {
    const onPressEnter = (event: KeyboardEvent) => {
      if (event.key === "Enter") handleCreateNewTask();
    };

    document.addEventListener("keypress", onPressEnter);

    return () => document.removeEventListener("keypress", onPressEnter);
  }, [newTaskTitle]);

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
