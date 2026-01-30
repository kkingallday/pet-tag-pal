import { supabase } from '@/integrations/supabase/client';
import { OrderFormData, TagDetails } from '@/types/order';
import type { Database } from '@/integrations/supabase/types';

type OrderRow = Database['public']['Tables']['pet_tag_orders']['Row'];
type OrderInsert = Database['public']['Tables']['pet_tag_orders']['Insert'];
type TagInsert = Database['public']['Tables']['pet_tag_items']['Insert'];
type OrderStatus = Database['public']['Enums']['order_status'];

export interface OrderSubmissionResult {
  success: boolean;
  orderId?: string;
  orderNumber?: string;
  error?: string;
}

export async function submitOrder(data: OrderFormData): Promise<OrderSubmissionResult> {
  try {
    // Generate a temporary order number that will be overwritten by the trigger
    const tempOrderNumber = `TEMP-${Date.now()}`;
    
    // Prepare the order data for the database
    const orderData: OrderInsert = {
      order_number: tempOrderNumber, // Will be overwritten by database trigger
      customer_name: data.customerName,
      phone_number: data.phoneNumber,
      email: data.email || null,
      preferred_contact: data.preferredContact,
      font_choice: data.fontChoice,
      add_image: data.addImage,
      icons: data.icons as unknown as Database['public']['Tables']['pet_tag_orders']['Insert']['icons'],
      icon_placement: data.iconPlacement,
      notes: data.notes || null,
      base_tag_price: data.baseTagPrice,
      add_ons_total: data.addOnsTotal,
      order_total: data.orderTotal,
      payment_method: data.paymentMethod,
      payment_method_other: data.paymentMethodOther || null,
      date_ordered: data.dateOrdered instanceof Date 
        ? data.dateOrdered.toISOString().split('T')[0] 
        : data.dateOrdered,
      ready_by: data.readyBy instanceof Date 
        ? data.readyBy.toISOString().split('T')[0] 
        : data.readyBy || null,
      staff_initials: data.staffInitials || null,
      spelling_confirmed: data.spellingConfirmed,
      signature: data.signature,
      signature_date: data.signatureDate instanceof Date 
        ? data.signatureDate.toISOString().split('T')[0] 
        : data.signatureDate,
    };

    // Insert the main order
    const { data: order, error: orderError } = await supabase
      .from('pet_tag_orders')
      .insert(orderData)
      .select()
      .single();

    if (orderError) {
      console.error('Error inserting order:', orderError);
      return { success: false, error: orderError.message };
    }

    // Insert tag items
    if (data.tags && data.tags.length > 0) {
      const tagItems: TagInsert[] = data.tags.map((tag: TagDetails, index: number) => ({
        order_id: order.id,
        tag_number: index + 1,
        pet_name: tag.petName,
        pet_name_case: tag.petNameCase,
        animal_type: tag.animalType,
        animal_type_other: tag.animalTypeOther || null,
        shape: tag.shape,
        size: tag.size,
        material: tag.material,
        front_line_1: tag.frontLine1,
        front_line_2: tag.frontLine2 || null,
        back_line_1: tag.backLine1,
        back_line_2: tag.backLine2 || null,
        back_line_3: tag.backLine3 || null,
      }));

      const { error: tagsError } = await supabase
        .from('pet_tag_items')
        .insert(tagItems);

      if (tagsError) {
        console.error('Error inserting tags:', tagsError);
        // Don't fail the whole order, just log the error
      }
    }

    return {
      success: true,
      orderId: order.id,
      orderNumber: order.order_number,
    };
  } catch (error) {
    console.error('Unexpected error submitting order:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

export interface OrderTagItem {
  id: string;
  tag_number: number;
  pet_name: string;
  pet_name_case: string;
  animal_type: string;
  animal_type_other: string | null;
  shape: string;
  size: string;
  material: string;
  front_line_1: string;
  front_line_2: string | null;
  back_line_1: string;
  back_line_2: string | null;
  back_line_3: string | null;
}

export interface OrderWithTags extends Omit<OrderRow, 'icons'> {
  icons: {
    paw: boolean;
    bone: boolean;
    heart: boolean;
    star: boolean;
    other: boolean;
    otherText?: string;
  };
  tags: OrderTagItem[];
}

function transformOrder(order: OrderRow & { tags: OrderTagItem[] }): OrderWithTags {
  return {
    ...order,
    icons: order.icons as OrderWithTags['icons'],
  };
}

export async function fetchOrders(): Promise<OrderWithTags[]> {
  const { data: orders, error } = await supabase
    .from('pet_tag_orders')
    .select(`
      *,
      tags:pet_tag_items(*)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }

  return (orders || []).map(order => transformOrder(order as OrderRow & { tags: OrderTagItem[] }));
}

export async function fetchOrderById(orderId: string): Promise<OrderWithTags | null> {
  const { data: order, error } = await supabase
    .from('pet_tag_orders')
    .select(`
      *,
      tags:pet_tag_items(*)
    `)
    .eq('id', orderId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching order:', error);
    return null;
  }

  if (!order) return null;
  
  return transformOrder(order as OrderRow & { tags: OrderTagItem[] });
}

export async function fetchOrderByNumber(orderNumber: string): Promise<OrderWithTags | null> {
  const { data: order, error } = await supabase
    .from('pet_tag_orders')
    .select(`
      *,
      tags:pet_tag_items(*)
    `)
    .eq('order_number', orderNumber)
    .maybeSingle();

  if (error) {
    console.error('Error fetching order:', error);
    return null;
  }

  if (!order) return null;
  
  return transformOrder(order as OrderRow & { tags: OrderTagItem[] });
}

export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<boolean> {
  const { error } = await supabase
    .from('pet_tag_orders')
    .update({ status })
    .eq('id', orderId);

  if (error) {
    console.error('Error updating order status:', error);
    return false;
  }

  return true;
}
