import { EntitySchema } from "typeorm";

const TurnoSchema = new EntitySchema({
    name: "Turno",
    tableName: "Turno",
    columns: {
        TurnoID: { type: "int", primary: true, generated: true },
        Fecha: { type: "date", nullable: false },
        HoraInicio: { type: "time", nullable: false },
        HoraFin: { type: "time", nullable: false }
    },
    relations: {
        administrador: {
            type: "one-to-many",
            target: "Administrador",
            joinColumn: { name: "AdministradorID" }
        }
    }
});

export default TurnoSchema;
