import { EntitySchema } from "typeorm";

const AdministradorSchema = new EntitySchema({
    name: "Administrador",
    tableName: "Administrador",
    columns: {
        AdministradorID: { type: "int", primary: true, generated: true },
        Nombre: { type: "varchar", length: 100, nullable: false },
        Contacto: { type: "varchar", length: 50, nullable: false }
    },
    relations:{
        inventario: {
            type: "one-to-one",
            target: "Inventario",
        }
    }
});

export default AdministradorSchema;
