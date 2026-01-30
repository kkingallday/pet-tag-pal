import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Trash2, Dog, Cat, HelpCircle } from 'lucide-react';
import { OrderFormData, TAG_SHAPES } from '@/types/order';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

interface TagCardProps {
  index: number;
  form: UseFormReturn<OrderFormData>;
  onRemove: () => void;
  canRemove: boolean;
}

export function TagCard({ index, form, onRemove, canRemove }: TagCardProps) {
  const animalType = form.watch(`tags.${index}.animalType`);

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
            <FormField
              control={form.control}
              name={`tags.${index}.shape`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shape *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a shape" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TAG_SHAPES.map((shape) => (
                        <SelectItem key={shape} value={shape}>
                          {shape}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`tags.${index}.size`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-2"
                    >
                      <Label className={`option-item flex-1 justify-center ${field.value === 'small' ? 'selected' : ''}`}>
                        <RadioGroupItem value="small" className="sr-only" />
                        <span className="text-sm">Small</span>
                      </Label>
                      <Label className={`option-item flex-1 justify-center ${field.value === 'large' ? 'selected' : ''}`}>
                        <RadioGroupItem value="large" className="sr-only" />
                        <span className="text-lg">Large</span>
                      </Label>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`tags.${index}.material`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-2"
                    >
                      <Label className={`option-item flex-1 justify-center ${field.value === 'brass' ? 'selected' : ''}`}>
                        <RadioGroupItem value="brass" className="sr-only" />
                        <span className="w-3 h-3 rounded-full bg-brass mr-1" />
                        Brass
                      </Label>
                      <Label className={`option-item flex-1 justify-center ${field.value === 'stainless' ? 'selected' : ''}`}>
                        <RadioGroupItem value="stainless" className="sr-only" />
                        <span className="w-3 h-3 rounded-full bg-steel mr-1" />
                        Stainless Steel
                      </Label>
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
