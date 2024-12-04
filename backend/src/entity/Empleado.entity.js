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
        rut: {
            type: "varchar",
            length: 12,
            nullable: true,
        },
        email: {
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
        password: {
            type: "varchar",
            length: 255,  
            nullable: true,  
          },
        createdAt: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            nullable: false,
        },
        updatedAt: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
            nullable: false,
        },
    },
    indices: [
        {
            name: "IDX_EMPLEADO_ID",
            columns: ["empleadoID"],
            unique: true,
        },
        {
            name: "IDX_EMPLEADO_RUT",
            columns: ["rut"],
            unique: true,
        },
        {
            name: "IDX_EMPLEADO_EMAIL",
            columns: ["email"],
            unique: true,
        }
    ],
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
