"use strict";
import ProveedorSchema from "../entity/Proveedor.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { handleErrorClient, handleErrorServer, handleSuccess } from "../handlers/responseHandlers.js";

// Repositorio de Proveedor
const proveedorRepo = AppDataSource.getRepository(ProveedorSchema);

// Obtener un proveedor por los parámetros 
export async function getProveedorService(query) {
    try {
        const { nombre, id, email } = query;

        const proveedorFound = await proveedorRepo.findOne({
        where: [{ proveedorID: id }, { nombre: nombre }, { email: email }],
        });

        if (!proveedorFound) return [null, "Proveedor no encontrado"];

        return [proveedorFound, null];
    } catch (error) {
        console.error("Error al obtener el proveedor:", error);
        return [null, "Error interno del servidor"];
    }
}

// Obtener todos los proveedores
export async function getProveedoresService() {
    try {
        const proveedores = await proveedorRepo.find();

        if (!proveedores || proveedores.length === 0) return [null, "No hay proveedores"];

        return [proveedores, null];
    } catch (error) {
        console.error("Error al obtener proveedores:", error);
        return [null, "Error interno del servidor"];
    }
    }

// Actualizar un proveedor
export async function updateProveedorService(query, body) {
    try {
        const { id, nombre, email } = query;

        const proveedorFound = await proveedorRepo.findOne({
        where: [{ proveedorID: id }, { nombre: nombre }, { email: email }],
        });

        if (!proveedorFound) return [null, "Proveedor no encontrado"];

        // Verificar si el nombre o email ya existen
        const existingProveedor = await proveedorRepo.findOne({
        where: [{ nombre: body.nombre }, { email: body.email }],
        });

        if (existingProveedor && existingProveedor.proveedorID !== proveedorFound.proveedorID) {
        return [null, "Ya existe un proveedor con el mismo nombre o email"];
        }
        
        

        const updatedProveedor = {
        ...proveedorFound,
        ...body,
        updatedAt: new Date(),
        };

        await proveedorRepo.save(updatedProveedor);

        return [updatedProveedor, null];
    } catch (error) {
        console.error("Error al modificar el proveedor:", error);
        return [null, "Error interno del servidor"];
    }
}

// Eliminar un proveedor
export async function deleteProveedorService(query) {
    try {
        const { id, nombre, email } = query;

        const proveedorFound = await proveedorRepo.findOne({
        where: [{ proveedorID: id }, { nombre: nombre }, { email: email }],
        });

        if (!proveedorFound) return [null, "Proveedor no encontrado"];

        await proveedorRepo.remove(proveedorFound);

        return [proveedorFound, null];
    } catch (error) {
        console.error("Error al eliminar el proveedor:", error);
        return [null, "Error interno del servidor"];
    }
}

// Crear un nuevo proveedor
export async function createProveedorService(body) {
    try {
        const proveedor = proveedorRepo.create(body);

        const savedProveedor = await proveedorRepo.save(proveedor);

        return [savedProveedor, null];
    } catch (error) {
        console.error("Error al crear el proveedor:", error);
        return [null, "Error interno del servidor"];
    }
}
