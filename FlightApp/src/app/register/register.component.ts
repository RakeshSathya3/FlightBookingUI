import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewUserData } from '../models/NewUserData';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  AlertMessage : string = ''
  NewUserData: NewUserData = new NewUserData();


  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }



/*   registerUser() {   
    
    debugger; 
    this._auth.registerUser(userdetails).subscribe(res => {
      localStorage.setItem('token', res.token)
      localStorage.setItem('email', res.email)
      localStorage.setItem('role', res.roleId)
      localStorage.setItem('userID', res.userID)
      this._router.navigate(['/home'])
    },
      err => {
        this.AlertMessage="Fail to register"
      })
    
  } */


  registerUser() {
    var userdetails={
      emailId:this.NewUserData.emailId,
      password:this.NewUserData.password,
      userName:this.NewUserData.userName,
      contactNo:this.NewUserData.contactNo,  
      gender:this.NewUserData.gender,  
      age:this.NewUserData.age,  
      roleId:this.NewUserData.roleId,      
    }
    debugger;    
    this._auth.registerUser(userdetails).subscribe(res => {
      //localStorage.setItem('token', res.token)
      alert(res.response)
      localStorage.setItem('userId', res.userId)
      localStorage.setItem('roleId', res.roleId)
      localStorage.setItem('token', res.token)
    },
      err => console.log(err)
    )
  }

  hasError(typeofvalidator:string,controlname:string):boolean{
    return this.NewUserData.formRegisterGroup.controls[controlname].hasError(typeofvalidator);
  }
}

