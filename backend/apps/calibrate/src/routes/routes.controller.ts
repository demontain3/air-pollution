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
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
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
  ApiResponse,
} from '@nestjs/swagger';
import { RouteDocument } from './entities/route.entity';

@ApiTags('Routes')
@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
  // @Roles('Admin')
  @ApiOperation({ summary: 'Create a new route' })
  @ApiBearerAuth()
  @ApiBody({ type: CreateRouteDto })
  @ApiCreatedResponse({
    description: 'The route has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Invalid input.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async create(
    @Body() createRouteDto: CreateRouteDto,
    @CurrentUser() user: User,
  ) {
    return this.routesService.create(createRouteDto, user);
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  // @Roles('Admin')
  @ApiOperation({ summary: 'Get all routes' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Successfully retrieved routes.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async findAll() {
    return this.routesService.findAll();
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  // @Roles('User')
  @ApiOperation({ summary: 'Get a route by id' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', required: true, description: 'The id of the route' })
  @ApiOkResponse({ description: 'Successfully retrieved the route.' })
  @ApiNotFoundResponse({ description: 'Route not found.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async findOne(@Param('id') id: string) {
    return this.routesService.findOne(id);
  }

  @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  // @Roles('Admin')
  @ApiOperation({ summary: 'Update a route' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The id of the route to update',
  })
  @ApiBody({ type: UpdateRouteDto })
  @ApiOkResponse({ description: 'Successfully updated the route.' })
  @ApiBadRequestResponse({ description: 'Invalid input.' })
  @ApiNotFoundResponse({ description: 'Route not found.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async update(
    @Param('id') id: string,
    @Body() updateRouteDto: UpdateRouteDto,
  ) {
    return this.routesService.update(id, updateRouteDto);
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  // @Roles('Admin')
  @ApiOperation({ summary: 'Delete a route' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The id of the route to delete',
  })
  @ApiOkResponse({ description: 'Successfully deleted the route.' })
  @ApiNotFoundResponse({ description: 'Route not found.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async remove(@Param('id') id: string) {
    return this.routesService.remove(id);
  }

  @Get('list/filter')
  @ApiOperation({ summary: 'Retrieve all routes with filters and pagination' })
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
    description: 'The routes have been successfully retrieved.',
    type: [RouteDocument],
  })
  @ApiNotFoundResponse({ description: 'Failed to retrieve routes.' })
  async getAllRoutes(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
    @Query('filters') filters?: string[],
  ): Promise<{ data: RouteDocument[]; total: number }> {
    try {
      const queryParams = {
        page,
        limit,
        sortBy,
        sortOrder,
        filters,
      };
      const { data, total } =
        await this.routesService.findAllWithFilters(queryParams);
      return { data, total };
    } catch (error) {
      throw new NotFoundException('Failed to retrieve routes');
    }
  }

}
