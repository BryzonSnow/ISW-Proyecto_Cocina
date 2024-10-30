const express = require('express');
const clienteController = require('../controllers/cliente.controller');

const router = express.Router();

// Obtener todos los clientes
router.get('/', clienteController.getClientes);

// Obtener un cliente por ID
router.get('/:id', clienteController.getClienteById);

// Crear un nuevo cliente
router.post('/', clienteController.createCliente);

// Actualizar un cliente existente
router.put('/:id', clienteController.updateCliente);

// Eliminar un cliente
router.delete('/:id', clienteController.deleteCliente);

module.exports = router;