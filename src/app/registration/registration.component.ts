import { Component } from '@angular/core';
import { UserRepositoryService } from '../shared/services/user-repository.service';
import { User } from '../interfaces/user.model';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from '../shared/services/error-handler.service.service';
import { NotificationService } from '../shared/services/notification.service.service';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  errorMessage: string ='' ;
  public homeText: string;
  userForm: FormGroup; 
  user = {} as User;
  constructor(private repository: UserRepositoryService,private formBuilder: FormBuilder,private router: Router,private errorHandler: ErrorHandlerService,private notification: NotificationService, private modal: BsModalService) 
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
      address: new FormControl(''),
      mobileNumber: new FormControl('')
    });
  }

  createFormInstance(){
    this.userForm = this.formBuilder.group({
      fullName:['', Validators.required],
      userName: ['',Validators.required],
      password: ['', Validators.required],
      email:['', Validators.required],
      address:['', Validators.required],
      mobileNumber:['', Validators.required]
    })
  }

  onClickRegister() {
    this.errorMessage = '';
    const apiUri: string = `api/User/user`;
    this.user = {
      fullName : this.userForm.controls.fullName.value,
      userName : this.userForm.controls.userName.value,
      password : this.userForm.controls.password.value,
      email : this.userForm.controls.email.value,
      address : this.userForm.controls.address.value,
      mobileNumber : this.userForm.controls.mobileNumber.value,
    }
    this.repository.createUser(apiUri, this.user).subscribe({
      next: (res:any)=> {
        try {
          this.notification.showSuccess(res, "Success");
        } catch (parseError) {
          console.log(JSON.parse(parseError));
        }
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = '';
        this.errorMessage = err.error;
        //console.log("error",err.error);
        //#region 
        if(err.error.text=="User created successfully" || err.error.text=="User already exists for thsi user name"){
        this.notification.showSuccess(err.error.text, "Success");
        //#endregion
        }
    }
    })
  }

  validateControl = (controlName: string) => {
    if (this.userForm.get(controlName).invalid && this.userForm.get(controlName).touched)
      return true;
    
    return false;
  } 
  hasError = (controlName: string, errorName: string) => {
    if (this.userForm.get(controlName).hasError(errorName))
      return true;
    
    return false;
  }
  }
