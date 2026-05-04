import { InvoiceItem, InvoiceDetails } from '../../types';
import { formatCurrency } from '../../lib/utils';
import { Eye, Calculator } from 'lucide-react';

interface LiveSummaryProps {
  items: InvoiceItem[];
  details: InvoiceDetails;
  onViewInvoice: () => void;
}

export default function LiveSummary({ items, details, onViewInvoice }: LiveSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + (item.quantity || 0) * (item.price || 0), 0);
  const taxAmount = subtotal * ((details.taxRate || 0) / 100);
  const total = subtotal + taxAmount - (details.discount || 0);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden sticky top-24">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
         <h2 className="text-lg font-bold text-slate-800">ملخص الحساب</h2>
         <div className="p-2 bg-secondary-50 text-secondary-500 rounded-lg">
           <Calculator className="w-5 h-5" />
         </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between text-slate-600">
          <span>المجموع الفرعي</span>
          <span className="font-semibold text-slate-800">{formatCurrency(subtotal)}</span>
        </div>
        
        {details.taxRate > 0 && (
          <div className="flex items-center justify-between text-slate-600">
            <span>الضريبة ({details.taxRate}%)</span>
            <span className="font-semibold text-slate-800">{formatCurrency(taxAmount)}</span>
          </div>
        )}

        {details.discount > 0 && (
          <div className="flex items-center justify-between text-slate-600 text-green-600">
            <span>خصم إضافي</span>
            <span className="font-semibold">- {formatCurrency(details.discount)}</span>
          </div>
        )}

        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-slate-800">الإجمالي النهائي</span>
            <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary-800 to-primary-600">
              {formatCurrency(total)}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">الأسعار معتمدة بالدولار الأمريكي</p>
        </div>
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-100">
        <button 
          onClick={onViewInvoice}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-700 hover:to-secondary-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-primary-500/20 transition-all active:scale-[0.98]"
        >
          <Eye className="w-5 h-5" />
          <span>المعاينة وإصدار الفاتورة</span>
        </button>
      </div>
    </div>
  );
}
