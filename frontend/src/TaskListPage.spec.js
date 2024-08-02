import { screen, within, fireEvent, render } from "@testing-library/react";

import { renderWithProviders } from "./setupTests";
import TaskListPage from "./pages/TaskListPage";

describe("Verify TaskListPaget", () => {
  const mockData = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit",
      description: "Incididunt ut labore et dolore magna aliqua. Ut enim",
      completed: true,
      active: false,
    },
    {
      id: 2,
      title: "Utenim ad minim ven",
      description:
        "Kexercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      completed: false,
      active: false,
    },
  ];

  const getTasks = () => {
    return screen.getAllByTestId("tasks").map((task) => ({
      title: within(task).getByTestId("title").textContent,
      description: within(task).getByTestId("description").textContent,
      completed: within(task).getByTestId("completed"),
      deleteButton: within(task).getByTestId("delete-button"),
    }));
  };

  it("check the TaskListPage contents:", () => {
    render(<TaskListPage tasks={mockData} />);

    expect(getTasks().length).toBe(2);
    expect(getTasks()[0].completed.checked).toBe(true);
    expect(getTasks()[0].title).toContain("Lorem ipsum dolor sit");
    expect(getTasks()[1].description).toContain(
      "Kexercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    );
  });

  it("should trigger a change when clicked:", () => {
    const onToggleTaskSpy = jest.fn();
    render(
      <TaskListPage tasks={mockData} onToggleTaskStatu={onToggleTaskSpy} />
    );
    // to be checked
    expect(getTasks()[1].completed.checked).toBe(false);
    const inputToggleChecked = getTasks()[1].completed;
    fireEvent.change(inputToggleChecked, { target: { checked: true } });
    expect(getTasks()[1].completed.checked).toBe(true);

    // to be unchecked
    expect(getTasks()[0].completed).toBeChecked();
    const inputToggleUnchecked = getTasks()[0].completed;
    fireEvent.change(inputToggleUnchecked, { target: { checked: false } });
    expect(inputToggleUnchecked).not.toBeChecked();
  });

  it("check the delete task:", () => {
    const onDeleteTaskSpy = jest.fn();

    renderWithProviders(
      <TaskListPage tasks={mockData} onDeleteTask={onDeleteTaskSpy} />
    );

    // verify the task to delete is in the list
    expect(
      getTasks().find((task) => task.title === "Utenim ad minim ven")
    ).toBeTruthy();

    // Delete task
    const task = getTasks().find(
      (task) => task.title === "Utenim ad minim ven"
    ).deleteButton;

    fireEvent.click(task);

    expect(onDeleteTaskSpy).toHaveBeenCalledTimes(1);
    expect(onDeleteTaskSpy).toHaveBeenCalledWith(2);
  });
});
