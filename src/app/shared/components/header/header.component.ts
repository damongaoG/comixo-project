import {Component, OnInit} from '@angular/core';
import {CONSTANTS} from "../../constants";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  email = CONSTANTS.EMAIL;

  constructor() { }

  ngOnInit(): void {
  }

}
