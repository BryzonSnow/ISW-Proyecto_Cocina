import { EntitySchema } from "typeorm";

const ChefSchema = new EntitySchema({
    name: "Chef",
    tableName: "Chef",
    columns: {
        MeseroID: { type: "int", primary: true, generated: true, unique: true },
        Especialidad: {type: "varchar", length: 200, nullable: false}
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

export default ChefSchema;
