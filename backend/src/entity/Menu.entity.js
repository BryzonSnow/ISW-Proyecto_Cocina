"use strict";
import { EntitySchema } from "typeorm";

const MenuSchema = new EntitySchema({
    name: "Menu",
    tableName: "menu",
    columns: {
        menuID: {
            type: "int",
            primary: true,
            generated: true,
        },
        nombrePlato: {
            type: "varchar",
            length: 100,
            nullable: false,
        },
    },
    relations: {
        plato: {
            target: "Plato",
            type: "one-to-many",
            inverseSide: "menu",
        },
    },
});

export default MenuSchema;
