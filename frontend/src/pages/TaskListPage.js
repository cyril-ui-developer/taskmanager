import Task from '../components/Task'

const TaskListPage = ({ tasks, onDeleteTask, onToggleTaskStatus}) => {
  const tasksNoun = tasks.length !== 1 ? "tasks" : "task";
const taskCount = `${tasks.length} ${tasksNoun} remaining`;

  return(
  <>
      <h3>Total count: {taskCount }</h3>
      <article className="flex items-start space-x-6 p-6">
      <ul>
        {tasks.map(task => (
          <li className="solid" key={task.id} data-testid="tasks" >
            <Task task={task} onDeleteTask={onDeleteTask} onToggleTaskStatus={onToggleTaskStatus}/>
          </li>
        ))}
    </ul>
    </article>
  </>

  )}

  export default TaskListPage