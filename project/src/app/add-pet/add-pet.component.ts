import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent {
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

  petForm = this.formBuilder.group({
    name: '',
    weight: '',
    color: '',
    eyesColor: '',
    age: '',
    image: ''
  });

  selectedFile: ImageSnippet;

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {  }

  result = 0;

  onSubmit(): void {
    this.result = 0;
    let pet = this.petForm.value;

    console.log(`Trying to add ${pet.name}...`);

    if ((
      pet.name == "") || (pet.name == null) ||
      (pet.weight == "") || (pet.weight == null) ||
      (pet.color == "") || (pet.color == null) ||
      (pet.eyesColor == "") || (pet.eyesColor == null) ||
      (pet.age == "") || (pet.age == null)
      ) {
      console.log('Error, you must write in all text-boxes');
      this.result = 1;
    } else {
      console.log(pet.image);
      this.apiServiceObs = this.api.addPet(pet);
      this.apiServiceObs.subscribe((data) => {
        if (data['status'] == 'done') {
          console.log('Registered');
          this.result = 3;
        } else if (data['status'] == 'existing'){
          console.log('Error, username already present on the database');
          this.result = 2;
        } else {
          console.log('Error! Answer not expected');
        }
      });

    }

    this.petForm.reset();
  }

  onFileLoad(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    console.log(file);

    reader.addEventListener('load', (event: any) => {
      reader.readAsDataURL(file);
      reader.onload = function() {
        console.log(reader.result)
      };
    });

    reader.readAsDataURL(file);
  }

}
