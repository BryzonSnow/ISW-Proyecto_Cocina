import React, { useState } from 'react';
import { createPedido } from '../services/pedido.service';

const Pedido = () => {
    const [pedido, setPedido] = useState({
        clienteID: '',
        platoID: '',
        empleadoID: '',
        fecha: new Date().toISOString().slice(0, 19).replace('T', ' '),
        estado: 'Pendiente',
        total: 0
    });

    const handleCreate = async () => {
        try {
            const resultado = await createPedido(pedido);
            console.log('Pedido creado con éxito:', resultado);
        } catch (error) {
            console.error('Error creando pedido:', error.message);
        }
    };

    return (
        <div style={styles.container}>
            <div style={{ margin: '1px 0', textAlign: 'left' }}>
      <a href="http://146.83.198.35:1327/verpedido">
        <button
          style={{
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: '5px',
          }}
        >
          Gestionar pedidos
        </button>
      </a>
    </div>
            <h1 style={styles.title}>Crear Pedido</h1>
            <form onSubmit={(e) => e.preventDefault()} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Cliente ID:</label>
                    <input
                        type="text"
                        value={pedido.clienteID}
                        onChange={(e) => setPedido({ ...pedido, clienteID: e.target.value })}
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Plato ID:</label>
                    <input
                        type="text"
                        value={pedido.platoID}
                        onChange={(e) => setPedido({ ...pedido, platoID: e.target.value })}
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Empleado ID:</label>
                    <input
                        type="text"
                        value={pedido.empleadoID}
                        onChange={(e) => setPedido({ ...pedido, empleadoID: e.target.value })}
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Estado:</label>
                    <input
                        type="text"
                        value={pedido.estado}
                        onChange={(e) => setPedido({ ...pedido, estado: e.target.value })}
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Total:</label>
                    <input
                        type="number"
                        value={pedido.total}
                        onChange={(e) => setPedido({ ...pedido, total: parseFloat(e.target.value) })}
                        style={styles.input}
                    />
                </div>
                <button type="button" onClick={handleCreate} style={styles.button}>Crear Pedido</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    title: {
        textAlign: 'center',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: '5px',
        fontSize: '14px',
        color: '#555',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        outline: 'none',
        width: '100%',
        boxSizing: 'border-box',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        fontSize: '16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};

export default Pedido;