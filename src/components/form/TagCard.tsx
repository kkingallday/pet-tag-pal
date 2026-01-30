import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Trash2, Dog, Cat, HelpCircle } from 'lucide-react';
import { OrderFormData } from '@/types/order';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { useEffect } from 'react';
import { TagPreview } from './TagPreview';

// Shape options (user picks first)
const SHAPE_OPTIONS = ['Round', 'Bone', 'Heart'] as const;

// Material options based on shape
const getAvailableMaterials = (shape: string) => {
  switch (shape) {
    case 'Round':
      return [
        { value: 'brass', label: 'Brass', color: 'bg-brass' },
        { value: 'stainless', label: 'Silver', color: 'bg-steel' },
      ];
    case 'Bone':
      return [
        { value: 'stainless', label: 'Silver', color: 'bg-steel' },
      ];
    case 'Heart':
      return [
        { value: 'pink_silver', label: 'Pink Silver', color: 'bg-pink-300' },
      ];
    default:
      return [
        { value: 'brass', label: 'Brass', color: 'bg-brass' },
      ];
  }
};

// Size options based on shape
const getAvailableSizes = (shape: string) => {
  if (shape === 'Heart') {
    return ['large']; // Heart only comes in large
  }
  return ['small', 'large'];
};

interface TagCardProps {
  index: number;
  form: UseFormReturn<OrderFormData>;
  onRemove: () => void;
  canRemove: boolean;
}

