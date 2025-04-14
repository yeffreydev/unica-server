import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { FormsService } from './forms.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { CreateFormSubmissionDto } from './dto/create-form-submission.dto';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post()
  createForm(@Body() createFormDto: CreateFormDto) {
    return this.formsService.createForm(createFormDto);
  }

  @Get()
  findAllForms() {
    return this.formsService.findAllForms();
  }

  @Get(':id')
  findOneForm(@Param('id', ParseIntPipe) id: number) {
    return this.formsService.findOneForm(id);
  }
  @Get('key/:key')
  async findFormByKey(@Param('key') key: string) {
    return this.formsService.findFormByKey(key);
  }

  @Patch(':id')
  updateForm(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFormDto: UpdateFormDto,
  ) {
    return this.formsService.updateForm(id, updateFormDto);
  }

  @Delete(':id')
  deleteForm(@Param('id', ParseIntPipe) id: number) {
    return this.formsService.deleteForm(id);
  }

  @Post(':formId/fields')
  createField(
    @Param('formId', ParseIntPipe) formId: number,
    @Body() createFieldDto: CreateFieldDto,
  ) {
    return this.formsService.createField(formId, createFieldDto);
  }

  @Patch('fields/:id')
  updateField(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFieldDto: UpdateFieldDto,
  ) {
    return this.formsService.updateField(id, updateFieldDto);
  }

  @Delete('fields/:id')
  deleteField(@Param('id', ParseIntPipe) id: number) {
    return this.formsService.deleteField(id);
  }

  @Post(':formId/submissions')
  createFormSubmission(
    @Param('formId', ParseIntPipe) formId: number,
    @Body() createFormSubmissionDto: CreateFormSubmissionDto,
  ) {
    return this.formsService.createFormSubmission(
      formId,
      createFormSubmissionDto,
    );
  }

  @Get(':formId/submissions')
  getFormSubmissions(@Param('formId', ParseIntPipe) formId: number) {
    return this.formsService.getFormSubmissions(formId);
  }
}
