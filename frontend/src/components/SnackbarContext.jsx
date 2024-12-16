import React, { createContext, useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import PropTypes from "prop-types";

// Crear el contexto
const SnackbarContext = createContext();

// Hook personalizado para usar el contexto
export const useSnackbar = () => useContext(SnackbarContext);

// Proveedor del Snackbar
export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // success | error | warning | info
  });
  
  // Función para mostrar el Snackbar
  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  // Función para cerrar el Snackbar
  const handleClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };
  
  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {/* Snackbar global */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

// Validación de PropTypes
SnackbarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};