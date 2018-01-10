import {Candidate} from '../candidate/candidate';

export class Vote {
  constructor(public candidate: Candidate, public voteCount: number) {
  }
}
