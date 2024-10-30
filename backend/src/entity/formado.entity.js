import { EntitySchema } from "typeorm";

const FormadoSchema = new EntitySchema({
    name: "Formado",
    tableName: "Formado",
    columns: {
        PlatoID: { 
            type: "int",
            primary: true, 
            generated: true 
        },
        IngredienteID: { type: "int", 
            primary: true, 
            generated: true 
        }
    },
    relations:{
        plato: {
            type: "one-to-many",
            target: "Plato",
            joinColumn: { name: "PlatoID" }
        },
        ingrediente: {
            type: "one-to-many",
            target: "Ingrediente",
            joinColumn: { name: "IngredienteID" }
        }
    }
});

export default FormadoSchema;