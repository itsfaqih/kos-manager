import React from 'react';
import Icon from '@/Shared/Icon';

export default ({ onRestore, children }) => {
  return (
    <div className="flex items-center justify-between max-w-3xl p-4 mb-6 bg-yellow-400 border border-yellow-500 rounded">
      <div className="flex items-center">
        <Icon
          name="trash"
          className="flex-shrink-0 w-4 h-4 mr-2 text-yellow-800 fill-current"
        />
        <div className="text-yellow-800">{children}</div>
      </div>
      <button
        className="text-sm text-yellow-800 focus:outline-none hover:underline"
        tabIndex="-1"
        type="button"
        onClick={onRestore}
      >
        Pulihkan
      </button>
    </div>
  );
};
