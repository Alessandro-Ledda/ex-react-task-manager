import { useParams, } from "react-router-dom";
import { useContext } from "react";
import { ContextApi } from "../Context/ContextApi";

function TaskDetail() {

    const { id } = useParams();
    const { tasks } = useContext(ContextApi);

    // devo cercare l'id del task che corrisponde a quello intercettato di usePArams(task cliccata da user)
    const task = tasks.find(task => task.id === parseInt(id));

    // controllo su task non esistente(id di task inesistente)
    if (!task) {
        return (
            <h2>Task non trovata...</h2>
        )
    }

    const handleDelete = () => {
        console.log("task eliminata con id:", task.id);
    }

    return (
        <div>
            <h1>Dettaglio Task</h1>
            <p><strong>Task:</strong>{task.title}</p>
            <p><strong>Descrizione:</strong>{task.description}</p>
            <p><strong>Stato:</strong>{task.status}</p>
            <p><strong>Data Creazione</strong>{new Date(task.createAt).toLocaleDateString()}</p>
            <button onClick={handleDelete}>Elimina Task</button>
        </div>

    )
}

export default TaskDetail;
