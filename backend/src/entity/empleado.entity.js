import { EntitySchema } from "typeorm";

const EmpleadoSchema = new EntitySchema({
    name: "Empleado",
    tableName: "Empleado",
    columns: {
        EmpleadoID: { type: "int", primary: true, generated: true },
        Nombre: { type: "varchar", length: 100, nullable: false },
        Contacto: { type: "varchar", length: 100 ,nullable: false }
    },
    relations: {
        turno: {
            type: "one-to-many",
            target: "Turno",
            joinColumn: { name: "TurnoID" }
        }
    }
});

export default EmpleadoSchema;
