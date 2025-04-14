import { Injectable } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { PrismaService } from 'prisma/prisma.service';
import { CreateFormSubmissionDto } from './dto/create-form-submission.dto';

@Injectable()
export class FormsService {
  constructor(private prisma: PrismaService) {}

  async findFormByKey(key: string) {
    const form = await this.prisma.form.findFirst({
      where: { key },
      include: { fields: true },
    });

    return form;
  }

  async createForm(createFormDto: CreateFormDto) {
    return this.prisma.form.create({
      data: {
        title: createFormDto.title,
        description: createFormDto.description,
        status: createFormDto.status || 'draft',
        key: createFormDto.key,
      },
    });
  }

  async findAllForms() {
    return this.prisma.form.findMany({
      include: { fields: true },
    });
  }

  async findOneForm(id: number) {
    return this.prisma.form.findUnique({
      where: { id },
      include: { fields: true },
    });
  }

  async updateForm(id: number, updateFormDto: UpdateFormDto) {
    return this.prisma.form.update({
      where: { id },
      data: updateFormDto,
    });
  }

  async deleteForm(id: number) {
    return this.prisma.form.delete({
      where: { id },
    });
  }

  async createField(formId: number, createFieldDto: CreateFieldDto) {
    return this.prisma.field.create({
      data: {
        formId,
        label: createFieldDto.label,
        type: createFieldDto.type,
        required: createFieldDto.required || false,
        placeholder: createFieldDto.placeholder,
        options: createFieldDto.options || [],
        minLength: createFieldDto.minLength,
        maxLength: createFieldDto.maxLength,
        minValue: createFieldDto.minValue,
        maxValue: createFieldDto.maxValue,
        pattern: createFieldDto.pattern,
        order: createFieldDto.order || 0,
      },
    });
  }

  async updateField(id: number, updateFieldDto: UpdateFieldDto) {
    return this.prisma.field.update({
      where: { id },
      data: updateFieldDto,
    });
  }

  async deleteField(id: number) {
    return this.prisma.field.delete({
      where: { id },
    });
  }
  async createFormSubmission(
    formId: number,
    createFormSubmissionDto: CreateFormSubmissionDto,
  ) {
    const { userId, fieldValues } = createFormSubmissionDto;

    return this.prisma.formSubmission.create({
      data: {
        formId,
        userId,
        data: { fieldValues }, // Store as JSON for flexibility
        values: {
          create: fieldValues.map((fv) => ({
            fieldId: fv.fieldId,
            value: fv.value,
            values: fv.values || [],
          })),
        },
      },
      include: {
        values: true,
      },
    });
  }

  async getFormSubmissions(formId: number) {
    return this.prisma.formSubmission.findMany({
      where: { formId },
      include: {
        form: {
          include: {
            fields: true,
          },
        },
        values: {
          include: {
            field: true,
          },
        },
        user: true,
      },
    });
  }
}
