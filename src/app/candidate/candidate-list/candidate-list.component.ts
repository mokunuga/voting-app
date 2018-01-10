import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {CandidateService} from '../candidate.service';
import {Candidate} from '../candidate';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Post} from '../../post/post';
import {PostService} from '../../post/post.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit, OnDestroy {
  private candidates: Candidate[] = this.candidateService.getCandidates();
  private CandidateSelected: Candidate[] = [];
  private sub: any;
  private id: number;
  @Output() private selectedCandidate = new EventEmitter();

  constructor(private candidateService: CandidateService,
              private route: ActivatedRoute) {
    candidateService.candidateUpdated$.subscribe(
      (localCandidates) => {
        this.candidates = localCandidates;
        this.initialize();
      }
    );
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.initialize();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private initialize() {
    this.sub = this.route.params.subscribe(params => {
      if (params['postIndex']) {
        this.id = +params['postIndex'];
        this.CandidateSelected = this.candidates.filter(x => x.postIndex === this.id);
      }else {
        this.CandidateSelected = this.candidates;
      }
    });
  }

  onClick(candidate: Candidate) {
    this.selectedCandidate.emit(candidate);
  }
}
