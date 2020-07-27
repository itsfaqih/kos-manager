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
import { currency } from '@/utils';

export default () => {
  const { errors, lodging, renters, rooms } = usePage();
  const [sending, setSending] = useState(false);

  const [values, setValues] = useState({
    room_id: lodging.room.id || '',
    renter_id: lodging.renter.id || '',
    start_at: lodging.start_at || '',
    end_at: lodging.end_at || ''
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
      route('lodgings.update', lodging.id),
      values
    ).then(() => setSending(false));
  }

  function destroy() {
    if (confirm('Apa anda yakin ingin menghapus data penginapan ini?')) {
      Inertia.delete(route('lodgings.destroy', lodging.id));
    }
  }

  function restore() {
    if (confirm('Apa anda yakin ingin memulihkan data penginapan ini?')) {
      Inertia.put(route('lodgings.restore', lodging.id));
    }
  }

  return (
    <Layout>
      <Helmet title={`Penginapan Kamar ${lodging.room.number} - ${lodging.renter.name}`} />
      <div>
        <h1 className="mb-8 text-3xl font-bold">
          <InertiaLink
            href={route('lodgings.index')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Penginapan
          </InertiaLink>
          <span className="mx-2 font-medium text-indigo-600">/</span>
          {`Kamar ${lodging.room.number} - ${lodging.renter.name}`}
        </h1>
        {lodging.deleted_at && (
          <TrashedMessage onRestore={restore}>
            Data penginapan ini telah dihapus.
          </TrashedMessage>
        )}
        <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap p-8 -mb-8 -mr-6">
              <SelectInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Penyewa"
                name="renter_id"
                errors={errors.renter_id}
                value={values.renter_id}
                onChange={handleChange}
              >
                <option value="" disabled>Pilih Penyewa</option>
                {
                  renters.map((renter, index) => (
                    <option key={index} value={renter.id}>{renter.name}</option>
                  ))
                }
              </SelectInput>
              <SelectInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Kamar"
                name="room_id"
                errors={errors.room_id}
                value={values.room_id}
                onChange={handleChange}
              >
                <option value="" disabled>Pilih Kamar</option>
                {
                  rooms.map((room, index) => (
                    <option key={index} value={room.id}>{room.number}</option>
                  ))
                }
              </SelectInput>
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Mulai sewa"
                name="start_at"
                type="date"
                errors={errors.start_at}
                value={values.start_at}
                onChange={handleChange}
              />
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Selesai sewa"
                name="end_at"
                type="date"
                errors={errors.end_at}
                value={values.end_at}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
              {!lodging.deleted_at && (
                <DeleteButton onDelete={destroy}>
                  Hapus Penginapan
                </DeleteButton>
              )}
              <LoadingButton
                loading={sending}
                type="submit"
                className="ml-auto btn-indigo"
              >
                Perbarui Penginapan
              </LoadingButton>
            </div>
          </form>
        </div>
        <h2 className="mt-12 text-2xl font-bold">Riwayat Pembayaran</h2>
        <div className="mt-6 overflow-x-auto bg-white rounded shadow">
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="font-bold text-left">
                <th className="px-6 pt-5 pb-4">Item Tagihan</th>
                <th className="px-6 pt-5 pb-4">Jumlah</th>
                <th className="px-6 pt-5 pb-4">Tanggal Penagihan</th>
                <th className="px-6 pt-5 pb-4" colSpan="2">
                  Tanggal Pembayaran
                </th>
              </tr>
            </thead>
            <tbody>
              {lodging.payments.map(
                ({ id, item, amount, issued_at, created_at, deleted_at }) => {
                  return (
                    <tr
                      key={id}
                      className="hover:bg-gray-100 focus-within:bg-gray-100"
                    >
                      <td className="border-t">
                        <InertiaLink
                          href={route('payments.edit', id)}
                          className="flex items-center px-6 py-4 focus:text-indigo"
                        >
                          {item}
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
                          {currency(amount)}
                        </InertiaLink>
                      </td>
                      <td className="border-t">
                        <InertiaLink
                          tabIndex="-1"
                          href={route('payments.edit', id)}
                          className="flex items-center px-6 py-4 focus:text-indigo"
                        >
                          {issued_at}
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
                }
              )}
              {lodging.payments.length === 0 && (
                <tr>
                  <td className="px-6 py-4 border-t" colSpan="4">
                    Belum ada data pembayaran
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
