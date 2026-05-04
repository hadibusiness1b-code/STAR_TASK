import { InvoiceItem, InvoiceDetails } from '../../types';
import { Plus, Trash2 } from 'lucide-react';
import { cn, formatCurrency } from '../../lib/utils';
import React from 'react';

interface ItemsTableProps {
  items: InvoiceItem[];
  setItems: React.Dispatch<React.SetStateAction<InvoiceItem[]>>;
}

export default function ItemsTable({ items, setItems }: ItemsTableProps) {
  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Math.random().toString(36).substring(7),
      category: 'إضافة جديدة',
      name: '',
      quantity: 1,
      price: 0,
    };
    setItems([...items, newItem]);
  };

  const commonCategories = [
    'ألواح شمسية', 'إنفيرتر', 'بطاريات', 'قواطع', 'أسلاك', 'قاعدة تركيب', 'أخرى'
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h2 className="text-lg font-bold text-slate-800">تفاصيل المنظومة</h2>
        <button 
          onClick={addItem}
          className="flex items-center gap-2 text-sm font-semibold text-primary-600 bg-primary-50 px-4 py-2 rounded-lg hover:bg-primary-100 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة عنصر</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
              <th className="py-4 px-6 font-medium">اسم القطعة</th>
              <th className="py-4 px-6 font-medium">المواصفات / النوع</th>
              <th className="py-4 px-6 font-medium w-32">الكمية</th>
              <th className="py-4 px-6 font-medium w-40">السعر (USD)</th>
              <th className="py-4 px-6 font-medium w-40">الإجمالي</th>
              <th className="py-4 px-6 w-16 text-center"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => (
              <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                <td className="py-3 px-6">
                  <select 
                    value={item.category}
                    onChange={(e) => updateItem(item.id, 'category', e.target.value)}
                    className="w-full bg-transparent border-0 text-slate-800 font-semibold focus:ring-0 p-0 cursor-pointer"
                  >
                    {commonCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                    {!commonCategories.includes(item.category) && (
                      <option value={item.category}>{item.category}</option>
                    )}
                  </select>
                </td>
                <td className="py-3 px-6">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                    placeholder="أدخل المواصفات..."
                    className="w-full bg-transparent border-0 text-slate-600 placeholder-slate-300 focus:ring-0 p-0"
                  />
                </td>
                <td className="py-3 px-6">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity === 0 ? '' : item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-100 border-0 rounded-md px-3 py-2 text-center text-slate-800 font-medium focus:ring-2 focus:ring-primary-500/20 focus:bg-white transition-all appearance-none"
                    style={{ MozAppearance: 'textfield' }}
                  />
                </td>
                <td className="py-3 px-6">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                    <input
                      type="number"
                      min="0"
                      value={item.price === 0 ? '' : item.price}
                      onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-100 border-0 rounded-md pl-8 pr-3 py-2 text-slate-800 font-medium focus:ring-2 focus:ring-primary-500/20 focus:bg-white transition-all appearance-none"
                    />
                  </div>
                </td>
                <td className="py-3 px-6 font-bold text-primary-700">
                  {formatCurrency((item.quantity || 0) * (item.price || 0))}
                </td>
                <td className="py-3 px-6 text-center">
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                    title="حذف العنصر"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
