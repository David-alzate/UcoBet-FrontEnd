import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StatesService } from 'src/app/modules/State/services/states.service';
import { CitiesService } from '../../../services/cities.service';

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
    public stateService: StatesService,
    public cityService: CitiesService,
    private _snackBar: MatSnackBar
  ) {
    this.CityForm = this.fb.group({
      cityName: ['', Validators.required],
      state: ['', Validators.required],
    });

  }

  ngOnInit(): void {
    this.stateService.getAllStates().subscribe(resp => {
      this.state = resp.datos
    },
      error => { console.error(error) }
    );
  }

  guardarCity() {
    if (this.CityForm.valid) {
      const cityData = {
        cityName: this.CityForm.value.cityName,
        stateId: this.CityForm.value.state.id
      };
  
      console.log('Datos del formulario a enviar:', cityData);
  
      this.cityService.saveCity(cityData).subscribe(
        resp => {
          this._snackBar.open(resp.mensajes[0], '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.CityForm.reset();
          this.city.push(resp);
          console.log('Respuesta del servidor:', resp);
        },
        error => {
          console.error('Error al guardar la ciudad:', error);
          this._snackBar.open(error.error.mensajes[0], '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      );
    } else {
      this._snackBar.open('Formulario inválido. Por favor, completa todos los campos requeridos.', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }

  }
