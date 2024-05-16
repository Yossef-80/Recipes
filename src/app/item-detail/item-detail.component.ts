import { Component } from '@angular/core';
import { allfood ,comment} from '../allfood';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.css'
})
export class ItemDetailComponent {
  userKey:Observable<string | null> | any;
  myAccKey:any=localStorage.getItem("userId");
  itemKey: string="";
  item: allfood|any;
  reviews: comment[] = [];
  selectedRating: number=0;
  ReviewRating:string="";
  followEnabled=true;
  favouriteEnabled=true;
  likesEnabled=true;
  constructor(private route: ActivatedRoute, private itemService: DatabaseService) {
   }
  AddToFavourite()
  {
    if(this.favouriteEnabled)
      {
           this.itemService.AddToFavourite(this.myAccKey,this.item)
    this.favouriteEnabled=false;
      }
 
  }
  FollowBtn()
  {
        console.log("the user of recipe to follow",this.userKey)
    if(this.followEnabled)
      {
         this.itemService.FollowUser(this.myAccKey,this.userKey)
    this.followEnabled=false;
      }
   
  }
  sendReview()
  {
    if(this.selectedRating!=0&&this.ReviewRating!=="")
    {
      this.itemService.rateTheRecipe(this.myAccKey,this.userKey,this.itemKey,this.selectedRating,this.ReviewRating);
    }

  }
  putLike()
  {
    if(this.likesEnabled)
      {
         this.itemService.likeRecipe(this.userKey,this.itemKey);
    this.likesEnabled=false
      }
   
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.itemKey = params['id'];
      // Fetch item data using item ID from your item service
      this.item = this.itemService.getSpecificRecipe(this.itemKey);
        if(this.item.reviews)
          {
             this.reviews=Object.values(this.item.reviews);

          }
       console.log("-----=+--")
      this.itemService.getUserKeyByRecipeKey(this.itemKey).subscribe((userKey:any)=>{
          this.userKey=userKey;
           console.log("the user of recipe",this.userKey)
      });
     
      console.log(this.reviews)
    });
  }
}
