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
            headers: { "Content-Type": "application/json" },
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

        setTasks((prev) => prev.filter(task => task.id !== taskId));
    }

    // rimozione multipla di task
    const removeMultipleTasks = async taskIds => {
        const deleteRequest = taskIds.map(taskId =>
            fetch(`${VITE_API_URL}/tasks/${taskId}`, { method: 'DELETE' })
                .then(res => res.json())
        );

        const results = await Promise.allSettled(deleteRequest);

        // array di cancellazione avvenuta con successo
        const fulfilledDeletions = [];
        const rejectedDeletions = [];

        results.forEach((result, index) => {
            const taskId = taskIds[index];
            if (result.status === 'fulfilled' && result.value.success) {
                fulfilledDeletions.push(taskId);
            } else {
                rejectedDeletions.push(taskId);
            }
        });

        if (fulfilledDeletions.length > 0) {
            setTasks(prev => prev.filter(task => !fulfilledDeletions.includes(task.id)))
        }

        if (rejectedDeletions.length > 0) {
            throw new Error(`errore durante l'eliminazione della task con id:${rejectedDeletions.join(",")}`);
        }
        // array di cancellazione con esito 'reject'
        console.log(results);
    }

    //updateTask
    const updateTask = async (updateTask) => {
        const res = await fetch(`${VITE_API_URL}/tasks/${updateTask.id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateTask)
        });

        const { success, message, task: newTask } = await res.json();
        if (!success) throw new Error(message);

        setTasks(prev => prev.map((oldTask) => oldTask.id === newTask.id ? newTask : oldTask));
    }

    return { tasks, addTask, removeTask, updateTask, removeMultipleTasks }
};

export default useTasks;