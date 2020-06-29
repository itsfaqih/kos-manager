import React from 'react';
import Helmet from 'react-helmet';
import { InertiaLink } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';

const Dashboard = () => {
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <h1 className="mb-8 text-3xl font-bold">Selamat datang kembali</h1>
      <div>
        <InertiaLink className="mr-1 btn-indigo" href="/500">
          500 error
        </InertiaLink>
        <InertiaLink className="btn-indigo" href="/404">
          404 error
        </InertiaLink>
      </div>
    </div>
  );
};

// Persisten layout
// Docs: https://inertiajs.com/pages#persistent-layouts
Dashboard.layout = page => <Layout children={page} />;

export default Dashboard;
