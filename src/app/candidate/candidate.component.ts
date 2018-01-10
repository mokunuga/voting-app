import { Component, OnInit } from '@angular/core';
import {CandidateService} from './candidate.service';
import {Candidate} from './candidate';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {

  constructor(private candidateService: CandidateService) { }
  private selectedCandidate: Candidate;

  ngOnInit() {
  }
}
