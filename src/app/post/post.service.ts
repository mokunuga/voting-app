import { Injectable } from '@angular/core';
import {Post} from './post';

@Injectable()
export class PostService {
  private posts: Post[] = [
    new Post(1, 'President'),
    new Post(2, 'Vice President'),
    new Post(3, 'General Secretary'),
    new Post(4, 'Treasurer')

  ];
  constructor() { }

  getPosts() {
    return this.posts;
  }

  getPost(postIndex) {
    return this.posts[postIndex - 1];
  }

  editPost(oldPost: Post, newPost: Post) {
    this.posts[this.posts.indexOf(oldPost)] = newPost;
  }

  addPost(postName: string) {
    let postIndex = this.posts.length + 1;
    let newPost = new Post(postIndex, postName);
    this.posts.push(newPost);
  }
}
