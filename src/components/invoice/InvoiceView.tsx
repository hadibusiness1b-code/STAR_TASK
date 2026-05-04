import { InvoiceItem, InvoiceDetails } from '../../types';
import { formatCurrency } from '../../lib/utils';
import { Download, ArrowRight, Share2, Printer } from 'lucide-react';
import { motion } from 'motion/react';
import { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface InvoiceViewProps {
  items: InvoiceItem[];
  details: InvoiceDetails;
  onBack: () => void;
}

export default function InvoiceView({ items, details, onBack }: InvoiceViewProps) {
  const printRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + (item.quantity || 0) * (item.price || 0), 0);
  const taxAmount = subtotal * ((details.taxRate || 0) / 100);
  const total = subtotal + taxAmount - (details.discount || 0);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    // Since html2canvas often fails with external images (CORS), 
    // the native browser print dialogue (Save as PDF) is much more reliable
    // and produces vector-quality text-searchable PDFs.
    window.print();
  };

  const handleWhatsApp = () => {
    const text = `أهلاً بك عميلنا العزيز ${details.clientName}،\nمرفق لكم تفاصيل عرض سعر منظومة الطاقة الشمسية:\nالرقم: ${details.invoiceNumber}\nالإجمالي: ${formatCurrency(total)}\n\nنسعد بخدمتكم - شركة النجوم للطاقة الشمسية.`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  // Only display valid items
  const validItems = items.filter(i => i.name.trim() !== '' || i.price > 0 || i.quantity > 1);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto pb-20"
    >
      {/* Actions Toolbar - Hidden on Print */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 no-print bg-white p-4 rounded-2xl shadow-sm border border-slate-200 sticky top-24 z-10">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-medium px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors w-full sm:w-auto justify-center"
        >
          <ArrowRight className="w-5 h-5" />
          <span>العودة للحاسبة</span>
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
             onClick={handleWhatsApp}
             className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm"
          >
            <Share2 className="w-4 h-4" />
            <span>واتساب</span>
          </button>
          <button 
            onClick={handlePrint}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة</span>
          </button>
          <button 
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            <span>{isGenerating ? 'جاري التحميل...' : 'تحميل PDF'}</span>
          </button>
        </div>
      </div>

      {/* The A4 Invoice Paper */}
      <div 
        ref={printRef}
        className="bg-white p-8 sm:p-12 shadow-xl border border-slate-200 rounded-lg min-h-[297mm] relative overflow-hidden print:shadow-none print:border-none print:m-0 print:p-0"
        style={{ direction: 'rtl' }}
      >
        {/* Decorative Top Left Shape */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-primary-50 to-primary-100 rounded-br-full opacity-50 -z-10"></div>
        <div className="absolute top-0 right-0 w-full h-2 bg-gradient-to-l from-primary-600 to-secondary-500"></div>

        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div className="flex items-center gap-5">
            <img 
              src="https://images.weserv.nl/?url=www.image2url.com/r2/default/images/1777916658144-318eeb67-001e-4eb6-b67b-e9809c22f126.png" 
              alt="شركة النجوم" 
              className="h-24 w-auto object-contain drop-shadow-sm"
              crossOrigin="anonymous"
            />
            <div>
              <h1 className="text-3xl font-black text-primary-800 mb-2"> شركة النجوم </h1>
              <h2 className="text-lg font-bold text-slate-600">للخدمات الإلكترونية والطاقة الشمسية ومستلزماتها</h2>
              <div className="mt-4 text-sm text-slate-500 space-y-1">
                <p>📍 الموقع: سوريا، محافظة اللاذقية، مدينة جبلة، شرقي سيريتل الجديدة</p>
                <p>📞 هاتف: 0996761176</p>
              </div>
            </div>
          </div>
          
          <div className="text-left bg-slate-50 p-6 rounded-2xl border border-slate-100 min-w-[200px]">
            <h3 className="text-xl font-bold text-primary-600 mb-1">فاتورة عرض سعر</h3>
            <p className="text-sm text-slate-500 mb-4">{details.invoiceNumber}</p>
            
            <div className="space-y-2 text-sm text-slate-600">
               <div><span className="font-semibold text-slate-800">التاريخ:</span> {details.date}</div>
            </div>
          </div>
        </div>

        {/* Client Details */}
        <div className="mb-10 px-6 py-5 bg-primary-50 rounded-xl border border-primary-100/50 flex flex-wrap gap-8">
           <div>
             <span className="block text-xs font-bold text-primary-600 mb-1 uppercase tracking-wider">السادة / العميل</span>
             <strong className="text-lg text-slate-800">{details.clientName || 'عميل نقدي'}</strong>
           </div>
           {details.projectAddress && (
             <div>
               <span className="block text-xs font-bold text-primary-600 mb-1 uppercase tracking-wider">عنوان المشروع</span>
               <strong className="text-lg text-slate-800">{details.projectAddress}</strong>
             </div>
           )}
        </div>

        {/* Items Table */}
        <div className="mb-10">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-primary-600 text-white border-b-2 border-primary-700">
                <th className="py-3 px-4 font-bold text-sm first:rounded-tr-lg">م</th>
                <th className="py-3 px-4 font-bold text-sm">الصنف والمواصفات</th>
                <th className="py-3 px-4 font-bold text-sm text-center">الكمية</th>
                <th className="py-3 px-4 font-bold text-sm text-center">السعر الإفرادي</th>
                <th className="py-3 px-4 font-bold text-sm text-center last:rounded-tl-lg">الإجمالي</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60">
              {validItems.length > 0 ? validItems.map((item, index) => (
                <tr key={item.id} className="even:bg-slate-50/50">
                  <td className="py-4 px-4 text-slate-500 text-sm font-medium">{index + 1}</td>
                  <td className="py-4 px-4">
                    <p className="font-bold text-slate-800">{item.category}</p>
                    {item.name && <p className="text-sm text-slate-500 mt-1">{item.name}</p>}
                  </td>
                  <td className="py-4 px-4 text-center font-medium text-slate-700">{item.quantity}</td>
                  <td className="py-4 px-4 text-center text-slate-600">{formatCurrency(item.price || 0)}</td>
                  <td className="py-4 px-4 text-center font-bold text-slate-800">{formatCurrency((item.quantity || 0) * (item.price || 0))}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">لا توجد عناصر مضافة للفاتورة</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Totals & Signatures */}
        <div className="flex flex-col md:flex-row justify-between items-start pt-8 pb-16 min-h-[250px]">
          {/* Terms & Conditions */}
          <div className="w-full md:w-1/2 pr-4 space-y-3">
             <h4 className="font-bold text-slate-800 text-sm mb-2 border-b border-slate-200 pb-2 inline-block">الشروط والأحكام</h4>
             <ul className="text-xs text-slate-500 space-y-2 list-disc list-inside">
               <li>هذا العرض صالح لمدة 14 يوماً من تاريخ الإصدار.</li>
               <li>الأسعار قابلة للتغيير بناءً على أسعار السوق للمواد الخام.</li>
               <li>الضمان يشمل العيوب المصنعية ولا يشمل سوء الاستخدام أو الكوارث.</li>
               <li>يتم دفع 50% عند التعاقد والمتبقي بعد إتمام وتركيب المشروع.</li>
             </ul>

             <div className="mt-12 flex items-center justify-between ml-12">
                <div className="text-center">
                  <p className="text-xs font-bold text-slate-400 mb-8 border-b border-slate-200 pb-2">توقيع المستلم</p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-slate-400 mb-8 border-b border-slate-200 pb-2">ختم وتوقيع الشركة</p>
                </div>
             </div>
          </div>

          {/* Totals Summary */}
          <div className="w-full md:w-72 mt-8 md:mt-0 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 space-y-3 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>الإجمالي الفرعي</span>
                  <span className="font-bold text-slate-800">{formatCurrency(subtotal)}</span>
                </div>
                {details.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>خصم خاص</span>
                    <span className="font-bold">- {formatCurrency(details.discount)}</span>
                  </div>
                )}
                {details.taxRate > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>الضريبة ({details.taxRate}%)</span>
                    <span className="font-bold text-slate-800">{formatCurrency(taxAmount)}</span>
                  </div>
                )}
            </div>
            <div className="bg-primary-600 text-white p-4">
              <div className="flex justify-between items-center">
                 <span className="font-bold">الإجمالي المعتمد</span>
                 <span className="text-xl font-black">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-slate-100 mt-8 mt-auto flex justify-between items-center text-xs text-slate-400">
           <p>نظام حساب الطاقة الشمسية - شركة النجوم</p>
           <p>صنع بكل حب واتقان ⚡</p>
        </div>
      </div>
    </motion.div>
  );
}
