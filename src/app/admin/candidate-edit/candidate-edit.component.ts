import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Candidate} from '../../candidate/candidate';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {CandidateService} from '../../candidate/candidate.service';
import {Post} from '../../post/post';
import {NgForm} from '@angular/forms';
import {PostService} from '../../post/post.service';

@Component({
  selector: 'app-candidate-edit',
  templateUrl: './candidate-edit.component.html',
  styleUrls: ['./candidate-edit.component.css']
})
export class CandidateEditComponent implements OnInit, OnDestroy {
  @Input() candidate: Candidate;
  @Input() posts: Post[] = this.postService.getPosts();
  private subscription: Subscription;
  private isNew = false;
  private candidateId: number;
  private candidatePost: Post;
  private newCandidate: Candidate;
  private candidates: Candidate[] = this.candidateService.getCandidates();

  constructor(private route: ActivatedRoute,
              private candidateService: CandidateService,
              private postService: PostService,
              private router: Router) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('id')) {
          this.isNew = false;
          this.candidateId = +params['id'];
          this.candidate = this.candidateService.getCandidate(this.candidateId);
          this.candidatePost = this.candidateService.getCandidatePost(this.candidate.postIndex);
        }else {
          this.isNew = true;
          this.candidate = {
            firstName: '', lastName: '', candidateImage: '', manifesto: '', postIndex: null
          };
          this.candidatePost = {postName: null, postIndex: null};
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    this.newCandidate = new Candidate(form.value.firstName, form.value.lastName, +form.value.post,
      form.value.manifesto, form.value.candidateImage);
    if (!this.isNew) {
      console.log(this.candidate);
      console.log(this.newCandidate);
      this.candidateService.updateCandidate(this.candidate, this.newCandidate);
    } else {
      this.candidateService.addCandidate(this.newCandidate);
    }
    console.log(this.route);
    this.router.navigate(['../'], {relativeTo: this.route});
   }

   onDelete() {
    this.candidateService.deleteCandidate(this.candidate);
    this.router.navigate(['../../'], {relativeTo: this.route});
   }
}
