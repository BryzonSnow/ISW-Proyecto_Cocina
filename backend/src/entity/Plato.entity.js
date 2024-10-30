"use strict";
import { EntitySchema } from "typeorm";

const PlatoSchema = new EntitySchema({
    name: "Plato",
    tableName: "plato",
    columns: {
        platoID: {
            type: "int",
            primary: true,
            generated: true,
        },
        nombre: {
            type: "varchar",
            length: 100,
            nullable: false,
        },
        descripcion: {
            type: "text",
            nullable: true,
        },
        precio: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: false,
        },
        disponibilidad: {
            type: "boolean",
            nullable: false,
        },
        ingredienteID: {
            type: "int",
            nullable: false,
        },
    },
    relations: {
        ingrediente: {
            target: "Ingrediente",
            type: "many-to-one",
            joinColumn: { name: "ingredienteID" },
            onDelete: "CASCADE",
        },
        menu: {
            target: "Menu",
            type: "many-to-one",
            joinColumn: { name: "menuID" },
            onDelete: "CASCADE",
        },
    },
});

export default PlatoSchema;
