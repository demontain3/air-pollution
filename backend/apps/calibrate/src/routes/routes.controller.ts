import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { JwtAuthGuard, Roles, CurrentUser, User } from '@app/common';
import { ApiOperation, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @ApiOperation({ summary: 'Create a new route' })
  @ApiBearerAuth()
  @ApiBody({ type: CreateRouteDto })
  async create(@Body() createRouteDto: CreateRouteDto, @CurrentUser() user: User) {
    return this.routesService.create(createRouteDto, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @ApiOperation({ summary: 'Get all routes' })
  @ApiBearerAuth()
  async findAll(@Query() query: any) {
    return this.routesService.findAll({query});
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('User')
  @ApiOperation({ summary: 'Get a route by id' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', required: true, description: 'The id of the route' })
  async findOne(@Param('id') id: string) {
    return this.routesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @ApiOperation({ summary: 'Update a route' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', required: true, description: 'The id of the route to update' })
  @ApiBody({ type: UpdateRouteDto })
  async update(@Param('id') id: string, @Body() updateRouteDto: UpdateRouteDto) {
    return this.routesService.update(+id, updateRouteDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @ApiOperation({ summary: 'Delete a route' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', required: true, description: 'The id of the route to delete' })
  async remove(@Param('id') id: string) {
    return this.routesService.remove(+id);
  }
}