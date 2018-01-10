import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-edit-start',
  template: `
    <a class="col-sm-6 col-md-3 col-xs-6 pull-right btn btn-success" routerLink="edit-posts">Edit Posts</a>
  `,
  styles: []
})
export class PostEditStartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
