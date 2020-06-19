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
    if (confirm('Are you sure you want to delete this renter?')) {
      Inertia.delete(route('renters.destroy', renter.id));
    }
  }

  function restore() {
    if (confirm('Are you sure you want to restore this renter?')) {
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
            Renters
          </InertiaLink>
          <span className="mx-2 font-medium text-indigo-600">/</span>
          {values.name}
        </h1>
         {renter.deleted_at && (
           <TrashedMessage onRestore={restore}>
             This renter has been deleted.
           </TrashedMessage>
        )}
        <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
          <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap p-8 -mb-8 -mr-6">
            <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="nik"
                name="nik"
                errors={errors.nik}
                value={values.nik}
                onChange={handleChange}
              />
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="name"
                name="name"
                errors={errors.name}
                value={values.name}
                onChange={handleChange}
              />
              <SelectInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="gender"
                name="gender"
                errors={errors.gender}
                value={values.gender}
                onChange={handleChange}
              >
                <option value=""></option>
                <option value="Laki-Laki">Laki-Laki</option>
                <option value="Perempuan">Perempuan</option>
              </SelectInput>
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="phone_number"
                name="phone_number"
                type="text"
                errors={errors.phone_number}
                value={values.phone_number}
                onChange={handleChange}
              />
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Address"
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
                  Delete Renter
                </DeleteButton>
              )}
              <LoadingButton
                loading={sending}
                type="submit"
                className="ml-auto btn-indigo"
              >
                Update Renter
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
