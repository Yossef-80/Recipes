/*
import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
// import { Router } from 'express';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { RegisterComponent } from '../register/register.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
constructor(private authService: AuthService ,private router:Router,private db:DatabaseService){}
  signInwithgoogle(){

    this.authService.signInwithgoogle().then((res:any)=>{
          //  console.log(res.user.uid);

      const uid =res.user.uid;
      this.db.recordUserData(uid);
    this.router.navigateByUrl('homepage');  
    }).catch((error:any)=>{console.error(error)})



  }
  navigateToRegister() {
    this.router.navigate(['/register']);
}






async login(email: string, password: string) {
  try {
      const userCredential = await this.authService.signinwithEmailandPassword({ email, password });
      
      // Perform any post-login logic here
      
      // Navigate to the home page after successful login
      this.router.navigate(['/homepage']);
  } catch (error) {
      console.error('Login error:', error);
  }
}











// loginwithEmailandPassword(){

// this.authService.signinwithEmailandPassword().then((res:any)=>{
//   this.router.navigateByUrl('homepage');  
//   }).catch((error:any)=>{console.error(error)})
  
// }

}
*/
import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
// import { Router } from 'express';
import { Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { DatabaseService } from '../services/database.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email:string='';
  password:string='';

  constructor(private auth:AuthService,private router:Router,private db:DatabaseService) { }

  ngOnInit(): void{
  }

  login(){
    if(this.email==''){
      alert('please enter email')
      return;
    }

    if(this.password==''){
      alert('please enter password')
      return;
    }

    this.auth.signin(this.email,this.password);
    this.email='';
    this.password='';
  }

  signinwithgoogle(){
    this.auth.googlesignin().then((res:any)=>{
      //  console.log(res.user.uid);

  const uid =res.user.uid;
  this.db.recordUserData(uid);
  localStorage.setItem('userId',uid);
this.router.navigateByUrl('homepage');  
}).catch((error:any)=>{console.error(error)})
  
}
}