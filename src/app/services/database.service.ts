import { Injectable } from '@angular/core';
import { UserAccount, allfood } from '../allfood';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, Subject, first, forkJoin, map } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MealPlanningComponent } from '../meal-planning/meal-planning.component';
import { finalize, take, tap } from 'rxjs/operators';
import path from 'path';
import { ShoppingListItem } from '../shopping-list/shopping-list.component';
import { userFollow } from '../profile/profile.component';

@Injectable({
  providedIn: 'root'
})
export   class DatabaseService {
  Allrecipes:allfood[]=[];
  filteredrecipes:allfood[]=[];
  recipesSubject=new Subject<allfood[]>;
  UserRecipes:any[] = [];
  constructor(private db:AngularFireDatabase,private storage:AngularFireStorage) {
    console.log("item created");
    //this.readDatabase();
   // this.getRecipes("-NwyNZ0iffNfj-TX7FEz");
      //this.recipes=this.getAllRecipes();
     // this.getAllRecipes();

   }
 
     readDatabase(){
    this.db.list('/users').snapshotChanges().subscribe(users=>{
      const recipes1:Array<any>=[];
      users.forEach(user=>{
     //   console.log(user.key);
        const userKey=user.key
        const path='/users/'+userKey+'/recipes';
        const userRecipe$=this.db.list(path).snapshotChanges();

        userRecipe$.subscribe(userRecipes=>{
          //recipes1.push(...userRecipes);
          userRecipes.forEach((recipe11:any) => {
            //console.log(recipe11)
            const RecipeKey=recipe11.key;
            let recipeItem=recipe11.payload.val();

            recipeItem.key=RecipeKey;
            recipes1.push(recipeItem)
          });
        })
      })
     // console.log(recipes1);
      this.Allrecipes=recipes1;
      this.filteredrecipes=this.Allrecipes;
      this.recipesSubject.next(this.filteredrecipes);
    //  console.log(this.Allrecipes);

    })
    

   // return this.recipes;
  }
  getAllRecipes()
  {
    this.db.list("/users").snapshotChanges().subscribe(users=>{
      const allRecipes:Array<any>=[];

      users.forEach(user=>{
        console.log(user.key);
        const userKey=user.key
        const path='/users/'+userKey+'/recipes';
       this.db.list(path).snapshotChanges().subscribe(recipes=>{
            recipes.forEach(recipe=>{
             
              allRecipes.push(recipe.payload.val);
              console.log(recipe.payload.val);
            })
        });
        this.recipesSubject.next(this.Allrecipes);

       /* userRecipe$.subscribe(userRecipes=>{
          allRecipes.push(...userRecipes);
        })*/
      })
     this.Allrecipes=allRecipes;
    })
  }


