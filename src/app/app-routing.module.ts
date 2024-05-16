import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { MealPlanningComponent } from './meal-planning/meal-planning.component';
import { NutritionComponent } from './nutrition/nutrition.component';
import { SecondnutritionComponent } from './meals/secondnutrition/secondnutrition.component';
import { ThirdnutritionComponent } from './meals/thirdnutrition/thirdnutrition.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import{ItemDetailComponent} from './item-detail/item-detail.component'
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ProfileComponent } from './profile/profile.component';
import { FooterComponent } from './footer/footer.component';
import { AddPostComponent } from './add-post/add-post.component';
import { MealPlanComponent } from './meal-plan/meal-plan.component';
import { FavoritesComponent } from './favorites/favorites.component';


const routes: Routes = [
    // Default route redirects to homepage
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    // Routes for specific components
    { path: 'homepage', component: HomepageComponent },
    { path: 'meal-planning', component: MealPlanningComponent },
    { path: 'nutrition/:id', component: NutritionComponent },
    {path: 'secondnutrition/:id', component:SecondnutritionComponent},
    {path:'thirdnutrition/:id', component:ThirdnutritionComponent},
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'item-detail/:id', component: ItemDetailComponent },
    {path:'shopping-list',component:ShoppingListComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'footer', component: FooterComponent},
    { path: 'add-post', component: AddPostComponent},
    { path: 'meal-plan', component: MealPlanComponent},
    { path: 'favorites', component: FavoritesComponent},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
