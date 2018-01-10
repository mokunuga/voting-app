import {CandidateDetailStartComponent} from './candidate-detail/candidate-detail-start.component';
import {CandidateEditComponent} from '../admin/candidate-edit/candidate-edit.component';
import {CandidateDetailComponent} from './candidate-detail/candidate-detail.component';
import {Routes} from '@angular/router';
import {PostEditComponent} from '../admin/post-edit/post-edit.component';
import {PostEditStartComponent} from '../admin/post-edit/post-edit-start.component';

export const CANDIDATE_ROUTES: Routes = [
  {path: '', component: CandidateDetailStartComponent},
  {path: 'new', component: CandidateEditComponent},

  {path: ':id', component: CandidateDetailComponent},
  {path: ':id/edit', component: CandidateEditComponent, children: [
      {path: '', component: PostEditStartComponent},
      {path: 'edit-posts', component: PostEditComponent }
    ]},
];
