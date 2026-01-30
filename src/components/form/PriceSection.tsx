import { UseFormReturn } from 'react-hook-form';
import { useEffect } from 'react';
import { FormSection } from './FormSection';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { OrderFormData } from '@/types/order';
import { DollarSign, CreditCard, Banknote, Calendar } from 'lucide-react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

interface PriceSectionProps {
  form: UseFormReturn<OrderFormData>;
}

export function PriceSection({ form }: PriceSectionProps) {
  const paymentMethod = form.watch('paymentMethod');
  const baseTagPrice = form.watch('baseTagPrice');
  const addOnsTotal = form.watch('addOnsTotal');
  const addImage = form.watch('addImage');
  const icons = form.watch('icons');

  // Calculate add-ons total
  useEffect(() => {
    let total = 0;
    if (addImage) total += 10;
    if (icons?.paw) total += 5;
    if (icons?.bone) total += 5;
    if (icons?.heart) total += 5;
    if (icons?.star) total += 5;
    if (icons?.other) total += 5;
    form.setValue('addOnsTotal', total);
  }, [addImage, icons, form]);

  // Calculate order total
  useEffect(() => {
    const total = (baseTagPrice || 0) + (addOnsTotal || 0);
    form.setValue('orderTotal', total);
  }, [baseTagPrice, addOnsTotal, form]);

  return (
    <FormSection number={5} title="Price & Order Info" variant="price">
      <div className="space-y-4">
        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="baseTagPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Base Tag Price *
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      className="pl-7"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="addOnsTotal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add-ons Total</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      type="number"
                      step="0.01"
                      className="pl-7 bg-muted"
                      readOnly
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="orderTotal"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Order Total</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-bold">$</span>
                    <Input
                      type="number"
                      step="0.01"
                      className="pl-7 bg-primary/10 font-bold text-primary border-primary"
                      readOnly
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Payment Method */}
        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Method *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="option-group"
                >
                  {[
                    { value: 'cash', label: 'Cash', icon: Banknote },
                    { value: 'card', label: 'Card', icon: CreditCard },
                    { value: 'other', label: 'Other', icon: DollarSign },
                  ].map((option) => (
                    <Label
                      key={option.value}
                      className={`option-item ${field.value === option.value ? 'selected' : ''}`}
                    >
                      <RadioGroupItem value={option.value} className="sr-only" />
                      <option.icon className="w-4 h-4" />
                      <span>{option.label}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {paymentMethod === 'other' && (
          <FormField
            control={form.control}
            name="paymentMethodOther"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specify Payment Method</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Venmo, PayPal, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="dateOrdered"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date Ordered *
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

          <FormField
            control={form.control}
            name="readyBy"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Ready By (optional)
                </FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : field.value || ''}
                    onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Staff Initials */}
        <FormField
          control={form.control}
          name="staffInitials"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Staff Initials (optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., JD" className="w-24" maxLength={4} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </FormSection>
  );
}
