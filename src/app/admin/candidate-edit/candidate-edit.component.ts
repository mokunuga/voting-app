import {Component, Input, OnDestroy, OnInit} from '@angular/core';
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
  @Input() candidate;
  @Input() posts;
  private subscription: Subscription;
  private isNew = false;
  private candidateId: number;
  private candidatePost: Post;
  private newCandidate;

  constructor(private route: ActivatedRoute,
              private candidateService: CandidateService,
              private postService: PostService,
              private router: Router) { }

  ngOnInit() {
    this.postService.getPostsAPI().subscribe(
      data => this.posts = data
    );
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('id')) {
          this.isNew = false;
          this.candidateService.getCandidateAPI(+params['id']).subscribe(
            data => {
              this.candidate = data[0];
            }
          );
          this.candidateId = +params['id'];
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

  onSubmit(form: NgForm) {
    this.newCandidate = {first_name: form.value.firstName,
                        last_name: form.value.lastName,
                        post_id: +form.value.post,
                        manifesto: form.value.manifesto,
                        candidate_image: form.value.candidateImage};
    if (!this.isNew) {
      this.candidateService.updateCandidateAPI(this.newCandidate, this.candidateId).subscribe(
        data => console.log(data)
      );
    } else {
      this.candidateService.addCandidateAPI(this.newCandidate).subscribe(
        data => console.log(data)
      );
    }
    this.router.navigate(['/candidates']);
  }

  onDelete() {
    this.candidateService.deleteCandidateAPI(this.candidateId).subscribe(
      data => console.log(data)
    );
    this.router.navigate(['/candidates'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
