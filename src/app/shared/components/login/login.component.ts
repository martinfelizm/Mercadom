import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UsersService } from '../../../core/services/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public users: User = new User();
  L_user: string;
  L_pass: string;
  selectedVal: string;
  responseMessage: string = '';
  responseMessageType: string = '';
  emailInput: string;
  passwordInput: string;
  isForgotPassword: boolean;
  userDetails: any;

  constructor(public srv: UsersService, public router: Router) {
    this.selectedVal = 'login';
    this.isForgotPassword = false;
  }

  ngOnInit() {
    this.users = {
      FullName: "",
      Pass: "",
      Enable: false,
      Role: 0,
      Email: "",
      CreationUser: ""
    };
  }

  showMessage(type, msg) {
    this.responseMessageType = type;
    this.responseMessage = msg;
    setTimeout(() => {
      this.responseMessage = "";
    }, 2000);
  }

  public onValChange(val: string) {
    this.showMessage("", "");
    this.selectedVal = val;
  }

  isUserLoggedIn() {
    this.userDetails = this.srv.isUserLoggedIn();
  }
  
  logoutUser() {
    this.srv.logout()
      .then(res => {
        console.log(res);
        this.userDetails = undefined;
        sessionStorage.removeItem('user');
      }, err => {
        this.showMessage("danger", err.message);
      });
  }
 
  loginUser(user : User) {
    this.responseMessage = "";
    this.srv.login(user.Email, user.Pass)
      .then(res => {
        console.log(res);
        this.showMessage("success", "Successfully Logged In!");
       // this.router.navigate(["/dashboard", res.user.uid]);
       this.router.navigate(["/"]);
        this.isUserLoggedIn();
      }, err => {
        this.showMessage("danger", err.message);
      });
  }
 
  
  registerUser() {
    this.srv.register(this.emailInput, this.passwordInput)
      .then(res => { 
       
        this.srv.sendEmailVerification().then(res => {
          console.log(res);
          this.isForgotPassword = false;
          this.showMessage("success", "Registration Successful! Please Verify Your Email");
        }, err => {
          this.showMessage("danger", err.message);
        });
        this.isUserLoggedIn();
 
 
      }, err => {
        this.showMessage("danger", err.message);
      });
  }
 
  
  forgotPassword() {
    this.srv.sendPasswordResetEmail(this.emailInput)
      .then(res => {
        console.log(res);
        this.isForgotPassword = false;
        this.showMessage("success", "Please Check Your Email");
      }, err => {
        this.showMessage("danger", err.message);
      });
  }
 
 
  googleLogin() {
    this.srv.loginWithGoogle()
      .then(res => {
        console.log(res);
        this.showMessage("success", "Successfully Logged In with Google");
        this.isUserLoggedIn();
      }, err => {
        this.showMessage("danger", err.message);
      });
  }

  ValidateUser(user: User) {
    // this.srv.SingIn(user);
    if (user.Email == "" || user.Pass == "") {
      console.log("Vacio: " + user.Email + " Contraseña: " + user.Pass);
    }
    else {

      this.responseMessage = "";
      this.srv.login(this.emailInput, this.passwordInput)
        .then(res => {
          console.log(res);
          this.showMessage("success", "Successfully Logged In!");
          
          this.isUserLoggedIn();
        }, err => {
          this.showMessage("danger", err.message);
        });
      console.log("Usuario: " + user.Email + " Contraseña: " + user.Pass);
    }

    //console.log("Usuario:");
    // console.log("Usuario: "+ user);
  }

}
