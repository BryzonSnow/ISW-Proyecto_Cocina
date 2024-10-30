import { EntitySchema } from "typeorm";

const ClienteSchema = new EntitySchema({
    name: "Cliente",
    tableName: "Cliente",
    columns: {
        ClienteID: { type: "int", primary: true, generated: true },
        Nombre: { type: "varchar", length: 100, nullable: false },
        Contacto: { type: "varchar", length: 50, nullable: false }
    },
    relations: {
        menu: {
            type: "one-to-many",
            target: "Menu",
            joinColumn: { name: "MenuID" }
        }
//        pedidos: {
//            type: "one-to-many",
//            target: "Pedido",
//            inverseSide: "cliente"
//        }
    }
});

export default ClienteSchema;
