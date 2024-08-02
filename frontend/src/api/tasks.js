import api from './api';

const URLS = {
    tasksUrl: '/tasks',
  };
  
  export const getTasks = () => {
    return api.get(URLS.tasksUrl);
  };

  
export const addTask = (
  title,
  description
) => {
  console.log("titletest", title);
  return api.post(
    URLS.tasksUrl,
    {
      title,
      description
    }
  );
};