import { EntitySchema } from "typeorm";

const IngredienteSchema = new EntitySchema({
    name: "Ingrediente",
    tableName: "Ingrediente",
    columns: {
        PedidoID: { type: "int", primary: true, generated: true },
        Nombre: { type: "varchar", length: 100 , nullable: false },
        CantidadInventario: { type: "int", nullable: false },
        UnidadMedida: { type: "varchar", length: 100 , nullable: false }
    },
    relations: {
        provee: {
            type: "one-to-many",
            target: "Provee",
            inverseSide: "Ingrediente" 
        },
        inventario: {
            type: "one-to-many",
            target: "Inventario",
            joinColumn: { name: "InventarioID" }
        }
    }
});

export default IngredienteSchema;
