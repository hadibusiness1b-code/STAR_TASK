import { Settings, FileText } from 'lucide-react';
import { cn } from '../../lib/utils';

interface HeaderProps {
  view: 'calculator' | 'invoice';
  setView: (view: 'calculator' | 'invoice') => void;
}

export default function Header({ view, setView }: HeaderProps) {
  return (
    <header className="bg-white border-b border-primary-100 shadow-sm sticky top-0 z-10 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="https://images.weserv.nl/?url=www.image2url.com/r2/default/images/1777916658144-318eeb67-001e-4eb6-b67b-e9809c22f126.png" 
            alt="شركة النجوم" 
            className="h-14 w-auto object-contain"
            crossOrigin="anonymous"
          />
          <div>
            <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-800 to-primary-600">
              شركة النجوم
            </h1>
            <p className="text-xs text-primary-500 font-medium">للخدمات الإلكترونية والطاقة الشمسية</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-2 bg-slate-100/50 p-1 rounded-lg border border-slate-200/50 backdrop-blur-sm">
          <button
            onClick={() => setView('calculator')}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all duration-200",
              view === 'calculator' 
                ? "bg-white text-primary-700 shadow-sm border border-slate-200" 
                : "text-slate-500 hover:text-primary-600 hover:bg-slate-50"
            )}
          >
            <Settings className="w-4 h-4" />
            <span>الحاسبة الذكية</span>
          </button>
          <button
            onClick={() => setView('invoice')}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all duration-200",
              view === 'invoice' 
                ? "bg-white text-primary-700 shadow-sm border border-slate-200" 
                : "text-slate-500 hover:text-primary-600 hover:bg-slate-50"
            )}
          >
            <FileText className="w-4 h-4" />
            <span>عرض الفاتورة</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
