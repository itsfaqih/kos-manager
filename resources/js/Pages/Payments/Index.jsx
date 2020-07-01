import React from 'react';
import Helmet from 'react-helmet';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import Icon from '@/Shared/Icon';
import SearchFilter from '@/Shared/SearchFilter';
import Pagination from '@/Shared/Pagination';

const Payments = () => {
  const { payments } = usePage();
  const { links, data } = payments;
  return (
    <div>
      <Helmet title="Payments" />
      <div>
        <h1 className="mb-8 text-3xl font-bold">Pembayaran</h1>
        <div className="flex items-center justify-between mb-6">
          <SearchFilter />
          <InertiaLink
            className="btn-indigo"
            href={route('payments.create')}
          >
            <span>Tambah</span>
            <span className="hidden md:inline"> Pembayaran</span>
          </InertiaLink>
        </div>
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="font-bold text-left">
                <th className="px-6 pt-5 pb-4">ID Invoice</th>
                <th className="px-6 pt-5 pb-4">Keterangan</th>
                <th className="px-6 pt-5 pb-4">Jumlah</th>
                <th className="px-6 pt-5 pb-4">Tanggal penagihan</th>
                <th className="px-6 pt-5 pb-4" colSpan="2">
                  Tanggal pembayaran
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map(({ id, description, amount, invoice_id, invoice_date, created_at, deleted_at }) => {
                return (
                  <tr
                    key={id}
                    className="hover:bg-gray-100 focus-within:bg-gray-100"
                  >
                    <td className="border-t">
                      <InertiaLink
                        href={route('payments.edit', id)}
                        className="flex items-center px-6 py-4 focus:text-indigo-700"
                      >
                        {invoice_id}
                        {deleted_at && (
                          <Icon
                            name="trash"
                            className="flex-shrink-0 w-3 h-3 ml-2 text-gray-400 fill-current"
                          />
                        )}
                      </InertiaLink>
                    </td>
                    <td className="border-t">
                      <InertiaLink
                        tabIndex="-1"
                        href={route('payments.edit', id)}
                        className="flex items-center px-6 py-4 focus:text-indigo"
                      >
                        {description}
                      </InertiaLink>
                    </td>
                    <td className="border-t">
                      <InertiaLink
                        tabIndex="-1"
                        href={route('payments.edit', id)}
                        className="flex items-center px-6 py-4 focus:text-indigo"
                      >
                        Rp {amount}
                      </InertiaLink>
                    </td>
                    <td className="border-t">
                      <InertiaLink
                        tabIndex="-1"
                        href={route('payments.edit', id)}
                        className="flex items-center px-6 py-4 focus:text-indigo"
                      >
                        {invoice_date}
                      </InertiaLink>
                    </td>
                    <td className="border-t">
                      <InertiaLink
                        tabIndex="-1"
                        href={route('payments.edit', id)}
                        className="flex items-center px-6 py-4 focus:text-indigo"
                      >
                        {created_at}
                      </InertiaLink>
                    </td>
                    <td className="w-px border-t">
                      <InertiaLink
                        tabIndex="-1"
                        href={route('payments.edit', id)}
                        className="flex items-center px-4"
                      >
                        <Icon
                          name="cheveron-right"
                          className="block w-6 h-6 text-gray-400 fill-current"
                        />
                      </InertiaLink>
                    </td>
                  </tr>
                );
              })}
              {data.length === 0 && (
                <tr>
                  <td className="px-6 py-4 border-t" colSpan="4">
                    No payments found.
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
Payments.layout = page => <Layout children={page} />;

export default Payments;
