import { Component } from '@angular/core';
import { allfood } from '../allfood';
import { DatabaseService } from '../services/database.service';
import { user } from '@angular/fire/auth';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  userId:any=localStorage.getItem("userId");
  recipes!:allfood[];
  constructor(private db:DatabaseService)
  {

  }
  ngOnInit()
  {
    this.db.getFavourite(this.userId).subscribe(recipes=>{
      this.recipes=recipes;
    })
  }
}
