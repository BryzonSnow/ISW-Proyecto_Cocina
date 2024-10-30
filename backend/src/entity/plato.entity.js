import { EntitySchema } from "typeorm";

const PlatoSchema = new EntitySchema({
    name: "Plato",
    tableName: "Plato",
    columns: {
        PlatoID: { type: "int", primary: true, generated: true },
        Nombre: { type: "varchar", length: 100, nullable: false },
        Descripcion: { type: "varchar", length: 1000, nullable: false },
        Precio: { type: "int", nullable: false },
        Disponibilidad: {type: "boolean", nullable: false}
    },
    relations: {
        inventario: {
            type: "one-to-many",
            target: "Inventario",
            joinColumn: { name: "InventarioID" }
        },
        menu: {
            type: "one-to-many",
            target: "Menu",
            joinColumn: { name: "MenuID" }
        }
    }
});

export default PlatoSchema;
