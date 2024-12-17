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
        ingredientes: {
            type: "many-to-many",
            target: "Ingrediente",
            joinTable: {
                name: "ProveedorIngrediente",
                joinColumn: {
                    name: "proveedorID",
                    referencedColumnName: "proveedorID",
                },
                inverseJoinColumn: {
                    name: "ingredienteID",
                    referencedColumnName: "ingredienteID",
                },
            },
        },
    },
});

export default ProveedorSchema;
