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
    const addTask = (newTask) => { }

    // removeTask
    const removeTask = (taskId) => { }

    //updateTask
    const updateTask = (taskId) => { }

    return { tasks, addTask, removeTask, updateTask }
};

export default useTasks;