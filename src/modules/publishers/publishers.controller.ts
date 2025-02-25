import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { PublisherDto } from './dto/publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { PublishersService } from './publishers.service';

@ApiTags('Publishers')
@Controller('publishers')
export class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new publisher' })
  @ApiResponse({ status: 201, description: 'Publisher successfully created', type: PublisherDto })
  create(@Body() createPublisherDto: CreatePublisherDto) {
    return this.publishersService.create(createPublisherDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all publishers' })
  @ApiResponse({ status: 200, description: 'List of publishers', type: [PublisherDto] })
  findAll() {
    return this.publishersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific publisher by ID' })
  @ApiParam({ name: 'id', description: 'Publisher ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 200, description: 'Publisher found', type: PublisherDto })
  @ApiResponse({ status: 404, description: 'Publisher not found' })
  findOne(@Param('id') id: string) {
    return this.publishersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a publisher by ID' })
  @ApiParam({ name: 'id', description: 'Publisher ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 200, description: 'Publisher successfully updated', type: PublisherDto })
  @ApiResponse({ status: 404, description: 'Publisher not found' })
  update(@Param('id') id: string, @Body() updatePublisherDto: UpdatePublisherDto) {
    return this.publishersService.update(id, updatePublisherDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a publisher by ID' })
  @ApiParam({ name: 'id', description: 'Publisher ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 200, description: 'Publisher successfully deleted' })
  @ApiResponse({ status: 404, description: 'Publisher not found' })
  remove(@Param('id') id: string) {
    return this.publishersService.remove(+id);
  }
}
