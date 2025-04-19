import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { TuiRoot } from "@taiga-ui/core";

import { HousingService } from './housing.service';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, TuiRoot],
  templateUrl: './app.template.html',
  styleUrl: './app.component.less',
})

export class AppComponent {
  title = 'homes';
}