import React, { useState} from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import TaskListPage from "./pages/TaskListPage";
import AddTaskPage from "./pages/AddTaskPage";
import Nav from "./components/Nav";

import {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskCompletedMutation,
  useDeleteTaskMutation,
} from "./redux/apiTaskSlice";

function App() {
  const [tasks, setTasks] = useState([]);
  const {
    data: tasksData,
    // isLoading,
    // isSuccess,
    //isError,
    // error,
  } =  useGetTasksQuery();

  const [addTask] =  useAddTaskMutation();
  const [updateTask] =   useUpdateTaskCompletedMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const onAddTaskHandler = (formValues) => {
    const newTask = {
      ...formValues,
      id: tasks.length + 1,
      completed: false,
      active: false,
    };
    setTasks([...tasks, newTask]);
    addTask({ title: formValues.title, description: formValues.description });
  };

  const delTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    deleteTask(taskId);
  };

  const toggleTaskStatus = (taskId) => {
    const updatedTasks = tasksData.map((task) => {
      if (taskId === task.id) {
        updateTask({ id: taskId, completed: !task.completed });
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <main className="flex items-center justify-center w-screen h-screen font-medium">
      <div className="flex flex-grow items-center justify-center h-full text-gray-600 bg-gray-100">
        <div className="max-w-full p-4 bg-white rounded-lg shadow-lg w-96">
          <section>
            <header className="flex items-center justify-between mb-6">
              <div className="flex items-center mr-4 mb-2">
                <input
                  type="checkbox"
                  checked={true}
                  readOnly
                  id="A3-yes"
                  name="A3-confirmation"
                  value="yes"
                  className="opacity-0 absolute h-8 w-8"
                />
                <div className="bg-white border-2 rounded-md border-blue-400 w-8 h-8 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
                  <svg
                    className="fill-current hidden w-3 h-3 text-blue-600 pointer-events-none"
                    version="1.1"
                    viewBox="0 0 17 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fillRule="evenodd">
                      <g
                        transform="translate(-9 -11)"
                        fill="#1F73F1"
                        fillRule="nonzero"
                      >
                        <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
                      </g>
                    </g>
                  </svg>
                </div>
                <h4 className="font-semibold ml-1 text-lg">TaskManager</h4>
              </div>
              <Nav />
            </header>

            <Routes>
              <Route
                path="/"
                element={
                  <TaskListPage
                    tasks={tasksData}
                    onDeleteTask={delTask}
                    onToggleTaskStatus={toggleTaskStatus}
                  />
                }
              />
              <Route
                path="/add"
                element={<AddTaskPage onAddTaskHandler={onAddTaskHandler} />}
              />
            </Routes>
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;
