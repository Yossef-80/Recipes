import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent {
  userId:any=localStorage.getItem("userId");
  items:ShoppingListItem[]=[];
  constructor(private service:DatabaseService)
  {

  }
  ngOnInit()
  {
    this.getRecipeAndIngredients();
  }
  getRecipeAndIngredients()
  {
    this.service.getPlanning(this.userId).subscribe({
      next: (list: any) => {
        console.log("Received list:", list);
        this.items=list;
        // Check if list is an array
       
      },
      error: (err) => {
        console.error("Error occurred while getting planning:", err);
      }
    });
   /*  // Subscribe to the service to get the planning
  this.service.getPlanning(this.userId).subscribe({
    next: (list: any) => {
      console.log("Received list:", list);
      list.forEach((item: any) => {
        console.log("Processing item:", item);
      });
    },
    error: (err) => {
      console.error("Error occurred while getting planning:", err);
    }
  });
  */
/*
    this.service.getPlanning(this.userId).subscribe((list:ShoppingListItem[])=>{
      console.log(list);
      
      Object.values(list).forEach((item:any)=>{
        console.log(item)
        item.ingredients.forEach((ingredient: any)=>{
          console.log("recipe:"+item.nameOfFood+" ingredient:"+ item.ingredient)
          this.items.push({recipe:item.nameOfFood,
            ingredient:ingredient})
        })
      })
    });
    */
    /*.subscribe((list:any[])=>{
      list.forEach((item:any)=>{
        item.ingredients.forEach((ingredient: any)=>{
          this.items.push({recipe:item.recipeName,
            ingredient:ingredient})
        })
      })
    })*/
   /* this.service.getPlanning(this.userId).subscribe(list=>{
      list.forEach(item=>{
        item.ingredients.forEach(ingredient=>{
          this.items.push({recipe:item.recipeName,
            ingredient:ingredient})
        })
      })
      //console.log(this.items)
    }
  );*/
    
  }
}
export interface ShoppingListItem{
  recipe:string,
  ingredient:string,

}


