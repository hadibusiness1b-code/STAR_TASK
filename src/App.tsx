/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState } from 'react';
import { InvoiceItem, InvoiceDetails } from './types';
import CalculatorView from './components/calculator/CalculatorView';
import InvoiceView from './components/invoice/InvoiceView';
import Header from './components/layout/Header';

export default function App() {
  const [view, setView] = useState<'calculator' | 'invoice'>('calculator');
  
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', category: 'ألواح شمسية', name: '', quantity: 1, price: 0 },
    { id: '2', category: 'إنفيرتر', name: '', quantity: 1, price: 0 },
    { id: '3', category: 'بطاريات', name: '', quantity: 1, price: 0 },
    { id: '4', category: 'قواطع', name: '', quantity: 1, price: 0 },
    { id: '5', category: 'أسلاك', name: '', quantity: 1, price: 0 },
    { id: '6', category: 'قاعدة تركيب', name: '', quantity: 1, price: 0 },
  ]);

  const [details, setDetails] = useState<InvoiceDetails>({
    clientName: '',
    date: new Date().toISOString().split('T')[0],
    invoiceNumber: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
    taxRate: 0,
    discount: 0,
    projectAddress: '',
  });

  return (
    <div className="min-h-screen flex flex-col font-arabic bg-slate-50 text-slate-900">
      <Header view={view} setView={setView} />
      
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        {view === 'calculator' ? (
          <CalculatorView 
            items={items} 
            setItems={setItems} 
            details={details} 
            setDetails={setDetails} 
            onViewInvoice={() => setView('invoice')}
          />
        ) : (
          <InvoiceView 
            items={items} 
            details={details} 
            onBack={() => setView('calculator')}
          />
        )}
      </main>
    </div>
  );
}
