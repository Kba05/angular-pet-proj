import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { tuiDialog } from '@taiga-ui/core';

import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';
import { CustomDialog } from '../custom-dialog/custom-dialog.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HousingLocationComponent],
  templateUrl: './home.template.html',
  styleUrl: './home.component.less',
})

export class HomeComponent {

  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];

  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
      housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
    )
  }

  private readonly dialog = tuiDialog(CustomDialog, {
    dismissible: true,
    label: 'Add housing location'
  })

  protected showDialog(): void {
    this.dialog(null).subscribe({
      next: (data) => {
        const homes = this.housingLocationList
        homes.push(data)
        this.housingService.setHousingLocationsToLS(homes)
      }
    })
  }

}