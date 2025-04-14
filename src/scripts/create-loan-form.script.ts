import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { FormsService } from 'src/app/forms/forms.service';

export async function createLoanApplicationForm() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const formsService = app.get(FormsService);

  try {
    // Check if the form already exists
    const existingForm = await formsService.findFormByKey('loan-application');
    if (existingForm) {
      console.log('Form already exists. Exiting...');
      return;
    }
    // Create the form
    const form = await formsService.createForm({
      title: 'Loan Application',
      key: 'loan-application',
      description: 'Form to apply for a personal loan',
      status: 'published',
    });

    const formId = form.id;

    // Define fields for the loan application
    const fields = [
      // Personal Information
      {
        label: 'Nombre Completo',
        type: 'text',
        required: true,
        placeholder: 'Ingrese su nombre completo',
        minLength: 2,
        maxLength: 100,
        order: 1,
      },
      {
        label: 'Número de Identificación',
        type: 'text',
        required: true,
        placeholder: 'Ingrese su número de identificación',
        pattern: '^[0-9]{6,12}$',
        order: 2,
      },
      {
        label: 'Fecha de Nacimiento',
        type: 'date',
        required: true,
        maxValue: new Date().getTime(), // No future dates
        order: 3,
      },
      {
        label: 'Estado Civil',
        type: 'select',
        required: true,
        options: ['Soltero', 'Casado', 'Divorciado', 'Viudo'],
        placeholder: 'Seleccione su estado civil',
        order: 4,
      },

      // Contact Information
      {
        label: 'Número de Teléfono',
        type: 'tel',
        required: true,
        placeholder: '+1234567890',
        pattern: '^\+[0-9]{10,15}$',
        order: 5,
      },
      {
        label: 'Correo Electrónico',
        type: 'email',
        required: true,
        placeholder: 'ejemplo@dominio.com',
        pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
        order: 6,
      },
      {
        label: 'Dirección',
        type: 'text',
        required: true,
        placeholder: 'Ingrese su dirección completa',
        minLength: 5,
        maxLength: 200,
        order: 7,
      },

      // Employment Information
      {
        label: 'Nombre del Empleador',
        type: 'text',
        required: true,
        placeholder: 'Ingrese el nombre del empleador',
        minLength: 2,
        maxLength: 100,
        order: 8,
      },
      {
        label: 'Título del Trabajo',
        type: 'text',
        required: true,
        placeholder: 'Ingrese su título laboral',
        minLength: 2,
        maxLength: 100,
        order: 9,
      },
      {
        label: 'Ingreso Mensual',
        type: 'number',
        required: true,
        placeholder: 'Ingrese su ingreso mensual',
        minValue: 0,
        order: 10,
      },
      {
        label: 'Años de Empleo',
        type: 'number',
        required: true,
        placeholder: 'Ingrese los años de empleo',
        minValue: 0,
        maxValue: 100,
        order: 11,
      },

      // Loan Details
      {
        label: 'Monto del Préstamo',
        type: 'number',
        required: true,
        placeholder: 'Ingrese el monto del préstamo',
        minValue: 1000,
        order: 12,
      },
      {
        label: 'Plazo del Préstamo (Meses)',
        type: 'number',
        required: true,
        placeholder: 'Ingrese el plazo del préstamo en meses',
        minValue: 1,
        maxValue: 360,
        order: 13,
      },
      {
        label: 'Propósito del Préstamo',
        type: 'textarea',
        required: true,
        placeholder: 'Describa el propósito del préstamo',
        minLength: 10,
        maxLength: 500,
        order: 14,
      },

      // Consent
      {
        label: 'Términos y Condiciones',
        type: 'checkbox',
        required: true,
        options: ['Acepto los términos y condiciones'],
        order: 15,
      },
    ];

    // Create fields
    for (const field of fields) {
      await formsService.createField(formId, field);
    }

    console.log(
      `Loan Application Form created successfully with ID: ${formId}`,
    );
  } catch (error) {
    console.error('Error creating form:', error);
  } finally {
    await app.close();
  }
}

createLoanApplicationForm();
