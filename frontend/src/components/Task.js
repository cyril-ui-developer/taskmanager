import Accordion from "./Accordion";
import { toSentenceCase, formatToDateString } from "../utils";

const title = ({ task }) => (
  <span
    data-testid="title"
    className={`${
      task.completed ? "ml-4 text-sm  line-through" : "ml-4 text-sm "
    }`}
  >
    {toSentenceCase(task.title)}
  </span>
);
const Task = ({ task, onDeleteTask, onToggleTaskStatus }) => (
  <Accordion
    key={task.id}
    title={title({ task })}
    id={task.id}
    active={task.active}
    createdAt={formatToDateString(task.createdAt)}
  >
    <div className="flex">
      <div className="w-10/12">
        <label
          className="inline-flex items-between text-justify h-10 px-2 rounded cursor-pointer hover:bg-gray-100"
          htmlFor={task.id}
        >
          <span className="flex items-center space-x-3">
          <input
            data-testid="completed"
            type="checkbox"
            id={task.id}
            value={task.completed}
            name="completed"
            checked={task.completed}
            onChange={() => onToggleTaskStatus(task.id)}
            className="w-4 h-4 text-center align-middle accent-blue-600"
          />
</span>
          <span
            data-testid="description"
            className={`${
              task.completed ? "ml-4 text-sm text-justify line-through" : "ml-4 text-sm text-justify"
            }`}
          >
            {toSentenceCase(task.description) || toSentenceCase(task.title)}
          </span>
        </label>
      </div>
      <div className="w-2/12">
        <span className="my-2 grid justify-items-end">
          <button
            data-testid="delete-button"
            className="hover:bg-red-400 group  rounded-md bg-red-500 text-white text-sm font-medium p-1 shadow-sm"
            type="button"
            onClick={() => onDeleteTask(task.id)}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                width="6"
                height="6"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </span>
          </button>
        </span>
      </div>
    </div>
  </Accordion>
);
export default Task;
