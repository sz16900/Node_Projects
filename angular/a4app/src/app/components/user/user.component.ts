import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  name:string;
  age:number;
  email:string;
  address:Address;
  // can use any for all kinds of things inside the array:
  hobbies:string[];
  posts:Post[];
  isEdit:boolean = false;

  constructor(private dataService:DataService) {

  }

  ngOnInit() {
    console.log('ngOnInit ran...');
    this.name = 'Alex Placentra!!';
    this.age = 30;
    this.email = 'alexp@gmail.com';
    this.address = {
      street:'333 Hello World RD.',
      city:'Boston',
      state:'Calif'
    }
    this.hobbies = ['cool', 'code', 'beer'];
    // this.hello ='hello';

    // Need to subscribe to it
    this.dataService.getPosts().subscribe((post) => {
      // console.log(posts);
      this.posts = post;
    });
  }

  onClick(){
    this.name="Seth is cooler";
    this.hobbies.push('New Hobby');
  }

  addHobby(hobby){
    console.log(hobby);
    this.hobbies.unshift(hobby);
    return false;
  }

  deleteHobby(hobby){
    for(let i = 0; i <this.hobbies.length; i++){
      if(this.hobbies[i] == hobby){
        this.hobbies.splice(i, 1);
      }
    }
  }

  toggleEdit(){
    this.isEdit= !this.isEdit;
  }

}

interface Address{
  street:string,
  city:string,
  state:string
}

interface Post{
  id:number,
  title:string,
  body:string,
  userId:number
}
