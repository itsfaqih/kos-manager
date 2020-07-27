import React from 'react';
import MainMenuItem from '@/Shared/MainMenuItem';
import { TemplateOutline, KeyOutline, UserGroupOutline, ArchiveOutline, CurrencyDollarOutline, CreditCardOutline, CashOutline } from '@graywolfai/react-heroicons';

export default ({ className }) => {
  return (
    <div className={className}>
      <div className="mt-6 mb-4 text-sm font-semibold tracking-wide text-indigo-300 uppercase">Dashboard</div>
      <MainMenuItem text="Dashboard" link="dashboard" icon={<TemplateOutline className="w-6 h-6 mr-2"/>} />
      <div className="mt-6 mb-4 text-sm font-semibold tracking-wide text-indigo-300 uppercase">Master</div>
      <MainMenuItem text="Kamar" link="rooms.index" icon={<KeyOutline className="w-6 h-6 mr-2"/>} />
      <MainMenuItem text="Penyewa" link="renters.index" icon={<UserGroupOutline className="w-6 h-6 mr-2"/>} />
      <MainMenuItem text="Tagihan" link="bills.index" icon={<CurrencyDollarOutline className="w-6 h-6 mr-2"/>} />
      <div className="mt-6 mb-4 text-sm font-semibold tracking-wide text-indigo-300 uppercase">Bisnis</div>
      <MainMenuItem text="Penginapan" link="lodgings.index" icon={<ArchiveOutline className="w-6 h-6 mr-2"/>} />
      <MainMenuItem text="Penagihan" link="invoices.index" icon={<CreditCardOutline className="w-6 h-6 mr-2"/>} />
      <MainMenuItem text="Pembayaran" link="payments.index" icon={<CashOutline className="w-6 h-6 mr-2"/>} />
    </div>
  );
};