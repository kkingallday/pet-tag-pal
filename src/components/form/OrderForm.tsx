import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { CustomerInfoSection } from './CustomerInfoSection';
import { TagDetailsSection } from './TagDetailsSection';
import { FontIconsSection } from './FontIconsSection';
import { PriceSection } from './PriceSection';
import { ConfirmationSection } from './ConfirmationSection';
import { OrderFormData } from '@/types/order';
import { Send, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const tagSchema = z.object({
  id: z.string(),
  petName: z.string().min(1, 'Pet name is required'),
  petNameCase: z.enum(['uppercase', 'mixed']),
  animalType: z.enum(['dog', 'cat', 'other']),
  animalTypeOther: z.string().optional(),
  shape: z.string().min(1, 'Shape is required'),
  size: z.enum(['small', 'large']),
  material: z.enum(['brass', 'stainless']),
  frontLine1: z.string().min(1, 'Front line 1 is required'),
  frontLine2: z.string().optional(),
  backLine1: z.string().min(1, 'Back line 1 is required'),
  backLine2: z.string().optional(),
  backLine3: z.string().optional(),
});

const orderFormSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  email: z.string().email().optional().or(z.literal('')),
  preferredContact: z.enum(['call', 'text', 'email']),
  tags: z.array(tagSchema).min(1, 'At least one tag is required'),
  fontChoice: z.enum(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']),
  addImage: z.boolean(),
  icons: z.object({
    paw: z.boolean(),
    bone: z.boolean(),
    heart: z.boolean(),
    star: z.boolean(),
    other: z.boolean(),
    otherText: z.string().optional(),
  }),
  iconPlacement: z.enum(['before', 'after', 'above', 'back']),
  notes: z.string().optional(),
  baseTagPrice: z.number().min(0, 'Base price is required'),
  addOnsTotal: z.number(),
  orderTotal: z.number(),
  paymentMethod: z.enum(['cash', 'card', 'other']),
  paymentMethodOther: z.string().optional(),
  dateOrdered: z.date(),
  readyBy: z.date().optional(),
  staffInitials: z.string().optional(),
  spellingConfirmed: z.literal(true, {
    errorMap: () => ({ message: 'You must confirm the spelling' }),
  }),
  signature: z.string().min(1, 'Signature is required'),
  signatureDate: z.date(),
});

interface OrderFormProps {
  onSubmit?: (data: OrderFormData) => Promise<void>;
}

export function OrderForm({ onSubmit }: OrderFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      customerName: '',
      phoneNumber: '',
      email: '',
      preferredContact: 'call',
      tags: [],
      fontChoice: 'A',
      addImage: false,
      icons: {
        paw: false,
        bone: false,
        heart: false,
        star: false,
        other: false,
        otherText: '',
      },
      iconPlacement: 'before',
      notes: '',
      baseTagPrice: 0,
      addOnsTotal: 0,
      orderTotal: 0,
      paymentMethod: 'cash',
      paymentMethodOther: '',
      dateOrdered: new Date(),
      staffInitials: '',
      spellingConfirmed: false as unknown as true,
      signature: '',
      signatureDate: new Date(),
    },
  });

  const handleSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true);
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // For now, store in localStorage until backend is set up
        const orders = JSON.parse(localStorage.getItem('pet_tag_orders') || '[]');
        const newOrder = {
          ...data,
          id: `ORD-${Date.now()}`,
          createdAt: new Date().toISOString(),
          status: 'pending',
        };
        orders.push(newOrder);
        localStorage.setItem('pet_tag_orders', JSON.stringify(orders));
        
        toast({
          title: 'Order Submitted Successfully!',
          description: `Order ID: ${newOrder.id}`,
        });
        
        navigate(`/confirmation/${newOrder.id}`);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit order. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <CustomerInfoSection form={form} />
        <TagDetailsSection form={form} />
        <FontIconsSection form={form} />
        <PriceSection form={form} />
        <ConfirmationSection form={form} />

        <Button
          type="submit"
          size="lg"
          className="w-full h-14 text-lg font-bold"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Submit Order
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
