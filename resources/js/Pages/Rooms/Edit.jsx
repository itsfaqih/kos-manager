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
  const { errors, room } = usePage();
  const [sending, setSending] = useState(false);

  const [values, setValues] = useState({
    number: room.number || '',
    length: room.length || '',
    width: room.width || '',
    facilities: room.facilities || '',
    cost_per_month: room.cost_per_month || ''
  });
console.log(room);
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
    Inertia.put(route('rooms.update', room.id), values).then(() =>
      setSending(false)
    );
  }

  function destroy() {
    if (confirm('Apa anda yakin ingin menghapus kamar ini?')) {
      Inertia.delete(route('rooms.destroy', room.id));
    }
  }

  function restore() {
    if (confirm('Apa anda yakin ingin memulihkan kamar ini?')) {
      Inertia.put(route('rooms.restore', room.id));
    }
  }

  return (
    <Layout>
      <Helmet title={`Kamar #${values.number}`} />
      <div>
        <h1 className="mb-8 text-3xl font-bold">
          <InertiaLink
            href={route('rooms.index')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Kamar
          </InertiaLink>
          <span className="mx-2 font-medium text-indigo-600">/</span>
          #{values.number}
        </h1>
        {room.deleted_at && (
          <TrashedMessage onRestore={restore}>
            Kamar ini telah dihapus.
          </TrashedMessage>
        )}
        <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap p-8 -mb-8 -mr-6">
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Nomor Kamar"
                name="number"
                errors={errors.number}
                value={values.number}
                onChange={handleChange}
              />
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Panjang Kamar"
                name="length"
                type="number"
                errors={errors.length}
                value={values.length}
                onChange={handleChange}
              />
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Lebar Kamar"
                name="width"
                type="number"
                errors={errors.width}
                value={values.width}
                onChange={handleChange}
              />
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Fasilitas"
                name="facilities"
                type="text"
                errors={errors.facilities}
                value={values.facilities}
                onChange={handleChange}
              />
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Biaya per bulan"
                name="cost_per_month"
                type="text"
                errors={errors.cost_per_month}
                value={values.cost_per_month}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
              {!room.deleted_at && (
                <DeleteButton onDelete={destroy}>Hapus kamar</DeleteButton>
              )}
              <LoadingButton
                loading={sending}
                type="submit"
                className="ml-auto btn-indigo"
              >
                Perbarui kamar
              </LoadingButton>
            </div>
          </form>
        </div>
        {/* <h2 className="mt-12 text-2xl font-bold">rooms</h2>
        <div className="mt-6 overflow-x-auto bg-white rounded shadow">
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="font-bold text-left">
                <th className="px-6 pt-5 pb-4">Room</th>
                <th className="px-6 pt-5 pb-4">Large</th>
                <th className="px-6 pt-5 pb-4">Facilities</th>
                <th className="px-6 pt-5 pb-4">Cost Per Month</th>
              </tr>
            </thead>
            <tbody>
              {room.rooms.map(
                ({ id, number, large, facilities, cost_per_month, deleted_at }) => {
                  return (
                    <tr key={id} className="hover:bg-gray-100 focus-within:bg-gray-100">
                      <td className="border-t">
                        <InertiaLink href={route('rooms.edit', id)} className="flex items-center px-6 py-4 focus:text-indigo">
                          {number}
                          {deleted_at && (
                            <Icon name="trash" className="flex-shrink-0 w-3 h-3 ml-2 text-gray-400 fill-current"/>
                          )}
                        </InertiaLink>
                      </td>
                      <td className="border-t">
                        <InertiaLink tabIndex="-1" href={route('rooms.edit', id)} className="flex items-center px-6 py-4 focus:text-indigo">
                          {large}
                        </InertiaLink>
                      </td>
                      <td className="border-t">
                        <InertiaLink tabIndex="-1" href={route('rooms.edit', id)} className="flex items-center px-6 py-4 focus:text-indigo">
                          {facilities}
                        </InertiaLink>
                      </td>
                      <td className="border-t">
                        <InertiaLink tabIndex="-1" href={route('rooms.edit', id)} className="flex items-center px-6 py-4 focus:text-indigo">
                          {cost_per_month}
                        </InertiaLink>
                      </td>
                      
                      <td className="w-px border-t">
                        <InertiaLink tabIndex="-1" href={route('rooms.edit', id)} className="flex items-center px-4">
                          <Icon name="cheveron-right" className="block w-6 h-6 text-gray-400 fill-current"/>
                        </InertiaLink>
                      </td>
                    </tr>
                  );
                }
              )}
              {room.rooms.length === 0 && (
                <tr>
                  <td className="px-6 py-4 border-t" colSpan="4">
                    No rooms found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div> */}
      </div>
    </Layout>
  );
};