  uploadImages()
  {
    this.assignImageUrlToObject("-Nwr6m-RX3LzMU2X5rdS",1,"/recipes/burger.jpeg")
    this.assignImageUrlToObject("-Nwr6m-RX3LzMU2X5rdS",2,"/recipes/pasta22.jpg")
    this.assignImageUrlToObject("-Nwr6m-RX3LzMU2X5rdS",0,"/recipes/fatotushSalad.png")
    this.assignImageUrlToObject("-Nwr6m-RX3LzMU2X5rdS",3,"/recipes/fatotushSalad.png")
    this.assignImageUrlToObject("-Nwr6m-RX3LzMU2X5rdS",4,"/recipes/fatotushSalad.png")
    this.assignImageUrlToObject("-Nwr6m-RX3LzMU2X5rdS",5,"/recipes/fatotushSalad.png")
    this.assignImageUrlToObject("-Nwr6m-RX3LzMU2X5rdS",6,"/recipes/fatotushSalad.png")
    this.assignImageUrlToObject("-Nwr6m-RX3LzMU2X5rdS",7,"/recipes/fatotushSalad.png")
    this.assignImageUrlToObject("-Nwr6m-RX3LzMU2X5rdS",8,"/recipes/fatotushSalad.png")
  }
  assignImageUrlToObject(userId: string, objectIndex: number, imageUrl: string) {
    // Retrieve the download URL of the image from Firebase Storage
    this.storage.ref(imageUrl).getDownloadURL().subscribe(
      url=>{
        const path='/users/'+userId+'/recipes/'+objectIndex;
        this.db.object(path).update({img:url}).then(() => {
          console.log('Image URL assigned to object successfully');
        }).catch(error => {
          console.error('Error assigning image URL to object:', error);
        });
      },error => {
        console.error('Error retrieving image URL from Firebase Storage:', error);
      }
    )
      
  
  }
    fill_Database2(recipes_2:allfood[])
    {
      const user={
        userName:"Youssef2",
        followers:1000,
        following:100,
        recipes:[],
        favourites:[]
      } 
      const userKey=this.db.list('/users').push(user).key;

      const gredientsList=["onion","tomato","cucumbers"];
      const cooking_steps=["cut onion","cut tomato","cut cucumbers","mix all"];
      const nutrition_facts=[["calories","219.9Kcal"],["Total fats","10g"],["protien","7g"]];
      const reviews={
        rate:6,
        comment:"the food is delicous",
        username:"Ahmed"
      };
      const reviewsList=[reviews,reviews,reviews];
      recipes_2.forEach(item=>{
      
        const tempItem={
          nameOfFood:item.nameOfFood,
          duration:item.duration,
          rating:item.rating,
          countryOfFood:item.countryOfFood,
          description:"",
          ingredients:[],
          cooking_steps:[],
          nutrition_facts:[],
          likes:5,
          img:"",
          reviews:[]
        };
      const recipeId=this.db.list('/users/'+userKey+'/recipes/').push(tempItem).key;
      gredientsList.forEach(ingredient=>{
        this.db.list('/users/'+userKey+'/recipes/'+recipeId+'/ingredients/').push(ingredient);
      })
      cooking_steps.forEach(step=>{
        this.db.list('/users/'+userKey+'/recipes/'+recipeId+'/cooking_steps/').push(step);
      })
      nutrition_facts.forEach(fact=>{
        this.db.list('/users/'+userKey+'/recipes/'+recipeId+'/nutrition_facts/').push(fact);
      })
      reviewsList.forEach(review=>{
        this.db.list('/users/'+userKey+'/recipes/'+recipeId+'/reviews/').push(review);
      })
      })

    }
  fillDatabase()
  {
    let foodList:Array<any>=[];
    this.Allrecipes.forEach(item=>{
      const reviews={
        rate:6,
        comment:"the food is delicous",
        username:"Ahmed"
      };
      const tempItem={
        nameOfFood:item.nameOfFood,
        duration:item.duration,
        rating:item.rating,
        countryOfFood:item.countryOfFood,
        description:"",
        ingredients:["onion","tomato","cucumbers"],
        cooking_steps:["cut onion","cut tomato","cut cucumbers","mix all"],
        nutrition_facts:[["calories","219.9Kcal"],["Total fats","10g"],["protien","7g"]],
        likes:5,
        img:"",
        reviews:[reviews,reviews,reviews]
      };
    foodList.push(tempItem);
    })
    const user={
      userName:"Youssef",
      followers:1000,
      following:100,
      recipes:foodList
    } 
    this.db.list('/users').push(user)
  }

