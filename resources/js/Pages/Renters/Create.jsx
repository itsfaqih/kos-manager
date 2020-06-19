import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import SelectInput from '@/Shared/SelectInput';

export default () => {
  const { errors } = usePage();
  const [sending, setSending] = useState(false);

  const [values, setValues] = useState({
    nik: '',
    name: '',
    gender: '',
    phone_number: '',
    address: '',
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
    Inertia.post(route('renters.store'), values).then(() => {
      setSending(false);
    });
  }

  return (
    <Layout>
      <Helmet title="Create Renter" />
      <div>
        <h1 className="mb-8 text-3xl font-bold">
          <InertiaLink
            href={route('renters')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Renters
          </InertiaLink>
          <span className="font-medium text-indigo-600"> /</span> Create
        </h1>
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
            <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
              <LoadingButton
                loading={sending}
                type="submit"
                className="btn-indigo"
              >
                Create Renter
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
