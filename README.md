# Task-Manager
a simple Rest API to manage tasks, including creating, reading, updating, and deleting task.

Requirements:
Task Model:
ID: Unique
 identifier for the task.
Title: Title of the task.
Description: Detailed description of the task.
Status: Status of the task (e.g., "Pending", "In Progress", "Completed").
Created At Timestamp when the task was created.
Updated At Timestamp when the task was last updated.
Endpoints:
GET /tasks: Retrieve all tasks.
GET /tasks/
: Retrieve a specific task by ID.
POST /tasks: Create a new task.
PUT /tasks/
: Update an existing task by ID.
DELETE /tasks/
: Delete a task by ID.
Validation:
Ensure that required fields are present when creating or updating a task.
Validate the status field to accept only predefined values ("Pending", "In Progress", "Completed").
Error Handling:
Return appropriate error messages and status codes for invalid requests.
Database:
Use MSSQL or MySQL to store tasks.
Simple UI:
Simple UI to Add, Show, Update, and Delete tasks.

