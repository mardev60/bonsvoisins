import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GeoLocalisationService } from '../../core/services/geo-localisation.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-location-selector',
  templateUrl: './location-selector.component.html'
})
export class LocationSelectorComponent implements OnInit {
  isEditing = false;
  isLocationLoading = false;
  currentLocation = 'Chargement...';
  selectedLocation = '';
  @Output() locationChange = new EventEmitter<string>();
  addressSuggestions: string[] = [];
  distance = 2;

  constructor(private geoLocalisationService: GeoLocalisationService) {}
  
  ngOnInit(): void {
    this.useGeolocation();
  }

  /**
   * Méthode pour basculer l'état d'édition de la localisation.
   * @returns {void}
   */
  toggleEdit(): void {
    if (!this.isLocationLoading) {
      this.isEditing = !this.isEditing;
    }
  }

  /**
   * Méthode pour enregistrer la localisation sélectionnée et
   * émettre un événement au composant parent.
   * @returns {void}
   */
  saveLocation(): void {
    if (this.selectedLocation) {
      this.currentLocation = this.selectedLocation;
      this.isEditing = false;
      this.locationChange.emit(this.currentLocation);
    }
  }

  /**
   * Méthode pour obtenir la localisation actuelle de l'utilisateur
   * à l'aide du service de géolocalisation.
   * @returns {void}
   */
  useGeolocation(): void {
    this.isLocationLoading = true;
    this.geoLocalisationService.getGeolocalisation().pipe(
      catchError(error => {
        console.error('Geolocation error:', error);
        this.currentLocation = 'Impossible de récupérer votre position';
        return of(null);
      }),
      finalize(() => {
        this.isLocationLoading = false;
      })
    ).subscribe((response: any) => {
      if (response) {
        this.currentLocation = `${response.street}, ${response.city}`;
        this.selectedLocation = this.currentLocation;
        this.locationChange.emit(this.currentLocation);
        this.isEditing = false;
      }
    });
  }

  /**
   * Méthode pour rechercher des suggestions d'adresses basées
   * sur l'entrée de l'utilisateur.
   * @returns {void}
   */
  fetchAddressSuggestions(): void {
    if (this.selectedLocation.length > 3) {
      this.geoLocalisationService.searchAdresses(this.selectedLocation).subscribe(
        response => {
          if (response && response.features) {
            this.addressSuggestions = response.features.map(
              (address: any) => `${address.properties.name}, ${address.properties.city} (${address.properties.postcode})`
            );
          }
        },
        error => {
          console.error('Address search error:', error);
          this.addressSuggestions = [];
        }
      );
    } else {
      this.addressSuggestions = [];
    }
  }

  /**
   * Méthode pour sélectionner une adresse suggérée.
   * @param {string} suggestion - L'adresse sélectionnée.
   * @returns {void}
   */
  selectAddress(suggestion: string): void {
    this.selectedLocation = suggestion;
    this.addressSuggestions = [];
  }

  /**
   * Méthode pour définir la distance de recherche.
   * @param {number} km - La distance en kilomètres.
   * @returns {void}
   */
  setDistance(km: number): void {
    this.distance = km;
    console.log(`Voir les repas dans un rayon de ${km} km`);
  }
}