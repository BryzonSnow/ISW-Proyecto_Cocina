"use strict";
import { EntitySchema } from "typeorm";

const PlatoIngredienteSchema = new EntitySchema({
    name: "IngredientePlato",
    tableName: "plato_ingrediente",
    columns: {
        ID: {
            type: "int",
            primary: true,
            generated: true,
        },
        platoID: {
            type: "int",
            primary: true,
        },
        ingredienteID: {
            type: "int",
            primary: true,
        },
    },
    relations: {
        ingrediente: {
            target: "Ingrediente",
            type: "many-to-one",
            joinColumn: { name: "ingredienteID" },
            onDelete: "CASCADE",
        },
        platoID: {
            target: "Plato",
            type: "many-to-one",
            joinColumn: { name: "platoID" },
            onDelete: "CASCADE",
        },
    },
});

export default PlatoIngredienteSchema;