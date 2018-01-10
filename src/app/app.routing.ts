import {RouterModule, Routes} from '@angular/router';

import {CandidateComponent} from './candidate/candidate.component';
import {PostComponent} from './post/post.component';
import {AdminComponent} from './admin/admin.component';
import {LoginComponent} from './admin/login/login.component';
import {LogoutComponent} from './admin/logout.component';
import {AuthGuard} from './admin/auth.guard';
import {CandidateEditComponent} from './admin/candidate-edit/candidate-edit.component';
import {VoteComponent} from './vote/vote.component';

const app_routes: Routes = [
  {path: '', redirectTo: '/candidates', pathMatch: 'full'},
  {path: 'posts', component: PostComponent},
  {path: 'candidates', component: CandidateComponent},
  {path: ':id/edit', component: CandidateEditComponent},
  {path: 'new', component: CandidateEditComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
      {path: 'view-votes', component: VoteComponent, canActivate: [AuthGuard]}
    ]},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent}
];

export const routes = RouterModule.forRoot(app_routes);