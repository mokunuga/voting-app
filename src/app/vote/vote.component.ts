import { Component, OnInit } from '@angular/core';
import {VoteService} from './vote.service';
import {Vote} from './vote';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  private votes: Vote[] = this.voteService.getVotes();
  constructor(private voteService: VoteService) { }

  ngOnInit() {
  }

}
