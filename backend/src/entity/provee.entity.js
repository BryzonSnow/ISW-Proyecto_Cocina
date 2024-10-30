import { EntitySchema } from "typeorm";

const ProveeSchema = new EntitySchema({
    name: "Provee",
    tableName: "Provee",
    columns: {
    relations: {
        proveedor: {
            type: "many-to-many",
            target: "Proveedor",
            joinColumn: { name: "ProveedorID" }
        },
        ingrediente: {
            type: "many-to-many",
            target: "Ingrediente",
            joinColumn: { name: "IngredienteID" }
        }
    }
}
});

export default ProveeSchema;
