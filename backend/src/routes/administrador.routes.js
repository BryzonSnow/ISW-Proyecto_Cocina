const { Router } = require('express');
const {
    getAllAdministradores,
    getAdministradorById,
    createAdministrador,
    updateAdministrador,
    deleteAdministrador
} = require('../controllers/administrador.controller');

const router = Router();

router.get('/', getAllAdministradores);
router.get('/:id', getAdministradorById);
router.post('/', createAdministrador);
router.put('/:id', updateAdministrador);
router.delete('/:id', deleteAdministrador);

module.exports = router;