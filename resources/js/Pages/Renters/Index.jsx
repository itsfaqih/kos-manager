import React from 'react';
import Helmet from 'react-helmet';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import Icon from '@/Shared/Icon';
import SearchFilter from '@/Shared/SearchFilter';
import Pagination from '@/Shared/Pagination';

const Renters = () => {
  const { renters } = usePage();
  const { links, data } = renters;
  return (
    <div>
      <Helmet title="Renters" />
      <div>
        <h1 className="mb-8 text-3xl font-bold">Penyewa</h1>
        <div className="flex items-center justify-between mb-6">
          <SearchFilter />
          <InertiaLink
            className="btn-indigo"
            href={route('renters.create')}
          >
            <span>Tambah</span>
            <span className="hidden md:inline"> Penyewa</span>
          </InertiaLink>
        </div>
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="font-bold text-left">
                <th className="px-6 pt-5 pb-4">NIK</th>
                <th className="px-6 pt-5 pb-4">Nama</th>
                <th className="px-6 pt-5 pb-4">Jenis Kelamin</th>
                <th className="px-6 pt-5 pb-4">No Telepon</th>
                <th className="px-6 pt-5 pb-4">Alamat</th>
              </tr>
            </thead>
            <tbody>
              {data.map(({ id, nik, name, gender, phone_number, address, deleted_at }) => {
                return (
                  <tr
                key={id}
                className="hover:bg-gray-100 focus-within:bg-gray-100"
              >
                <td className="border-t">
                  <InertiaLink
                    href={route('renters.edit', id)}
                    className="flex items-center px-6 py-4 focus:text-indigo-700"
                  >
                    {nik}
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
                    href={route('renters.edit', id)}
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
                    href={route('renters.edit', id)}
                    className="flex items-center px-6 py-4 focus:text-indigo"
                  >
                    {gender}
                  </InertiaLink>
                </td>
                <td className="border-t">
                  <InertiaLink
                    tabIndex="-1"
                    href={route('renters.edit', id)}
                    className="flex items-center px-6 py-4 focus:text-indigo"
                  >
                    {phone_number}
                  </InertiaLink>
                </td>
                <td className="border-t">
                  <InertiaLink
                    href={route('renters.edit', id)}
                    className="flex items-center px-6 py-4 focus:text-indigo-700"
                  >
                    {address}
                    {deleted_at && (
                      <Icon
                        name="trash"
                        className="flex-shrink-0 w-3 h-3 ml-2 text-gray-400 fill-current"
                      />
                    )}
                  </InertiaLink>
                </td>
                <td className="w-px border-t">
                  <InertiaLink
                    tabIndex="-1"
                    href={route('renters.edit', id)}
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
                    Penyewa tidak ditemukan.
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
Renters.layout = page => <Layout children={page} />;

export default Renters;
