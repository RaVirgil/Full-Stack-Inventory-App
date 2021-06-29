import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public categories = [
    'Watch',
    'Cologne',   
    'Beard oil',
    'Hair wax',
    'Accessories',
  ];  

  constructor() {}

  ngOnInit(): void {}
}
