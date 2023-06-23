import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() type: string = 'community';
  @Input() title: string = 'Communities';

  status: any = [];
  cities: any = [];

  constructor() { }

  ngOnInit(): void {
  }

}
