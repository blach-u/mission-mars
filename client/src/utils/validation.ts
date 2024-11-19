import { astronautSchema, AstronautData } from '../schemas/astronautSchema';

export const validateAstronautData = (data: Partial<AstronautData>) => {
  const validation = astronautSchema.safeParse(data);

  if (!validation.success) {
    const errors = validation.error.format();
    return errors.name?._errors[0] || errors.role?._errors[0] || 'Invalid input';
  }

  return null;
};
