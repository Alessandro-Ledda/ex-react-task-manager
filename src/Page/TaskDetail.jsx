import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ContextApi } from "../Context/ContextApi";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";
import { Dayjs } from "dayjs";

function TaskDetail() {

    const { id } = useParams();
    const { tasks, removeTask, updateTask } = useContext(ContextApi);
    const navigate = useNavigate();

    // creo var di stato per gestione show
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // creo var di stato per gestione edit 
    const [showEditModal, setShowEditModal] = useState(false);

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

    const handleUpdate = async (updateData) => {
        try {
            await updateTask(updateData);
            setShowEditModal(false);
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
            <p><strong>Data Creazione</strong>{dayjs(task.createAt).format("DD/MM/YYYY")}</p>
            <button onClick={() => setShowDeleteModal(true)}>Elimina Task</button>

            <button onClick={() => setShowEditModal(true)}>Modifica Task</button>

            {/* Modale di conferma elimazione */}
            <Modal
                title="Conferma elimazione"
                content={<p>Sei sicuro di voler elinare?</p>}
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                confirmText="Elimina"
            />

            {/* modale di modifica Task */}
            <EditTaskModal
                task={task}
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                onSave={handleUpdate}
            />
        </div>
    )
}

export default TaskDetail;