export function TagCard({ index, form, onRemove, canRemove }: TagCardProps) {
  const animalType = form.watch(`tags.${index}.animalType`);
  const shape = form.watch(`tags.${index}.shape`) || 'Round';
  const material = form.watch(`tags.${index}.material`) || 'brass';
  const size = form.watch(`tags.${index}.size`) || 'small';
  const petName = form.watch(`tags.${index}.petName`) || '';
  const petNameCase = form.watch(`tags.${index}.petNameCase`) || 'mixed';
  const frontLine1 = form.watch(`tags.${index}.frontLine1`) || '';
  const frontLine2 = form.watch(`tags.${index}.frontLine2`) || '';

  const availableMaterials = getAvailableMaterials(shape);
  const availableSizes = getAvailableSizes(shape);

  // Auto-adjust material when shape changes (if current material not available)
  useEffect(() => {
    const materialValues = availableMaterials.map(m => m.value);
    if (material && !materialValues.includes(material)) {
      form.setValue(`tags.${index}.material`, availableMaterials[0].value as 'brass' | 'stainless' | 'pink_silver');
    }
  }, [shape, availableMaterials, material, form, index]);

  // Auto-adjust size when shape changes (if current size not available)
  useEffect(() => {
    const currentSize = form.getValues(`tags.${index}.size`);
    if (currentSize && !availableSizes.includes(currentSize)) {
      form.setValue(`tags.${index}.size`, availableSizes[0] as 'small' | 'large');
    }
  }, [shape, availableSizes, form, index]);

  return (
    <div className="tag-card animate-slide-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-primary flex items-center gap-2">
          🏷️ Tag #{index + 1}
        </h3>
        {canRemove && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Live Tag Preview */}
      <div className="flex justify-center py-4 mb-4 bg-muted/30 rounded-lg border border-border">
        <TagPreview
          shape={shape}
          material={material}
          size={size}
          petName={petName}
          petNameCase={petNameCase}
          frontLine1={frontLine1}
          frontLine2={frontLine2}
        />
      </div>

      <div className="space-y-4">
        {/* Pet Information */}
        <div className="p-3 bg-background rounded-lg border border-border">
          <h4 className="font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wide">
            Pet Information
          </h4>

          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`tags.${index}.petName`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pet Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Exactly as it should appear" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`tags.${index}.petNameCase`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Case Style</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-2"
                      >
                        <Label className={`option-item text-xs flex-1 justify-center ${field.value === 'uppercase' ? 'selected' : ''}`}>
                          <RadioGroupItem value="uppercase" className="sr-only" />
                          ALL CAPS
                        </Label>
                        <Label className={`option-item text-xs flex-1 justify-center ${field.value === 'mixed' ? 'selected' : ''}`}>
                          <RadioGroupItem value="mixed" className="sr-only" />
                          Upper/lower
                        </Label>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name={`tags.${index}.animalType`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Animal Type *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="option-group"
                    >
                      <Label className={`option-item ${field.value === 'dog' ? 'selected' : ''}`}>
                        <RadioGroupItem value="dog" className="sr-only" />
                        <Dog className="w-4 h-4" />
                        Dog
                      </Label>
                      <Label className={`option-item ${field.value === 'cat' ? 'selected' : ''}`}>
                        <RadioGroupItem value="cat" className="sr-only" />
                        <Cat className="w-4 h-4" />
                        Cat
                      </Label>
                      <Label className={`option-item ${field.value === 'other' ? 'selected' : ''}`}>
                        <RadioGroupItem value="other" className="sr-only" />
                        <HelpCircle className="w-4 h-4" />
                        Other
                      </Label>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {animalType === 'other' && (
              <FormField
                control={form.control}
                name={`tags.${index}.animalTypeOther`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specify Animal Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Rabbit, Bird, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>

        {/* Tag Style */}
        <div className="p-3 bg-background rounded-lg border border-border">
          <h4 className="font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wide">
            Tag Style
          </h4>

          <div className="grid gap-4">
            {/* Shape first - determines available materials and sizes */}
            <FormField
              control={form.control}
              name={`tags.${index}.shape`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shape *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-wrap gap-2"
                    >
                      {SHAPE_OPTIONS.map((shapeOption) => (
                        <Label 
                          key={shapeOption}
                          className={`option-item flex-1 justify-center min-w-[80px] ${field.value === shapeOption ? 'selected' : ''}`}
                        >
                          <RadioGroupItem value={shapeOption} className="sr-only" />
                          {shapeOption}
                        </Label>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Material - options depend on shape */}
            <FormField
              control={form.control}
              name={`tags.${index}.material`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      key={`${shape}-material`}
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-wrap gap-2"
                    >
                      {availableMaterials.map((mat) => (
                        <Label 
                          key={mat.value}
                          className={`option-item flex-1 justify-center min-w-[100px] ${field.value === mat.value ? 'selected' : ''}`}
                        >
                          <RadioGroupItem value={mat.value} className="sr-only" />
                          <span className={`w-3 h-3 rounded-full ${mat.color} mr-1`} />
                          {mat.label}
                        </Label>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Size - options depend on shape */}
            <FormField
              control={form.control}
              name={`tags.${index}.size`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      key={`${shape}-size`}
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex gap-2"
                    >
                      {availableSizes.includes('small') && (
                        <Label className={`option-item flex-1 justify-center ${field.value === 'small' ? 'selected' : ''}`}>
                          <RadioGroupItem value="small" className="sr-only" />
                          <span className="text-sm">Small</span>
                        </Label>
                      )}
                      {availableSizes.includes('large') && (
                        <Label className={`option-item flex-1 justify-center ${field.value === 'large' ? 'selected' : ''}`}>
                          <RadioGroupItem value="large" className="sr-only" />
                          <span className="text-lg">Large</span>
                        </Label>
                      )}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Text & Layout */}
        <div className="p-3 bg-background rounded-lg border border-border">
          <h4 className="font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wide">
            Text & Layout
          </h4>

          <div className="grid gap-4">
            <div>
              <p className="text-xs font-medium text-primary mb-2">Front of Tag</p>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name={`tags.${index}.frontLine1`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Line 1 (required)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`tags.${index}.frontLine2`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Line 2 (optional)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-primary mb-2">Back of Tag</p>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name={`tags.${index}.backLine1`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Line 1 (required)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`tags.${index}.backLine2`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Line 2 (optional)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`tags.${index}.backLine3`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Line 3 (optional)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
