import { useState, useEffect, useReducer } from 'react';
import tasksReducer from '../reducers/tasksReducer';

const { VITE_API_URL } = import.meta.env;

function useTasks() {

    const [tasks, dispatchTasks] = useReducer(tasksReducer, []);

    useEffect(() => {
        fetch(`${VITE_API_URL}/tasks`)
            .then(res => res.json())
            .then(data => dispatchTasks({ type: 'LOAD_TASKS', payload: data }))
            .catch(error => console.error(error))
            .finally();
    }, []);

    // settaggio funzioni 
    // addTask
    const addTask = async newTask => {

        // controllo per evitare task con titolo identico
        const taskExsist = tasks.some(task => task.title === newTask.title);
        if (taskExsist) {
            throw new Error("task gia esistente, scegli un altro nome ")
        }

        const res = await fetch(`${VITE_API_URL}/tasks`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask)
        });

        const { success, message, task } = await res.json();
        if (!success) throw new Error(message);

        dispatchTasks({ type: 'ADD_TASK', payload: task });
        //     setTasks(prev => [...prev, task]);
        // }
    }
    // removeTask
    const removeTask = async (taskId) => {
        const res = await fetch(`${VITE_API_URL}/tasks/${taskId}`, {
            method: 'DELETE'
        });

        const { success, message } = await res.json();
        if (!success) throw new Error(message);

        dispatchTasks({ type: 'REMOVE_TASK', payload: taskId });
        // setTasks((prev) => prev.filter(task => task.id !== taskId));
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
            dispatchTasks({ type: 'REMOVE_MULTIPLE_TASKS', payload: fulfilledDeletions })
            // setTasks(prev => prev.filter(task => !fulfilledDeletions.includes(task.id)))
        }

        if (rejectedDeletions.length > 0) {
            throw new Error(`errore durante l'eliminazione della task con id:${rejectedDeletions.join(",")}`);
        }
        // array di cancellazione con esito 'reject'
        console.log(results);
    }

    //updateTask
    const updateTask = async (updatedTask) => {

        const taskWithSameTitle = tasks.find(task => task.title === updatedTask.title);
        if (taskWithSameTitle && taskWithSameTitle.id !== updatedTask) {
            throw new Error("task gia esistente, scegli un altro nome ")
        }

        const res = await fetch(`${VITE_API_URL}/tasks/${updatedTask.id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTask)
        });

        const { success, message, task: newTask } = await res.json();
        if (!success) throw new Error(message);

        dispatchTasks({ type: 'UPDATE_TASK', payload: 'newTask' })
        // setTasks(prev => prev.map((oldTask) => oldTask.id === newTask.id ? newTask : oldTask));
    }

    return { tasks, addTask, removeTask, updateTask, removeMultipleTasks }
}

export default useTasks;