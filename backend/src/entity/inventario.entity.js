import { EntitySchema } from "typeorm";

const InventarioSchema = new EntitySchema({
    name: "Inventario",
    tableName: "Inventario",
    columns: {
        InventarioID: { type: "int", primary: true, generated: true },
        Fecha: { type: "date", nullable: false },
        CantidadTotal: { type: "int", nullable: false },
        Estado: { type: "varchar", length: 50, nullable: false }
    },
    relations: {
        administrador: {
            type: "one-to-one",
            target: "Administrador",
            joinColumn: { name: "AdministradorID" }
        }
    }
});

export default InventarioSchema;