  getRecipeByCousine(cuisine:string)
  {
    if(cuisine==='')
      {
        this.filteredrecipes=this.Allrecipes;
      }
      else{
        console.log(cuisine)
        this.filteredrecipes=this.Allrecipes.filter(recipe=>{
        return  recipe.countryOfFood===cuisine;
    
        })     
      }
                 this.recipesSubject.next(this.filteredrecipes);

         console.log(this.filteredrecipes);

  }
  searchRecipe(query:string)
  {
    if(query==='')
      {
        this.filteredrecipes=this.Allrecipes;
      }
      else{
        console.log(query)
        this.filteredrecipes=this.Allrecipes.filter(recipe=>{
        return  recipe.nameOfFood.toLocaleLowerCase().includes(query.toLocaleLowerCase());
    
        })     
      }
                 this.recipesSubject.next(this.filteredrecipes);


  }
  filterrecipesByTime(time:string)
  {
    if(time==='')
      {
        this.filteredrecipes=this.Allrecipes;
      }
      else{
        console.log(time)
        this.filteredrecipes=this.Allrecipes.filter(recipe=>{
        return  recipe.duration.toLocaleLowerCase().includes(time.toLocaleLowerCase());
    
        })     
      }
                 this.recipesSubject.next(this.filteredrecipes);


  }
 /* addRecipeToUser(userId: string, recipeData: any) {
    // Get a reference to the user's recipes list
    const userRecipesRef = this.db.list(`/users/${userId}/recipes`);

    // Push the recipe data to the user's recipes list
    userRecipesRef.push(recipeData)
      .then(() => {
        console.log('Recipe added successfully');
      })
      .catch(error => {
        console.error('Error adding recipe:', error);
      });
  }
*/
  addCuisine(Name:string)
  {
    this.db.list('/cuisines').push(Name);
  }
  async addRecipe(userId:string,recipe:allfood,image:File)
  {
    try{
          const imageUrl = await this.uploadImage(image);
      let recipeKey:string;
     recipeKey= await this.addRecipeWithImage(userId,recipe, imageUrl);
      this.db.object("users/"+userId+"/recipes/"+recipeKey).update({key:recipeKey});
       this.updateRecipeCount(userId);
    console.log('Recipe with image uploaded successfully!');
    }
    catch(error){
      console.error('Error uploading recipe with image:', error);

    }


     
  }
  async updateRecipeCount(userId:string)
  {
      
      const userRef = this.db.object('users/'+userId);
      await userRef.valueChanges().pipe(take(1)).subscribe((userData:any)=>{
         const recipeCount:number = userData.recipeCount || 0;
      const updatedrecipeCount = recipeCount + 1;
       userRef.update({ recipeCount: updatedrecipeCount });
      });

  }
  getRecipes(userId:string): Observable<allfood[]>
  {

    const path="users/"+userId+"/recipes/";
      return this.db.list<allfood>(path).valueChanges();
    

        
  }
  getIngredientsOfRecipe(userId:string,recipeId:string)
  {
    const path="users/"+userId+"/recipes/"+recipeId+'/ingredients';
    return this.db.list(path).valueChanges()

  }
  getCookingSteps(userId:string,recipeId:string)
  {
    const path="users/"+userId+"/recipes/"+recipeId+'/cooking_steps';
    return this.db.list(path).valueChanges()
  }
  getRecipeReviews(userId:string,recipeId:string)
  {
    const path="users/"+userId+"/recipes/"+recipeId+'/reviews';
    return this.db.list(path).valueChanges()
    
  }
  getNuitritionFacts(userId:string,recipeId:string)
  {
    const path="users/"+userId+"/recipes/"+recipeId+'/nutrition_facts';
    return this.db.list(path).valueChanges()
  } 
 async  rateTheRecipe(ReviwerId:string,ownerId:string,recipeId:string,rate:number,comment:string)
  {
    const path1="users/"+ReviwerId+'/userName';
        const path="users/"+ownerId+"/recipes/"+recipeId+'/reviews/';
        const path2="users/"+ownerId+"/recipes/"+recipeId;
    let UserName:any="";
     this.db.object(path1).valueChanges().pipe(
      first() // Take only the first emitted value
    ).subscribe(async userName=>{
       // UserName=userName;
       console.log(userName)
       let Totalrate=0;
       let newRate=0;
       this.db.object(path2).valueChanges().subscribe((recipe:any)=>{
        if(recipe.rating!=="")
          {
             Totalrate=parseInt(recipe.rating);
             console.log("Totalrate",Totalrate)  
          }
          if(Totalrate>0)
            {
              console.log("rate:",rate)
              newRate=(+Totalrate+ +rate)
              newRate=newRate/2
              console.log("newRate",newRate)  
            }
            else{
              newRate=rate;
              console.log("rate",newRate)
            }
           
       })
      // const waitTime = ;
     // Use the setTimeout function to wait for the specified time
    /* await new Promise<void>((resolve) => {
       setTimeout(() => {
         resolve(); // Resolve the promise after waiting
       }, 1700);
     });
     this.db.object(path2).update({rating:newRate});
       this.db.list(path).push({comment:comment,rate:rate,username:userName}).then(() => {
          console.log('Recipe added successfully');
        })
        .catch(error => {
          console.error('Error adding recipe:', error);
        });;*/
    })
   
  }
  getShoppingListItems(userId:string):Observable<{ recipeName: string, ingredients: any[] }[]> 
  {
     //ingredientsList :Observable<{ recipeName: string, ingredients: string[] }[]>;
    return this.db.list<any>('users/'+userId+'/recipes').valueChanges().pipe(map(recipes => {
      return recipes.map(recipe => {
        const recipeName = recipe.nameOfFood;
         const ingredients = Object.values( recipe.ingredients);
        return { recipeName, ingredients };
      });
    }));
  }
  addRecipePlanningMeal(userId:string,recipe:allfood,day:string,mealType:string)
  {
      const path="/users/"+userId+"/meal_plan/"+day+"/"+mealType;
      this.db.list(path).push(recipe).then(() => {
        console.log('Recipe added successfully');
      })
      .catch(error => {
        console.error('Error adding recipe:', error);
      });
  }
  getPlanning(userId:string): Observable<any[]>/*:Observable<{ recipeName: string, ingredients: string[] }[]> */
  {/*
    return this.db.list('users/'+userId+'/meal_plan').valueChanges().pipe(map(days => {
      console.log(days)
      return days.flatMap((mealTypes: any) => {
        console.log(mealTypes)
        return Object.values(mealTypes).map ((mealPlan:any)  => {
          console.log(mealPlan)
          const mealPlanning:any=Object.values(mealPlan)[0]
          console.log(mealPlanning)
          //console.log(); // Log the entire meal plan object
          //console.log(mealPlanning.countryOfFood); // Accessing the countryOfFood property
          //console.log(mealPlanning.img); // Accessing the description property
          //console.log(mealPlanning.duration);
          const recipeName = mealPlanning.nameOfFood;
         // let ingredients:string[] = Object.values( mealPlanning.ingredients);
         let ingredients;
        // console.log(mealPlanning.ingredients);
                     ingredients=mealPlanning.ingredient

         if(mealPlanning.ingredient==null)
          {
              ingredients=["none"]
          }
          
         return { recipeName:recipeName, ingredients:ingredients };
        });
        
      });
    }));*/
    return new Observable((observer) => {
   let list:ShoppingListItem[]=[];
     this.db.list('users/'+userId+'/meal_plan').valueChanges().forEach((days:any)=>{
      console.log("day",Object.values(days))
        Object.values(days).forEach((day:any)=>{
        console.log("day",Object.values(day));
         Object.values(day).forEach((mealsTypes:any)=>{
          console.log("mealsTypes",mealsTypes)
           Object.values(mealsTypes).forEach((meal:any)=>{
              console.log("meal",meal)
              meal.ingredients.forEach((ingredient: any)=>{
                 list.push({recipe: meal.nameOfFood, ingredient: ingredient})

              })
          })
        })
       })
    })
    observer.next(list);
   })
  }

