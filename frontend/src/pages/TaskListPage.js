import React, { useState } from "react";
import Task from "../components/Task";
import { sortTasksByDueDateTime } from "../utils";

const countCompletedTasks = (tasks) => {
  return tasks?.filter((task) => task.completed).length;
};
const TaskListPage = ({ tasks, onDeleteTask, onToggleTaskStatus }) => {
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' for ascending, 'desc' for descending
  const sortedTasks = sortTasksByDueDateTime(tasks, sortOrder);
  const tasksLen = sortedTasks.length;
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };
  const tasksNoun = tasksLen !== 1 ? "tasks" : "task";  const completedTasks = countCompletedTasks(sortedTasks);
  const taskCount = `${completedTasks}/${tasksLen} ${tasksNoun}`;


  return (
    <>
      <div className="flex justify-between items-center ">
        <h2 className="text-l font-bold">List Tasks</h2>
        {tasksLen > 0 && <h3>Ratio: {taskCount}</h3>}
      </div>

      <article className="space-x-2 p-2 max-w-full">
        {tasksLen > 0 ? <ul>
          <li className="heading p-3 mb-2 flex justify-between font-bold bg-gray-200">
            <span>
              Time{" "}
              <button onClick={toggleSortOrder}>
                {sortOrder === "asc" ? <>▲</> : <>▼</>}
              </button>
            </span>
            <span>Title</span>
            <span className="mr-6">Priority</span>
          </li>
          {sortedTasks?.map((task) => (
            <li className="p-3flex justify-between" key={task.id} data-testid="tasks">
              <Task
                task={task}
                onDeleteTask={onDeleteTask}
                onToggleTaskStatus={onToggleTaskStatus}
              />
            </li>
          ))}
        </ul> : <div className="solid text-center">No tasks found</div>}
      </article>
    </>
  );
};

export default TaskListPage;
