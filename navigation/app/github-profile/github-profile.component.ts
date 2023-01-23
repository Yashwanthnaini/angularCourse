import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-github-profile',
  templateUrl: './github-profile.component.html',
  styleUrls: ['./github-profile.component.css']
})
export class GithubProfileComponent implements OnInit {

  
  constructor(private route: ActivatedRoute, private routee: Router ) { }

  ngOnInit() {
    this.route.paramMap
              .subscribe( params => {
                let id = params.get('id');
                console.log(params.get('id'))});
  }

  onSubmit(){
    this.routee.navigate(['/followers'],{
      queryParams:{ page:1, order: 'new'}
    })
  }

}
