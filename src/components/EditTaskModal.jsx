import { useState, useRef } from "react";
import Modal from "./Modal";

function EditTaskModal({ show, onClose, task, onSave }) {

    // creo var di stato per gestione modifica task
    const [editedTask, setEditedTask] = useState(task);

    // creiamo ref per il form
    const editFormRef = useRef();

    const changeEditedTask = (key, event) => {
        setEditedTask(prev => ({ ...prev, [key]: event.target.value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave(editedTask);
    }

    // destrutturo l'oggetto
    const { title, description, status } = editedTask;

    return (
        <Modal
            title="Modifica Task"
            content={
                <form ref={editFormRef} onSubmit={handleSubmit}>
                    <label>
                        nomeTask:
                        <input
                            type="text"
                            value={title}
                            onChange={(event) => changeEditedTask('title', event)}
                        />
                    </label>
                    <label>
                        Descrizione :
                        <textarea
                            value={description}
                            onChange={(event) => changeEditedTask('description', event)}
                        ></textarea>
                    </label>
                    <label>
                        Status :
                        <select
                            value={status}
                            onChange={(event) => changeEditedTask('status', event)}
                        >
                            {["To do", "Doing", "Done"].map((value, index) => (
                                <option key={index} value={value}>{value}</option>
                            ))}
                        </select>
                    </label>
                </form>
            }
            confirmText="Salva"
            show={show}
            onClose={onClose}
            onConfirm={() => editFormRef.current.requestSubmit()}
        />
    )

}

export default EditTaskModal;