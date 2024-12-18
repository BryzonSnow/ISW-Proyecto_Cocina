"use strict";
import {
    createProveedorService,
    deleteProveedorService,
    getProveedoresService,
    getProveedorService,    
    updateProveedorService,    
} from "../services/proveedor.service.js";
import {
    proveedorBodyValidation,
    proveedorQueryValidation,
} from "../validations/proveedor.validation.js";
import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
} from "../handlers/responseHandlers.js";

export async function createProveedor(req, res) {
    try {
        const { body } = req;

        // Validación del cuerpo de la solicitud
        const { error: bodyError } = proveedorBodyValidation.validate(body);
        if (bodyError) {
            return handleErrorClient(
                res,
                400,
                "Error de validación en los datos enviados",
                bodyError.message
            );
        }

        // Crear proveedor
        const [newProveedor, proveedorError] = await createProveedorService(body);

        if (proveedorError) {
            return handleErrorClient(res, 400, "Error creando el proveedor", proveedorError);
        }

        return handleSuccess(res, 201, "Proveedor creado correctamente", newProveedor);
    } catch (error) {
        return handleErrorServer(res, 500, error.message);
    }
}

export async function getProveedor(req, res) {
    try {
        const { nombre, id, email } = req.query;

        // Validar los parámetros de la consulta
        const { error } = proveedorQueryValidation.validate({ nombre, id, email });

        if (error) return handleErrorClient(res, 400, error.message);

        // Obtener proveedor
        const [proveedor, errorProveedor] = await getProveedorService({ nombre, id, email });

        if (errorProveedor) return handleErrorClient(res, 404, errorProveedor);

        handleSuccess(res, 200, "Proveedor encontrado", proveedor);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function getProveedores(req, res) {
    try {
        const [proveedores, errorProveedores] = await getProveedoresService();

        if (errorProveedores) return handleErrorClient(res, 404, errorProveedores);

        proveedores.length === 0
        ? handleSuccess(res, 204)
        : handleSuccess(res, 200, "Proveedores encontrados", proveedores);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function updateProveedor(req, res) {
    try {
        const { nombre, id, email } = req.query;
        const { body } = req;

        // Validación de los parámetros de la consulta
        const { error: queryError } = proveedorQueryValidation.validate({ nombre, id, email });

        if (queryError) {
        return handleErrorClient(
            res,
            400,
            "Error de validación en la consulta",
            queryError.message,
        );
        }

        // Validación del cuerpo de la solicitud
        const { error: bodyError } = proveedorBodyValidation.validate(body);

        if (bodyError)
        return handleErrorClient(
            res,
            400,
            "Error de validación en los datos enviados",
            bodyError.message,
        );

        // Actualizar proveedor
        const [proveedor, proveedorError] = await updateProveedorService({ nombre, id, email }, body);

        if (proveedorError) return handleErrorClient(res, 400, "Error modificando el proveedor", proveedorError);

        handleSuccess(res, 200, "Proveedor modificado correctamente", proveedor);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function deleteProveedor(req, res) {
    try {
        const { nombre, id, email } = req.query;

        // Validación de los parámetros de la consulta
        const { error: queryError } = proveedorQueryValidation.validate({ nombre, id, email });

        if (queryError) {
        return handleErrorClient(
            res,
            400,
            "Error de validación en la consulta",
            queryError.message,
        );
        }

        // Eliminar proveedor
        const [proveedorDelete, errorProveedorDelete] = await deleteProveedorService({
            nombre,
            id,
            email,
        });

        if (errorProveedorDelete) return handleErrorClient(res, 404, "Error eliminando el proveedor", errorProveedorDelete);

        handleSuccess(res, 200, "Proveedor eliminado correctamente", proveedorDelete);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}