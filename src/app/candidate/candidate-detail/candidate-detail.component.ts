import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Candidate} from '../candidate';
import {ActivatedRoute} from '@angular/router';
import {constructDependencies} from '@angular/core/src/di/reflective_provider';
import {CandidateService} from '../candidate.service';
import {VoteService} from '../../vote/vote.service';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.css']
})
export class CandidateDetailComponent implements OnInit, OnDestroy {
  @Input() candidate: Candidate;
  private sub: any;
  private candidateId: number;
  private candidatePost;
  constructor(private route: ActivatedRoute, private candidateService: CandidateService, private voteService: VoteService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      (params: any) => {
        this.candidateId = +params['id'];
        this.candidate = this.candidateService.getCandidate(this.candidateId);
        this.candidatePost = this.candidateService.getCandidatePost(this.candidate.postIndex).postName;
      }
    );

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onVote() {
    this.voteService.onVote(this.candidateId);
  }
}
