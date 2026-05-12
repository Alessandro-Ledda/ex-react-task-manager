import { memo } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

// memoizzando avverra il render sole se task verra sostituito 
const TasksRow = memo(({ task, checked, onToggle }) => {

    // setto var per gestione colore row in base allo stato
    const classStatus = task.status.replace(" ", "").toLowerCase();


    return (
        <tr>
            <td>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggle(task.id)}
                />
            </td>
            <td><Link to={`/task/${task.id}`}>{task.title}</Link></td>
            <td className={classStatus}>{task.status}</td>
            <td>{dayjs(task.createdAt).format("DD/MM/YYYY")}</td>
        </tr>
    )
});

export default TasksRow;