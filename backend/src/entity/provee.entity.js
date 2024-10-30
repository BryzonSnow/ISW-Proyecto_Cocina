import { EntitySchema } from "typeorm";

const ProveeSchema = new EntitySchema({
    name: "Provee",
    tableName: "Provee",
    columns: {
        ProveedorID: { 
            type: "int",
            primary: true, 
            generated: true 
        },
        ingredienteID: { type: "int", 
            primary: true, 
            generated: true 
        }
    },
    relations: {
        proveedor: {
            type: "one-to-many",
            target: "Proveedor",
            joinColumn: { name: "ProveedorID" }
        },
        ingrediente: {
            type: "one-to-many",
            target: "Ingrediente",
            joinColumn: { name: "IngredienteID" }
        }
    }
});

export default ProveeSchema;
