import { EntitySchema } from "typeorm";

const JefeCocinaSchema = new EntitySchema({
    name: "Jefecocina",
    tableName: "Jefecocina",
    columns: {
        JefecocinaID: { type: "int", primary: true, generated: true },
        PermisoInventario: { type: "boolean", nullable: false },
        FechaAsignacionRol: { type: "date", nullable: false },
        Estado: { type: "varchar", length: 100 , nullable: false }
    },
    relations: {
        inventario: {
            type: "one-to-many",
            target: "Inventario",
            joinColumn: { name: "InventarioID" }
        },
        administrador: {
            type: "one-to-many",
            target: "Administrador",
            joinColumn: { name: "AdministradorID" }
        },
        chef: {
            type: "one-to-one",
            target: "Chef",
            joinColumn: { name: "ChefID" },
            cascade: true,
            eager: true
        }
    }
});

export default JefeCocinaSchema;
