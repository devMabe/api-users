import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';


@Controller('posts')
export class PostController {
    constructor(private postService: PostService){}


    @Post()
    createPost(@Body() post: CreatePostDto){
        return this.postService.createPost(post);
    }

    @Get()
    getPosts(){
        return this.postService.getPosts();
    }
}
