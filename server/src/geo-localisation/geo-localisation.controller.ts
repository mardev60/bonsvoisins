import { BadRequestException, Controller, Get, HttpException, HttpStatus, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags, ApiResponse } from "@nestjs/swagger";
import { GeoLocalisationService } from "./geo-localisation.service";
import { AuthorizationGuard } from "src/guards/authorization.guard";
import { RolesGuard } from "src/guards/roles.guard";
import { Roles } from "src/guards/roles.decorator";

@ApiTags('Localisation')
@ApiBearerAuth()
@Controller('geo-localisation')
export class GeoLocalisationController {
  constructor(private readonly geolocalisationService: GeoLocalisationService) {}

  @Get()
  @UseGuards(AuthorizationGuard, RolesGuard)
  @Roles('user')
  @ApiResponse({
    status: 200,
    description: 'Adresse complète récupérée avec succès'
  })
  @ApiResponse({
    status: 500,
    description: 'Erreur interne lors de la récupération de l\'adresse ou de la localisation'
  })
  async getGeolocation() {
    try {
      const address = await this.geolocalisationService.getFullAddress();
      return address;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Erreur interne lors de la récupération de la géolocalisation',
          error: error.message || 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
