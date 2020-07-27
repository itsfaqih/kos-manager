import React from 'react';
import Helmet from 'react-helmet';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import Icon from '@/Shared/Icon';
import SearchFilter from '@/Shared/SearchFilter';
import Pagination from '@/Shared/Pagination';

const Bills = () => {
  const { bills } = usePage();
  const { links, data } = bills;
  return (
    <div>
      <Helmet title="Tagihan" />
      <div>
        <h1 className="mb-8 text-3xl font-bold">Tagihan</h1>
        <div className="flex items-center justify-between mb-6">
          <SearchFilter />
          <InertiaLink
            className="btn-indigo"
            href={route('bills.create')}
          >
            <span>Tambah</span>
            <span className="hidden md:inline"> Tagihan</span>
          </InertiaLink>
        </div>
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="font-bold text-left">
                <th className="px-6 pt-5 pb-4">Nomor Kamar</th>
                <th className="px-6 pt-5 pb-4">Nama Penyewa</th>
                <th className="px-6 pt-5 pb-4">Nama Tagihan</th>
                <th className="px-6 pt-5 pb-4">Deskripsi</th>
                <th className="px-6 pt-5 pb-4">Jumlah</th>
                <th className="px-6 pt-5 pb-4">Per Bulan</th>
              </tr>
            </thead>
            <tbody>
              {data.map(({ id, room, renter, name, description, amount, per_month, deleted_at }) => {
                return (
                  <tr
                key={id}
                className="hover:bg-gray-100 focus-within:bg-gray-100"
              >
                <td className="border-t">
                  <InertiaLink
                    href={route('bills.edit', id)}
                    className="flex items-center px-6 py-4 focus:text-indigo-700"
                  >
                    {room.number}
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
                    href={route('bills.edit', id)}
                    className="flex items-center px-6 py-4 focus:text-indigo-700"
                  >
                    {renter.name}
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
                    href={route('bills.edit', id)}
                    className="flex items-center px-6 py-4 focus:text-indigo-700"
                  >
                    {name}
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
                    href={route('bills.edit', id)}
                    className="flex items-center px-6 py-4 focus:text-indigo"
                  >
                    {description}
                  </InertiaLink>
                </td>
                <td className="border-t">
                  <InertiaLink
                    tabIndex="-1"
                    href={route('bills.edit', id)}
                    className="flex items-center px-6 py-4 focus:text-indigo"
                  >
                    {amount}
                  </InertiaLink>
                </td>
                <td className="border-t">
                  <InertiaLink
                    tabIndex="-1"
                    href={route('bills.edit', id)}
                    className="flex items-center px-6 py-4 focus:text-indigo"
                  >
                    {per_month ? 'Ya' : 'Tidak'}
                  </InertiaLink>
                </td>
                <td className="w-px border-t">
                  <InertiaLink
                    tabIndex="-1"
                    href={route('bills.edit', id)}
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
                    Tagihan tidak ditemukan.
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
Bills.layout = page => <Layout children={page} />;

export default Bills;
