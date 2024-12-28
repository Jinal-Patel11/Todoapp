import React, { useState, useEffect } from 'react';

export default function Localstorage() {
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [tasks, setTasks] = useState(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks"));
        return storedTasks || [];
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    // Add task
    function addTask() {
        if (taskTitle.trim() && taskDescription.trim()) {
            const newTask = {
                id: Date.now(),
                title: taskTitle,
                description: taskDescription,
                completed: false,
            };
            setTasks([...tasks, newTask]);
            setTaskTitle("");
            setTaskDescription("");
        }
    }

    // Edit task
    function editTask(id) {
        const taskToEdit = tasks.find(task => task.id === id);
        const newTitle = prompt("Edit task title:", taskToEdit.title);
        const newDescription = prompt("Edit task description:", taskToEdit.description);

        if (newTitle && newDescription) {
            const updatedTasks = tasks.map(task =>
                task.id === id
                    ? { ...task, title: newTitle, description: newDescription }
                    : task
            );
            setTasks(updatedTasks);
        }
    }

    // Toggle completion
    function toggleCompletion(id) {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    }

    // Delete task
    function deleteTask(id) {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
    }

    // Clear all tasks
    function clearAllTasks() {
        setTasks([]);
    }

    return (
        <div className="max-w-lg mx-auto p-6 bg-Slate shadow-xl rounded-xl">
            <h1 className="text-4xl font-semibold text-center mb-6 text-gray-800">Todo List</h1>

            <div className="flex flex-col space-y-4 mb-6">
                <input
                    type="text"
                    placeholder="Enter task title"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    className="p-4 w-full  border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
                />
                <input
                    placeholder="Enter task description"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    className="p-4 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
                />
                <button
                    onClick={addTask}
                    className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
                >
                    Add Task
                </button>

                {/* clear all tasks */}
                <button
                    onClick={clearAllTasks}
                    className="mt-6 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 ease-in-out"
                >
                    Clear All Tasks
                </button>
            </div>

            {/* Task List */}
            <ul className="space-y-4">
                {tasks.map((task) => (
                    <li key={task.id} className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition duration-300 ease-in-out">
                        <div className="flex items-center space-x-3">

                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleCompletion(task.id)}
                                className="h-5 w-5 border border-gray-300 rounded-full text-indigo-600 focus:ring-0 transition duration-300 ease-in-out"
                            />
                            <div>
                                <p className={`text-lg ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                                    {task.title}
                                </p>
                                <p className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-600'}`}>
                                    {task.description}
                                </p>
                            </div>
                        </div>

                        {/* Edit and Delete buttons */}
                        <div className="space-x-2">
                            <button
                                onClick={() => editTask(task.id)}
                                className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-100 focus:outline-none rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deleteTask(task.id)}
                                className="px-4 py-2 text-sm text-red-600 hover:bg-red-100 focus:outline-none rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>


        </div>
    );
}
