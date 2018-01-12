import { Injectable } from '@angular/core';
import {CandidateService} from '../candidate/candidate.service';
import {Candidate} from '../candidate/candidate';
import {Vote} from './vote';

@Injectable()
export class VoteService {
  private candidate: Candidate;
  private votes: Vote[] = [];
  private candidateVotes: number;
  private newVote: Vote;
  private candidateIndex: number;
  private localVotes;
  constructor(private candidateService: CandidateService) { }

  getVotes() {
    if (localStorage.getItem('votes') === null) {
      localStorage.setItem('votes', JSON.stringify(this.votes));
    }
    this.localVotes = JSON.parse(localStorage.getItem('votes'));
    return this.localVotes;
  }

  getCandidateVotes() {
    let voteCount = 0;
    if (this.findCandidateIndex() === -1) {
      voteCount = 0;
    }else {
      voteCount = this.votes[this.findCandidateIndex()].voteCount;
    }
    return voteCount;
  }

  onVote(candidateId) {
    this.candidate = this.candidateService.getCandidate(candidateId);
    this.candidateVotes = this.getCandidateVotes();
    this.candidateIndex = this.findCandidateIndex();
    this.newVote = {candidate: this.candidate, voteCount: this.candidateVotes + 1};
    this.votes = this.getVotes();
    if (this.candidateVotes > 0 && this.candidateIndex !== -1) {
      this.votes[this.candidateIndex] = this.newVote;
    }else {
      this.votes.push(this.newVote);
    }
    this.updateLocalStorage();
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
}
