import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CitiesService } from '../../../services/cities.service';
import Swal from 'sweetalert2';

interface City {
  id: any;
  nombre: string;
  state: string;
}

@Component({
  selector: 'app-list-cities',
  templateUrl: './list-cities.component.html',
  styleUrl: './list-cities.component.css'
})
export class ListCitiesComponent implements OnInit{

  States: City[] = []
  displayedColumns: string[] = ['nombre', 'state', 'acciones'];
  dataSource: MatTableDataSource<City> = new MatTableDataSource<City>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public cityService: CitiesService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.cargarCiudades();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cdr.detectChanges();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarCiudades(): void {
    this.cityService.getAllCities().subscribe(
      resp => {
        this.States = resp.datos;
        this.dataSource.data = this.States;
        this.cdr.detectChanges();
  
        if (this.paginator && this.dataSource) {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.paginator._changePageSize(this.paginator.pageSize);
        }
      },
      error => {
        console.error(error);
        // Mostrar mensaje de error con SweetAlert2
        Swal.fire({
          title: 'Error al conectar con el servidor',
          text: "No se pudo obtener la información del servidor. Intenta nuevamente más tarde.",
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar',
          buttonsStyling: true
        });
      }
    );
  }
  
  eliminarCity(state: { id: any; }): void {

  }

  editarCity(id: any) {
  }

}
