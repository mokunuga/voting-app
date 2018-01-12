import {RouterModule, Routes} from '@angular/router';

import {CandidateComponent} from './candidate/candidate.component';
import {PostComponent} from './post/post.component';
import {AdminComponent} from './admin/admin.component';
import {LoginComponent} from './admin/login/login.component';
import {LogoutComponent} from './admin/login/logout.component';
import {AuthGuard} from './admin/auth.guard';
import {CandidateEditComponent} from './admin/candidate-edit/candidate-edit.component';
import {VoteComponent} from './vote/vote.component';
import {UserComponent} from './user/user.component';

const app_routes: Routes = [
  {path: '', redirectTo: '/candidates', pathMatch: 'full'},
  {path: 'candidates', component: CandidateComponent},
  {path: ':id/edit', component: CandidateEditComponent},
  {path: 'new', component: CandidateEditComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
      {path: 'view-votes', component: VoteComponent, canActivate: [AuthGuard]},
      {path: 'posts', component: PostComponent},
    ]},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'register', component: UserComponent}
];

export const routes = RouterModule.forRoot(app_routes);
