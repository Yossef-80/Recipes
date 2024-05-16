export interface allfood {
  key:string
  id:number;
  img: string;
  nameOfFood: string;
  countryOfFood: string;
  duration: string;
  rating: string;
  ingredients:string[],
  cooking_steps:string[],
  nutrition_facts:[[]],
  //icon:string;
  //description:string
  ingredientType:string,
  reviews:comment[],
  likes:number
}
export interface comment{
  comment:string,
  rate:number,
  username:string
}
export interface UserAccount{
  userName?:string,
  img?:string,
  recipes?:allfood[],
  mealPlanning?:[],
  followers?:number,
  following?:number,
  recipeCount?:number,
  favouriteMeals?:allfood[],
  key?:string


}