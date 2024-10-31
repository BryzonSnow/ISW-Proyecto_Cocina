"use strict";
import { EntitySchema } from "typeorm";

const RolEnum = {
    MESERO: "Mesero",
    CHEF: "Chef",
    ADMINISTRADOR: "Administrador",
    JEFECOCINA: "JefeCocina",
};

const EmpleadoSchema = new EntitySchema({
    name: "Empleado",
    tableName: "empleado",
    columns: {
        empleadoID: {
            type: "int",
            primary: true,
            generated: true,
        },
        nombre: {
            type: "varchar",
            length: 100,
            nullable: false,
        },
        contacto: {
            type: "varchar",
            length: 100,
            nullable: true,
        },
        rol: {
            type: "enum",
            enum: Object.values(RolEnum),
            nullable: false,
            default: RolEnum.MESERO,  
        },
    },
    relations: {
        turnos: {
            target: "Turno",
            type: "one-to-many",
            inverseSide: "empleado",
        },
        inventarios: {
            target: "Inventario",
            type: "one-to-many",
            inverseSide: "empleado",
        },
        pedidos: {
            target: "Pedido",
            type: "one-to-many",
            inverseSide: "empleado",
        },
    },
});

export default EmpleadoSchema;
