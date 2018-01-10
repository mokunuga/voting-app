import {EventEmitter, Injectable, OnInit, Output} from '@angular/core';
import {Candidate} from './candidate';
import {PostService} from '../post/post.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class CandidateService implements OnInit {
  private candidateUpdate = new Subject<Candidate[]>();
  candidateUpdated$ = this.candidateUpdate.asObservable();
  private localCandidates;
  private candidates: Candidate[] = [
    new Candidate('Melody',
                  'Okunuga',
                  1,
                  '“I have a dream that one day this nation will rise up and live out the true meaning of its creed: ‘We hold these truths to be self-evident, that all men are created equal.’”\n' +
      '“I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin, but by the content of their character.”\n' +
      '“I have a dream that one day on the red hills of Georgia the sons of former slaves and the sons of former slave owners will be able to sit down together at a table of brotherhood.”\n' +
      '“With this faith we will be able to work together, to pray together, to struggle together, to go to jail together, to stand up for freedom together, knowing that we will be free one day.”\n' +
      '“Now is the time to lift our nation from the quicksand of racial injustice to the solid rock of brotherhood. Now is the time to make justice a reality for all of God’s children.”',
                  'https://assets.about.me/background/users/m/e/l/melodyokunuga_1459467791_42.jpg'),
    new Candidate('Funmilayo',
                  'Ifeoluwa',
                  2,
                  'THE PROBLEM:\n' +
      'E-mail takes too long to respond to, resulting in continuous inbox overflow for those who receive a lot of it.\n' +
      'THE SOLUTION:\n' +
      'Treat all email responses like SMS text messages, using a set number of letters per response. Since it’s too hard to count letters, we count sentences instead.\n',
                  'https://media-exp2.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAjRAAAAJGY3NDliODliLTk5NWQtNDBkMi04NWQ4LTJkM2FhZmViYWUwMg.jpg'),
    new Candidate('Lionel',
      'Messi',
      3,
      'I want to be Gen Sec',
      'http://images.performgroup.com/di/library/goal_es/72/56/lionel-messi-sevilla-barcelona-laliga-06112016_1d1wu95d62alx1ai4xwymyrxoj.jpg?t=997769880&w=620&h=430'),
    new Candidate('Barack',
      'Obama',
      1,
      'I want to be President',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/BarackObama2005portrait.jpg/1200px-BarackObama2005portrait.jpg'),
    new Candidate('Funsho',
      'Williams',
      4,
      'I want to be Treasurer',
      'http://www.gospelify.com/webfolders/wp-content/uploads/2015/03/Spread-love_track-cover.jpg')

  ];
  constructor(private postService: PostService) { }

  ngOnInit() {}

  getCandidates() {
    if (localStorage.getItem('candidates') === null) {
      localStorage.setItem('candidates', JSON.stringify(this.candidates));
    }
    this.localCandidates = JSON.parse(localStorage.getItem('candidates'));
    return this.localCandidates;
  }

  getCandidatesbyPost(postIndex) {
    return this.getCandidates().filter(x => x.postIndex === +postIndex);
  }

  getCandidatePost(postIndex: number) {
    return this.postService.getPost(postIndex);
  }

  getCandidate(candidateId: number) {
    return this.getCandidates()[candidateId];
  }

  addCandidate(candidate: Candidate) {
    this.candidates = this.getCandidates();
    this.candidates.push(candidate);
    this.updateLocalStorage();
  }

  updateCandidate(oldCandidate, newCandidate) {
    this.candidates = this.getCandidates();
    this.candidates[this.getCandidateIndex(oldCandidate)] = newCandidate;
    this.updateLocalStorage();
  }

  deleteCandidate(candidate: Candidate) {
    this.candidates = this.getCandidates();
    this.candidates.splice(this.candidates.indexOf(candidate), 1);
    this.updateLocalStorage();
  }

  getCandidateIndex(candidate) {
    for (let i = 0; i < this.getCandidates().length; i++) {
      if (JSON.stringify(this.getCandidates()[i]) === JSON.stringify(candidate)) {
        return i;
      }
    }
    return null;
  }

  updateLocalStorage() {
    localStorage.setItem('candidates', JSON.stringify(this.candidates));
    this.localCandidates = JSON.parse(localStorage.getItem('candidates'));
    this.candidateUpdate.next(this.localCandidates);
  }
}
