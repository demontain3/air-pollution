import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { JwtAuthGuard, Roles, CurrentUser, User } from '@app/common';
import { ApiOperation, ApiBearerAuth, ApiParam, ApiBody, ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('positions')
@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @ApiOperation({ summary: 'Create a new position' })
  @ApiBearerAuth()
  @ApiBody({ type: CreatePositionDto, description: 'The position data' })
  @ApiResponse({ status: 201, description: 'The position has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  async create(@Body() createPositionDto: CreatePositionDto) {
    return this.positionsService.create(createPositionDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @ApiOperation({ summary: 'Get all positions' })
  @ApiBearerAuth()
  @ApiQuery({ name: 'page', required: false, description: 'Page number for pagination', example: 1 })
  @ApiResponse({ status: 200, description: 'Return all positions.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  async findAll(@Query() query: any) {
    return this.positionsService.findAll({query});
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('User')
  @ApiOperation({ summary: 'Get a position by id' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', required: true, description: 'The id of the position', example: '1' })
  @ApiResponse({ status: 200, description: 'Return the position.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiResponse({ status: 404, description: 'Position not found.'})
  async findOne(@Param('id') id: string) {
    return this.positionsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @ApiOperation({ summary: 'Update a position' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', required: true, description: 'The id of the position to update', example: '1' })
  @ApiBody({ type: UpdatePositionDto, description: 'The new position data' })
  @ApiResponse({ status: 200, description: 'The position has been successfully updated.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiResponse({ status: 404, description: 'Position not found.'})
  async update(@Param('id') id: string, @Body() updatePositionDto: UpdatePositionDto) {
    return this.positionsService.update(+id, updatePositionDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @ApiOperation({ summary: 'Delete a position' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', required: true, description: 'The id of the position to delete', example: '1' })
  @ApiResponse({ status: 200, description: 'The position has been successfully deleted.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiResponse({ status: 404, description: 'Position not found.'})
  async remove(@Param('id') id: string) {
    return this.positionsService.remove(+id);
  }
}