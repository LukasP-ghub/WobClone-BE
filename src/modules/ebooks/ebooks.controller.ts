import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res, UploadedFiles, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../decorators/roles.decorator';
import { UserObj } from '../../decorators/user-obj.decorator';
import { DeleteFileOnErrorFilter } from '../../filters/deleteFileOnError.filter';
import { RolesGuard } from '../../guards/roles.guard';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { MulterDiskUploadedFiles } from '../../types';
import { multerStorage } from '../../utils/storage';
import { User } from '../user/entities/user.entity';
import { AddEbookDto } from './dto/add-ebook.dto';
import { EbookDto } from './dto/ebook.dto';
import { FilterEbookQueryDto } from './dto/filter-ebook-query.dto';
import { UpdateEbookDto } from './dto/update-ebook.dto';
import { EbooksService } from './ebooks.service';

@ApiTags('ebooks')
@Controller('ebooks')
export class EbooksController {
  constructor(private readonly ebooksService: EbooksService) { }

  @Serialize(EbookDto)
  @ApiOperation({ summary: 'Filter ebooks' })
  @ApiResponse({ status: 200, description: 'Return filtered ebooks', schema: { type: 'array', items: { type: 'object' } } })
  @Get('/filter')
  async filter(@Query() query: FilterEbookQueryDto) {
    return await this.ebooksService.filter(query);
  }

  @ApiOperation({ summary: 'Get ebook cover photo' })
  @ApiParam({ name: 'id', type: 'string', description: 'Ebook ID' })
  @Get('/file/photo/:id')
  async getPhoto(
    @Param('id') id: string,
    @Res() res: any
  ): Promise<any> {
    return await this.ebooksService.getPhoto(id, res);
  }

  @ApiOperation({ summary: 'Get ebook file (restricted to users)' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'string', description: 'Ebook ID' })
  @Get('/file/ebook/:id')
  @Roles('user')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getEbookFile(
    @Param('id') id: string,
    @Res() res: any,
    @UserObj() user: User
  ): Promise<any> {
    return await this.ebooksService.getEbookFile(id, user, res);
  }


  @ApiOperation({ summary: 'Update ebook (admin only)' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'string', description: 'Ebook ID' })
  @ApiConsumes('multipart/form-data')
  @Patch('/update/:id')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'cover', maxCount: 10,
      },
    ], { storage: multerStorage() },
    ),
  )
  update(
    @Param('id') id: string,
    @Body() updateEbookDto: UpdateEbookDto,
    @UploadedFiles() files: MulterDiskUploadedFiles,
  ) {
    return this.ebooksService.update(id, updateEbookDto, files);
  }

  @ApiOperation({ summary: 'Delete ebook (admin only)' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'string', description: 'Ebook ID' })
  @Delete(':id')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  remove(@Param('id') id: string) {
    return 'delete done';
  }

  @ApiOperation({ summary: 'Add new ebook (admin only)' })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @Post('/add/ebook')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'cover', maxCount: 10,
      },
      {
        name: 'product', maxCount: 1,
      },
    ], { storage: multerStorage() },
    )
  )
  @UseFilters(DeleteFileOnErrorFilter)
  addEbook(
    @Body() req: AddEbookDto,
    @UploadedFiles() files: MulterDiskUploadedFiles,
  ) {
    return this.ebooksService.addEbook(req, files);
  }

}
