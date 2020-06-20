import React from 'react';
import MainMenuItem from '@/Shared/MainMenuItem';

export default ({ className }) => {
  return (
    <div className={className}>
      <MainMenuItem text="Dashboard" link="dashboard" icon="dashboard" />
      <MainMenuItem text="Rooms" link="rooms.index" icon="office" />
      <MainMenuItem text="Renters" link="renters.index" icon="office" />
      <MainMenuItem text="Lodgings" link="lodgings.index" icon="office" />
    </div>
  );
};