import { Component, OnInit } from '@angular/core';
import {PostService} from '../../post/post.service';
import {Post} from '../../post/post';
import {Form} from '@angular/forms';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  private posts: Post[] = this.postService.getPosts();
  private model: Post = {
    postIndex: null, postName: null
  };
  private isEdit = false;
  private selectedPost: Post;
  private newPost: Post;
  private clicked: boolean;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.clicked = false;
  }

  trackByIndex(index: number, post: Post): number {
    return post.postIndex;
  }

  onEdit(post: Post) {
    this.isEdit = true;
    this.selectedPost = post;
  }

  onSubmit(formValue) {
    this.newPost = new Post(this.selectedPost.postIndex, formValue.postName);
    this.postService.editPost(this.selectedPost, this.newPost);
    this.isEdit = false;
  }

  onAdd(newPost) {
    this.clicked = true;
    if (newPost.valid) {
      this.postService.addPost(newPost.value);
    }
  }
}
