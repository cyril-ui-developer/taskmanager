import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { addTask } from "../redux/taskSlice";

const AddTaskPage = ({ onAddTaskHandler }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ title: "", description: "" });

  const handleOnInputChange = (event) => {
    event.preventDefault();
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const addTaskHandler = (event) => {
    event.preventDefault();

    // Default task description since the field is optional
  //  const defaultDescription = formValues.description ?? { description : formValues.title}

    onAddTaskHandler(formValues);
    dispatch(addTask({
      formValues
    }));
    setFormValues({ title: "", description: "" });
    navigate("/");
  };

  return (
    <>
    <p>Title</p>
    <form className="form" onSubmit={addTaskHandler}>
       <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
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
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
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
      <button
         data-testid="add-button"
       disabled={formValues.title === ''}
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
