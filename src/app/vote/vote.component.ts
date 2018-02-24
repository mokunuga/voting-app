import { Component, OnInit } from '@angular/core';
import {VoteService} from './vote.service';
import {UserService} from '../user/user.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  private votes;
  constructor(private voteService: VoteService, private userService: UserService) { }

  ngOnInit() {
    this.voteService.getVotesAPI().subscribe(
      data => {
        this.votes = data;
        console.log(this.votes);
      }
    );
  }

}
