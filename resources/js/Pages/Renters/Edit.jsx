import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import DeleteButton from '@/Shared/DeleteButton';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import SelectInput from '@/Shared/SelectInput';
import TrashedMessage from '@/Shared/TrashedMessage';
import Icon from '@/Shared/Icon';

export default () => {
  const { errors, renter } = usePage();
  const [sending, setSending] = useState(false);

  const [values, setValues] = useState({
    nik: renter.nik || '',
    name: renter.name || '',
    gender: renter.gender || '',
    phone_number: renter.phone_number || '',
    address: renter.address || ''
  });

  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    setValues(values => ({
      ...values,
      [key]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    Inertia.put(
      route('renters.update', renter.id),
      values
    ).then(() => setSending(false));
  }

  function destroy() {
    if (confirm('Apa anda yakin ingin menghapus penyewa ini?')) {
      Inertia.delete(route('renters.destroy', renter.id));
    }
  }

  function restore() {
    if (confirm('Apa anda yakin ingin memulihkan penyewa ini?')) {
      Inertia.put(route('renters.restore', renter.id));
    }
  }

  return (
    <Layout>
      <Helmet title={values.name} />
      <div>
        <h1 className="mb-8 text-3xl font-bold">
          <InertiaLink
            href={route('renters.index')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Penyewa
          </InertiaLink>
          <span className="mx-2 font-medium text-indigo-600">/</span>
          {values.name}
        </h1>
         {renter.deleted_at && (
           <TrashedMessage onRestore={restore}>
             Penyewa telah dihapus.
           </TrashedMessage>
        )}
        <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
          <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap p-8 -mb-8 -mr-6">
            <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="NIK"
                name="nik"
                errors={errors.nik}
                value={values.nik}
                onChange={handleChange}
              />
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Nama"
                name="name"
                errors={errors.name}
                value={values.name}
                onChange={handleChange}
              />
              <SelectInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Jenis Kelamin"
                name="gender"
                errors={errors.gender}
                value={values.gender}
                onChange={handleChange}
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="Laki-Laki">Laki-Laki</option>
                <option value="Perempuan">Perempuan</option>
              </SelectInput>
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="No Telepon"
                name="phone_number"
                type="text"
                errors={errors.phone_number}
                value={values.phone_number}
                onChange={handleChange}
              />
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Alamat"
                name="address"
                type="text"
                errors={errors.address}
                value={values.address}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
              {!renter.deleted_at && (
                <DeleteButton onDelete={destroy}>
                  Hapus Penyewa
                </DeleteButton>
              )}
              <LoadingButton
                loading={sending}
                type="submit"
                className="ml-auto btn-indigo"
              >
                Perbarui Penyewa
              </LoadingButton>
            </div>
          </form>
        </div>
        <h2 className="mt-12 text-2xl font-bold">Riwayat Penginapan</h2>
        <div className="mt-6 overflow-x-auto bg-white rounded shadow">
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="font-bold text-left">
                <th className="px-6 pt-5 pb-4">Nomor Kamar</th>
                <th className="px-6 pt-5 pb-4">
                  Tanggal mulai
                </th>
                <th className="px-6 pt-5 pb-4" colSpan="2">
                  Tanggal selesai
                </th>
              </tr>
            </thead>
            <tbody>
              {renter.lodgings.map(
                ({ id, room, start_at, end_at, deleted_at }) => {
                  return (
                    <tr
                      key={id}
                      className="hover:bg-gray-100 focus-within:bg-gray-100"
                    >
                      <td className="border-t">
                        <InertiaLink
                          href={route('lodgings.edit', id)}
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
                          tabIndex="-1"
                          href={route('lodgings.edit', id)}
                          className="flex items-center px-6 py-4 focus:text-indigo"
                        >
                          {start_at}
                        </InertiaLink>
                      </td>
                      <td className="border-t">
                        <InertiaLink
                          tabIndex="-1"
                          href={route('lodgings.edit', id)}
                          className="flex items-center px-6 py-4 focus:text-indigo"
                        >
                          {end_at}
                        </InertiaLink>
                      </td>
                      <td className="w-px border-t">
                        <InertiaLink
                          tabIndex="-1"
                          href={route('lodgings.edit', id)}
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
                }
              )}
              {renter.lodgings.length === 0 && (
                <tr>
                  <td className="px-6 py-4 border-t" colSpan="4">
                    No lodgings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};
