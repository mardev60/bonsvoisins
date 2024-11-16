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
    this.geoLocalisationService.getGeolocalisation().subscribe(
      (response : any) => {
      this.currentLocation = `${response.street}, ${response.city}`;

      (error : any) => {
        console.error(error);
        this.currentLocation = 'Impossible de récupérer votre position';
      }
    });
  }
  
  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
  
  saveLocation() {
    this.isEditing = false;
  }
  
  useGeolocation() {
    this.currentLocation = 'Géolocalisation activée';
    this.isEditing = false;
  }
  
  fetchAddressSuggestions() {
    this.addressSuggestions = [
      '123 Rue de Paris, Ivry-sur-Seine',
      '456 Avenue de la République, Paris',
      '789 Boulevard Saint-Michel, Paris'
    ];
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