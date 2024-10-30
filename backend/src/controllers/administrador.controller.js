import Administrador from '../entity/administrador.entity.js'; // Asegúrate de que la ruta sea correcta

// Obtener todos los administradores
export const getAdministradores = async (req, res) => {
    try {
        const administradores = await Administrador.find(); // Cambia a findAll si estás usando Sequelize
        res.status(200).json(administradores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un administrador por ID
export const getAdministrador = async (req, res) => {
    try {
        const administrador = await Administrador.findById(req.params.id); // Cambia a findByPk si estás usando Sequelize
        if (!administrador) {
            return res.status(404).json({ message: 'Administrador no encontrado' });
        }
        res.status(200).json(administrador);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo administrador
export const createAdministrador = async (req, res) => {
    const administrador = new Administrador(req.body);
    try {
        const nuevoAdministrador = await administrador.save(); // Cambia a create si estás usando Sequelize
        res.status(201).json(nuevoAdministrador);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un administrador existente
export const updateAdministrador = async (req, res) => {
    try {
        const administrador = await Administrador.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Cambia a findByPk si estás usando Sequelize
        if (!administrador) {
            return res.status(404).json({ message: 'Administrador no encontrado' });
        }
        res.status(200).json(administrador);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un administrador
export const deleteAdministrador = async (req, res) => {
    try {
        const administrador = await Administrador.findByIdAndDelete(req.params.id); // Cambia a destroy si estás usando Sequelize
        if (!administrador) {
            return res.status(404).json({ message: 'Administrador no encontrado' });
        }
        res.status(200).json({ message: 'Administrador eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
