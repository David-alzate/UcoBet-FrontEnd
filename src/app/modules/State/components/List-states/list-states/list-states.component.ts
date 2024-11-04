import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StatesService } from '../../../services/states.service';
import { MatDialog } from '@angular/material/dialog';

interface State {
  id: any;
  nombre: string;
  country: string;
}

@Component({
  selector: 'app-list-states',
  templateUrl: './list-states.component.html',
  styleUrl: './list-states.component.css'
})
export class ListStatesComponent implements OnInit {

  States: State[] = []
  displayedColumns: string[] = ['nombre', 'country', 'acciones'];
  dataSource: MatTableDataSource<State> = new MatTableDataSource<State>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public stateService: StatesService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.cargarStates();
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

  cargarStates() {
    this.stateService.getAllStates().subscribe(
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
      }
    );
  }
  
  eliminarState(state: { id: any; }): void {

  }

  editarState(id: any) {
  }

}
