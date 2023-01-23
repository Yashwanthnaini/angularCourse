import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  tweet = {
    text : "body text",
    isLiked : true,
    noOfLikes : 6
  }

  onChange(eventArgs: {}){
    console.log(eventArgs);
  }
}
