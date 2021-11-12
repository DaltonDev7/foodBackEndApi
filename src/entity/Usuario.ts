import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AlimentoUsuario } from "./AlimentosUsuario";

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column({
        nullable: false,
        unique: true
    })
    UserName: string;

    @Column({ nullable: false })
    PassWord: string;

    @OneToMany(type => AlimentoUsuario, Alimentos => Alimentos.Usuario)
    Alimentos: AlimentoUsuario[];

}
