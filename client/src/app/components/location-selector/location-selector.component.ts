import { Component, OnInit } from '@angular/core';
import { GeoLocalisationService } from '../../core/services/geo-localisation.service';

@Component({
  selector: 'app-location-selector',
  templateUrl: './location-selector.component.html'
})
export class LocationSelectorComponent implements OnInit {
  isEditing: boolean = false;
  currentLocation: string = 'Chargement ...';
  addressSuggestions: string[] = [];
  distance: number = 2;

  constructor(private geoLocalisationService : GeoLocalisationService) {}

  ngOnInit() {
    this.useGeolocation();
  }
  
  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
  
  saveLocation() {
    this.isEditing = false;
  }
  
  useGeolocation() {
    this.isEditing = false;
    this.geoLocalisationService.getGeolocalisation().subscribe(
      (response : any) => {
      this.currentLocation = `${response.street}, ${response.city}`;

      (error : any) => {
        console.error(error);
        this.currentLocation = 'Impossible de récupérer votre position';
      }
    });
  }
  
  fetchAddressSuggestions() {
    if (this.currentLocation.length > 3) {
      this.geoLocalisationService.searchAdresses(this.currentLocation).subscribe(
        (response: any) => {
          console.log(response.features);
          if (response && response.features) {
            this.addressSuggestions = response.features.map((adress: any) => adress.properties.name + ', ' + adress.properties.city + ' (' + adress.properties.postcode + ')');
          }
        },
        (error: any) => {
          console.error(error);
          this.addressSuggestions = [];
        }
      );
    } else {
      this.addressSuggestions = [];
    }
  }
  
  
  selectAddress(suggestion: string) {
    this.currentLocation = suggestion;
    this.addressSuggestions = [];
  }
  
  setDistance(km: number) {
    this.distance = km;
    console.log(`Voir les repas dans un rayon de ${km} km`);
  }  
}