import { Injectable, OnInit} from '@angular/core';
import {PostService} from '../post/post.service';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../admin/authentication.service';

@Injectable()
export class CandidateService implements OnInit {
  constructor(private postService: PostService, private http: HttpClient, private as: AuthenticationService) { }

  ngOnInit() {}

  getCandidatesAPI() {
    return this.http.get('http://secure-ballot-api.herokuapp.com/api/candidates');
  }

  getCandidatesByPostAPI(id) {
    return this.http.get('http://secure-ballot-api.herokuapp.com/api/candidate-by-post/' + id );
  }

  getCandidateAPI(id) {
    return this.http.get('http://secure-ballot-api.herokuapp.com/api/candidates/' + id );
  }

  addCandidateAPI(candidate) {
    return this.http.post('http://secure-ballot-api.herokuapp.com/api/create-candidate', candidate, {headers: {'Authorization': 'Bearer ' + this.as.getToken()}});
  }

  updateCandidateAPI(candidate, id) {
    return this.http.put('http://secure-ballot-api.herokuapp.com/api/update-candidate/' + id, candidate, {headers: {'Authorization': 'Bearer ' + this.as.getToken()}});
  }

  deleteCandidateAPI(id) {
    return this.http.delete('http://secure-ballot-api.herokuapp.com/api/delete-candidate/' + id, {headers: {'Authorization': 'Bearer ' + this.as.getToken()}});
  }

}
