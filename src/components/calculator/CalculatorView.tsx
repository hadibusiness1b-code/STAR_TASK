import React from 'react';
import { InvoiceItem, InvoiceDetails } from '../../types';
import InvoiceDetailsForm from './InvoiceDetailsForm';
import ItemsTable from './ItemsTable';
import LiveSummary from './LiveSummary';
import { motion } from 'motion/react';

interface CalculatorViewProps {
  items: InvoiceItem[];
  setItems: React.Dispatch<React.SetStateAction<InvoiceItem[]>>;
  details: InvoiceDetails;
  setDetails: React.Dispatch<React.SetStateAction<InvoiceDetails>>;
  onViewInvoice: () => void;
}

export default function CalculatorView({ 
  items, setItems, details, setDetails, onViewInvoice 
}: CalculatorViewProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8"
    >
      <div className="xl:col-span-2 space-y-6">
        <InvoiceDetailsForm details={details} setDetails={setDetails} />
        <ItemsTable items={items} setItems={setItems} />
      </div>
      
      <div className="xl:col-span-1">
        <LiveSummary items={items} details={details} onViewInvoice={onViewInvoice} />
      </div>
    </motion.div>
  );
}
