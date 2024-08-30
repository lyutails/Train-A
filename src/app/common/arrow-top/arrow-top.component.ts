import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'TTP-arrow-top',
  standalone: true,
  imports: [CommonModule, MatIcon, MatIconButton],
  templateUrl: './arrow-top.component.html',
  styleUrl: './arrow-top.component.scss',
})
export class ArrowTopComponent {
  @Input() disabled!: boolean;
  @Input() backgroundColor!: string;
}
