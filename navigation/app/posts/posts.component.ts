import { BadRequestError } from './../common/bad-request-error';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts:any = [];
  

  constructor(private service: PostService){
  }

  ngOnInit(): void {
    this.service.getAll()
    .subscribe({ 
      next:posts =>{
        this.posts = posts;
        this.posts=this.posts.posts;//for internal posts object
      }
    })
  }


  createPost(input: HTMLInputElement){
    let post:any = {
      title : input.value
    };
    this.posts.splice(0, 0, post);
    input.value = '';
    this.service.create(post)
    .subscribe({
      next:  newPost => {
        post['id']=newPost.id;
      },
      error: (e:AppError) => {
        this.posts.splice(0,1);
        if(e instanceof BadRequestError){
          alert(" bad request");
        }
        else throw e;
      }
    })
  }

  updatePost(post:{id:number}){
    this.service.update(post.id,{title : "hello world"})
    .subscribe(
      {
        next : updatePost => {
        console.log(updatePost);
        },
        error: (e:AppError) => {
          if(e instanceof BadRequestError){
            alert(" bad request");
          }
          else throw e;
        }
      })
  }

  deletePost(post:{id:number}){
    let index = this.posts.indexOf(post);
    this.posts.splice(index, 1);
    this.service.delete(post.id)
    .subscribe({
      next: () => {
      },
      error: (e:AppError) => {
        this.posts.splice(index, 0, post);
        if(e instanceof NotFoundError){
          alert("this message already deleted")
        }
        else throw e;
      }
  })
  }
  
}
