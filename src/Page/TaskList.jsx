
import { ContextApi } from '../Context/ContextApi';
import { useContext, useState, useMemo, useCallback } from 'react';

import TasksRow from '../components/TasksRow';

// funzione di debounce
function debounce(callback, delay) {

    let timer;
    return (value) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(value);
        }, delay)

    }
}

function TaskList() {

    const { tasks, removeMultipleTasks } = useContext(ContextApi);
    // console.log("DEBUG TASKS:", tasks, "TYPE:", typeof tasks, "IS_ARRAY:", Array.isArray(tasks));


    // creo var di stato per l'ordimanto in base a... con data come riferimento iniziale 
    const [sortBy, setSortBy] = useState('createAt');
    const [sortOrder, setSortOrder] = useState(1);

    // creo var di stato per gestione ricerca task input 
    const [searchTask, setSearchTask] = useState('');

    // var per debounce
    const debounceSearch = useCallback(debounce(setSearchTask, 500), []);

    // creo var per gestione icona ordine 
    const sortIcon = sortOrder === 1 ? '⇩' : '⇧';

    // var do stato per gestione check task selezionato
    const [selectedTaskIds, setSelectedTaskIds] = useState([]);

    const toggleSelection = taskId => {
        if (selectedTaskIds.includes(taskId)) {
            setSelectedTaskIds(prev => prev.filter(id => id !== taskId));
        } else {
            setSelectedTaskIds(prev => [...prev, taskId]);
        }
    }

    // creo funzione per deletemultipli
    const handleDelete = async () => {
        try {
            await removeMultipleTasks(selectedTaskIds);
            alert("task eliminata con successo");
            // ripuliamo stato
            setSelectedTaskIds([]);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }

    }

    // creao funzione che verifica a quale campo corrisponde dopo il onClick
    const handleSort = (field) => {
        if (sortBy === field) {
            // se corrisponde invertiamo l'ordine
            setSortOrder(prev => prev * -1);
        } else {
            setSortBy(field);
            setSortOrder(1);
        }
    }

    // gestione render 
    const filteredAndsortedTask = useMemo(() => {
        return [...tasks].filter((task) => task.title.toLowerCase().includes(searchTask.toLowerCase()))
            .sort((a, b) => {

                let comparison;

                // ordine crescente
                if (sortBy === 'title') {
                    comparison = a.title.localeCompare(b.title)
                } else if (sortBy === 'status') {
                    const statusOptions = ["To do", "Doing", "Done"];
                    comparison = statusOptions.indexOf(a.status) - statusOptions.indexOf(b.status);
                } else if (sortBy === 'createAt') {
                    const dataA = new Date(a.createAt).getTime();
                    const dataB = new Date(b.createAt).getTime();

                    comparison = dataA - dataB;

                }

                return comparison * sortOrder
            })
    }, [tasks, sortBy, sortOrder, searchTask]);

    return (
        <>
            <h1>Lista task</h1>
            {/* input per ricerca task */}
            <input
                type="text"
                placeholder='Cerca Task'
                // value={searchTask}
                onChange={(e) => debounceSearch(e.target.value)}
            />

            {/* stampo risultati checcati */}
            {/* <p>{selectedTaskIds.join(",")}</p> */}

            {/* creo bottone, visibile se viene checcato almeno una task */}
            {selectedTaskIds.length > 0 && (
                <button onClick={handleDelete}
                >
                    Elemina task selezionati</button>
            )}

            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th onClick={() => handleSort('title')}>
                            Nome {sortBy === 'title' && sortIcon}</th>
                        <th onClick={() => handleSort('status')}>
                            Stato {sortBy === 'status' && sortIcon}</th>
                        <th onClick={() => handleSort('createAt')}>
                            Data Creazione {sortBy === 'createAt' && sortIcon}</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAndsortedTask.map((task) => {
                        return <TasksRow
                            key={task.id}
                            task={task}
                            checked={selectedTaskIds.includes(task.id)}
                            onToggle={toggleSelection}
                        />
                    })}
                </tbody>
            </table>
        </>
    )
}

export default TaskList;