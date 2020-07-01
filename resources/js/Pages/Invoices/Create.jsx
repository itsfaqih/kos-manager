import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import SelectInput from '@/Shared/SelectInput';

export default () => {
  const { errors, bills } = usePage();
  const [sending, setSending] = useState(false);

  const [values, setValues] = useState({
    bill_id: ''
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
    Inertia.post(route('invoices.store'), values).then(() => {
      setSending(false);
    });
  }

  return (
    <Layout>
      <Helmet title="Create Bill" />
      <div>
        <h1 className="mb-8 text-3xl font-bold">
          <InertiaLink
            href={route('invoices.index')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Penagihan
          </InertiaLink>
          <span className="font-medium text-indigo-600"> /</span> Tambah
        </h1>
        <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap p-8 -mb-8 -mr-6">
              <SelectInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Tagihan "
                name="bill_id"
                errors={errors.bill_id}
                value={values.bill_id}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Pilih Tagihan
                </option>
                {bills.map((bill, index) => (
                  <option key={index} value={bill.id}>
                    {bill.name}
                  </option>
                ))}
              </SelectInput>
              {/* <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Nama Tagihan"
                name="name"
                errors={errors.name}
                value={values.name}
                onChange={handleChange}
              />
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Deskripsi"
                name="description"
                type="text"
                errors={errors.description}
                value={values.description}
                onChange={handleChange}
              />
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Jumlah"
                name="amount"
                type="text"
                errors={errors.amount}
                value={values.amount}
                onChange={handleChange}
              />
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Per bulan"
                name="per_month"
                type="text"
                errors={errors.per_month}
                value={values.per_month}
                onChange={handleChange}
              /> */}
            </div>
            <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
              <LoadingButton
                loading={sending}
                type="submit"
                className="btn-indigo"
              >
                Tambah Penagihan
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
