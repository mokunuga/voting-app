import {Component, Input, OnInit} from '@angular/core';
import {CandidateService} from '../candidate.service';
import {Candidate} from '../candidate';

@Component({
  selector: 'app-candidate-item',
  templateUrl: './candidate-item.component.html',
  styleUrls: ['./candidate-item.component.css']
})
export class CandidateItemComponent implements OnInit {
  @Input() private candidate: Candidate;
  @Input() candidateId: number;
  private candidates = this.candidateService.getCandidates();
  private candidatePost: string;

  constructor(private candidateService: CandidateService) { }

  ngOnInit() {
    this.candidatePost = this.candidateService.getCandidatePost(this.candidate.postIndex).postName;

    this.candidateId = this.candidateService.getCandidateIndex(this.candidate);
/*    for (let i = 0; i < this.candidates.length; i++) {
      if (JSON.stringify(this.candidates[i]) === JSON.stringify(this.candidate)) {
        this.candidateId = i;
      }
    }*/
  }

}
