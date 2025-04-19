import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';
import mockData from './mock/db.json';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  private mockHousingLocations: HousingLocation[] = mockData.locations

  setHousingLocationsToLS(data:HousingLocation[]):void{
    window.localStorage.setItem('houses_aray',JSON.stringify(data))
  }

  getHousingLocationsFromLS():HousingLocation[] {
    const arrayFromLS = window.localStorage.getItem('houses_aray')
    if(arrayFromLS) return JSON.parse(arrayFromLS)
    return []
  }

  removeHousingLocationsFromLS():void{
    window.localStorage.removeItem('houses_aray')
  }

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const housesFromLS = this.getHousingLocationsFromLS()
    
    if(housesFromLS.length !==0) return housesFromLS
    
    await new Promise(resolve => setTimeout(resolve, 300))
    
    this.setHousingLocationsToLS(this.mockHousingLocations)
    return this.mockHousingLocations
  }

  async getHousingLocationById(id: string): Promise<HousingLocation | undefined> {

    await new Promise(resolve => setTimeout(resolve, 200));
    
    const housesFromLS = this.getHousingLocationsFromLS();
    const searchIn = housesFromLS.length > 0 ? housesFromLS : this.mockHousingLocations;
    
    return searchIn.find(location => location.id === id);
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Application submitted: ${firstName} ${lastName}, ${email}`);
  }
}