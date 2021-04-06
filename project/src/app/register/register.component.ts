import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild('pause') pause: ElementRef;
  @ViewChild('success') success: ElementRef;
  @ViewChild('alreadyRegistered') alreadyRegistered: ElementRef;
  @ViewChild('missingValues') missingValues: ElementRef;
  @ViewChild('pwd') pwdBox: ElementRef;
  @ViewChild('confirmPwd') confirmPwdBox: ElementRef;

  apiServiceObs: Observable<Object>;
  sshowPwd = false;
  sshowConfirmPwd = false;
  height = window.innerHeight;

  registrationForm = this.formBuilder.group({
    username: '',
    password: '',
    confirmPassword: ''
  });

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {  }

  result = 0;

  onSubmit(): void {
    let data = this.registrationForm.value;

    console.log(`Trying to register ${data.username}...`);

    if (data.password != data.confirmPassword) {
      this.result = 4;
      console.log('Error, passwords are not the same');
    } else if ((data.username == "") || (data.username == null) || (data.password == "") || (data.password == null) || (data.confirmPassword == "") || (data.confirmPassword == null) ) {
      console.log('Error, you must write in all text-boxes');
      this.result = 1;
    } else {
      this.apiServiceObs = this.api.register(data.username, data.password);
      this.apiServiceObs.subscribe((data) => {
        if (data['status'] == 'done') {
          console.log('Registered');
          this.result = 3;
        } else if (data['status'] == 'existing_user'){
          console.log('Error, username already present on the database');
          this.result = 2;
        } else {
          console.log('Error! Answer not expected');
        }
      });

    }

    this.registrationForm.reset();
  }

}
