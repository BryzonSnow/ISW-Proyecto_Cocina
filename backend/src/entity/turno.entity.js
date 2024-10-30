"use strict";
import { EntitySchema } from "typeorm";

const TurnoSchema = new EntitySchema({
    name: "Turno",
    tableName: "turno",
    columns: {
        turnoID: {
            type: "int",
            primary: true,
            generated: true,
        },
        fecha: {
            type: "date",
            nullable: false,
        },
        horaInicio: {
            type: "time",
            nullable: false,
        },
        horaFin: {
            type: "time",
            nullable: false,
        },
    },
    relations: {
        empleado: {
            target: "Empleado",
            type: "many-to-one",
            joinColumn: { name: "empleadoID" },
            onDelete: "CASCADE",
        },
    },
});

export default TurnoSchema;
