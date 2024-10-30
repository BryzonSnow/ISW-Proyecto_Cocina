const Administrador = require('../models/administrador.model');

// Obtener todos los administradores
exports.getAdministradores = async (req, res) => {
    try {
        const administradores = await Administrador.find();
        res.status(200).json(administradores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un administrador por ID
exports.getAdministradorById = async (req, res) => {
    try {
        const administrador = await Administrador.findById(req.params.id);
        if (!administrador) {
            return res.status(404).json({ message: 'Administrador no encontrado' });
        }
        res.status(200).json(administrador);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo administrador
exports.createAdministrador = async (req, res) => {
    const administrador = new Administrador(req.body);
    try {
        const nuevoAdministrador = await administrador.save();
        res.status(201).json(nuevoAdministrador);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un administrador existente
exports.updateAdministrador = async (req, res) => {
    try {
        const administrador = await Administrador.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!administrador) {
            return res.status(404).json({ message: 'Administrador no encontrado' });
        }
        res.status(200).json(administrador);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un administrador
exports.deleteAdministrador = async (req, res) => {
    try {
        const administrador = await Administrador.findByIdAndDelete(req.params.id);
        if (!administrador) {
            return res.status(404).json({ message: 'Administrador no encontrado' });
        }
        res.status(200).json({ message: 'Administrador eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};