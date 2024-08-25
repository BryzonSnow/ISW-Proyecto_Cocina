"use strict";
import { 
    getUserService,
    getUsersService,
    updateUserService,
    deleteUserService 
} from '../services/user.service.js';
import {
    userQueryValidation,
    userBodyValidation 
} from "../validations/user.validation.js";
import { 
    handleSuccess,
    handleErrorClient,
    handleErrorServer 
} from '../handlers/responseHandlers.js';

export async function getUser(req, res) {
    try {
        const { rut, id, email } = req.query;
        
        const { error } = userQueryValidation.validate({ rut, id, email });

        if (error) return handleErrorClient(res, 400, error.message);

        const [user, errorUser] = await getUserService({ rut, id, email });

        if (errorUser) return handleErrorClient(res, 404, errorUser);

        handleSuccess(res, 200, "Usuario encontrado", user);
    } catch (error) {
        handleErrorServer(res, 500, 'Error obteniendo un usuario', error.message);
    }
}

export async function getUsers(req, res) {
    try {
        const [users, errorUsers] = await getUsersService();

        if (errorUsers) return handleErrorClient(res, 404, errorUsers);

        users.length === 0
            ? handleSuccess(res, 204)
            : handleSuccess(res, 200, "Usuarios encontrados", users);
    } catch (error) {
        handleErrorServer(res, 500, 'Error obteniendo a los usuarios', error.message);
    }
}

export async function updateUser(req, res) {
    try {
        const { rut, id, email } = req.query;
        const { body } = req;

        const { error: queryError } = userQueryValidation.validate({ rut, id, email });

        if (queryError) return handleErrorClient(res, 400, 'Error de validación', queryError.message);

        const { error: bodyError } = userBodyValidation.validate(body);

        if (bodyError) return handleErrorClient(res, 400, 'Error de validación', bodyError.message);

        const [user, userError] = await updateUserService({ rut, id, email }, body);

        if (userError) return handleErrorClient(res, 400, userError);

        handleSuccess(res, 200, "Usuario modificado correctamente", user);
    } catch (error) {
        handleErrorServer(res, 500, 'Error modificando un usuario', error.message);
    }
}

export async function deleteUser(req, res) {
    try {
        const { rut, id, email } = req.query;

        const { error: queryError } = userQueryValidation.validate({ rut, id, email });

        if (queryError) return handleErrorClient(res, 400, 'Error de validación', queryError.message);

        const [userDelete, errorUserDelete] = await deleteUserService({ rut, id, email });

        if (errorUserDelete) return handleErrorClient(res, 404, errorUserDelete);

        handleSuccess(res, 200, 'Usuario eliminado correctamente', userDelete);
    } catch (error) {
        handleErrorServer(res, 500, 'Error eliminando un usuario', error.message);
    }
}