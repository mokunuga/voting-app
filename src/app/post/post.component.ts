import { Component, OnInit } from '@angular/core';
import {PostService} from './post.service';
import {Post} from './post';
import {Candidate} from '../candidate/candidate';
import {CandidateService} from '../candidate/candidate.service';
import {VoteService} from '../vote/vote.service';
import {AuthenticationService} from '../admin/authentication.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
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
    this.clicked = false;
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
    this.posts = this.postService.getPosts();
    this.isEdit = false;
  }

  onCancel() {
    this.isEdit = false;
  }

  onDelete(post: Post) {
    this.postService.deletPost(post);
    this.posts = this.postService.getPosts();
  }
}
