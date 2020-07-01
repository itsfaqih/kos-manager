import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import SelectInput from '@/Shared/SelectInput';

export default () => {
  const { errors, invoices } = usePage();
  const [sending, setSending] = useState(false);

  const [values, setValues] = useState({
    description: '',
    amount: '',
    invoice_id: ''
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
    Inertia.post(route('payments.store'), values).then(() => {
      setSending(false);
    });
  }

  return (
    <Layout>
      <Helmet title="Create Payment" />
      <div>
        <h1 className="mb-8 text-3xl font-bold">
          <InertiaLink
            href={route('payments.index')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Pembayaran
          </InertiaLink>
          <span className="font-medium text-indigo-600"> /</span> Buat
        </h1>
        <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap p-8 -mb-8 -mr-6">
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Keterangan"
                name="description"
                errors={errors.description}
                value={values.description}
                onChange={handleChange}
              />
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Jumlah"
                name="amount"
                type="number"
                errors={errors.amount}
                value={values.amount}
                onChange={handleChange}
              />
              <SelectInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Penagihan"
                name="invoice_id"
                errors={errors.invoice_id}
                value={values.invoice_id}
                onChange={handleChange}
              >
                <option value="" disabled>Pilih Penagihan</option>
                  {
                    invoices.map((invoice) => (
                      <option key={invoice.id} value={invoice.id}>{invoice.id} - {invoice.created_at}</option>
                    ))
                  }
              </SelectInput>
            </div>
            <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
              <LoadingButton
                loading={sending}
                type="submit"
                className="btn-indigo"
              >
                Tambah Pembayaran
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
