# Goal

To build an group based todo app, which allows users to post todos to groups that they possibly share with other users.

# Server

Node/Express server with MongoDB, written in TypeScript.

# Client

React/TypeScript Vite -build. React Query for server state management.

# Changes

- Added onBlur closeInput on the createTask
- Added complete task by clicking the task title. And when completed, shows a x to delete the task.
- Hiding the show -button from the modal until it's functional.
- Added remove group functionality in the Groups Modal
- Changed "completed" -> "done" in the taskModel
- Added functions to taskController
- Changed the general ConfirmationModal to the general modal css class.