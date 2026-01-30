import { UseFormReturn } from 'react-hook-form';
import { FormSection } from './FormSection';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { OrderFormData } from '@/types/order';
import { Shield, PenLine, Calendar } from 'lucide-react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';

interface ConfirmationSectionProps {
  form: UseFormReturn<OrderFormData>;
}

export function ConfirmationSection({ form }: ConfirmationSectionProps) {
  return (
    <FormSection number={6} title="Spelling Confirmation" variant="confirm">
      <div className="space-y-4">
        <Alert className="bg-destructive/10 border-destructive/30">
          <Shield className="h-4 w-4 text-destructive" />
          <AlertTitle className="text-destructive">Important Notice</AlertTitle>
          <AlertDescription className="text-sm">
            Custom tags cannot be refunded for incorrect information that you provided.
            Please double-check all spelling and details before signing.
          </AlertDescription>
        </Alert>

        <FormField
          control={form.control}
          name="spellingConfirmed"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-border p-4 bg-muted/50">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-base font-medium">
                  I have checked the spelling and details above *
                </FormLabel>
                <FormDescription>
                  I understand custom tags cannot be refunded for incorrect information that I provided.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="signature"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <PenLine className="w-4 h-4" />
                  Customer Signature *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Type your full name"
                    className="signature-field h-12 text-xl"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Type your full name as signature</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="signatureDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Signature Date *
                </FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : field.value}
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Alert className="bg-secondary border-secondary-foreground/20">
          <Shield className="h-4 w-4 text-secondary-foreground" />
          <AlertTitle className="text-secondary-foreground">Lifetime Warranty</AlertTitle>
          <AlertDescription className="text-secondary-foreground/80">
            Return tag and receive replacement within 3-5 business days.
          </AlertDescription>
        </Alert>
      </div>
    </FormSection>
  );
}
