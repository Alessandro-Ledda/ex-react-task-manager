import { memo } from "react";

// memoizzando avverra il render sole se task verra sostituito 
const TasksRow = memo(({ task }) => {

    // setto var per gestione colore row in base allo stato
    const classStatus = task.status.replace(" ", "").toLowerCase();


    return (
        <tr>
            <td>{task.title}</td>
            <td className={classStatus}>{task.status}</td>
            <td>{new Date(task.createdAt).toLocaleDateString()}</td>
        </tr>
    )
});

export default TasksRow;