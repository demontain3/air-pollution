import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { JwtAuthGuard, Roles, CurrentUser, User } from '@app/common';
import { ApiOperation, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @ApiOperation({ summary: 'Create a new position' })
  @ApiBearerAuth()
  @ApiBody({ type: CreatePositionDto })
  async create(@Body() createPositionDto: CreatePositionDto) {
    return this.positionsService.create(createPositionDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @ApiOperation({ summary: 'Get all positions' })
  @ApiBearerAuth()
  async findAll(@Query() query: any) {
    return this.positionsService.findAll({query});
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('User')
  @ApiOperation({ summary: 'Get a position by id' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', required: true, description: 'The id of the position' })
  async findOne(@Param('id') id: string) {
    return this.positionsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @ApiOperation({ summary: 'Update a position' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', required: true, description: 'The id of the position to update' })
  @ApiBody({ type: UpdatePositionDto })
  async update(@Param('id') id: string, @Body() updatePositionDto: UpdatePositionDto) {
    return this.positionsService.update(+id, updatePositionDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @ApiOperation({ summary: 'Delete a position' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', required: true, description: 'The id of the position to delete' })
  async remove(@Param('id') id: string) {
    return this.positionsService.remove(+id);
  }
}