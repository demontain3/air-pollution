// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   UseGuards,
//   Query,
//   NotFoundException,
// } from '@nestjs/common';
// import { PositionsService } from './positions.service';
// import { CreatePositionDto } from './dto/create-position.dto';
// import { UpdatePositionDto } from './dto/update-position.dto';
// import { JwtAuthGuard, Roles, CurrentUser, User } from '@app/common';
// import {
//   ApiOperation,
//   ApiBearerAuth,
//   ApiParam,
//   ApiBody,
//   ApiTags,
//   ApiResponse,
//   ApiQuery,
//   ApiNotFoundResponse,
// } from '@nestjs/swagger';
// import { PositionDocument } from './entities/position.entity';

// @ApiTags('positions')
// @Controller('positions')
// export class PositionsController {
//   constructor(private readonly positionsService: PositionsService) {}

//   @Post()
//   @UseGuards(JwtAuthGuard)
//   @Roles('Admin')
//   @ApiOperation({ summary: 'Create a new position' })
//   @ApiBearerAuth()
//   @ApiBody({ type: CreatePositionDto, description: 'The position data' })
//   @ApiResponse({
//     status: 201,
//     description: 'The position has been successfully created.',
//   })
//   @ApiResponse({ status: 403, description: 'Forbidden.' })
//   async create(@Body() createPositionDto: CreatePositionDto) {
//     return this.positionsService.create(createPositionDto);
//   }

//   @Get()
//   @UseGuards(JwtAuthGuard)
//   @Roles('Admin')
//   @ApiOperation({ summary: 'Get all positions' })
//   @ApiBearerAuth()
//   @ApiQuery({
//     name: 'page',
//     required: false,
//     description: 'Page number for pagination',
//     example: 1,
//   })
//   @ApiResponse({ status: 200, description: 'Return all positions.' })
//   @ApiResponse({ status: 403, description: 'Forbidden.' })
//   async findAll() {
//     return this.positionsService.findAll({ });
//   }

//   @Get(':id')
//   @UseGuards(JwtAuthGuard)
//   @Roles('User')
//   @ApiOperation({ summary: 'Get a position by id' })
//   @ApiBearerAuth()
//   @ApiParam({
//     name: 'id',
//     required: true,
//     description: 'The id of the position',
//     example: '1',
//   })
//   @ApiResponse({ status: 200, description: 'Return the position.' })
//   @ApiResponse({ status: 403, description: 'Forbidden.' })
//   @ApiResponse({ status: 404, description: 'Position not found.' })
//   async findOne(@Param('id') id: string) {
//     return this.positionsService.findOne(+id);
//   }

//   @Patch(':id')
//   @UseGuards(JwtAuthGuard)
//   @Roles('Admin')
//   @ApiOperation({ summary: 'Update a position' })
//   @ApiBearerAuth()
//   @ApiParam({
//     name: 'id',
//     required: true,
//     description: 'The id of the position to update',
//     example: '1',
//   })
//   @ApiBody({ type: UpdatePositionDto, description: 'The new position data' })
//   @ApiResponse({
//     status: 200,
//     description: 'The position has been successfully updated.',
//   })
//   @ApiResponse({ status: 403, description: 'Forbidden.' })
//   @ApiResponse({ status: 404, description: 'Position not found.' })
//   async update(
//     @Param('id') id: string,
//     @Body() updatePositionDto: UpdatePositionDto,
//   ) {
//     return this.positionsService.update(+id, updatePositionDto);
//   }

//   @Delete(':id')
//   @UseGuards(JwtAuthGuard)
//   @Roles('Admin')
//   @ApiOperation({ summary: 'Delete a position' })
//   @ApiBearerAuth()
//   @ApiParam({
//     name: 'id',
//     required: true,
//     description: 'The id of the position to delete',
//     example: '1',
//   })
//   @ApiResponse({
//     status: 200,
//     description: 'The position has been successfully deleted.',
//   })
//   @ApiResponse({ status: 403, description: 'Forbidden.' })
//   @ApiResponse({ status: 404, description: 'Position not found.' })
//   async remove(@Param('id') id: string) {
//     return this.positionsService.remove(+id);
//   }

