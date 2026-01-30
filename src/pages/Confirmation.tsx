import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, Home, Shield, Printer, Loader2 } from 'lucide-react';
import { fetchOrderById, OrderWithTags } from '@/services/orderService';

export default function Confirmation() {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<OrderWithTags | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      if (!orderId) {
        setLoading(false);
        return;
      }
      
      const orderData = await fetchOrderById(orderId);
      setOrder(orderData);
      setLoading(false);
    }
    
    loadOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading order...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">Order not found</p>
            <Link to="/">
              <Button className="mt-4">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl py-8 px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary mb-4">
            <CheckCircle2 className="w-10 h-10 text-secondary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">Thank you for your order</p>
        </div>

        {/* Order ID */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Order Number</p>
                <p className="text-2xl font-bold text-primary">{order.order_number}</p>
              </div>
              <Badge variant="secondary" className="text-sm capitalize">
                {order.status.replace('_', ' ')}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Customer Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium">{order.customer_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phone</span>
              <span className="font-medium">{order.phone_number}</span>
            </div>
            {order.email && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium">{order.email}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Preferred Contact</span>
              <span className="font-medium capitalize">{order.preferred_contact}</span>
            </div>
          </CardContent>
        </Card>

        {/* Tags */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Tags Ordered ({order.tags.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {order.tags.map((tag) => (
              <div key={tag.id} className="p-4 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-primary">Tag #{tag.tag_number}</span>
                  <Badge variant="outline">{tag.shape}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Pet Name:</span>
                    <span className="ml-2 font-medium">
                      {tag.pet_name_case === 'uppercase' ? tag.pet_name.toUpperCase() : tag.pet_name}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Animal:</span>
                    <span className="ml-2 font-medium capitalize">
                      {tag.animal_type === 'other' ? tag.animal_type_other : tag.animal_type}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Size:</span>
                    <span className="ml-2 font-medium capitalize">{tag.size}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Material:</span>
                    <span className="ml-2 font-medium capitalize">
                      {tag.material === 'stainless' ? 'Stainless Steel' : 'Brass'}
                    </span>
                  </div>
                </div>
                <Separator className="my-3" />
                <div className="text-sm space-y-1">
                  <p><span className="text-muted-foreground">Front:</span> {tag.front_line_1}{tag.front_line_2 && ` / ${tag.front_line_2}`}</p>
                  <p><span className="text-muted-foreground">Back:</span> {tag.back_line_1}{tag.back_line_2 && ` / ${tag.back_line_2}`}{tag.back_line_3 && ` / ${tag.back_line_3}`}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Font & Icons */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Font & Icons</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Font Choice</span>
              <span className="font-bold text-xl">Font {order.font_choice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Custom Image</span>
              <span className="font-medium">{order.add_image ? 'Yes (+$10)' : 'No'}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-muted-foreground">Icons</span>
              <div className="text-right">
                {[
                  order.icons.paw && '🐾 Paw',
                  order.icons.bone && '🦴 Bone',
                  order.icons.heart && '❤️ Heart',
                  order.icons.star && '⭐ Star',
                  order.icons.other && `✨ ${order.icons.otherText || 'Other'}`,
                ].filter(Boolean).join(', ') || 'None'}
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Icon Placement</span>
              <span className="font-medium capitalize">{order.icon_placement.replace('_', ' ')}</span>
            </div>
            {order.notes && (
              <div className="pt-2">
                <span className="text-muted-foreground">Notes:</span>
                <p className="mt-1 text-sm bg-muted p-2 rounded">{order.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Base Tag Price</span>
              <span className="font-medium">${Number(order.base_tag_price).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Add-ons</span>
              <span className="font-medium">${Number(order.add_ons_total).toFixed(2)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between text-lg">
              <span className="font-bold">Total</span>
              <span className="font-bold text-primary">${Number(order.order_total).toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="font-medium capitalize">
                {order.payment_method === 'other' ? order.payment_method_other : order.payment_method}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date Ordered</span>
              <span className="font-medium">
                {new Date(order.date_ordered).toLocaleDateString()}
              </span>
            </div>
            {order.ready_by && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ready By</span>
                <span className="font-medium">
                  {new Date(order.ready_by).toLocaleDateString()}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Warranty Notice */}
        <Alert className="mb-6 bg-secondary border-secondary-foreground/20">
          <Shield className="h-4 w-4 text-secondary-foreground" />
          <AlertTitle className="text-secondary-foreground">Lifetime Warranty</AlertTitle>
          <AlertDescription className="text-secondary-foreground/80">
            Return tag and receive replacement within 3-5 business days.
          </AlertDescription>
        </Alert>

        {/* Signature */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Signed by</p>
              <p className="signature-field text-2xl text-primary">{order.signature}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {new Date(order.signature_date).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" className="flex-1" onClick={() => window.print()}>
            <Printer className="w-4 h-4 mr-2" />
            Print Order
          </Button>
          <Link to="/" className="flex-1">
            <Button className="w-full">
              <Home className="w-4 h-4 mr-2" />
              New Order
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
