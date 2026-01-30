import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FormSectionProps {
  number: number;
  title: string;
  variant: 'customer' | 'tag' | 'text' | 'font' | 'price' | 'confirm';
  children: ReactNode;
  className?: string;
}

export function FormSection({ number, title, variant, children, className }: FormSectionProps) {
  const variantClasses = {
    customer: 'form-section-customer',
    tag: 'form-section-tag',
    text: 'form-section-text',
    font: 'form-section-font',
    price: 'form-section-price',
    confirm: 'form-section-confirm',
  };

  return (
    <section className={cn('form-section animate-fade-in', variantClasses[variant], className)}>
      <div className="section-header">
        <span className="section-number">{number}</span>
        <h2 className="section-title">{title}</h2>
      </div>
      {children}
    </section>
  );
}
