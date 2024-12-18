"use strict";
import { EntitySchema } from "typeorm";

const ProveedorSchema = new EntitySchema({
    name: "Proveedor",
    tableName: "proveedor",
    columns: {
        proveedorID: {
            type: "int",
            primary: true,
            generated: true,
        },
        nombre: {
            type: "varchar",
            length: 100,
            nullable: false,
            check: "LENGTH(nombre) > 2", // Validación de longitud
        },
        contacto: {
            type: "varchar",
            length: 100,
            nullable: true,
        },
        direccion: {
            type: "varchar",
            length: 255,
            nullable: true,
        },
        email: {
            type: "varchar",
            length: 100,
            nullable: true,
        },
        createdAt: { // Se crea automáticamente
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
        },
        updatedAt: { // Se actualiza automáticamente
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
        },
    },
    relations: {
        inventario: {
            target: "Inventario",
            type: "one-to-many",
            inverseSide: "proveedor",
            //eager: true, // Carga los datos relacionados
        },
    },
});


export default ProveedorSchema;
