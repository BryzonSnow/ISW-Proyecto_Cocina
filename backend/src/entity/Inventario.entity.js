"use strict";
import { EntitySchema } from "typeorm";

const InventarioSchema = new EntitySchema({
    name: "Inventario",
    tableName: "inventario",
    columns: {
        inventarioID: {
            type: "int",
            primary: true,
            generated: true,
        },
        nombre: {
            type: "varchar",
            length: 100,
            nullable: false,
        },
        fecha: {
            type: "date",
            nullable: false,
        },
        estado: {
            type: "varchar",
            length: 50,
            nullable: true,
        },
    },
    relations: {
        proveedor: {
            target: "Proveedor",
            type: "many-to-one",
            joinColumn: { name: "proveedorID" },
            onDelete: "SET NULL",
        },
        empleado: {
            target: "Empleado",
            type: "many-to-one",
            joinColumn: { name: "empleadoID" },
            onDelete: "SET NULL",
        },
        ingredientes: {
            target: "Ingrediente", 
            type: "one-to-many", 
            inverseSide: "inventario",  
          },
    },
});

export default InventarioSchema;
