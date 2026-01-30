import { OrderForm } from '@/components/form/OrderForm';
import { Link } from 'react-router-dom';
import { Settings, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-b border-border">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🐾</span>
            <div>
              <h1 className="text-lg font-bold text-foreground leading-tight">Purrfect Pets</h1>
              <p className="text-xs text-muted-foreground">Pet Tag Order Form</p>
            </div>
          </div>
          <Link to="/admin/orders">
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Admin
            </Button>
          </Link>
        </div>
      </header>

      {/* Business Info Banner */}
      <div className="bg-primary/10 border-b border-primary/20">
        <div className="container px-4 py-3">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-foreground">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary" />
              <span>1915 Mott Ave, Far Rockaway, NY 11691</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-primary" />
              <a href="tel:17188684949" className="hover:text-primary">(718) 868-4949</a>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-primary" />
              <a href="mailto:petsaddress@hotmail.com" className="hover:text-primary">petsaddress@hotmail.com</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <main className="container max-w-2xl py-6 px-4">
        <OrderForm />
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-8 py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Purrfect Pets. All rights reserved.</p>
          <p className="mt-1">Custom Pet Tags • Lifetime Warranty</p>
          <p className="mt-3 text-xs opacity-70">by Mana's Craft</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
