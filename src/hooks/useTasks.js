import { useState, useEffect } from 'react';

const { VITE_API_URL } = import.meta.env;

function useTasks() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch(`${VITE_API_URL}/tasks`)
            .then(res => res.json())
            .then(data => setTasks(data))
            .catch(error => console.error(error))
            .finally();
    }, []);

    // settaggio funzioni 
    // addTask
    const addTask = async newTask => {
        const res = await fetch(`${VITE_API_URL}/tasks`, {
            method: 'POST',
            headers: { "content-Type": "application/json" },
            body: JSON.stringify(newTask)
        });

        const { success, message, task } = await res.json();
        if (!success) throw new Error(message);

        setTasks(prev => [...prev, task]);
    }

    // removeTask
    const removeTask = async (taskId) => {
        const res = await fetch(`${VITE_API_URL}/tasks/${taskId}`, {
            method: 'DELETE'
        });

        const { success, message } = await res.json();
        if (!success) throw new Error(message);

        setTasks((prev) => prev.filter(task => task !== taskId));
    }

    //updateTask
    const updateTask = (taskId) => { }

    return { tasks, addTask, removeTask, updateTask }
};

export default useTasks;