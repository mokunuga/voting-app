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
  private localPosts;
  constructor() { }

  getPosts() {
    if (localStorage.getItem('posts') === null) {
      localStorage.setItem('posts', JSON.stringify(this.posts));
    }
    this.localPosts = JSON.parse(localStorage.getItem('posts'));
    return this.localPosts;
  }

  getPost(postIndex) {
    return this.getPosts()[postIndex - 1];
  }

  editPost(oldPost: Post, newPost: Post) {
    this.posts = this.getPosts();
    this.posts[this.posts.indexOf(oldPost)] = newPost;
    this.updateLocalStorage();
  }

  addPost(postName: string) {
    let postIndex = this.posts.length + 1;
    let newPost = new Post(postIndex, postName);
    this.posts = this.getPosts();
    this.posts.push(newPost);
    this.updateLocalStorage();
  }

  updateLocalStorage() {
    localStorage.setItem('posts', JSON.stringify(this.posts));
  }

  deletPost(post: Post) {
    this.posts = this.getPosts();
    this.posts.splice(this.posts.indexOf(post), 1);
    this.updateLocalStorage();
  }

}
