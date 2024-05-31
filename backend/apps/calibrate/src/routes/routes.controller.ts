import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { JwtAuthGuard, Roles, CurrentUser, User } from '@app/common';
import { ApiOperation, ApiBearerAuth, ApiParam, ApiBody, ApiTags, ApiOkResponse, ApiCreatedResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiForbiddenResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Routes')
@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  // @Roles('Admin')
  @ApiOperation({ summary: 'Create a new route' })
  @ApiBearerAuth()
  @ApiBody({ type: CreateRouteDto })
  @ApiCreatedResponse({ description: 'The route has been successfully created.'})
  @ApiBadRequestResponse({ description: 'Invalid input.'})
  @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
  @ApiForbiddenResponse({ description: 'Forbidden.'})
  async create(@Body() createRouteDto: CreateRouteDto, @CurrentUser() user: User) {
    return this.routesService.create(createRouteDto, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  // @Roles('Admin')
  @ApiOperation({ summary: 'Get all routes' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Successfully retrieved routes.'})
  @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
  @ApiForbiddenResponse({ description: 'Forbidden.'})
  async findAll(@Query() query: any) {
    return this.routesService.findAll({query});
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  // @Roles('User')
  @ApiOperation({ summary: 'Get a route by id' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', required: true, description: 'The id of the route' })
  @ApiOkResponse({ description: 'Successfully retrieved the route.'})
  @ApiNotFoundResponse({ description: 'Route not found.'})
  @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
  @ApiForbiddenResponse({ description: 'Forbidden.'})
  async findOne(@Param('id') id: string) {
    return this.routesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  // @Roles('Admin')
  @ApiOperation({ summary: 'Update a route' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', required: true, description: 'The id of the route to update' })
  @ApiBody({ type: UpdateRouteDto })
  @ApiOkResponse({ description: 'Successfully updated the route.'})
  @ApiBadRequestResponse({ description: 'Invalid input.'})
  @ApiNotFoundResponse({ description: 'Route not found.'})
  @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
  @ApiForbiddenResponse({ description: 'Forbidden.'})
  async update(@Param('id') id: string, @Body() updateRouteDto: UpdateRouteDto) {
    return this.routesService.update(+id, updateRouteDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  // @Roles('Admin')
  @ApiOperation({ summary: 'Delete a route' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', required: true, description: 'The id of the route to delete' })
  @ApiOkResponse({ description: 'Successfully deleted the route.'})
  @ApiNotFoundResponse({ description: 'Route not found.'})
  @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
  @ApiForbiddenResponse({ description: 'Forbidden.'})
  async remove(@Param('id') id: string) {
    return this.routesService.remove(+id);
  }
}