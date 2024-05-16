import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MealPlanningComponent } from './meal-planning/meal-planning.component';
import { NutritionComponent } from './nutrition/nutrition.component';
import { FoodDescService } from './food-desc.service';
import { SecondnutritionComponent } from './meals/secondnutrition/secondnutrition.component';
import { ThirdnutritionComponent } from './meals/thirdnutrition/thirdnutrition.component';
//import { AngularFireModule } from '@angular/fire';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment.prod';
//import { environment } from '../environments/environment';
// import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
// import { provideAuth, getAuth } from '@angular/fire/auth';
// import { provideDatabase, getDatabase } from '@angular/fire/database';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import{AngularFireStorageModule} from '@angular/fire/compat/storage';
import { FormsModule } from '@angular/forms';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
//import { AngularFireModule } from '@angular/fire/compat';



import { ReactiveFormsModule } from '@angular/forms';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ProfileComponent } from './profile/profile.component';
import { FooterComponent } from './footer/footer.component';
import { AddPostComponent } from './add-post/add-post.component';
import { MealPlanComponent } from './meal-plan/meal-plan.component';
import { FavoritesComponent } from './favorites/favorites.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    MealPlanningComponent,
    NutritionComponent,
    SecondnutritionComponent,
    ThirdnutritionComponent,
    LoginComponent,
    RegisterComponent,
    ItemDetailComponent,
    ShoppingListComponent,
    ProfileComponent,
    FooterComponent,
    AddPostComponent,
    MealPlanComponent,
    FavoritesComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule
],
  providers: [
    FoodDescService,
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
