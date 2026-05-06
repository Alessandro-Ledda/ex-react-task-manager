import { createContext, } from "react"

const ContextApi = createContext();
import useTasks from "../hooks/useTasks";

const { VITE_API_URL } = import.meta.env;

function ContextApiProvider({ children }) {

    const taskData = useTasks();

    return (
        // utilizzo spread operator per non elencare tutti i valori manualmente
        <ContextApi.Provider value={{ ...taskData }}>
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
export { ContextApi, ContextApiProvider, useContextApi }