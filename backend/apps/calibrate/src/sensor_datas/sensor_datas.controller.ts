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
} from '@nestjs/common';
import { SensorDatasService } from './sensor_datas.service';
import { CreateSensorDataDto } from './dto/create-sensor_data.dto';
import { UpdateSensorDataDto } from './dto/update-sensor_data.dto';
import { JwtAuthGuard, Roles, CurrentUser, User } from '@app/common';
import {
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
  ApiQuery,
  ApiResponse
} from '@nestjs/swagger';
import { SensorDataDocument } from './entities/sensor_data.entity';

@ApiTags('SensorDatas')
@Controller('sensorDatas')
export class SensorDatasController {
  constructor(private readonly sensorDatasService: SensorDatasService) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
  // @Roles('Admin')
  @ApiOperation({ summary: 'Create a new sensorData' })
  @ApiBearerAuth()
  @ApiBody({ type: CreateSensorDataDto })
  @ApiCreatedResponse({ description: 'The sensorData has been successfully created.'})
  @ApiBadRequestResponse({ description: 'Invalid input.'})
  @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
  @ApiForbiddenResponse({ description: 'Forbidden.'})
  async create(
    @Body() createSensorDataDto: CreateSensorDataDto,
    @CurrentUser() user: User,
  ) {
    return this.sensorDatasService.create(createSensorDataDto, user);
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  // @Roles('Admin')
  @ApiOperation({ summary: 'Get all sensorDatas' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Successfully retrieved sensorDatas.'})
  @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
  @ApiForbiddenResponse({ description: 'Forbidden.'})
  async findAll() {
    return this.sensorDatasService.findAll({});
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  // @Roles('User')
  @ApiOperation({ summary: 'Get a sensorData by id' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', required: true, description: 'The id of the sensorData' })
  @ApiOkResponse({ description: 'Successfully retrieved the sensorData.'})
  @ApiNotFoundResponse({ description: 'SensorData not found.'})
  @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
  @ApiForbiddenResponse({ description: 'Forbidden.'})
  async findOne(@Param('id') id: string) {
    return this.sensorDatasService.findOne(+id);
  }

  @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  // @Roles('Admin')
  @ApiOperation({ summary: 'Update a sensorData' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The id of the sensorData to update',
  })
  @ApiBody({ type: UpdateSensorDataDto })
  @ApiOkResponse({ description: 'Successfully updated the sensorData.'})
  @ApiBadRequestResponse({ description: 'Invalid input.'})
  @ApiNotFoundResponse({ description: 'SensorData not found.'})
  @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
  @ApiForbiddenResponse({ description: 'Forbidden.'})
  async update(
    @Param('id') id: string,
    @Body() updateSensorDataDto: UpdateSensorDataDto,
  ) {
    return this.sensorDatasService.update(+id, updateSensorDataDto);
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  // @Roles('Admin')
  @ApiOperation({ summary: 'Delete a sensorData' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The id of the sensorData to delete',
  })
  @ApiOkResponse({ description: 'Successfully deleted the sensorData.'})
  @ApiNotFoundResponse({ description: 'SensorData not found.'})
  @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
  @ApiForbiddenResponse({ description: 'Forbidden.'})
  async remove(@Param('id') id: string) {
    return this.sensorDatasService.remove(+id);
  }

  @Get('list/filter')
  @ApiOperation({ summary: 'Retrieve all sensorDatas with filters and pagination' })
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
    name: 'owner',
    required: false,
    type: String,
    description: 'Filter the results by owner',
  })
  @ApiQuery({
    name: 'filters',
    required: false,
    type: [String],
    description: 'Additional query params as filters',
  })
  @ApiResponse({
    status: 200,
    description: 'The sensorDatas have been successfully retrieved.',
    type: [SensorDataDocument],
  })
  @ApiNotFoundResponse({ description: 'Failed to retrieve sensorDatas.' })
  async getAllSensorDatas(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
    @Query('owner') owner?: string, // Optional owner query param
    @Query('filters') filters?: string[], // Additional query params as filters
  ): Promise<{ data: SensorDataDocument[]; total: number }> {
    try {
      const queryParams = {
        page,
        limit,
        sortBy,
        sortOrder,
        owner,
        filters,
      };
      const { data, total } =
        await this.sensorDatasService.findAllWithFilters(queryParams);
      return { data, total };
    } catch (error) {
      throw new NotFoundException('Failed to retrieve sensorDatas');
    }
  }
}