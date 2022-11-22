import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('profiles')
export class Profile{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({nullable:true})
    age: number;

}