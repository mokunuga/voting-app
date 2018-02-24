import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from '../post/post.service';
import {CandidateService} from './candidate.service';
import {VoteService} from '../vote/vote.service';
import {AuthenticationService} from '../admin/authentication.service';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit, OnDestroy {

  private userLoggedIn;
  private adminLoggedIn;
  public posts;
  public candidate = null;
  private candidateId;
  public isCandidateSelected = false;
  private voted = false;
  private votedBefore = false;
  public candidatesSelected;
  private subscription: Subscription;
  private subscription1: Subscription;


  constructor(private as: AuthenticationService,
              private postService: PostService,
              private candidateService: CandidateService,
              private voteService: VoteService) {
    this.subscription = this.as.userLoggedIn.subscribe(
      (loggedIn) => {
        this.userLoggedIn = loggedIn;
      }
    );
    this.subscription1 = this.as.adminLoggedIn.subscribe(
      (loggedIn) => {
        this.adminLoggedIn = loggedIn;
      }
    );
  }

  ngOnInit() {
    this.postService.getPostsAPI().subscribe(
      data => this.posts = data
    );

  }

  postChanged(postIndex) {
    this.candidateService.getCandidatesByPostAPI(postIndex).subscribe(
      (data: {data}) => {
        this.candidatesSelected = data.data;
        this.isCandidateSelected = false;
      }
    );
    this.voted = false;
    this.votedBefore = false;
  }

  candidateChanged(candidateIndex) {
    this.candidateService.getCandidateAPI(candidateIndex).subscribe(
      data => {
        this.candidate = data[0];
        this.candidateId = this.candidate.id;
        this.isCandidateSelected = true;
      }
    );
    this.voted = false;
  }

  onVote() {
    const vote = {candidate_id: this.candidateId};
    this.voteService.hasUserVotedAPI(this.candidateId).subscribe(
      (data: {success}) => {
        console.log(data);
        if (!data.success) {
          this.voteService.addVotes(vote);
          this.voted = true;
        } else {
          this.voted = false;
          this.votedBefore = true;
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription1.unsubscribe();
  }
}
