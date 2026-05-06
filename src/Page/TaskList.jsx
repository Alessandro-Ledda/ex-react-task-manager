
import { ContextApi } from '../Context/ContextApi';
import { useContext } from 'react';

import TasksRow from '../components/TasksRow';

function TaskList() {

    const { tasks } = useContext(ContextApi);

    return (
        <>
            <h1>Lista task</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Stato</th>
                        <th>Data Creazione</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => {
                        return <TasksRow key={task.id} task={task} />
                    })}
                </tbody>
            </table>
        </>
    )
}

export default TaskList;