import { EntitySchema } from "typeorm";

const ContieneSchema = new EntitySchema({
    name: "Contiene",
    tableName: "Contiene",
    columns: {
    relations: {
        pedido: {
            type: "many-to-many",
            target: "Pedido",
            joinColumn: { name: "PedidoID" }
        },
        plato: {
            type: "many-to-many",
            target: "Plato",
            joinColumn: { name: "PlatoID" }
        }
    }
}
});

export default ContieneSchema;
