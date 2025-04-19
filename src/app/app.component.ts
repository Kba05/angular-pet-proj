import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { TuiRoot } from "@taiga-ui/core";

import { HousingService } from './housing.service';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, TuiRoot],
  templateUrl: './app.template.html',
  styleUrl: './app.component.less',
})

export class AppComponent implements OnInit {
  title = 'homes';
  housingService = inject(HousingService);
  ngOnInit() {
    this.housingService.removeHousingLocationsFromLS()
  }
}