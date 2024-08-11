import React, { useState } from "react";
import { useNavigate } from "react-router";

import { getCurrentDateTime } from "../utils";

const AddTaskPage = ({ onAddTaskHandler }) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    dueDateTime: getCurrentDateTime(),
    priority: "low",
  });

  const handleOnInputChange = (event) => {
    event.preventDefault();
    console.log(event.target.value, formValues);
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const addTaskHandler = (event) => {
    event.preventDefault();
    onAddTaskHandler(formValues);
    setFormValues({ title: "", description: "" });
    navigate("/");
  };

  return (
    <>
      <h2 className="text-l font-bold pb-5">Add Task</h2>
      <form className="form" onSubmit={addTaskHandler}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Title
          </label>
          <input
            data-testid="title"
            className="hover:border-blue-500 hover:border-solid hover:bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="title"
            value={formValues.title}
            id="title"
            placeholder="Enter title"
            onChange={handleOnInputChange}
            maxLength="20"
          />
        </div>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Description
        </label>
        <textarea
          data-testid="description"
          className="hover:border-blue-500 hover:border-solid hover:bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="description"
          value={formValues.description}
          id="description"
          rows="3"
          placeholder="Enter description (Optional)"
          onChange={handleOnInputChange}
          maxLength="100"
        ></textarea>
        <div className="mt-2 mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="dueDate"
          >
            Due Time
          </label>
          <input
            data-testid="due-date-time"
            className="hover:border-blue-500 hover:border-solid hover:bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="time"
            name="dueDateTime"
            value={formValues.dueDateTime}
            id="dueDateTime"
            onChange={handleOnInputChange}
          />
        </div>
        <div className="mt-2 mb-2">
          <label>Priority</label>
          <div>
            <label>
              <input
                type="radio"
                name="priority"
                value="low"
                checked={formValues.priority === "low"}
                onChange={handleOnInputChange}
              />
              Low
            </label>
            <label>
              <input
                type="radio"
                name="priority"
                value="medium"
                checked={formValues.priority === "medium"}
                onChange={handleOnInputChange}
              />
              Medium
              </label>
            <label>
              <input
                type="radio"
                name="priority"
                value="high"
                checked={formValues.priority === "high"}
                onChange={handleOnInputChange}
              />
              High
            </label>
          </div>
        </div>
        <button
          data-testid="add-button"
          disabled={formValues.title === ""}
          className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 my-2 pr-3 py-2 shadow-sm"
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default AddTaskPage;