//   @Get('list/filter')
//   @ApiOperation({ summary: 'Retrieve all positions with filters and pagination' })
//   @ApiQuery({
//     name: 'page',
//     required: false,
//     type: Number,
//     description: 'Page number for pagination',
//     example: 1,
//   })
//   @ApiQuery({
//     name: 'limit',
//     required: false,
//     type: Number,
//     description: 'Number of items per page for pagination',
//     example: 10,
//   })
//   @ApiQuery({
//     name: 'sortBy',
//     required: false,
//     type: String,
//     description: 'Field to sort the results by',
//     example: 'createdAt',
//   })
//   @ApiQuery({
//     name: 'sortOrder',
//     required: false,
//     type: String,
//     enum: ['asc', 'desc'],
//     description: 'Order to sort the results in',
//     example: 'desc',
//   })
//   @ApiQuery({
//     name: 'owner',
//     required: false,
//     type: String,
//     description: 'Filter the results by owner',
//   })
//   @ApiQuery({
//     name: 'filters',
//     required: false,
//     type: [String],
//     description: 'Additional query params as filters',
//   })
//   @ApiResponse({
//     status: 200,
//     description: 'The positions have been successfully retrieved.',
//     type: [PositionDocument],
//   })
//   @ApiNotFoundResponse({ description: 'Failed to retrieve positions.' })
//   async getAllPositions(
//     @Query('page') page?: number,
//     @Query('limit') limit?: number,
//     @Query('sortBy') sortBy?: string,
//     @Query('sortOrder') sortOrder?: 'asc' | 'desc',
//     @Query('owner') owner?: string, // Optional owner query param
//     @Query('filters') filters?: string[], // Additional query params as filters
//   ): Promise<{ data: PositionDocument[]; total: number }> {
//     try {
//       const queryParams = {
//         page,
//         limit,
//         sortBy,
//         sortOrder,
//         owner,
//         filters,
//       };
//       const { data, total } =
//         await this.positionsService.findAllWithFilters(queryParams);
//       return { data, total };
//     } catch (error) {
//       throw new NotFoundException('Failed to retrieve positions');
//     }
//   }
// }

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PositionsService } from './positions.service';
import {
  CreatePositionDto,
  CreatePositionWithSensorDataDto,
} from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { JwtAuthGuard, Roles } from '@app/common';
import {
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
  ApiTags,
  ApiResponse,
  ApiQuery,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { PositionDocument } from './entities/position.entity';
import { SensorDataDocument } from '../sensor_datas/entities/sensor_data.entity';

@ApiTags('positions')
@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Post('/create-with-sensor-data')
  @ApiOperation({ summary: 'Create position with sensor data' })
  @ApiBody({ type: CreatePositionWithSensorDataDto })
  @ApiResponse({
    status: 201,
    description: 'The position and sensor data have been successfully created.',
    type: () => ({
      position: PositionDocument,
      sensorData: SensorDataDocument,
    }),
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createPositionWithSensorData(
    @Body() createPositionWithSensorDataDto: CreatePositionWithSensorDataDto,
  ): Promise<{ sensorData: SensorData }> {
    try {
      return await this.positionsService.createPositionWithSensorData(
        createPositionWithSensorDataDto,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @ApiOperation({ summary: 'Create a new position' })
  @ApiBearerAuth()
  @ApiBody({ type: CreatePositionDto, description: 'The position data' })
  @ApiResponse({
    status: 201,
    description: 'The position has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createPositionDto: CreatePositionDto) {
    return this.positionsService.create(createPositionDto);
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  // @Roles('Admin')
  @ApiOperation({ summary: 'Get all positions' })
  @ApiBearerAuth()
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
    example: 1,
  })
  @ApiResponse({ status: 200, description: 'Return all positions.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll() {
    return this.positionsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('User')
  @ApiOperation({ summary: 'Get a position by id' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The id of the position',
    example: '60d2e446cfb4b200242bd1bf',
  })
  @ApiResponse({ status: 200, description: 'Return the position.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Position not found.' })
  async findOne(@Param('id') id: string) {
    return this.positionsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @ApiOperation({ summary: 'Update a position' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The id of the position to update',
    example: '60d2e446cfb4b200242bd1bf',
  })
  @ApiBody({ type: UpdatePositionDto, description: 'The new position data' })
  @ApiResponse({
    status: 200,
    description: 'The position has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Position not found.' })
  async update(
    @Param('id') id: string,
    @Body() updatePositionDto: UpdatePositionDto,
  ) {
    return this.positionsService.update(id, updatePositionDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @ApiOperation({ summary: 'Delete a position' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The id of the position to delete',
    example: '60d2e446cfb4b200242bd1bf',
  })
  @ApiResponse({
    status: 200,
    description: 'The position has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Position not found.' })
  async remove(@Param('id') id: string) {
    return this.positionsService.remove(id);
  }

  @Get('list/filter')
  @ApiOperation({
    summary: 'Retrieve all positions with filters and pagination',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number for pagination',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page for pagination',
    example: 10,
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    type: String,
    description: 'Field to sort the results by',
    example: 'createdAt',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    type: String,
    enum: ['asc', 'desc'],
    description: 'Order to sort the results in',
    example: 'desc',
  })
  @ApiQuery({
    name: 'filters',
    required: false,
    type: [String],
    description: 'Additional query params as filters',
  })
  @ApiResponse({
    status: 200,
    description: 'The positions have been successfully retrieved.',
    type: [PositionDocument],
  })
  @ApiNotFoundResponse({ description: 'Failed to retrieve positions.' })
  async getAllPositions(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
    @Query('filters') filters?: string[],
  ): Promise<{ data: PositionDocument[]; total: number }> {
    try {
      const queryParams = {
        page,
        limit,
        sortBy,
        sortOrder,
        filters,
      };
      const { data, total } =
        await this.positionsService.findAllWithFilters(queryParams);
      return { data, total };
    } catch (error) {
      throw new NotFoundException('Failed to retrieve positions');
    }
  }
}
