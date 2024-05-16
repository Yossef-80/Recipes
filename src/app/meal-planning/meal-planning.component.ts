import { Component ,OnInit,inject} from '@angular/core';
import { allfood } from '../allfood';
import { FoodDescService } from '../food-desc.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { DatabaseService } from '../services/database.service';
@Component({
  selector: 'app-meal-planning',
  templateUrl: './meal-planning.component.html',
  styleUrl: './meal-planning.component.css',
})
export class MealPlanningComponent implements OnInit{
  list_of_food: allfood[] = this.recipesService.filteredrecipes;
  searchTerm:string='';
  filterTime:string='';
  ingredients:any[]=[];
  cookingSteps:any[]=[];
  reviews:any[]=[];

  nutritionFacts:any[]=[];
  //imageUrl$: Observable<string>;
  foodService: FoodDescService=inject(FoodDescService);
 recipeService:DatabaseService=inject(DatabaseService);

  constructor(private recipesService:DatabaseService) {
   // this.list_of_food = this.foodService.getAllFood();
   //this.recipeService.fill_Database2(this.foodService.getAllFood());
   //this.recipesService.addRecipeToUser("-Nwr6m-RX3LzMU2X5rdS",{country:"england"})
    //this.fillDatabase();
   // this.imageUrl$=this.getImagePath("/recipes/burger.jpeg");
   // this.uploadImages();
  //  this.list_of_food=this.recipeService.readDatabase();
 // this.getIngredientsOfRecipe();
 //this.getCookingSteps();

    //console.log(this.list_of_food);
    //console.log(this.ingredients);
     //this.rateRecipe();
    // this.getNutiritionFacts();
    //this.insertRecipes();
    //this.getMealPlans();
    //this.getSelectedMeals();
    //this.testUploadRecipe();
   // this.getSelectedMealPlans();

  }
  selectCuisine(cuisine:string)
  {
    this.recipesService.getRecipeByCousine(cuisine);
    //this.testUploadRecipe();
   // this.rateRecipe();
  }
  /*
  getShopping()
  {  
    this.recipesService.getShoppingListItems().subscribe((data: any[]) => {
      console.log(data)
    });
  }
  getNutiritionFacts()
  {

    this.recipesService.getNuitritionFacts("-NwyNZ0iffNfj-TX7FEz","-NwyNZ0pxF5XWYFn4o1y").subscribe(
      nutritionFacts=>{
        this.nutritionFacts=nutritionFacts;
        console.log(nutritionFacts);
      }
    )
  }*/
  searchRecipe(query:string)
  {
    this.recipesService.searchRecipe(query);
  }
  filterRecipeInTime(time:string)
  {
    this.recipesService.filterrecipesByTime(time);
  }
  /*
  getIngredientsOfRecipe()
  {
    
   this.recipesService.getPlanning().subscribe(
      ingredients=>{
        console.log(ingredients);
      }
    )
  }*/
  getSelectedMeals()
  {
    this.recipesService.getSelectedMealPlansId().subscribe(
      (ids:any)=>{
        
        console.log(ids);
      }
    )
  }
 /* getPlanning()
  {
    this.recipesService.getPlanning().subscribe(
      ingredients=>{
        
        console.log(ingredients);
      }
    )
  }*/
 /* getMealPlans()
  {
    this.recipesService.getPlanning().subscribe(
      item=>{
        console.log(item);
      }
    )
  }*/
  /*
  insertRecipes()
  {
    this.recipesService.addRecipePlanningMeal("-NwyNZ0iffNfj-TX7FEz",{
      countryOfFood: "Italian",
      //description: "",
      duration: "15Min",
      img: "https://firebasestorage.googleapis.com/v0/b/hci-project-1a2a0.appspot.com/o/recipes%2FfatotushSalad.png?alt=media&token=7c32bab0-00d8-4faf-b6b6-e351eac4daa9",
      id: 0,
      nameOfFood: '',
      rating: '',
      ingredientType:"",
      key:"",
      ingredients:[],
      cooking_steps:[],
      nutrition_facts:[[]],
      reviews:[],
    },
"Saturday","BreakFast")
this.recipesService.addRecipePlanningMeal("-NwyNZ0iffNfj-TX7FEz",{
  countryOfFood: "Italian",
  //description: "",
  duration: "15Min",
  img: "https://firebasestorage.googleapis.com/v0/b/hci-project-1a2a0.appspot.com/o/recipes%2FfatotushSalad.png?alt=media&token=7c32bab0-00d8-4faf-b6b6-e351eac4daa9",
  id: 0,
  nameOfFood: '',
  rating: '',
  ingredientType:"",
  key:"",
  ingredients:[],
  cooking_steps:[],
  reviews:[],
  nutrition_facts:[[]],
},
"Sunday","Dinner")
this.recipesService.addRecipePlanningMeal("-NwyNZ0iffNfj-TX7FEz",{
  countryOfFood: "Italian",
  //description: "",
  duration: "15Min",
  img: "https://firebasestorage.googleapis.com/v0/b/hci-project-1a2a0.appspot.com/o/recipes%2FfatotushSalad.png?alt=media&token=7c32bab0-00d8-4faf-b6b6-e351eac4daa9",
  id: 0,
  nameOfFood: '',
  rating: '',
  ingredientType:"",
  key:"",
  ingredients:[],
  cooking_steps:[],
  nutrition_facts:[[]],
  reviews:[],
  
},
"Monday","Lunch")
this.recipesService.addRecipePlanningMeal("-NwyNZ0iffNfj-TX7FEz",{
  countryOfFood: "Italian",
  //description: "",
  duration: "15Min",
  img: "https://firebasestorage.googleapis.com/v0/b/hci-project-1a2a0.appspot.com/o/recipes%2FfatotushSalad.png?alt=media&token=7c32bab0-00d8-4faf-b6b6-e351eac4daa9",
  id: 0,
  nameOfFood: '',
  rating: '',
  ingredientType:"",
  key:"",
  ingredients:[],
  cooking_steps:[],
  reviews:[],
  nutrition_facts:[[]],

},
"Saturday","Dinner")
  }
  getCookingSteps()
  {
    this.recipesService.getCookingSteps("-NwyNZ0iffNfj-TX7FEz","-NwyNZ0pxF5XWYFn4o1y").subscribe(
      cookingSteps=>{
        this.cookingSteps=cookingSteps;
        console.log(cookingSteps);
      }
    )
  }
  getReviews()
  {
    this.recipesService.getRecipeReviews("-NwyNZ0iffNfj-TX7FEz","-NwyNZ0pxF5XWYFn4o1y").subscribe(
      reviews=>{
        this.reviews=reviews;
        console.log(reviews);
      }
    )
  }
  rateRecipe()
  {
    //this.recipesService.rateTheRecipe("-NwyNZ0iffNfj-TX7FEz","","-NwyNZ0pxF5XWYFn4o1y",2,"not good")
  }

  testUploadRecipe()
  {
   let recipe:allfood={
      countryOfFood: "Italian",
      //description: "",
      duration: "15Min",
      img:"",
      id: 0,
      nameOfFood: '',
      rating: '',
      ingredientType:'',
      reviews:[],
      key:"",
      ingredients:[],
      cooking_steps:[],
      nutrition_facts:[[]],
    }
    
    let image:File=new File(['dummy content'], 'test-image.png', { type: 'image/png' });
    this.recipesService.addRecipe("-NwyNZ0iffNfj-TX7FEz",recipe,image)
  }

  getSelectedMealPlans()
  {
    this.recipesService.getMealDayandTypeInMealPlanning("-NwyNZ0iffNfj-TX7FEz","Saturday","breakfast").subscribe(
      recipes=>{
        console.log(recipes)
      }
    )
  }
*/
filterByIngredientsType(type:string)
    {
      this.recipesService.filterByIngredientsType(type);
    }
  ngOnInit(): void {
    //this.list_of_food=this.recipesService.readDatabase();
    this.recipeService.readDatabase();
    this.recipesService.recipesSubject.subscribe((recipes) => {
      this.list_of_food = recipes;
      console.log("Subject called");
    });
    
   // this.recipesService.readDatabase();

   /* this.recipesService.recipesSubject.subscribe((recipes)=>{
      this.list_of_food=recipes;
      console.log("subject called");
  })*/
  }
 

 
}
