"use strict";
import { AppDataSource } from "../config/configDb.js";
import Proveedor from "../entity/Proveedor.entity.js";

// Crear un nuevo proveedor
export async function createProveedorService(proveedorData) {
    try {
        const proveedorRepository = AppDataSource.getRepository(Proveedor);
        const newProveedor = proveedorRepository.create(proveedorData);
        const result = await proveedorRepository.save(newProveedor);
        return [result, null];
    } catch (error) {
        console.error("Error al crear proveedor:", error);
        return [null, "Error interno del servidor"];
    }
}

// Obtener todos los proveedores
export async function getAllProveedoresService() {
    try {
        const proveedorRepository = AppDataSource.getRepository(Proveedor);
        const proveedores = await proveedorRepository.find();
        return [proveedores, null];
    } catch (error) {
        console.error("Error al obtener proveedores:", error);
        return [null, "Error interno del servidor"];
    }
}

// Obtener proveedor por ID
export async function getProveedorByIdService(id) {
    try {
        const proveedorRepository = AppDataSource.getRepository(Proveedor);
        const proveedor = await proveedorRepository.findOneBy({ proveedorID: id });
        if (!proveedor) {
            return [null, "Proveedor no encontrado"];
        }
        return [proveedor, null];
    } catch (error) {
        console.error("Error al obtener proveedor:", error);
        return [null, "Error interno del servidor"];
    }
}

// Actualizar proveedor
export async function updateProveedorService(id, updatedData) {
    try {
        const proveedorRepository = AppDataSource.getRepository(Proveedor);
        const proveedor = await proveedorRepository.findOneBy({ proveedorID: id });
        if (!proveedor) {
            return [null, "Proveedor no encontrado"];
        }
        proveedorRepository.merge(proveedor, updatedData);
        const result = await proveedorRepository.save(proveedor);
        return [result, null];
    } catch (error) {
        console.error("Error al actualizar proveedor:", error);
        return [null, "Error interno del servidor"];
    }
}

// Eliminar proveedor
export async function deleteProveedorService(id) {
    try {
        const proveedorRepository = AppDataSource.getRepository(Proveedor);
        const proveedor = await proveedorRepository.findOneBy({ proveedorID: id });
        if (!proveedor) {
            return [null, "Proveedor no encontrado"];
        }
        await proveedorRepository.remove(proveedor);
        return [null, null];
    } catch (error) {
        console.error("Error al eliminar proveedor:", error);
        return [null, "Error interno del servidor"];
    }
}
