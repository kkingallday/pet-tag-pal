import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { FormSection } from './FormSection';
import { TagCard } from './TagCard';
import { Button } from '@/components/ui/button';
import { Plus, Tag } from 'lucide-react';
import { OrderFormData } from '@/types/order';
import { v4 as uuidv4 } from 'uuid';

interface TagDetailsSectionProps {
  form: UseFormReturn<OrderFormData>;
}

export function TagDetailsSection({ form }: TagDetailsSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'tags',
  });

  const addTag = () => {
    append({
      id: uuidv4(),
      petName: '',
      petNameCase: 'mixed',
      animalType: 'dog',
      shape: 'Round',
      size: 'small',
      material: 'brass',
      frontLine1: '',
      backLine1: '',
    });
  };

  return (
    <FormSection number={2} title="Tag Details" variant="tag">
      <div className="space-y-4">
        {fields.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Tag className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No tags added yet. Add your first tag below.</p>
          </div>
        )}

        {fields.map((field, index) => (
          <TagCard
            key={field.id}
            index={index}
            form={form}
            onRemove={() => remove(index)}
            canRemove={fields.length > 1}
          />
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addTag}
          className="w-full border-dashed border-2 h-12"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Another Tag
        </Button>
      </div>
    </FormSection>
  );
}
