import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';

import { HousingLocation } from '../housinglocation';

@Component({
  selector: 'app-housing-location',
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './housing-location.template.html',
  styleUrl: './housing-location.component.less'
})

export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;
}