  getSelectedMealPlansId()
{

  return this.db.list<any>('users/-NwyNZ0iffNfj-TX7FEz/meal_plan').valueChanges().pipe(map(days => {
    return days.map((mealTypes: any) => {
     // console.log(mealTypes)
      return Object.values(mealTypes).map((mealPlan:any)  => {
        const mealPlanning:any=Object.values(mealPlan)[0]
        console.log(mealPlanning)
        //console.log(); // Log the entire meal plan object
        //console.log(mealPlanning.countryOfFood); // Accessing the countryOfFood property
        //console.log(mealPlanning.img); // Accessing the description property
        //console.log(mealPlanning.duration);
        const recipeName = mealPlanning.nameOfFood;
        //let ingredients = Object.values( mealPlanning.ingredients);
       
       return mealPlanning.id;
      });
      
    });
  }));
 


}


 addRecipeWithImage(userId:string,recipeData: allfood, imageUrl: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const path='/users/'+userId+"/recipes/";
    recipeData.img=imageUrl;
    const newItemRef:any = this.db.list(path).push({ ...recipeData})
    if (newItemRef) {
      const newItemKey = newItemRef.key;
      if (newItemKey) {
        resolve(newItemKey);
      } else {
        reject(new Error('Failed to get new item key'));
      }
    } else {
      reject(new Error('Failed to add recipe'));
    }
      /*.then((newItemRef) => {
         const newItemKey = newItemRef.key;
        resolve(newItemKey); // Resolve the promise when the push operation is successful
        
      })
      .catch(error => {
        reject(error); // Reject the promise if there's an error
      });*/
     
  });
  }

  uploadImage(file: File): Promise<string> {
    const filePath = `recipes/${file.name}`; // Path where the image will be stored in Firebase Storage
    const fileRef = this.storage.ref(filePath);
    const task = fileRef.put(file); // Upload the file
  
    // Return a promise that resolves with the download URL of the uploaded image
    return new Promise((resolve, reject) => {
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(downloadURL => {
            resolve(downloadURL);
          });
        })
      ).subscribe();
    });
  }
