import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: User = null;
  isAuthenticated = false;

  constructor() { }

  ngOnInit(): void {
  }

  

  

  
  
}
