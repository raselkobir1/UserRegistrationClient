import { Component } from '@angular/core';
import { UserRepositoryService } from '../shared/services/user-repository.service';
import { User } from '../interfaces/user.model';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
//import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  public homeText: string;
  userForm: FormGroup; 
  //bsModalRef?: BsModalRef;
  user = {} as User;
  constructor(private repository: UserRepositoryService,private formBuilder: FormBuilder,private router: Router) 
  { 
    this.homeText = "WELCOME TO User Registration APP";
    this.createFormInstance();
  }
  
  ngOnInit(): void {
    this.userForm = new FormGroup({
      fullName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      mobileNumber: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }

  createFormInstance(){
    this.userForm = this.formBuilder.group({
      fullName:[''],
      userName: ['',Validators.required],
      password: ['', Validators.required],
      email:[''],
      mobileNumber:['']
    })
  }
  fullName: string;
  userName: Date;
  email: string;
  address: string;
  mobileNumber: string;

  onClickRegister() {
    const apiUri: string = `api/User/user`;
    this.user = {
      fullName : this.userForm.controls.fullName.value,
      userName : this.userForm.controls.userName.value,
      password : this.userForm.controls.password.value,
      email : this.userForm.controls.email.value,
      address : this.userForm.controls.address.value,
      mobileNumber : this.userForm.controls.mobileNumber.value,
    }
    console.log('obj :', this.user);

    
    this.repository.createUser(apiUri, this.user).subscribe({
      next: (res:any)=>{
        var x = res;
        console.log('Registration result :',x);
        //this.notification.showSuccess("User successfully Created", "Success");
      },
      error: (err: HttpErrorResponse) => err
    })
    console.log('obj :', this.user);
  }

  }
