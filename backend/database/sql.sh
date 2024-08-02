# create the database and table
CREATE database july7;

USE july7;

CREATE TABLE tasks (
    id VARCHAR(100), 
    title VARCHAR(100), 
    description VARCHAR(200), 
    completed BOOLEAN, 
    active BOOLEAN
);

INSERT INTO books (id, title, description, completed, active) 
VALUES ('1', 'Book Title', 'Book Description', true, true);
