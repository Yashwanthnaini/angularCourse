import { ActivatedRoute } from '@angular/router';
import { GithubFollowersService } from './github-followers.service';

import { Component, OnInit } from '@angular/core';


import { combineLatest } from 'rxjs';

import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.css']
})
export class GithubFollowersComponent implements OnInit {
  followers:any = [];
  constructor(private service: GithubFollowersService, private route: ActivatedRoute) { }

  ngOnInit() {
    combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ])
    .pipe(
      switchMap( combined =>{
        let id = combined[0].get('id');
        let page = combined[1].get('page');
        return this.service.getAll()
    }))
    .subscribe(followers => this.followers = followers);

  // ngOnInit() {
  //   combineLatest([
  //     this.route.paramMap,
  //     this.route.queryParamMap
  //   ])
  //   .subscribe(combined =>{
  //     let id = combined[0].get('id');
  //     let page = combined[1].get('page');
  //     this.service.getAll()
  //     .subscribe(followers => this.followers = followers);
  //   })
    

  }
}