import { Component , OnInit, OnDestroy} from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../poats.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit ,OnDestroy{
  // posts = [
  //   {title: 'First Post' , content: 'This is first Post\'s Content'},
  //   {title: 'Second  Post' , content: 'This is second  Post\'s Content'},
  //   {title: 'Third Post' , content: 'This is Third Post\'s Content'}
  // ];
 posts : Post[] = [];
 isLoading = false;
 private postsub : Subscription;

  constructor(public postsService : PostsService){}

  ngOnInit(){
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsub  = this.postsService.getPostUpdateListener().subscribe((posts : Post[])=> {
      this.isLoading = false;
      this.posts = posts;
    });
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }


  ngOnDestroy(){
    this.postsub.unsubscribe();
  }
}
