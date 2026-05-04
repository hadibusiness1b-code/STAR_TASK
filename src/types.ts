export interface InvoiceItem {
  id: string;
  category: string;
  name: string;
  quantity: number;
  price: number;
}

export interface InvoiceDetails {
  clientName: string;
  date: string;
  invoiceNumber: string;
  taxRate: number; // percentage
  discount: number; // fixed amount or percentage, let's keep it fixed amount for simplicity
  projectAddress: string;
}
