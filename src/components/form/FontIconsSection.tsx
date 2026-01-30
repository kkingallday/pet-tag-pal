import { UseFormReturn } from 'react-hook-form';
import { FormSection } from './FormSection';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { OrderFormData, FONT_OPTIONS } from '@/types/order';
import { Info, Upload, ImageIcon, Mail } from 'lucide-react';
import fontSamplesImage from '@/assets/font-samples.png';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
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
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload an image file (JPG, PNG, etc.)',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload an image smaller than 5MB',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `custom-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('tag-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('tag-images')
        .getPublicUrl(filePath);

      setUploadedImageUrl(publicUrl);
      form.setValue('imageFile', file);
      
      toast({
        title: 'Image uploaded!',
        description: 'Your custom image has been uploaded successfully.',
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload failed',
        description: 'Failed to upload image. Please try again or email it instead.',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

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
              
              {/* Upload Option */}
              <div className="grid gap-3">
                <Label className="text-sm font-medium">Upload your image:</Label>
                <div className="flex items-center gap-3">
                  <label className="flex-1 cursor-pointer">
                    <div className={`flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed rounded-lg transition-colors ${uploading ? 'bg-muted cursor-wait' : 'hover:bg-muted/50 hover:border-primary'}`}>
                      {uploading ? (
                        <span className="text-sm text-muted-foreground">Uploading...</span>
                      ) : uploadedImageUrl ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <ImageIcon className="h-4 w-4" />
                          <span className="text-sm font-medium">Image uploaded ✓</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Click to upload image</span>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="sr-only"
                    />
                  </label>
                </div>
                
                {uploadedImageUrl && (
                  <div className="mt-2">
                    <img 
                      src={uploadedImageUrl} 
                      alt="Uploaded preview" 
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>

              {/* Email Option */}
              <div className="pt-2 border-t">
                <Alert>
                  <Mail className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Or email your image to:</strong> petsaddress@hotmail.com
                    <br />
                    <span className="text-xs text-muted-foreground">
                      Include your order reference in the subject line.
                    </span>
                  </AlertDescription>
                </Alert>
              </div>
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
