import { Injectable } from '@angular/core';
import {Post} from './post';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../admin/authentication.service';

@Injectable()
export class PostService {
  constructor(private http: HttpClient, private as: AuthenticationService) { }

  getPostsAPI() {
    return this.http.get('http://secure-ballot-api.herokuapp.com/api/posts');
  }

  getPostAPI(id) {
    return this.http.get('http://secure-ballot-api.herokuapp.com/api/post ' + id);
  }

  addPostAPI(post) {
    return this.http.post('http://secure-ballot-api.herokuapp.com/api/create-post', post, {headers: {'Authorization': 'Bearer ' + this.as.getToken()}});
  }

  updatePostAPI(post, oldPost) {
    return this.http.put('http://secure-ballot-api.herokuapp.com/api/update-post/' + oldPost.id, post, {headers: {'Authorization': 'Bearer ' + this.as.getToken()}});
  }

  deletePostAPI(post) {
    return this.http.delete('http://secure-ballot-api.herokuapp.com/api/delete-post/' + post.id, {headers: {'Authorization': 'Bearer ' + this.as.getToken()}});
  }
}
