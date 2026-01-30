import { UseFormReturn } from 'react-hook-form';
import { FormSection } from './FormSection';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { OrderFormData, FONT_OPTIONS } from '@/types/order';
import { Info, Upload } from 'lucide-react';
import fontSamplesImage from '@/assets/font-samples.png';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';

interface FontIconsSectionProps {
  form: UseFormReturn<OrderFormData>;
}

export function FontIconsSection({ form }: FontIconsSectionProps) {
  const addImage = form.watch('addImage');
  const otherIcon = form.watch('icons.other');
  const shape = form.watch('tags.0.shape');

  return (
    <FormSection number={4} title="Font & Icons" variant="font">
      <div className="space-y-6">
        {/* Font Choice */}
        <FormField
          control={form.control}
          name="fontChoice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font Choice *</FormLabel>
              <div className="mb-3 rounded-lg overflow-hidden border border-border">
                <img 
                  src={fontSamplesImage} 
                  alt="Font samples A through J" 
                  className="w-full h-auto"
                />
              </div>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-5 gap-2"
                >
                  {FONT_OPTIONS.map((font) => (
                    <Label
                      key={font}
                      className={`option-item justify-center font-bold ${field.value === font ? 'selected' : ''}`}
                    >
                      <RadioGroupItem value={font} className="sr-only" />
                      {font}
                    </Label>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Add Image Option */}
        <div className="p-4 bg-muted/50 rounded-lg border border-border">
          <FormField
            control={form.control}
            name="addImage"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-base font-semibold">
                    Add Custom Image (+$10)
                  </FormLabel>
                  <FormDescription>
                    Round tags only. Image will be engraved on the tag.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          {addImage && (
            <div className="mt-4 space-y-3">
              {shape !== 'Round' && (
                <Alert variant="destructive">
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Custom images are only available for Round shaped tags. Please change the tag shape.
                  </AlertDescription>
                </Alert>
              )}
              <Alert>
                <Upload className="h-4 w-4" />
                <AlertDescription>
                  <strong>Email your image to:</strong> manascraftny@gmail.com
                  <br />
                  <span className="text-xs text-muted-foreground">
                    Include your order reference in the subject line.
                  </span>
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>

        {/* Icons */}
        <div>
          <FormLabel className="mb-3 block">Icons (+$5 each)</FormLabel>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              { name: 'paw', label: 'Paw', emoji: '🐾' },
              { name: 'bone', label: 'Bone', emoji: '🦴' },
              { name: 'heart', label: 'Heart', emoji: '❤️' },
              { name: 'star', label: 'Star', emoji: '⭐' },
              { name: 'other', label: 'Other', emoji: '✨' },
            ].map((icon) => (
              <FormField
                key={icon.name}
                control={form.control}
                name={`icons.${icon.name as keyof OrderFormData['icons']}`}
                render={({ field }) => (
                  <FormItem>
                    <Label
                      className={`option-item justify-center cursor-pointer ${field.value ? 'selected' : ''}`}
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value as boolean}
                          onCheckedChange={field.onChange}
                          className="sr-only"
                        />
                      </FormControl>
                      <span>{icon.emoji}</span>
                      <span>{icon.label}</span>
                    </Label>
                  </FormItem>
                )}
              />
            ))}
          </div>

          {otherIcon && (
            <FormField
              control={form.control}
              name="icons.otherText"
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormControl>
                    <Input placeholder="Describe the icon you want..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        {/* Icon Placement */}
        <FormField
          control={form.control}
          name="iconPlacement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon Placement *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 gap-2"
                >
                  {[
                    { value: 'before', label: 'Before name', example: '🐾 Molly' },
                    { value: 'after', label: 'After name', example: 'Molly 🐾' },
                    { value: 'above', label: 'Above name', example: '🐾\nMolly' },
                    { value: 'back', label: 'Back only', example: 'Back side' },
                  ].map((option) => (
                    <Label
                      key={option.value}
                      className={`option-item flex-col items-start py-3 ${field.value === option.value ? 'selected' : ''}`}
                    >
                      <RadioGroupItem value={option.value} className="sr-only" />
                      <span className="font-medium">{option.label}</span>
                      <span className="text-xs text-muted-foreground whitespace-pre-line">
                        {option.example}
                      </span>
                    </Label>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Notes */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes / Special Instructions</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any special requests or instructions..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </FormSection>
  );
}
