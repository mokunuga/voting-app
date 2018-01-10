import { Component, OnInit } from '@angular/core';
import {PostService} from './post.service';
import {Post} from './post';
import {Candidate} from '../candidate/candidate';
import {CandidateService} from '../candidate/candidate.service';
import {VoteService} from '../vote/vote.service';
import {AuthenticationService} from '../admin/authentication.service';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  private loggedIn;
  private posts: Post[] = this.postService.getPosts();
  private candidate: Candidate = null;
  private candidateId;
  private isCandidateSelected = false;
  private voted = false;
  private candidatesSelected: Candidate[];
  private sub: Subscription;
  private isEdit = false;


  constructor(private as: AuthenticationService,
              private postService: PostService,
              private candidateService: CandidateService,
              private voteService: VoteService,
              private route: ActivatedRoute) {
    this.as.userLoggedIn.subscribe(
      (loggedIn) => {
        this.loggedIn = loggedIn;
      }
    );
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('edit')) {
          this.isEdit = true;
        }
      });
  }

  postChanged(postIndex) {
    this.candidatesSelected = this.candidateService.getCandidatesbyPost(postIndex);
    this.isCandidateSelected = false;
    this.voted = false;
  }

  candidateChanged(candidateIndex) {
    this.candidate = this.candidateService.getCandidate(candidateIndex);
    this.candidateId = this.candidateService.getCandidateIndex(this.candidate);
    this.isCandidateSelected = true;
    this.voted = false;
  }

  onVote() {
    this.voted = true;
    this.voteService.onVote(this.candidateId);
  }
}
