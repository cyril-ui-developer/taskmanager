import { screen, fireEvent, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";

import { renderWithProviders } from "./setupTests";
import AddTaskPage from "./pages/AddTaskPage";

describe("Add Page:", () => {
  const onAddTaskSpy = jest.fn();
  const history = createMemoryHistory();

  it("Check if the Add Page form fields names are defined", async () => {
    renderWithProviders(<AddTaskPage onAddTaskHandler={onAddTaskSpy} />);

    expect(screen.getByTestId("title")).toBeInTheDocument();
    expect(screen.getByTestId("description")).toBeInTheDocument();
    expect(screen.getByTestId("add-button")).toBeInTheDocument();

    // Check if the submit button is disabled
    expect(screen.getByTestId("add-button")).toBeDisabled();
  });

  it("Should render the component onto the screen", async () => {
    renderWithProviders(<AddTaskPage onAddTaskHandler={onAddTaskSpy} />);
    const newTask = {
      id: 3,
      title: "new task",
      description: "new task description",
      completed: true,
      active: false,
    };

    // Enter valid data for title and description
    const inputTitle = screen.getByTestId("title");
    fireEvent.change(inputTitle, { target: { value: newTask.title } });
    const inputDescription = screen.getByTestId("description");
    fireEvent.change(inputDescription, {
      target: { value: newTask.description },
    });

    // Check if the submit button is enable
    const addTaskButton = screen.getByTestId("add-button");
    expect(addTaskButton).toBeEnabled();

    // Submit the add and await, then check if the redirect page url is "/"
    fireEvent.click(addTaskButton);
    expect(onAddTaskSpy).toHaveBeenCalledTimes(1);
    expect(onAddTaskSpy).toHaveBeenCalledWith({
      title: newTask.title,
      description: newTask.description,
    });
    fireEvent.click(screen.getByTestId("add-button"));
    await waitFor(() => {
      expect(history.location.pathname).toBe("/");
    });
  });
});
