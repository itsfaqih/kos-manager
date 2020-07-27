import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import classNames from 'classnames';

export default ({ icon, link, text }) => {
  const isActive = route().current(link + '*');

  const iconClasses = classNames('w-4 h-4 mr-2', {
    'text-white fill-current': isActive,
    'text-indigo-400 group-hover:text-white fill-current': !isActive
  });

  const textClasses = classNames({
    'text-white': isActive,
    'text-indigo-200 group-hover:text-white': !isActive
  });

  return (
    <div className="px-3 mb-2">
      <InertiaLink href={route(link)} className={`flex items-center py-3 group ${textClasses}`}>
        {icon}
        <div className={textClasses}>{text}</div>
      </InertiaLink>
    </div>
  );
};
