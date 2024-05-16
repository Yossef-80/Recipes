/*import { Component } from '@angular/core';

@Component({
  selector: 'app-meal-plan',
  templateUrl: './meal-plan.component.html',
  styleUrl: './meal-plan.component.css'
})
export class MealPlanComponent {

}
*/
import { Component } from '@angular/core';
import { allfood } from '../allfood';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-meal-plan',
  templateUrl: './meal-plan.component.html',
  styleUrls: ['./meal-plan.component.css']
})
export class MealPlanComponent {
  constructor(private recipesService: DatabaseService) {}

  addRecipeMessage: string = '';
   userId:any = localStorage.getItem('userId');
  selectedRecipeIndex: number = -1; // Index of the selected recipe

  selectedRecipe: allfood | null = null;

  list_of_food: allfood[] = this.recipesService.filteredrecipes;
  days: string[] = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  selectedDay: string | null = null;

  selectDay(day: string) {
    this.selectedDay = day;
  }



  addMeal(mealType: string) {
    if (this.selectedDay && this.selectedRecipe) {
      //console.log(Added ${mealType} for ${this.selectedDay});
      // Replace with actual user ID
      try {
        this.recipesService.addRecipePlanningMeal(this.userId, this.selectedRecipe, this.selectedDay, mealType);
        console.log('Recipe added successfully');
        // Reset selectedRecipeIndex to deselect the recipe
        this.selectedRecipeIndex = -1;
        // Reset selectedDay
        this.selectedDay = null;
        // Reset message
        this.addRecipeMessage = 'Recipe added successfully';
        // Reset border of the selected recipe
        this.resetRecipeBorder();
        // Reset color of the selected day
        this.resetSelectedDayColor();
      } catch (error) {
        console.error('Error adding recipe:', error);
        // Set error message
        this.addRecipeMessage = 'Error adding recipe: ' + error;
      }
      setTimeout(() => {
        this.addRecipeMessage = '';
      }, 5000);
    } else if (!this.selectedRecipe) {
      this.addRecipeMessage = 'Please select a recipe first';
    } else {
      this.addRecipeMessage = 'Please select a day first';
    }
  }


  resetRecipeBorder() {
    // Reset border of the selected recipe
    const selectedRecipeElement = document.querySelector('.recipe.selectedRec');
    if (selectedRecipeElement) {
      selectedRecipeElement.classList.remove('selectedRec');
    }
  }

  resetSelectedDayColor() {
    // Reset color of the selected day
    const selectedDayElement = document.querySelector('.day.selected');
    if (selectedDayElement) {
      selectedDayElement.classList.remove('selected');
    }
  }

  // Function to set the selected recipe when clicked
  selectRecipe(index: number, recipe: allfood) {
    this.selectedRecipeIndex = index; // Set the index of the selected recipe
    this.selectedRecipe = recipe;
  }

  ngOnInit(): void {
    this.recipesService.readDatabase();
    this.recipesService.recipesSubject.subscribe((recipes) => {
      this.list_of_food = recipes;
      console.log("Subject called");
    });
  }
}