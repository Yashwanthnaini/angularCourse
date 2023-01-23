import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent {

  @Input("isLiked") isLiked: boolean = false;
  @Input("noOfLikes") noOfLikes: number = 1; 
  @Output() change= new EventEmitter();

  onClick(){
    this.noOfLikes += (this.isLiked) ? -1 : 1;
    this.isLiked = !this.isLiked;
    this.change.emit({ 
                        newValue : this.isLiked,
                        count : this.noOfLikes });
  }

}
