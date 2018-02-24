import { Injectable } from '@angular/core';
import {CandidateService} from '../candidate/candidate.service';
import {AuthenticationService} from '../admin/authentication.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class VoteService {
  constructor(private candidateService: CandidateService,
              private as: AuthenticationService,
              private http: HttpClient) { }


  getVotesAPI() {
    return this.http.get('http://secure-ballot-api.herokuapp.com/api/votes', {headers: {'Authorization': 'Bearer ' + this.as.getToken()}});
  }

  hasUserVotedAPI(candidateId) {
    return this.http.get('http://secure-ballot-api.herokuapp.com/api/user-voted/' + candidateId, {headers: {'Authorization': 'Bearer ' + this.as.getToken()}});
  }

  addVotesAPI(vote) {
    return this.http.post('http://secure-ballot-api.herokuapp.com/api/create-vote', vote, {headers: {'Authorization': 'Bearer ' + this.as.getToken()}});
  }

  addVotes(vote) {
    this.addVotesAPI(vote).subscribe(
      (data: {success, error, data}) => {
        if (data.success) {
            return true;
        } else {
          return data.error;
        }
      }
    );
  }
}
