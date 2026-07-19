import { Controller, Get, Query, Inject, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import {
  IMAGE_PROVIDER,
  IImagesProvider,
  ImagesSearchQuery,
  ImageResult,
} from '../interfaces/images.interface';

@ApiTags('images')
@Controller('images')
export class ImagesController {
  private readonly logger = new Logger(ImagesController.name);

  constructor(@Inject(IMAGE_PROVIDER) private readonly imagesProvider: IImagesProvider) {}

  @ApiOperation({ summary: 'Search for images based on a query' })
  @ApiQuery({
    name: 'query',
    required: true,
    description: 'Search term for images (e.g., Eiffel Tower, Tokyo)',
  })
  @ApiQuery({ name: 'perPage', required: false, description: 'Number of images to return' })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @Get('search')
  async searchImages(
    @Query('query') query: string,
    @Query('perPage') perPage?: number,
  ): Promise<ImageResult[]> {
    if (!query) {
      throw new HttpException('Query parameter is required', HttpStatus.BAD_REQUEST);
    }

    try {
      const searchParams: ImagesSearchQuery = {
        query,
        perPage: perPage ? Number(perPage) : 5,
        orientation: 'landscape',
      };

      const results = await this.imagesProvider.searchImages(searchParams);
      return results;
    } catch (error) {
      this.logger.error(`Error in images search: ${(error as Error).message}`);
      throw new HttpException('Failed to search images', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
