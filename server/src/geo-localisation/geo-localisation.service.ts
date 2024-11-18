import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AxiosResponse } from "axios";

@Injectable()
export class GeoLocalisationService {
  private ipInfoToken: string;

  constructor(
    private readonly httpService: HttpService, 
    private readonly configService: ConfigService
  ) {
    this.ipInfoToken = this.configService.get<string>('IPINFO_TOKEN');
  }

  /**
   * Récupère l'adresse complète à partir de l'IP de l'utilisateur.
   * Cette méthode utilise l'IP de l'utilisateur pour obtenir ses coordonnées (latitude et longitude),
   * puis elle interroge l'API du gouvernement pour récupérer l'adresse associée à ces coordonnées.
   * 
   * @returns {Promise<any>} Adresse complète avec les informations de rue et ville
   */
  async getFullAddress(): Promise<any> {
    try {
      const ipInfo = await this.getIpInfo();
      const [lat, lon] = ipInfo.loc.split(',');
      const address = await this.getAddressFromCoordinates(parseFloat(lat), parseFloat(lon));
      return address;
    } catch (error) {
      throw new Error('Error getting full address: ' + error.message);
    }
  }

  /**
   * Récupère les informations de l'IP de l'utilisateur à partir de l'API ipinfo.io.
   * L'IP peut être utilisée pour obtenir la localisation géographique.
   * 
   * @returns {Promise<any>} Les informations de l'IP de l'utilisateur
   */
  private async getIpInfo(): Promise<any> {
    const ipInfoUrl = `https://ipinfo.io/json?token=${this.ipInfoToken}`;

    try {
      const response: AxiosResponse = await this.httpService.get(ipInfoUrl).toPromise();
      if (!response.data.loc) {
        throw new Error('Location non disponible pour l\'IP fournie');
      }
      return response.data;
    } catch (error) {
      throw new Error('Erreur dans la récuperation de l\'adresse IP. ' + error.message);
    }
  }

  /**
   * Récupère l'adresse à partir des coordonnées géographiques (latitude et longitude)
   * via l'API du gouvernement (API de géocodage inversé).
   * 
   * @param lat Latitude de la localisation
   * @param lon Longitude de la localisation
   * @returns {Promise<any>} L'adresse associée aux coordonnées
   */
  private async getAddressFromCoordinates(lat: number, lon: number): Promise<any> {
    const url = `https://api-adresse.data.gouv.fr/reverse/?lat=${lat}&lon=${lon}&limit=1`;

    try {
      const response: AxiosResponse = await this.httpService.get(url).toPromise();
      if (response.data.features.length === 0) {
        throw new Error('Adresse non trouvée pour les coordonnées fournies');
      }
      return response.data.features[0].properties;
    } catch (error) {
      throw new Error('Erreur dans la recuperation de l\'adresse : ' + error.message);
    }
  }
}