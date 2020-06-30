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
  const { errors, bill, lodgings } = usePage();
  const [sending, setSending] = useState(false);

  const [values, setValues] = useState({
    lodging_id: bill.lodging_id || '',
    name: bill.name || '',
    description: bill.description || '',
    amount: bill.amount || '',
    per_month: bill.per_month || ''
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
      route('bills.update', bill.id),
      values
    ).then(() => setSending(false));
  }

  function destroy() {
    if (confirm('Apa anda yakin ingin menghapus data tagihan ini?')) {
      Inertia.delete(route('bills.destroy', bill.id));
    }
  }

  function restore() {
    if (confirm('Apa anda yakin ingin memulihkan data tagihan ini?')) {
      Inertia.put(route('bills.restore', bill.id));
    }
  }

  return (
    <Layout>
      <Helmet title={values.name} />
      <div>
        <h1 className="mb-8 text-3xl font-bold">
          <InertiaLink
            href={route('bills.index')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Tagihan
          </InertiaLink>
          <span className="mx-2 font-medium text-indigo-600">/</span>
          {values.name}
        </h1>
         {bill.deleted_at && (
           <TrashedMessage onRestore={restore}>
             Data Tagihan ini telah dihapus.
           </TrashedMessage>
        )}
        <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
          <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap p-8 -mb-8 -mr-6">
              <SelectInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Penginapan"
                name="lodging_id"
                errors={errors.lodging_id}
                value={values.lodging_id}
                onChange={handleChange}
              >
                <option value="" disabled>Pilih Penginapan</option>
                  {
                    lodgings.map((lodging, index) => (
                      <option key={index} value={lodging.id}>{lodging.id}</option>
                    ))
                  }
              </SelectInput>
              <TextInput
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
                label="Per Bulan"
                name="per_month"
                type="text"
                errors={errors.per_month}
                value={values.per_month}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
              {!bill.deleted_at && (
                <DeleteButton onDelete={destroy}>
                  Hapus Tagihan
                </DeleteButton>
              )}
              <LoadingButton
                loading={sending}
                type="submit"
                className="ml-auto btn-indigo"
              >
                Perbarui Tagihan
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
