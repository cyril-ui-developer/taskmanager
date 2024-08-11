export const toSentenceCase = str => str.slice(0, 1).toUpperCase() + str.slice(1);

export const formatToDateString = (hireDate) =>
    new Date(hireDate).toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

export const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
};

export const convertToISOFormat = (dateTime) => {
    const now = new Date();
    const [hours, minutes] = dateTime.split(':');
    now.setHours(hours);
    now.setMinutes(minutes);
    now.setSeconds(0);
    now.setMilliseconds(0);
    return now.toISOString();
};
export const sortTasksByDueDateTime = (tasks, sortOrder) => {
    const sortedTasks = tasks ? [...tasks].sort((a, b) => {
        const dateA = new Date(a.dueDateTime);
        const dateB = new Date(b.dueDateTime);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      }) : [];  
    
      return sortedTasks;
    };
  