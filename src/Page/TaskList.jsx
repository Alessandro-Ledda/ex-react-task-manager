
import { ContextApi } from '../Context/ContextApi';
import { useContext, useState, useMemo } from 'react';

import TasksRow from '../components/TasksRow';

function TaskList() {

    const { tasks } = useContext(ContextApi);

    // creo var di stato per l'ordimanto in base a... con data come riferimento iniziale 
    const [sortBy, setSortBy] = useState('createAt');
    const [sortOrder, setSortOrder] = useState(1);

    // creo var per gestione icona ordine 
    const sortIcon = sortOrder === 1 ? '⇩' : '⇧';

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
    const sortedTask = useMemo(() => {
        return [...tasks].sort((a, b) => {
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
    }, [tasks, sortBy, sortOrder]);

    return (
        <>
            <h1>Lista task</h1>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('title')}>
                            Nome {sortBy === 'title' && sortIcon}</th>
                        <th onClick={() => handleSort('status')}>
                            Stato {sortBy === 'status' && sortIcon}</th>
                        <th onClick={() => handleSort('createAt')}>
                            Data Creazione {sortBy === 'createAt' && sortIcon}</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTask.map((task) => {
                        return <TasksRow key={task.id} task={task} />
                    })}
                </tbody>
            </table>
        </>
    )
}

export default TaskList;