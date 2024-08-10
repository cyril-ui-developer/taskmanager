import Task from '../components/Task'

const TaskListPage = ({ tasks, onDeleteTask, onToggleTaskStatus}) => {
const tasksNoun = tasks?.length !== 1 ? "tasks" : "task";
const taskCount = `${tasks?.length} ${tasksNoun}`;

  return(
  <>
<div className='flex justify-between items-center '>
  <h2 className="text-l font-bold">List Tasks</h2>
  <h3>Count: {taskCount}</h3>
</div>

 <article className="space-x-3 p-3 max-w-full">
      <ul>
      <li className="heading p-4 mb-2 flex justify-between font-bold bg-gray-200">

  <span>Date</span>
  <span>Title</span>
  <span>Actions</span>
</li>
        {tasks?.map(task => (
          <li className="solid" key={task.id} data-testid="tasks" >
            <Task task={task} onDeleteTask={onDeleteTask} onToggleTaskStatus={onToggleTaskStatus}/>
          </li>
        ))}
    </ul>
    </article>
  </>

  )}

  export default TaskListPage