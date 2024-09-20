import { Component } from '@angular/core';
import {Location} from '@angular/common';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  constructor(private _location: Location) 
  {}
  backClicked() {
    this._location.back();
  }
}
