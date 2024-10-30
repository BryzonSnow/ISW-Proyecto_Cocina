import { EntitySchema } from "typeorm";

const ContieneSchema = new EntitySchema({
    name: "Contiene",
    tableName: "Contiene",
    columns: {
        PlatoID: { 
            type: "int", 
            primary: true 
        },
        PedidoID: { 
            type: "int", 
            primary: true 
        }
    },

    relations: {
        pedido: {
            type: "one-to-many",
            target: "Pedido",
            joinColumn: { name: "PedidoID" }
        },
        plato: {
            type: "one-to-many",
            target: "Plato",
            joinColumn: { name: "PlatoID" }
        }
    }
});

export default ContieneSchema;