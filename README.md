# React To-Do App

A simple, responsive To-Do List application built with **React** and **Material UI**, featuring full CRUD functionality and persistent storage via LocalStorage.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![MUI](https://img.shields.io/badge/MUI-v9-007FFF?logo=mui&logoColor=white)](https://mui.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)](https://vercel.com/)

## Live Demo

[View Live Demo](https://react-todo-app-33dv.vercel.app/)

<!--
  💡 Tip: Add a screenshot or short GIF of the app here.
  Example:
  ![App Screenshot](./screenshot.png)
-->

## Features

* ✅ Add new tasks
* ✏️ Edit existing tasks
* 🗑️ Delete tasks (with confirmation dialog)
* ✔️ Mark tasks as completed
* 🔍 Filter tasks by status (All / Completed / Not Completed)
* 💾 Persist tasks using LocalStorage — tasks remain saved after refreshing the page
* 🔔 Toast notifications for add/edit/delete actions
* 📱 Fully responsive design
* 🌐 RTL (right-to-left) support for Arabic content

## Technologies

* **React** (Hooks: `useReducer`, `useContext`, `useMemo`, `useEffect`)
* **JavaScript (ES6+)**
* **Material UI (MUI)** — components, theming, and icons
* **Context API** — for toast notification state
* **LocalStorage** — for data persistence
* **CSS**

## Installation

Clone the repository:

```bash
git clone https://github.com/Osama-dev20/react-todo-app.git
```

Navigate to the project directory:

```bash
cd react-todo-app
```

Install dependencies:

```bash
npm install
```

Start the project:

```bash
npm start
```

The app will run at `http://localhost:3000`.

## Usage

1. Type a task title in the input field and click **إضافة** (Add) to create a new task.
2. Click the **check** icon to mark a task as completed or not completed.
3. Click the **edit** icon to update a task's title and details.
4. Click the **delete** icon to remove a task (a confirmation dialog will appear).
5. Use the toggle buttons at the top to filter tasks by **All**, **Completed**, or **Not Completed**.

## Project Structure

```
src/
├── components/
│   ├── ToDoList.jsx     # Main list, filters, dialogs, and CRUD handlers
│   ├── ToDo.jsx          # Single task card
│   └── MySnackBar.jsx    # Toast notification component
├── Context/
│   └── ToastContext.js   # Context for toast state
├── Reducers/
│   └── ToDosReducer.js   # Reducer handling add/update/delete/check logic
└── App.js                # App entry point
```

## Roadmap

* [ ] Add unit tests (React Testing Library)
* [ ] Migrate to TypeScript
* [ ] Replace LocalStorage with a real backend (Node.js / Laravel)
* [ ] Add drag-and-drop task reordering

## Author

**Osama Alkhatib**
Computer Science Student

[GitHub](https://github.com/Osama-dev20)

## License

This project is licensed under the [MIT License](LICENSE).