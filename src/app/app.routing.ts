import {RouterModule, Routes} from '@angular/router';

import {CandidateComponent} from './candidate/candidate.component';
import {PostComponent} from './post/post.component';
import {CandidateDetailComponent} from './candidate/candidate-detail/candidate-detail.component';
import {CandidateListComponent} from './candidate/candidate-list/candidate-list.component';
import {AdminComponent} from './admin/admin.component';
import {CandidateDetailStartComponent} from './candidate/candidate-detail/candidate-detail-start.component';
import {CandidateListStartComponent} from './candidate/candidate-list/candidate-list-start.component';
import {LoginComponent} from './admin/login/login.component';
import {LogoutComponent} from './admin/logout.component';
import {AuthenticationService} from './admin/authentication.service';
import {AuthGuard} from './admin/auth.guard';
import {CandidateEditComponent} from './admin/candidate-edit/candidate-edit.component';
import {CANDIDATE_ROUTES} from './candidate/candidate.routing';
import {VoteComponent} from './vote/vote.component';

const app_routes: Routes = [
  {path: '', redirectTo: '/posts', pathMatch: 'full'},
  {path: 'posts', component: PostComponent, children: [
      {path: ':id/edit', component: CandidateEditComponent}
    ]},
  {path: 'candidates', component: CandidateComponent, children: [
      {path: '', component: CandidateListComponent, children: CANDIDATE_ROUTES}
    ]},

  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
      {path: 'view-votes', component: VoteComponent, canActivate: [AuthGuard]}
    ]},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent}
];

export const routes = RouterModule.forRoot(app_routes);
