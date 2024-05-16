import { Component, OnInit } from '@angular/core';
import { FoodDescService } from '../food-desc.service';
import { allfood } from '../allfood';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrl: './nutrition.component.css'
})
export class NutritionComponent  implements OnInit {

  myfood: allfood | undefined;

  constructor(
      private route: ActivatedRoute,
      private foodService: FoodDescService
  ) {}

  ngOnInit(): void {
      // Get the id parameter from the route
      const id = Number(this.route.snapshot.paramMap.get('id'));
      // Fetch the food item based on the id
      this.myfood = this.foodService.getFoodByid(id);
  }
}
