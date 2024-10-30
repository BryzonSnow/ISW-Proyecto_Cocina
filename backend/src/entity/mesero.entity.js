import { EntitySchema } from "typeorm";

const MeseroSchema = new EntitySchema({
    name: "Mesero",
    tableName: "Mesero",
    columns: {
        MeseroID: { type: "int", primary: true, generated: true, unique: true }
    },
    relations: {
        empleado: {
            type: "one-to-one",
            target: "Empleado",
            joinColumn: { name: "EmpleadoID" },
            cascade: true,
            eager: true
        }
    }
});

export default MeseroSchema;
