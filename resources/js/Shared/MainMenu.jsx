import React from 'react';
import MainMenuItem from '@/Shared/MainMenuItem';

export default ({ className }) => {
  return (
    <div className={className}>
      <MainMenuItem text="Dashboard" link="dashboard" icon="dashboard" />
      <MainMenuItem text="Kamar" link="rooms.index" icon="office" />
      <MainMenuItem text="Penyewa" link="renters.index" icon="office" />
      <MainMenuItem text="Penginapan" link="lodgings.index" icon="office" />
      <MainMenuItem text="Tagihan" link="bills.index" icon="office" />
      <MainMenuItem text="Organizations" link="organizations" icon="office" />
      <MainMenuItem text="Contacts" link="contacts" icon="users" />
      <MainMenuItem text="Reports" link="reports" icon="printer" />
    </div>
  );
};