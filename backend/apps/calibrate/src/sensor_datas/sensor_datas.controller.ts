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
  ApiUnauthorizedResponse
} from '@nestjs/swagger';

@ApiTags('SensorDatas')
@Controller('sensorDatas')
export class SensorDatasController {
  constructor(private readonly sensorDatasService: SensorDatasService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
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
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @ApiOperation({ summary: 'Get all sensorDatas' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Successfully retrieved sensorDatas.'})
  @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
  @ApiForbiddenResponse({ description: 'Forbidden.'})
  async findAll(@Query() query: any) {
    return this.sensorDatasService.findAll({ query });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('User')
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
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
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
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
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
}