import { EntitySchema } from "typeorm";

const FormadoSchema = new EntitySchema({
    name: "Formado",
    tableName: "Formado",
    columns: {
    relations: {
        plato: {
            type: "many-to-many",
            target: "Plato",
            joinColumn: { name: "PlatoID" }
        },
        ingrediente: {
            type: "many-to-many",
            target: "Ingrediente",
            joinColumn: { name: "IngredienteID" }
        }
    }
}
});

export default FormadoSchema;
