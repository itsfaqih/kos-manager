import React from 'react';
import Helmet from 'react-helmet';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import Icon from '@/Shared/Icon';
import SearchFilter from '@/Shared/SearchFilter';
import Pagination from '@/Shared/Pagination';

const Invoices = () => {
  const { invoices } = usePage();
  const { links, data } = invoices;

  return (
    <div>
      <Helmet title="Invoices" />
      <div>
        <h1 className="mb-8 text-3xl font-bold">Penagihan</h1>
        <div className="flex items-center justify-between mb-6">
          <SearchFilter />
          <InertiaLink className="btn-indigo" href={route('invoices.create')}>
            <span>Tambah</span>
            <span className="hidden md:inline"> Penagihan</span>
          </InertiaLink>
        </div>
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="font-bold text-left">
                <th className="px-6 pt-5 pb-4">Id Penginapan</th>
                <th className="px-6 pt-5 pb-4">Nama Pengutang</th>
                <th className="px-6 pt-5 pb-4">Item</th>
                <th className="px-6 pt-5 pb-4">Tanggal Penagihan</th>
              </tr>
            </thead>
            <tbody>
              {data.map(
                ({ id, bill, deleted_at, created_at }) => {
                  return (
                    <tr key={id} className="hover:bg-gray-100 focus-within:bg-gray-100">
                      <td className="border-t">
                        <InertiaLink tabIndex="-1" href={route('invoices.edit', id)} className="flex items-center px-6 py-4 focus:text-indigo">
                          {bill.lodging_id}
                        </InertiaLink>
                      </td>
                      <td className="border-t">
                        <InertiaLink href={route('invoices.edit', id)} className="flex items-center px-6 py-4 focus:text-indigo-700">
                          {bill.name}
                          {deleted_at && (
                            <Icon name="trash" className="flex-shrink-0 w-3 h-3 ml-2 text-gray-400 fill-current" />
                          )}
                        </InertiaLink>
                      </td>
                      <td className="border-t">
                        <InertiaLink tabIndex="-1" href={route('invoices.edit', id)} className="flex items-center px-6 py-4 focus:text-indigo">
                          {bill.lodging_id}
                        </InertiaLink>
                      </td>
                      <td className="border-t">
                        <InertiaLink tabIndex="-1" href={route('invoices.edit', id)} className="flex items-center px-6 py-4 focus:text-indigo">
                          {created_at}
                        </InertiaLink>
                      </td>
                    </tr>
                  );
                }
              )}
              {data.length === 0 && (
                <tr>
                  <td className="px-6 py-4 border-t" colSpan="4">
                    Penagihan tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination links={links} />
      </div>
    </div>
  );
};

// Persisten layout
// Docs: https://inertiajs.com/pages#persistent-layouts
Invoices.layout = page => <Layout children={page} />;

export default Invoices;
