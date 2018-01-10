import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CandidateComponent } from './candidate/candidate.component';
import { PostComponent } from './post/post.component';
import {PostService} from './post/post.service';
import {CandidateService} from './candidate/candidate.service';
import { CandidateListComponent } from './candidate/candidate-list/candidate-list.component';
import { CandidateItemComponent } from './candidate/candidate-item/candidate-item.component';
import { CandidateDetailComponent } from './candidate/candidate-detail/candidate-detail.component';
import {routes} from './app.routing';
import { AdminComponent } from './admin/admin.component';
import { CandidateEditComponent } from './admin/candidate-edit/candidate-edit.component';
import { CandidateDetailStartComponent } from './candidate/candidate-detail/candidate-detail-start.component';
import { CandidateListStartComponent } from './candidate/candidate-list/candidate-list-start.component';
import {BsDropdownModule} from 'ngx-bootstrap';
import { LoginComponent } from './admin/login/login.component';
import {AuthenticationService} from './admin/authentication.service';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LogoutComponent } from './admin/logout.component';
import {AuthGuard} from './admin/auth.guard';
import { VoteComponent } from './vote/vote.component';
import { PostEditComponent } from './admin/post-edit/post-edit.component';
import { PostEditStartComponent } from './admin/post-edit/post-edit-start.component';
import {VoteService} from './vote/vote.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CandidateComponent,
    PostComponent,
    CandidateListComponent,
    CandidateItemComponent,
    CandidateDetailComponent,
    AdminComponent,
    CandidateEditComponent,
    CandidateDetailStartComponent,
    CandidateListStartComponent,
    LoginComponent,
    LogoutComponent,
    VoteComponent,
    PostEditComponent,
    PostEditStartComponent,
  ],
  imports: [
    BsDropdownModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routes
  ],
  providers: [AuthGuard, PostService, CandidateService, AuthenticationService, VoteService],
  bootstrap: [AppComponent]
})



export class AppModule { }
