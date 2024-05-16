import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {GoogleAuthProvider} from '@angular/fire/auth'
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { DatabaseService } from './database.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // constructor(private fireauth:AngularFireAuth,private router :Router) { }

  constructor(private fireauth: AngularFireAuth, private db: AngularFireDatabase, private router: Router,private database:DatabaseService) {}

    signup(name: string, email: string, password: string) {
        this.fireauth.createUserWithEmailAndPassword(email, password).then(
            (res) => {
                if (res.user) {
                    // Save the user's name and email in the database
                    let uid=res.user.uid;
                    this.database.recordUserData(uid,name);
                    localStorage.setItem('userId', uid);
                   /* this.db.object('/users/'+uid).set({
                        name: name,
                        email: email,
                    });*/

                    alert('Registration successful!');
                    //const uid =res.user.uid;
                    
                    this.router.navigate(['/login']);
                }
            },
            (err) => {
                alert('Something went wrong during registration. Please try again.');
                this.router.navigate(['/register']);
            }
        );
    }

  //login method
  signin(email:string,password:string){
    this.fireauth.signInWithEmailAndPassword(email,password).then((res)=>{
      let uid:any=res.user?.uid;
      console.log("userId From normal Login",uid);
      localStorage.setItem('userId', uid);
      localStorage.setItem('token','true')
      this.router.navigate(['/homepage'])

    },err =>{
      alert("somthing went wrong");
      this.router.navigate(['/login']);
    })
  }

  //register method
  // signup(email:string,password:string){
  //   this.fireauth.createUserWithEmailAndPassword(email,password).then((res)=>{
  //     alert("registration successful")
  //     this.router.navigate(['/login']);
  //   },err =>{
  //     alert("somthing went wrong in register");
  //     this.router.navigate(['/register']);
  //   })
  // }

  //logout
  logout(){
    this.fireauth.signOut().then(()=>{
      localStorage.removeItem('token')
      this.router.navigate(['/login']);
    },err =>{
      alert("somthing went wrong");
    })
  }



  //sign in with google
  googlesignin(){
    return this,this.fireauth.signInWithPopup(new GoogleAuthProvider).then((res)=>{
      this.router.navigate(['/homepage']);
      localStorage.setItem('token',JSON.stringify(res.user?.uid))
    },err =>{
      alert("somthing wrong in signIn with google")
    })
  }

}