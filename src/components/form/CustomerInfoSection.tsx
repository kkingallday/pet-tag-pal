import { UseFormReturn } from 'react-hook-form';
import { FormSection } from './FormSection';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { User, Phone, Mail } from 'lucide-react';
import { OrderFormData } from '@/types/order';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

interface CustomerInfoSectionProps {
  form: UseFormReturn<OrderFormData>;
}

export function CustomerInfoSection({ form }: CustomerInfoSectionProps) {
  return (
    <FormSection number={1} title="Customer Information" variant="customer">
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Customer Name *
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter customer name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number *
              </FormLabel>
              <FormControl>
                <Input type="tel" placeholder="(555) 123-4567" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email (optional)
              </FormLabel>
              <FormControl>
                <Input type="email" placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="preferredContact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Contact Method *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="option-group"
                >
                  {[
                    { value: 'call', label: 'Call', icon: '📞' },
                    { value: 'text', label: 'Text', icon: '💬' },
                    { value: 'email', label: 'Email', icon: '📧' },
                  ].map((option) => (
                    <Label
                      key={option.value}
                      className={`option-item ${field.value === option.value ? 'selected' : ''}`}
                    >
                      <RadioGroupItem value={option.value} className="sr-only" />
                      <span>{option.icon}</span>
                      <span>{option.label}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </FormSection>
  );
}
