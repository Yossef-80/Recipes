import { Injectable } from '@angular/core';
import { allfood } from './allfood';
@Injectable({
  providedIn: 'root'
})
export class FoodDescService {

 protected listOFFood:allfood[] = [
    {
      id :1,
      img: '../../assets/images/meal1.jpg',
      nameOfFood: 'FattoushSalad',
      countryOfFood: 'Italian',
      duration: '15Min',
      rating: '4.9',
     // icon:"fa-solid fa-star",
      ingredientType: '',
      key:"",
      reviews:[],
      ingredients:[],
      cooking_steps:[],
      nutrition_facts:[[]],
      likes:0

    },
    {
      id :2,
      img: '../../assets/images/burger22.jpg',
      nameOfFood: 'Burger Sandwich',
      countryOfFood: 'England',
      duration: '35Min',
      rating: '3.6',
      //icon:"fa-solid fa-star",
      ingredientType: '',
      key:"",
      ingredients:[],
      reviews:[],
      cooking_steps:[],
      nutrition_facts:[[]],
      likes:0


    },
    {
      id :3,
      img: '../../assets/images/pasta222.jpeg',
      nameOfFood: 'Pasta',
      countryOfFood: 'Italian',
      duration: '10Min',
      rating: '4.6',
     // icon:"fa-solid fa-star",
      ingredientType: '',
      key:"",
      ingredients:[]
      ,
      reviews:[],
      cooking_steps:[],
      nutrition_facts:[[]],
      likes:0

    },
    {
      id :4,
      img: '../../assets/images/meal1.jpg',
      nameOfFood: 'FattoushSalad',
      countryOfFood: 'Italian',
      duration: '15Min',
      rating: '4.9',
      //icon:"fa-solid fa-star",
      ingredientType: '',
      key:"",
      ingredients:[]
      ,
      reviews:[],
      cooking_steps:[],
      nutrition_facts:[[]],
      likes:0

    },
    {
      id :5,
      img: '../../assets/images/meal1.jpg',
      nameOfFood: 'FattoushSalad',
      countryOfFood: 'Italian',
      duration: '15Min',
      rating: '4.9',
      //icon:"fa-solid fa-star",
      ingredientType: '',
      key:"",
      ingredients:[]
      ,
      cooking_steps:[],
      reviews:[],
      nutrition_facts:[[]],
      likes:0

    },
    {
      id :6,
      img: '../../assets/images/meal1.jpg',
      nameOfFood: 'FattoushSalad',
      countryOfFood: 'Italian',
      duration: '15Min',
      rating: '4.9',
      //icon:"fa-solid fa-star",
      ingredientType: '',
      key:"",
      ingredients:[]
      ,
      cooking_steps:[],
      nutrition_facts:[[]],
      reviews:[],
      likes:0
    },
    {
      id: 7,
      img: '../../assets/images/meal1.jpg',
      nameOfFood: 'FattoushSalad',
      countryOfFood: 'Italian',
      duration: '15Min',
      rating: '4.9',
      ingredientType: '',
      key:"",
      ingredients:[]
      ,
      reviews:[],
      cooking_steps:[],
      nutrition_facts:[[]],
      likes:0

    },
    {
      id: 8,
      img: '../../assets/images/meal1.jpg',
      nameOfFood: 'FattoushSalad',
      countryOfFood: 'Italian',
      duration: '15Min',
      rating: '4.9',
      ingredientType: '',
      key:"",
      ingredients:[]
      ,
      cooking_steps:[],
      nutrition_facts:[[]],
      reviews:[],
      likes:0

    },
    {
      id: 9,
      img: 'assets/images/meal1.jpg',
      nameOfFood: 'FattoushSalad',
      countryOfFood: 'Italian',
      duration: '15Min',
      rating: '4.9',
      reviews:[],
     // ingredientType: ''
     ingredientType:"",
     key:"",
     ingredients:[]
     ,
     cooking_steps:[],
     nutrition_facts:[[]],
     likes:0

    },




  ];

getAllFood():allfood[] {
return this.listOFFood;

}

getFoodByid(id:number):allfood | undefined {
  return this.listOFFood.find(allfood =>allfood.id === id);

}

  constructor() { }
}
