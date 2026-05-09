import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ContextApi } from "../Context/ContextApi";
import Modal from "../components/Modal";

function TaskDetail() {

    const { id } = useParams();
    const { tasks, removeTask } = useContext(ContextApi);
    const navigate = useNavigate();

    // creo var di stato per gestione show
    const [showModal, setShowModal] = useState(false);

    // devo cercare l'id del task che corrisponde a quello intercettato di usePArams(task cliccata da user)
    const task = tasks.find(task => task.id === parseInt(id));

    // controllo su task non esistente(id di task inesistente)
    if (!task) {
        return (
            <h2>Task non trovata...</h2>
        )
    }

    const handleDelete = async () => {
        console.log("task eliminata con id:", task.id);
        try {
            await removeTask(task.id);
            alert("task eliminata con successo");
            navigate("/");
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    return (
        <div>
            <h1>Dettaglio Task</h1>
            <p><strong>Task:</strong>{task.title}</p>
            <p><strong>Descrizione:</strong>{task.description}</p>
            <p><strong>Stato:</strong>{task.status}</p>
            <p><strong>Data Creazione</strong>{new Date(task.createAt).toLocaleDateString()}</p>
            <button onClick={() => setShowModal(true)}>Elimina Task</button>
            {/* Modale di conferma elimazione */}
            <Modal
                title="Conferma elimazione"
                content={<p>Sei sicuro di voler elinare?</p>}
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDelete}
                confirmText="Elimina"
            />
        </div>

    )
}

export default TaskDetail;
