"use strict";
import { EntitySchema } from "typeorm";

const IngredienteSchema = new EntitySchema({
    name: "Ingrediente",
    tableName: "ingrediente",
    columns: {
        ingredienteID: {
            type: "int",
            primary: true,
            generated: true,
        },
        nombre: {
            type: "varchar",
            length: 100,
            nullable: false,
        },
        cantidad: {
            type: "int",
            nullable: false,
        },
        porcion: {
            type: "int",
            nullable: false,
        },
    },
    relations: {
        plato: {
            target: "Plato",
            type: "many-to-one",
            joinColumn: { name: "platoID" },
            onDelete: "CASCADE",
        },
    },
});

export default IngredienteSchema;
