import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';
import { CustomDialog } from '../custom-dialog/custom-dialog.component';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { tuiDialog } from '@taiga-ui/core';
import { Icon } from 'leaflet';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent, LeafletModule],
  templateUrl: './home.template.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  
  // Настройки карты
  mapOptions: L.MapOptions = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: ''})
    ],
    zoom: 10,
    center: L.latLng(39.745302, -104.998165),
    attributionControl: false
  };

  private map!: L.Map;
  private markerCluster!: L.MarkerClusterGroup;

  ngOnInit(): void {
    this.loadHousingLocations();
  }

  private loadHousingLocations(): void {
    this.housingService.getAllHousingLocations().then((locations: HousingLocation[]) => {
      this.housingLocationList = locations;
      this.filteredLocationList = locations;
      this.updateMapMarkers();
    });
  }

  onMapReady(map: L.Map): void {
    this.map = map;
    this.initMarkerCluster();
    this.updateMapMarkers();
  }

  private initMarkerCluster(): void {
    this.markerCluster = L.markerClusterGroup({
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false
    });
    this.map.addLayer(this.markerCluster);
  }

  private updateMapMarkers(): void {
    if (!this.markerCluster) return;

    this.markerCluster.clearLayers();

    this.filteredLocationList.forEach(location => {
      const [lat, lng] = this.parseCoordinates(location.coordinates);
      const marker = L.marker([lat, lng], {
        icon: this.getCustomIcon()
      });

      marker.bindPopup(this.createPopupContent(location));
      this.markerCluster.addLayer(marker);
    });
  }

  centerMap(location: HousingLocation): void {
    if (!this.map) return;
    const [lat, lng] = this.parseCoordinates(location.coordinates);
    this.map.flyTo([lat, lng], 15);
  }

  private parseCoordinates(coords: string): [number, number] {
    const [lat, lng] = coords.split(',').map(Number);
    return [lat, lng];
  }

  private getCustomIcon(): L.Icon {
    return L.icon({
      ...Icon.Default.prototype.options,
      iconUrl: 'assets/marker-icon.png',
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      shadowUrl: 'assets/marker-shadow.png'
     });
  }

  private createPopupContent(location: HousingLocation): string {
    return `
      <div class="popup-content">
        <h3>${location.name}</h3>
        <p><strong>City:</strong> ${location.city}, ${location.state}</p>
        <p><strong>Available:</strong> ${location.availableUnits} units</p>
        <div class="amenities">
          ${location.wifi ? '<span class="amenity wifi">Wi-Fi</span>' : ''}
          ${location.laundry ? '<span class="amenity laundry">Laundry</span>' : ''}
        </div>
        <img src="${location.photo}" alt="${location.name}" class="popup-image">
      </div>
    `;
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
    } else {
      this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
        housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
      );
    }
    this.updateMapMarkers();
  }

  private readonly dialog = tuiDialog(CustomDialog, {
    dismissible: true,
    label: 'Add housing location'
  })

  protected showDialog(): void {
    this.dialog(null).subscribe({
      next: (data) => {
        const homes = this.housingLocationList;
        homes.push(data);
        this.housingService.setHousingLocationsToLS(homes);
        this.updateMapMarkers();
      }
    })
  }
}