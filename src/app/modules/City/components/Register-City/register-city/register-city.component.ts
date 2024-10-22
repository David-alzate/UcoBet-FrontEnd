import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-city',
  templateUrl: './register-city.component.html',
  styleUrls: ['./register-city.component.css']
})
export class RegisterCityComponent implements OnInit{

  CityForm: FormGroup;
  state: any;
  city: any;

  constructor(
    public fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.CityForm = this.fb.group({
      nombre: ['', Validators.required],
      state: ['', Validators.required],
    });

  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  guardarCity(){

  }

}
