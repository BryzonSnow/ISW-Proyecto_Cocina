import { EntitySchema } from "typeorm";

const PedidoSchema = new EntitySchema({
    name: "Pedido",
    tableName: "Pedido",
    columns: {
        PedidoID: { type: "int", primary: true, generated: true },
        Fecha: { type: "date", nullable: false },
        Estado: { type: "varchar", length: 100, nullable: false },
        Total: { type: "int", nullable: false }
    },
    relations: {
        cliente: {
            type: "one-to-one",
            target: "Cliente",
            joinColumn: { name: "ClienteID" }
        },
        mesero: {
            type: "one-to-many",
            target: "Mesero",
            joinColumn: { name: "MeseroID" }
        },
        contiene: {
            type: "one-to-many",
            target: "Contiene",
            inverseSide: "pedido"
        }
    }
});

export default PedidoSchema;