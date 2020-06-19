import React from 'react';
import MainMenuItem from '@/Shared/MainMenuItem';

export default ({ className }) => {
  return (
    <div className={className}>
      <MainMenuItem text="Dashboard" link="dashboard" icon="dashboard" />
      <MainMenuItem text="Rooms" link="" icon="office" />
      <MainMenuItem text="Renters" link="" icon="office" />
      <MainMenuItem text="Bills" link="" icon="office" />
      <MainMenuItem text="Organizations" link="organizations" icon="office" />
      <MainMenuItem text="Contacts" link="contacts" icon="users" />
      <MainMenuItem text="Reports" link="reports" icon="printer" />
      <MainMenuItem text="Renters" link="renters" icon="printer" />
    </div>
  );
};
