import { Component } from '@angular/core';
import { allfood } from '../allfood';
import { DatabaseService } from '../services/database.service';
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent {
  userId:any=localStorage.getItem("userId");
  recipeName:string="";
  //recipePhoto:File;
  recipeIngredients:string="";
  recipeCookingSteps:string="";
  Category:string="";
  time:string="";
  cuisine:string="";
   recipePhoto!: File;
  constructor(private db:DatabaseService,)
  {

  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    // You can now access the selected file and handle it as needed
    // For example, you can assign it to a property like recipePhoto
    this.recipePhoto = file;
    console.log("file uploaded")
  }
  addRecipeFun()
  {
   let ingredients:string[]=this.recipeIngredients.split(",");
   let CookingSteps:string[]=this.recipeCookingSteps.split(",");
      let  recipe:allfood={
        nameOfFood: this.recipeName,
        key: '',
        id: 0,
        img: '',
        countryOfFood: this.cuisine,
        duration: this.time,
        rating: '',
        ingredients: ingredients,
        cooking_steps: CookingSteps,
        nutrition_facts: [[]],
        ingredientType: this.Category,
        reviews: [],
        likes:0

      }
        this.db.addRecipe(this.userId,recipe,this.recipePhoto);

  }
  

}
