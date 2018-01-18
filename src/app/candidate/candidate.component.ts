import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from '../post/post.service';
import {Post} from '../post/post';
import {Candidate} from './candidate';
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
  private posts: Post[] = this.postService.getPosts();
  private candidate: Candidate = null;
  private candidateId;
  private isCandidateSelected = false;
  private voted = false;
  private votedBefore = false;
  private candidatesSelected: Candidate[];
  private candidatePost: Post;
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
  }

  postChanged(postIndex) {
    this.candidatesSelected = this.candidateService.getCandidatesbyPost(postIndex);
    this.isCandidateSelected = false;
    this.voted = false;
    this.votedBefore = false;
  }

  candidateChanged(candidateIndex) {
    this.candidate = this.candidateService.getCandidate(candidateIndex);
    this.candidateId = this.candidateService.getCandidateIndex(this.candidate);
    this.candidatePost = this.postService.getPost(this.candidate.postIndex);
    this.isCandidateSelected = true;
    this.voted = false;
  }

  onVote() {
    this.voted = this.voteService.onVote(this.candidateId);
    if (!this.voted) {
      this.votedBefore = true;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription1.unsubscribe();
  }
}