//------------------------
  //TODO update user image and name
  // TODO create user
  // TODO: get user ID from Auth
  //TODO send recipe ID/key from home to recipe page
  //TODO: get meal planning based on break fast oR dinner or lunch
  getMealDayandTypeInMealPlanning(userId:string,day :string,type:string)
  {
    //-NwyNZ0iffNfj-TX7FEz
    const path="users/"+userId+"/meal_plan/"+day+"/"+type;
    return this.db.list<any>(path).valueChanges()
  }



  recordUserData(uid: string,name?:string) {
    // Check if the user already exists in the Realtime Database
    this.db.object(`users/${uid}`).valueChanges().subscribe(userData => {
      if (!userData) {
        if(name==undefined)
          {
            name="";
          }
        // If the user does not exist, create a new entry
        const userData = {
          userName:name,
          img:"",
          recipes:[],
          mealPlanning:[],
          followers:0,
          following:0,
          recipeCount:0,
          favouriteMeals:[],
          // Add more user data if needed
        };
  
        // Write user data to the Realtime Database using UID as the key
        this.db.object(`users/${uid}`).update(userData)
          .then(() => console.log('User data recorded in Realtime Database'))
          .catch(error => console.error('Error recording user data:', error));
      }
      else{
        console.log("user already exist");
      }
    });
  }
  AddToFavourite(userId:string,recipe:allfood)
  {
    const path="users/"+userId+"/favourite/";
    this.db.list(path).push(recipe)
  }
  getFavourite(userId:string)
  {
    const path="users/"+userId+"/favourite/";
    return this.db.list<allfood>(path).valueChanges();
  }
/*
  FollowUser(userId:string,toFollow:string)
  {
    const followerPath = "users/" + userId;
    const followedPath = "users/" + toFollow;
  
    // Get observables for both follower and followed users
  
    console.log("called")

    // Subscribe to both observables using forkJoin
    this.db.object(followerPath).valueChanges().subscribe((followerUser: any) => {
      const followerName = followerUser?.userName;
      const followerImage = followerUser?.img;
  
      // Get followed user data
      this.db.object(followedPath).valueChanges().subscribe((followedUser: any) => {
        const followedName = followedUser?.userName;
        const followedImage = followedUser?.img;
  
        // Push followed user to follower's following list
        if (followerName && followerImage) {
          this.db.list(followerPath + "/followingList/").push({ userName: followedName, img: followedImage });
        }
  
        // Push follower user to followed user's followers list
        if (followedName && followedImage) {
          this.db.list(followedPath + "/followersList/").push({ userName: followerName, img: followerImage });
        }
      });
    });
  }
*/

   async FollowUser(userId:string,toFollow:string)
  {
    await this.followingFun(userId,toFollow);
    await this.followedFun(userId,toFollow);




  }

  async followedFun(userId:string,toFollow:string)
  {
    let followerName:string="";
    let followerImage:string="";
    let followerKey;
    const followedPath="users/"+toFollow;
    const followerPath="users/"+userId;

    const code:any =  this.db.object(followerPath).snapshotChanges();
    code.subscribe((user:any)=>{
      followerKey=user.key;
      followerName=user.payload.val().userName;
      followerImage=user.payload.val().img;
      console.log("Follower Name"+followerName);
 
    })   ;
    const waitTime = 1700;
     this.increaseFollowings(userId);
    // Use the setTimeout function to wait for the specified time
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve(); // Resolve the promise after waiting
      }, waitTime);
    });
     await this.db.list(followedPath+"/followersList/").push({userName:followerName,img:followerImage,key:followerKey})

 /*  try {
    const user:any = await this.db.object(followerPath).valueChanges().pipe(take(1)).toPromise();
    const followerName:string = user?.userName;
    const followerImage:string = user?.img;

    console.log("Follower Name: ", followerName);
    this.db.list(followedPath + "/followersList/").push({ userName: followerName, img: followerImage });
  } catch (error) {
    console.error("Error fetching follower user data: ", error);
  }*/
  }
  async increaseFollowers(userId:String)
  {
    try {
      const userRef = this.db.object('users/'+userId);
      await userRef.valueChanges().pipe(take(1)).subscribe((userData:any)=>{
         const currentFollowers:number = userData.followers || 0;
      const updatedFollowers = currentFollowers + 1;
       userRef.update({ followers: updatedFollowers });
      });
     
    } catch (error) {
      console.error('Error updating followers:', error);
      throw error;
    }
  }
 

  async followingFun(userId:string,toFollow:string)
  {
    let followedName:string="";
    let followedImage:string="";
    const followerPath="users/"+userId;

   
    
    const followedPath="users/"+toFollow;
    let followedKey;
     const code:any= this.db.object(followedPath).snapshotChanges();
     code.subscribe((user:any)=>{
      followedKey=user.key;
      followedName=user.payload.val().userName;
      followedImage=user.payload.val().img;
      console.log("Followed Name"+followedName)

    })
    const waitTime = 1700;
     this.increaseFollowers(toFollow);
    // Use the setTimeout function to wait for the specified time
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve(); // Resolve the promise after waiting
      }, waitTime);
    });
      this.db.list(followerPath+"/followingList/").push({userName:followedName,img:followedImage,key:followedKey})


