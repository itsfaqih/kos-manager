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
  const { errors, invoice, bills } = usePage();
  const [sending, setSending] = useState(false);

  const [values, setValues] = useState({
    bill_id: invoice.bill_id || ''
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
    Inertia.put(route('invoices.update', invoice.id), values).then(() =>
      setSending(false)
    );
  }

  function destroy() {
    if (confirm('Apa anda yakin ingin menghapus data penagihan ini?')) {
      Inertia.delete(route('invoices.destroy', invoice.id));
    }
  }

  function restore() {
    if (confirm('Apa anda yakin ingin memulihkan data penagihan ini?')) {
      Inertia.put(route('invoices.restore', invoice.id));
    }
  }

  return (
    <Layout>
      <Helmet title={invoice.bill_id.name} />
      <div>
        <h1 className="mb-8 text-3xl font-bold">
          <InertiaLink
            href={route('invoices.index')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Penagihan
          </InertiaLink>
          <span className="mx-2 font-medium text-indigo-600">/</span>
          {values.name}
        </h1>
        {invoice.deleted_at && (
          <TrashedMessage onRestore={restore}>
            Data Penagihan ini telah dihapus.
          </TrashedMessage>
        )}
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
                  Pilih Bill
                </option>
                {bills.map((bill, index) => (
                  <option key={index} value={bill.id}>
                    {bill.name}
                  </option>
                ))}
              </SelectInput>
            </div>
            <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
              {!invoice.deleted_at && (
                <DeleteButton onDelete={destroy}>Hapus Penagihan</DeleteButton>
              )}
              <LoadingButton
                loading={sending}
                type="submit"
                className="ml-auto btn-indigo"
              >
                Perbarui Penagihan
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
