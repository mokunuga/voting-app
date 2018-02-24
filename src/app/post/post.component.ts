import { Component, OnInit } from '@angular/core';
import {PostService} from './post.service';
import {Post} from './post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  private posts;
  public model: Post = {
    postIndex: null, postName: null
  };
  public isEdit = false;
  public selectedPost: Post;
  public clicked: boolean;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.clicked = false;
    this.getPosts();
  }

  onEdit(post: Post) {
    this.isEdit = true;
    this.selectedPost = post;
    this.clicked = false;
  }

  onSubmit(formValue) {
    this.postService.updatePostAPI({name: formValue.postName}, this.selectedPost).subscribe(
      data => {
        console.log(data);
        this.getPosts();
      }
    );
    this.isEdit = false;
  }

  onAdd(newPost) {
    this.clicked = true;
    if (newPost.valid) {
      this.postService.addPostAPI({name: newPost.value}).subscribe(
        data => {
          console.log(data);
          this.getPosts();
        }
      );
    }
    this.isEdit = false;
  }

  onCancel() {
    this.isEdit = false;
  }

  onDelete(post: Post) {
    this.postService.deletePostAPI(post).subscribe(
      data => {
        console.log(data);
        this.getPosts();
      }
    );
  }

  getPosts() {
    this.postService.getPostsAPI().subscribe(
      data => {
        this.posts = data;
      }
    );
  }
}
