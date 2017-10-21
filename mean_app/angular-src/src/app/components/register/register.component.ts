import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

// Everytime we use a service in the component, we need to inject it
  constructor(
    private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // require the fields
    if(!this.validateService.validateRegister(user)){
      // console.log('please fill in the areas');
      // this is for the flash message it uses a combo of bootstrap
      this.flashMessagesService.show("Please fill in the fields", {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // validate the email
    if(!this.validateService.validateEmail(user.email)){
      // console.log('please use a valid email');
      this.flashMessagesService.show("Please use a valid email", {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Register User
    this.authService.registerUser(user).subscribe(data => {
      console.log(data);
      if(data.success){
        this.flashMessagesService.show("You are now registered and can log in", {cssClass: 'alert-success', timeout: 3000});
        // To re-direct we need to bring the router
        this.router.navigate(['/login']);
      } else{
        this.flashMessagesService.show("Something has gone horribly wrong!", {cssClass: 'alert-danger', timeout: 3000});
        // To re-direct we need to bring the router
        this.router.navigate(['/register']);
      }
    });
  }

}
