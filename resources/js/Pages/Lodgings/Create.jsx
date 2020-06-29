import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import SelectInput from '@/Shared/SelectInput';

export default () => {
  const { errors, renters, rooms } = usePage();
  const [sending, setSending] = useState(false);

  const [values, setValues] = useState({
    room_id: '',
    renter_id: '',
    start_at: '',
    end_at: '',
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
    Inertia.post(route('lodgings.store'), values).then(() => {
      setSending(false);
    });
  }

  return (
    <Layout>
      <Helmet title="Create Lodging" />
      <div>
        <h1 className="mb-8 text-3xl font-bold">
          <InertiaLink
            href={route('lodgings.index')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Penginapan
          </InertiaLink>
          <span className="font-medium text-indigo-600"> /</span> Buat
        </h1>
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
                label="Tanggal mulai sewa"
                name="start_at"
                type="date"
                errors={errors.start_at}
                value={values.start_at}
                onChange={handleChange}
              />
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Tanggal selesai sewa"
                name="end_at"
                type="date"
                errors={errors.end_at}
                value={values.end_at}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
              <LoadingButton
                loading={sending}
                type="submit"
                className="btn-indigo"
              >
                Tambah Penginapan
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
