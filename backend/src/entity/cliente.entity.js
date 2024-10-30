"use strict";
import { EntitySchema } from "typeorm";

const ClienteSchema = new EntitySchema({
    name: "Cliente",
    tableName: "cliente",
    columns: {
        clienteID: {
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
    },
    relations: {
        pedidos: {
            target: "Pedido",
            type: "one-to-many",
            inverseSide: "cliente",
        },
    },
});

export default ClienteSchema;
