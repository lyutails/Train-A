import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'TTP-home',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
