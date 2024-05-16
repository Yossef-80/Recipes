/*import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {


}*/
import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { UserAccount, allfood } from '../allfood';
import { user } from '@angular/fire/auth';
interface edit{
  photo: string;
  name: string;
}

interface add_recipe{
  photo: string;
  name: string;
  cousine: string;
  time: number;
  rate: number;
}

interface info{
  recipes: any;
  followers: any;
  following: any;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent {


    updatedUserName:string="";
    updatedPhoto!: File;

    userId:any=localStorage.getItem('userId');
    add:allfood[]=[];
    followingList:userFollow[]=[];
    followerList:userFollow[]=[];
   /* add: add_recipe[] = [
    {
      photo: '../../assets/images/pasta.jpg',
      name: 'Pasta',
      cousine: 'Italy',
      time: 40,
      rate: 5.3
    },
    {
      photo: '../../assets/images/pasta22.jpg',
      name: 'Spaghetti Bolognese',
      cousine: 'Italy',
      time: 45,
      rate: 4.0
    },
    {
      photo: '../../assets/images/burger.jpeg',
      name: 'Burger',
      cousine: 'USA',
      time: 25,
      rate: 5.0
    },
    // Add more recipe objects as needed
  ]
  */;
  user_data:UserAccount ={};
  constructor(private db:DatabaseService)
  {

  }
  info_following: info | any;
  ;

  editProfile: edit[] = [
    {
      photo: '../../assets/images/profilePhoto.jpeg',
      name: 'Mahmoud'
    }
  ];

  isEditProfileOpen: boolean = false;
  isFollowingListOpen:boolean=false;
  isFollowersListOpen:boolean=false;
  toggleFollowersList()
  {
    this.isFollowersListOpen=!this.isFollowersListOpen;
  }
    toggleFollowingList()
    {
      this.isFollowingListOpen=!this.isFollowingListOpen;
    }
  toggleEditProfile() {
    this.isEditProfileOpen = !this.isEditProfileOpen;
  }
  
  unfollowUser(index:number) {
      console.log("index",index);
      let userToUnfollow=this.followingList.at(index)
      let userToUnfollowKey=userToUnfollow?.key;

     console.log(userToUnfollow)
     if(userToUnfollowKey)
      {
             this.db.unfollowUser(this.userId,userToUnfollowKey);

      }
  }
  


  ngOnInit()
  {
    this.db.getRecipes(this.userId).subscribe((recipes: allfood[])=>{
      this.add=recipes;
    });
   
    this.db.getUserData(this.userId).subscribe(userData=>{
      console.log("recipes",userData?.recipeCount)
      //this.info_following!.recipes= (userData as UserAccount).recipeCount?? 0;
      this.user_data.followers=userData?.followers;
      this.user_data.following=userData?.following;
      this.user_data.recipeCount=userData?.recipeCount;
      this.user_data.userName=userData?.userName;
      this.user_data.img=userData?.img;
      if(this.user_data.following!=0)
        {
            this.getFollowing();
        }
        if(this.user_data.followers!=0)
          {
            this.getFollowers();
          }
      //this.info_following!.followers=userData?.followers;
      //this.info_following!.following=userData?.following;
    });
  }
  getFollowing()
  {
    this.db.getFollowingList(this.userId).subscribe(following=>{
      this.followingList= following;
    });
  }
  getFollowers()
  {
    this.db.getFollowersList(this.userId).subscribe(followers=>{
     this.followerList=followers;
    })
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
      // You can now access the selected file and handle it as needed
      // For example, you can assign it to a property like recipePhoto
      this.updatedPhoto = file;
      console.log("file uploaded")
  
  }
  updateUserData() {
    this.db.updateUserImgAndName(this.userId,this.updatedUserName,this.updatedPhoto)
  }
  
}
export interface userFollow{
  key:string,
  img:string,
  userName:string
}
