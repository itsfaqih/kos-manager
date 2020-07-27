import React from 'react';
import Helmet from 'react-helmet';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import { KeyOutline, UserGroupOutline, ArchiveOutline } from '@graywolfai/react-heroicons';

const Dashboard = () => {
  const { counts } = usePage()
  return (
    <div>
      <Helmet>
        <title>Dasbor</title>
      </Helmet>
      <h1 className="mb-8 text-3xl font-bold">Dasbor</h1>
      <div className="flex flex-wrap -mx-3">
        <div className="w-full px-3 mb-4 lg:w-1/2 xl:w-1/3">
          <div className="flex w-full p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-center w-16 h-16 mr-4 bg-indigo-600 rounded-md">
              <KeyOutline className="w-8 h-8 text-white" />
            </div>
            <div className="flex flex-col py-1">
              <span className="mb-2 font-semibold text-gray-600">Kamar Tersedia</span>
              <span className="text-3xl font-semibold">{counts.rooms}</span>
            </div>
          </div>
        </div>
        <div className="w-full px-3 mb-4 lg:w-1/2 xl:w-1/3">
          <div className="flex w-full p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-center w-16 h-16 mr-4 bg-indigo-600 rounded-md">
              <UserGroupOutline className="w-8 h-8 text-white" />
            </div>
            <div className="flex flex-col py-1">
              <span className="mb-2 font-semibold text-gray-600">Penghuni</span>
              <span className="text-3xl font-semibold">{counts.renters}</span>
            </div>
          </div>
        </div>
        <div className="w-full px-3 mb-4 lg:w-1/2 xl:w-1/3">
          <div className="flex w-full p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-center w-16 h-16 mr-4 bg-indigo-600 rounded-md">
              <ArchiveOutline className="w-8 h-8 text-white" />
            </div>
            <div className="flex flex-col py-1">
              <span className="mb-2 font-semibold text-gray-600">Penginapan Berlangsung</span>
              <span className="text-3xl font-semibold">{counts.lodgings}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Persisten layout
// Docs: https://inertiajs.com/pages#persistent-layouts
Dashboard.layout = page => <Layout children={page} />;

export default Dashboard;
