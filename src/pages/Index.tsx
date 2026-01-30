import { OrderForm } from '@/components/form/OrderForm';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-b border-border">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏷️</span>
            <div>
              <h1 className="text-lg font-bold text-foreground leading-tight">Mana's Craft</h1>
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

      {/* Main Form */}
      <main className="container max-w-2xl py-6 px-4">
        <OrderForm />
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-8 py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Mana's Craft NY. All rights reserved.</p>
          <p className="mt-1">Custom Pet Tags • Lifetime Warranty</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
