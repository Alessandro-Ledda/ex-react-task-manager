import { useRef, useState, useMemo } from 'react';

const symbols = '!"£$%&/()=?^?\'[]{}@#*+-_.:,;<|>\\|~°§';

function AddTask() {

    //setto var di stato per giostione nome form (controllato) 
    const [taskTitle, setTaskTitle] = useState("");

    // setto var di non controllati per il form
    const descriptionRef = useRef();
    const statusRef = useRef();

    // controllo sul nome task(restrizioni)
    const taskTitleError = useMemo(() => {
        // se valido
        if (!taskTitle.trim())
            return "il nome del task non può essere vuoto"

        // controllo se sono presenti simboli per ogni carattere(se almeno uno è presente error)
        if ([...taskTitle].some(char => symbols.includes(char)))
            return " non puoi utilizzare caratteri speciali"

        return "";

    }, [taskTitle]);

    const handleSubmit = e => {
        e.preventDefault();
        // controllo aggiuntivo
        if (taskTitleError)
            return;

        const newTask = {
            title: taskTitle.trim(),
            description: descriptionRef.current.value,
            status: statusRef.current.value
        }

        console.log('task da aggiungere', newTask);
    }

    return (
        <div>
            <h1>Aggiungi un nuovo task alla lista</h1>
            <form onSubmit={handleSubmit}>

                {/* nome task */}
                <label>Nome task:
                    <input
                        type="text"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                    />
                </label>
                {/* se si presente l'errore */}
                {taskTitleError &&
                    <p style={{ color: 'red' }}>{taskTitleError}</p>
                }

                {/* descrizione task */}
                <label> descrizione:
                    <textarea ref={descriptionRef}></textarea>
                </label>

                {/* status task */}
                <label> Status:
                    <select ref={statusRef} defaultValue={"to do"}>
                        {["To do", "Doing", "Done "].map((value, index) => (
                            <option key={index} value={value} >{value}</option>
                        ))}
                    </select>
                </label>
                <button type='submit' disabled={taskTitleError}>Add Task</button>
            </form>
        </div>
    )

}

export default AddTask