/*
try {
  const user:any = await this.db.object(followedPath).valueChanges().pipe(take(1)).toPromise();
  const followedName:string|"" = user?.userName;
  const followedImage:string|"" = user?.img;

  console.log("Followed Name: ", followedName);
  this.db.list(followerPath + "/followingList/").push({ userName: followedName, img: followedImage });
} catch (error) {
  console.error("Error fetching followed user data: ", error);
}*/
  }
  async increaseFollowings(userId:String)
  {
    try {
      const userRef = this.db.object('users/'+userId);
      const userData:any = await userRef.valueChanges().pipe(take(1)).toPromise();
      const currentFollowing = userData.following || 0;
      const updatedFollowing = currentFollowing + 1;
      await userRef.update({ following: updatedFollowing });
    } catch (error) {
      console.error('Error updating followers:', error);
      throw error;
    }
  }
  async updateUserImgAndName(userId:string,name:string,img :File)
  {
    try{
      const imageUrl = await this.uploadUserImage(img);

    await this.updateUserData(userId,name, imageUrl);

      console.log('user with image uploaded successfully!');

    }
    catch(error){
  console.error('Error uploading recipe with image:', error);

    }
  }
  updateUserData(userId:string,name:string,imgUrl:string)
  {
    return new Promise<void>((resolve, reject) => {
      const path='/users/'+userId;
      this.db.object(path).update({ img:imgUrl,userName:name})
        .then(() => {
          resolve(); // Resolve the promise when the push operation is successful
        })
        .catch(error => {
          reject(error); // Reject the promise if there's an error
        });
    });
  }
  uploadUserImage(file: File): Promise<string> {
    const filePath = `users/${file.name}`; // Path where the image will be stored in Firebase Storage
    const fileRef = this.storage.ref(filePath);
    const task = fileRef.put(file); // Upload the file
  
    // Return a promise that resolves with the download URL of the uploaded image
    return new Promise((resolve, reject) => {
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(downloadURL => {
            resolve(downloadURL);
          });
        })
      ).subscribe();
    });
  }


  filterByIngredientsType(type:string)
  {
    if(type==='')
      {
        this.filteredrecipes=this.Allrecipes;
      }
      else{
       // console.log(cuisine)
        this.filteredrecipes=this.Allrecipes.filter(recipe=>{
        return  recipe.ingredientType===type;
    
        })     
      }
       this.recipesSubject.next(this.filteredrecipes);

       // console.log(this.filteredrecipes);
 
  }
  
  getSpecificRecipe(key:string):allfood|undefined
  {
    console.log(key)
   return this.Allrecipes.find(recipe=>{
      return  recipe.key===key;
  
      })
  }
  getFollowersList(userId:string)
  {
    const path="users/"+userId+"/followersList";
    return this.db.list<userFollow>(path).valueChanges();
  }
  getFollowingList(userId:string)
  {
    const path="users/"+userId+"/followingList";
    return this.db.list<userFollow>(path).valueChanges();
  }
  getUserKeyByRecipeKey(recipeKey: string): Observable<string | null> {
    return this.db.list<any>('/users').snapshotChanges().pipe(
      map(users => {
        for (const user of users) {
          const userKey = user.payload.key;
          const recipes = user.payload.child('recipes');
          if (recipes.hasChild(recipeKey)) {
           //console.log('Found recipeKey', recipeKey, 'under user', userKey);
            return userKey;
          }
        }
        console.log('RecipeKey', recipeKey, 'not found under any user');
        return null;
      })
    );
  }
  getUserData(userId:string)
  {
    const path="users/"+userId;
     let values= this.db.object<UserAccount>(path).valueChanges();
    console.log(values);
    return values;
  }
  async unfollowUser(userWhoUnfollowKey:string,userWhoBeUnfollowedKey:string)
  {
    //delete user2 from the following list of user1
      const userWhoUnfollowPath="users/"+userWhoUnfollowKey+"/followingList/"
      const followingListRef = this.db.list<any>(userWhoUnfollowPath);
      let userToUnfollow :any;
      // Find the index of the user to be unfollowed in the followingList
      followingListRef.snapshotChanges().subscribe((followingList) => {
          
           userToUnfollow  = followingList.find(user => user.payload.val().key === userWhoBeUnfollowedKey);
          
          // If the user is found in the followingList, remove it
         
      });
      const waitTime = 1700;
     // Use the setTimeout function to wait for the specified time
     await new Promise<void>((resolve) => {
       setTimeout(() => {
         resolve(); // Resolve the promise after waiting
       }, waitTime);
     });
      if (userToUnfollow ) {
        this.db.object(userWhoUnfollowPath+"/"+userToUnfollow.key).remove().then(() => {
          console.log('user deleted successfully');}).catch(()=>{
            console.log('problem with deletion')
          })
    }
      this.reduceFollowingCount(userWhoUnfollowKey);
    //delete the user1 from user2 followerList
    
    const userWhoBeUnfollowPath="users/"+userWhoBeUnfollowedKey+"/followersList/"
    const followerListRef = this.db.list<any>(userWhoBeUnfollowPath);
    let userToBeUnfollowed:any;
    // Find the index of the user to be unfollowed in the followingList
    followerListRef.snapshotChanges().subscribe(followerList => {
         userToBeUnfollowed= followerList.find(user => user.payload.val().key === userWhoUnfollowKey);
        
        // If the user is found in the followingList, remove it
       
    });
   // const waitTime = 1700;
    // Use the setTimeout function to wait for the specified time
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve(); // Resolve the promise after waiting
      }, waitTime);
    });
    if (userToBeUnfollowed) {
      this.db.object(userWhoBeUnfollowPath+"/"+userToBeUnfollowed.key).remove().then(() => {
        console.log('user deleted successfully');}).catch(()=>{
          console.log('problem with deletion')
        })
    }

    this.reduceFollowersCount(userWhoBeUnfollowedKey)
  }
  async reduceFollowersCount(userId:string)
  {
      
      const userRef = this.db.object('users/'+userId);
      await userRef.valueChanges().pipe(take(1)).subscribe((userData:any)=>{
         const followersCount:number = userData.followers || 0;
      const updatefollowersCount = followersCount - 1;
       userRef.update({ followers: updatefollowersCount });
      });

  }
  async reduceFollowingCount(userId:string)
  {
      
      const userRef = this.db.object('users/'+userId);
      await userRef.valueChanges().pipe(take(1)).subscribe((userData:any)=>{
         const followingCount:number = userData.following || 0;
      const updatefollowingCount = followingCount - 1;
       userRef.update({ following: updatefollowingCount });
      });

  }

  async likeRecipe(recipeOwner:string,recipeId:string)
  {
    const userRef = this.db.object('users/'+recipeOwner+"/recipes/"+recipeId );
      await userRef.valueChanges().pipe(take(1)).subscribe((recipe:any)=>{
         const likesCount:number = recipe.likes || 0;
      const updatelikesCount = likesCount + 1;
       userRef.update({ likes: updatelikesCount });
      });
  }


 /* getIngredientsList(userId:string)
  {
    const path="users/"+userId+"/recipes/";

    this.db.list(path).valueChanges().subscribe(recipes=>{
      recipes.forEach(recipe=>{
            recipe.ingredients
      })
    })
  }*/

}
