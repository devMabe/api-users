import { Post } from 'src/post/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Profile } from './profile.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number; 
    @Column({unique: true})
    username: string
    @Column()
    password: string;
    @Column({type: 'datetime' , default: ()=> 'CURRENT_TIMESTAMP' })
    createAt: Date;

    @Column({nullable:true})
    authStrategy?:string;

    @OneToOne(()=>Profile)
    @JoinColumn()
    profile: Profile;

    @OneToMany(()=> Post, post => post.author)
    posts: Post[];
}