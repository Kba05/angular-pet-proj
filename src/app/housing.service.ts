import {Injectable} from '@angular/core';
import {HousingLocation} from './housinglocation';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  url = 'http://localhost:3000/locations';
  
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
    
    const res = await fetch(this.url)
    const data = await res.json() ?? []
    this.setHousingLocationsToLS(data)
    return data 
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}?id=${id}`);
    const locationJson = await data.json();
    return locationJson[0] ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    // tslint:disable-next-line
    console.log(firstName, lastName, email);
  }
  
}