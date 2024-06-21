import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto, UpdateDeviceOwnerDto } from './dto/update-device.dto';
import { DevicesService } from './device.service';
import { DeviceDocument } from './entities/device.entity';

@ApiTags('devices')
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a device' })
  @ApiBadRequestResponse({ description: 'Invalid request body' })
  async create(
    @Body() createDeviceDto: CreateDeviceDto,
  ): Promise<DeviceDocument> {
    return this.devicesService.create(createDeviceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all devices' })
  @ApiOkResponse({ description: 'Success', type: [DeviceDocument] })
  async findAll() {
    return this.devicesService.findAll({});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a device by ID' })
  @ApiOkResponse({ description: 'Success', type: DeviceDocument })
  @ApiNotFoundResponse({ description: 'Device not found' })
  async findOne(@Param('id') id: string): Promise<DeviceDocument> {
    const device = await this.devicesService.findOne(id);
    if (!device) {
      throw new NotFoundException(`Device with ID ${id} not found`);
    }
    return device;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a device by SerialNo' })
  @ApiOkResponse({ description: 'Success', type: DeviceDocument })
  @ApiNotFoundResponse({ description: 'Device not found' })
  async findOneBySerialNo(
    @Param('serialNo') id: string,
  ): Promise<DeviceDocument> {
    const device = await this.devicesService.findOneBySerialNo(id);
    if (!device) {
      throw new NotFoundException(`Device with ID ${id} not found`);
    }
    return device;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a device by ID' })
  @ApiOkResponse({ description: 'Success', type: DeviceDocument })
  @ApiNotFoundResponse({ description: 'Device not found' })
  @ApiBadRequestResponse({ description: 'Invalid request body' })
  async update(
    @Param('id') id: string,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ): Promise<DeviceDocument> {
    return this.devicesService.update(id, updateDeviceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a device by ID' })
  @ApiOkResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Device not found' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.devicesService.remove(id);
  }

  @Put('user/:id')
  @ApiOperation({ summary: 'Set user for a device and get sensor token' })
  @ApiBody({ type: UpdateDeviceOwnerDto })
  @ApiResponse({
    status: 200,
    description:
      'The device owner has been updated and the sensor token has been generated.',
    type: () => ({ device: DeviceDocument, token: String }),
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async setUserAndGetSensorToken(
    @Param('id') id: string,
    @Body() updateDeviceDto: UpdateDeviceOwnerDto,
  ): Promise<{ device: DeviceDocument; token: string }> {
    try {
      return await this.devicesService.setUserAndGetSensorToken(
        id,
        updateDeviceDto,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // @Get('list/filter')
  // @ApiOperation({ summary: 'Retrieve all positions with filters and pagination' })
  // @ApiQuery({
  //   name: 'page',
  //   required: false,
  //   type: Number,
  //   description: 'Page number for pagination',
  //   example: 1,
  // })
  // @ApiQuery({
  //   name: 'limit',
  //   required: false,
  //   type: Number,
  //   description: 'Number of items per page for pagination',
  //   example: 10,
  // })
  // @ApiQuery({
  //   name: 'sortBy',
  //   required: false,
  //   type: String,
  //   description: 'Field to sort the results by',
  //   example: 'createdAt',
  // })
  // @ApiQuery({
  //   name: 'sortOrder',
  //   required: false,
  //   type: String,
  //   enum: ['asc', 'desc'],
  //   description: 'Order to sort the results in',
  //   example: 'desc',
  // })
  // @ApiQuery({
  //   name: 'owner',
  //   required: false,
  //   type: String,
  //   description: 'Filter the results by owner',
  // })
  // @ApiQuery({
  //   name: 'filters',
  //   required: false,
  //   type: [String],
  //   description: 'Additional query params as filters',
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'The positions have been successfully retrieved.',
  //   type: [DeviceDocument],
  // })
  // @ApiNotFoundResponse({ description: 'Failed to retrieve positions.' })
  // async getAllPositions(
  //   @Query('page') page?: number,
  //   @Query('limit') limit?: number,
  //   @Query('sortBy') sortBy?: string,
  //   @Query('sortOrder') sortOrder?: 'asc' | 'desc',
  //   @Query('owner') owner?: string,
  //   @Query('filters') filters?: string[],
  // ): Promise<{ data: DeviceDocument[]; total: number }> {
  //   try {
  //     const queryParams = {
  //       page,
  //       limit,
  //       sortBy,
  //       sortOrder,
  //       owner,
  //       filters,
  //     };
  //     const { data, total } = await this.devicesService.findAllWithFilters(queryParams);
  //     return { data, total };
  //   } catch (error) {
  //     throw new NotFoundException('Failed to retrieve positions');
  //   }
  // }

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
    type: [DeviceDocument],
  })
  @ApiNotFoundResponse({ description: 'Failed to retrieve positions.' })
  async getAllPositions(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
    @Query('filters') filters?: string[],
  ): Promise<{ data: DeviceDocument[]; total: number }> {
    try {
      const queryParams = {
        page,
        limit,
        sortBy,
        sortOrder,
        filters,
      };
      const { data, total } =
        await this.devicesService.findAllWithFilters(queryParams);
      return { data, total };
    } catch (error) {
      throw new NotFoundException('Failed to retrieve positions');
    }
  }
}
