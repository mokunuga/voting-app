import { Component, OnInit } from '@angular/core';
import {VoteService} from './vote.service';
import {Vote} from './vote';
import {UserService} from '../user/user.service';
import {User} from '../user/user';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  private votes: Vote[] = this.voteService.getVotes();
  private users: User[] = this.userService.getUsers();

  constructor(private voteService: VoteService, private userService: UserService) { }

  ngOnInit() {
  }

  getUser(userId) {
    for (let i = 0; i < this.users.length; i++){
      if (this.users[i].identificationNo === userId){
        return this.users[i].firstName;
      }
    }
  }
}
