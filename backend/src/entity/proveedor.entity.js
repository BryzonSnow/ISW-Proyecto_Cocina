import { EntitySchema } from "typeorm";

const ProveedorSchema = new EntitySchema({
    name: "Proveedor",
    tableName: "Proveedor",
    columns: {
        ProveedorID: { type: "int", primary: true, generated: true },
        Nombre: { type: "varchar", length: 100, nullable: false },
        Contacto: { type: "varchar", length: 100, nullable: false },
        Direccion: { type: "varchar", length: 100, nullable: false }
    },
    relations: {
        administrador: {
            type: "one-to-many",
            target: "Administrador",
            joinColumn: { name: "AdministradorID" }
        },
        provee:{
            type: "one-to-many",
            target: "Provee",
            inverseSide: "Proveedor" 
        }
    }
});

export default ProveedorSchema;
