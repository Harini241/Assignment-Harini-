import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import { UsersModel } from './users.component.model';
import { ApiService} from '../shared/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  formValue !:FormGroup;
  usersModelObj: UsersModel=new UsersModel();
  usersData !:any;
  constructor(private formbuilber: FormBuilder, 
    private api: ApiService) { }

  ngOnInit(): void {
    this.formValue=this.formbuilber.group({
      firstName :[],
      lastName :[],
      email:[],
      mobile:[],
      salary:[]
    })
    this.getAllUsers();
  
  }
  postUsersDetails(){
    this.usersModelObj.firstName=this.formValue.value.firstName;
    this.usersModelObj.email=this.formValue.value.email;
    this.usersModelObj.mobile=this.formValue.value.mobile;
    
    this.api.postUsers(this.usersModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("User added")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllUsers();
    },
    err=>{
      alert("something went wrong");
    })
    
    
    
  }
  getAllUsers(){
    this.api.getUsers()
    .subscribe(res=>{
      this.usersData=res.reverse();
      
    })
  }
  filter(){
    const ipt= (document.getElementById('ip') as HTMLInputElement).value.toUpperCase();
    const s= document.getElementsByClassName('card');

    for(let i=0;i<s.length;i++){
      let username= s[i].querySelector(".card-body .card-header");
    if(((username) as HTMLInputElement).innerText.toUpperCase().indexOf(ipt)>-1){
      ((s[i]) as HTMLInputElement).style.display="inline-block";
    }
    else{
      ((s[i]) as HTMLInputElement).style.display="none";
    }
  }
  }



}
