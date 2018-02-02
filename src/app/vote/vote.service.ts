import { Injectable } from '@angular/core';
import {CandidateService} from '../candidate/candidate.service';
import {Candidate} from '../candidate/candidate';
import {Vote} from './vote';
import {AuthenticationService} from '../admin/authentication.service';

@Injectable()
export class VoteService {
  private candidate: Candidate;
  private votes: Vote[] = [];
  private candidateVotes: number;
  private newVote: Vote;
  private candidateIndex: number;
  private localVotes;
  private userIdArray: number[];
  constructor(private candidateService: CandidateService,
              private as: AuthenticationService) { }

  getVotes() {
    if (localStorage.getItem('votes') === null) {
      localStorage.setItem('votes', JSON.stringify(this.votes));
    }
    this.localVotes = JSON.parse(localStorage.getItem('votes'));
    return this.localVotes;
  }

  onVote(candidateId) {
    this.candidate = this.candidateService.getCandidate(candidateId);
    this.candidateVotes = this.getCandidateVotes();
    this.candidateIndex = this.findCandidateIndex();

    if (this.hasUserVotedBefore()) {
      return false;
    } else {
      this.userIdArray.push(this.as.getCurrentUser().identificationNo);
      this.newVote = {candidate: this.candidate, voteCount: this.candidateVotes + 1, usersId: this.userIdArray};
      this.votes = this.getVotes();
      if (this.candidateVotes > 0 && this.candidateIndex !== -1) {
        this.votes[this.candidateIndex] = this.newVote;
      }else {
        this.votes.push(this.newVote);
      }
      this.updateLocalStorage();
      return true;
    }
  }

  getCandidateVotes() {
    let voteCount = 0;
    if (this.findCandidateIndex() === -1) {
      voteCount = 0;
      this.userIdArray = [];
    }else {
      voteCount = this.votes[this.findCandidateIndex()].voteCount;
      this.userIdArray = this.votes[this.findCandidateIndex()].usersId;
    }
    return voteCount;
  }

  getUsersVotedPerPost() {
    let users = [];
    console.log(this.votes);
    for (let i = 0; i < this.votes.length; i++) {
      if (this.votes[i].candidate.postIndex === this.candidate.postIndex) {
        users = users.concat(this.votes[i].usersId);
      }
    }
  return users;
  }

  findCandidateIndex() {
    this.votes = this.getVotes();
    for (let i = 0; i < this.votes.length; i++) {
      if (JSON.stringify(this.votes[i].candidate) === JSON.stringify(this.candidate)) {
        return i;
      }
    }
    return -1;
  }

  updateLocalStorage() {
    localStorage.setItem('votes', JSON.stringify(this.votes));
  }

  hasUserVotedBefore() {
    const users = this.getUsersVotedPerPost();
    if (users.indexOf(this.as.getCurrentUser().identificationNo) === -1) {
      return false;
    }else {
      return true;
    }
  }

  clearData() {
    localStorage.removeItem('votes');
  }
}
