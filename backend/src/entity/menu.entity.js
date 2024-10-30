import { EntitySchema } from "typeorm";

const MenuSchema = new EntitySchema({
    name: "Menu",
    tableName: "Menu",
    columns: {
        MenuID: { type: "int", primary: true, generated: true },
        NombrePlatos: { type: "varchar", length: 255, nullable: false },
        Ingredientes: { type: "text", nullable: false },
        Valores: { type: "float", nullable: false }
    },
    relations: {
        cliente: {
            type: "one-to-one",
            target: "Cliente",
            inverseSide: "menu"
        }
    }
});

export default MenuSchema;
