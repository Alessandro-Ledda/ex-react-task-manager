import { createContext, useContext, useState, useEffect } from "react"

const ContextApi = createContext();

const endPoint = import.meta.env.VITE_API_URL;

function ContextApiProvider({ children }) {

    // creo var di stato per gione task
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch(endPoint)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                // salvo i dati nello stato
                setTasks(data);
            })
            .catch(error => console.error(error))
            .finally();

    }, [])
    return (
        <ContextApi.Provider value={{ tasks }}>
            {children}
        </ContextApi.Provider>
    );

}

// export hook per il suo consumo
function useContextApi() {
    const context = useContext(ContextApi);
    return context;
}

// export provider e hook
export { ContextApiProvider, useContextApi }