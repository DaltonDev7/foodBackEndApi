import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./Usuario";


@Entity()
export class AlimentoUsuario {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column({
        nullable: true,
    })
    Desayuno: string;

    @Column({
        nullable: true,
    })
    Comida: string;

    @Column({
        nullable: true,
    })
    Cena: string;

    @Column({
        nullable: true,
    })
    Merienda: string;

    @Column({
        nullable: true,
    })
    ComidaExtra: string;

    @Column({
        nullable: false,
    })
    FechaCreacion: Date;

    @Column({
        nullable: true,
    })
    FechaModificacion: Date;

    @ManyToOne(type => Usuario, Usuario => Usuario.Alimentos, {
        nullable:false,
       // eager:true
    })
    @JoinColumn({
        name: "IdUsuario",
    })
    Usuario: Usuario;


}
