import { InvoiceDetails } from '../../types';
import React from 'react';

interface InvoiceDetailsFormProps {
  details: InvoiceDetails;
  setDetails: React.Dispatch<React.SetStateAction<InvoiceDetails>>;
}

export default function InvoiceDetailsForm({ details, setDetails }: InvoiceDetailsFormProps) {
  const handleChange = (field: keyof InvoiceDetails, value: any) => {
    setDetails(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
      <h2 className="text-lg font-bold text-slate-800 mb-6">معلومات العميل والمشروع</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">اسم العميل</label>
          <input
            type="text"
            value={details.clientName}
            onChange={(e) => handleChange('clientName', e.target.value)}
            placeholder="الاسم الكامل أو اسم الشركة..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">عنوان المشروع</label>
          <input
            type="text"
            value={details.projectAddress}
            onChange={(e) => handleChange('projectAddress', e.target.value)}
            placeholder="المدينة، المنطقة..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">التاريخ</label>
          <input
            type="date"
            value={details.date}
            onChange={(e) => handleChange('date', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">رقم الفاتورة</label>
          <input
            type="text"
            value={details.invoiceNumber}
            onChange={(e) => handleChange('invoiceNumber', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">الضريبة (%)</label>
          <input
            type="number"
            min="0"
            value={details.taxRate === 0 ? '' : details.taxRate}
            onChange={(e) => handleChange('taxRate', parseFloat(e.target.value) || 0)}
            placeholder="0"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">الخصم الإضافي ($)</label>
           <input
            type="number"
            min="0"
            value={details.discount === 0 ? '' : details.discount}
            onChange={(e) => handleChange('discount', parseFloat(e.target.value) || 0)}
            placeholder="0"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
          />
        </div>
      </div>
    </div>
  );
}
