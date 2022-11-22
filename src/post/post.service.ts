import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRespository: Repository<Post>,
    private userService: UsersService,
  ) {}

  async createPost(post: CreatePostDto) {
    const userFound = await this.userService.getUser(post.authoId);
    if (!userFound)
      return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);

    const newPost = this.postRespository.create(post);
    return this.postRespository.save(newPost);
  }

  getPosts() {
    return this.postRespository.find({
      relations: ['author'],
    });
  }
}
