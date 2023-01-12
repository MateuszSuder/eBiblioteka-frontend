import React, {createContext, useContext, useState} from "react";
import {Alert, Snackbar} from "@mui/material";

const SNACKBAR_DURATION = 5000;

const SnackbarContext = createContext({});

export const SnackbarProvider = ({children}) => {
    const [snackbars, setSnackbars] = useState([]);

    const addSnackbar = (message, severity) => {
        console.log("Adding snackbar ", message);
        const id = snackbars.length;
        const obj = {
            message,
            severity,
            id
        }

        setSnackbars(prevState => [...prevState, obj])

        setTimeout(() => {
            closeSnackbar(id);
        }, SNACKBAR_DURATION)
    }

    const closeSnackbar = (id) => {
        setSnackbars(prevState => prevState.filter(s => s.id !== id));
    }

    return (
        <>
            <SnackbarContext.Provider value={{
                addSnackbar,
                closeSnackbar,
                snackbars
            }}>
                {children}
            </SnackbarContext.Provider>
            {
                snackbars.map(({message, severity, id}) => (
                    <Snackbar
                        open={true}
                        key={id}
                    >
                        <Alert
                            severity={severity}
                            sx={{width: "100%"}}
                        >
                            {message}
                        </Alert>
                    </Snackbar>
                ))
            }
        </>
    )
}



export default function useSnackbar() {
    return useContext(SnackbarContext);
};