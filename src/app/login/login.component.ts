import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import {  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { GetRoleService } from './get-role.service';
import { firstValueFrom } from 'rxjs';
import { ManageObjRequestBody } from '../administration-panel/manage-obj-request-body';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorBaner = false;
  logInForm!: FormGroup;
  credentials!: string;
  credentialsBase64!: string;

  private loginService = inject(LoginService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private getRole = inject(GetRoleService);

  ngOnInit(){
    const i = new ManageObjRequestBody();
    const a = new ManageObjRequestBody(null,'sfd');
    const c = new ManageObjRequestBody('fd');
    alert('dfgfgdgfd');
    console.log(i);
    console.log(a);
    console.log(c);
  }

  constructor(private formBuilder: FormBuilder) {
    this.logInForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email /*pattern(/^[\w]+@([\w-]+\.)+[\w]{2,4}$/)*/,
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
          ),
        ],
      ],
    });
  }

  submitLogIn() {
    //this.router.navigate(['/adminPanel']);
    
    this.credentials = this.logInForm.value.email + ':' + this.logInForm.value.password;
    this.credentialsBase64 = btoa(String.fromCharCode(...new TextEncoder().encode(this.credentials)));

    this.loginService.loginUser(this.credentialsBase64).subscribe({
      next: async (response) => {
        if (response.status === 200) {
           
          this.router.navigate(['/adminPanel']);
      
        }
    
      },
      error: (error) => {
        this.errorBaner = true; 
      },
    });
    
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
