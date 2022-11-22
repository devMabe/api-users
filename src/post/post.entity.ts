import { User } from "src/users/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('posts')
export class Post{
    
    @PrimaryGeneratedColumn()
    id:number

    @Column({unique:true})
    title: string

    @Column()
    content: string

    @Column()
    authorId: number;

    @ManyToOne(()=> User, user => user.posts)
    author: User
}