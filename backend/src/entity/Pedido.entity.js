"use strict";
import { EntitySchema } from "typeorm";

const PedidoSchema = new EntitySchema({
    name: "Pedido",
    tableName: "pedido",
    columns: {
        pedidoID: {
            type: "int",
            primary: true,
            generated: true,
        },
        fecha: {
            type: "date",
            nullable: false,
        },
        estado: {
            type: "varchar",
            length: 50,
            nullable: false,
        },
        total: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: false,
        },
        clienteID: {
            type: "int",
            nullable: false,
        },
    },
    relations: {
        cliente: {
            target: "Cliente",
            type: "many-to-one",
            joinColumn: { name: "clienteID" },
            onDelete: "SET NULL",
        },
        platos: {
            target: "Plato",
            type: "many-to-many",
            inverseSide: "pedidos",
            joinTable: {
                name: "pedido_plato",
                joinColumn: { name: "pedidoID", referencedColumnName: "pedidoID" },
                inverseJoinColumn: { name: "platoID", referencedColumnName: "platoID" },
            },
        },
    },
});

export default PedidoSchema;

