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
    },
    relations: {
        inventario: {
            target: "Inventario",
            type: "one-to-many",
            inverseSide: "proveedor",
        },
    },
});

export default ProveedorSchema;
