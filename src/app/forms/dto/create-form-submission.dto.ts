export class CreateFormSubmissionDto {
  userId?: number;
  fieldValues: { fieldId: number; value?: string; values?: string[] }[];
}
