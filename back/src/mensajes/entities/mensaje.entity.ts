import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Mensaje {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    mensaje: string;

}
