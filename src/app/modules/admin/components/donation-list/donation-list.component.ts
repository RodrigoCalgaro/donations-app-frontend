import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Donation } from '../../interfaces/donation';
import { DonationService } from '../../services/donation.service';


@Component({
  selector: 'app-donation-list',
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.css']
})
export class DonationListComponent implements OnInit  {
  displayedColumns: string[] = ['donationId', 'date', 'amount', 'user'];
  dataSource!: MatTableDataSource<Donation>;
  xPagination!: any;

  filter: string = "";
  sorterBy: string = "donationId";
  sorterDirection: string = "desc";
  timeout: any;

  constructor(
    private donationService: DonationService
  ) { }

  ngOnInit() {
    this.setGrid(this.filter, 1, 5, this.sorterBy, this.sorterDirection)
  }

  pageEvents(event: PageEvent): void {
    let pageNumber = (event.pageIndex + 1)
    let pageSize = event.pageSize
    this.setGrid(this.filter, pageNumber, pageSize, this.sorterBy, this.sorterDirection)
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      if (filterValue != this.filter){
        this.filter = filterValue;
        this.setGrid(filterValue, 1, this.xPagination.pageSize, this.sorterBy, this.sorterDirection);
      }
    }, 300);
  }

  sortData(sort: Sort) {
    this.sorterBy = sort.active;
    this.sorterDirection = sort.direction;
    this.setGrid(this.filter, 1, this.xPagination.pageSize, this.sorterBy, this.sorterDirection);
  }

  setGrid(filter: string, pageNumber: number, pageSize: number, sorterBy: string, sorterDirection: string): void {
    this.donationService.getAll(filter, pageNumber, pageSize, sorterBy, sorterDirection).subscribe(res => {
      this.xPagination = JSON.parse(res.headers.get("x-pagination"));
      this.dataSource = new MatTableDataSource<Donation>(res.body);
    })
  }
}
