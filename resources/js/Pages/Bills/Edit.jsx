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
  const { errors, bill } = usePage();
  const [sending, setSending] = useState(false);

  const [values, setValues] = useState({
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
    if (confirm('Are you sure you want to delete this renter?')) {
      Inertia.delete(route('bills.destroy', bill.id));
    }
  }

  function restore() {
    if (confirm('Are you sure you want to restore this renter?')) {
      Inertia.put(route('bills.restore', bill.id));
    }
  }

  return (
    <Layout>
      <Helmet title={values.name} />
      <div>
        <h1 className="mb-8 text-3xl font-bold">
          <InertiaLink
            href={route('bill.index')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Bills
          </InertiaLink>
          <span className="mx-2 font-medium text-indigo-600">/</span>
          {values.name}
        </h1>
         {bill.deleted_at && (
           <TrashedMessage onRestore={restore}>
             This renter has been deleted.
           </TrashedMessage>
        )}
        <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
          <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap p-8 -mb-8 -mr-6">
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="name"
                name="name"
                errors={errors.name}
                value={values.name}
                onChange={handleChange}
              />
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="description"
                name="description"
                errors={errors.description}
                value={values.description}
                onChange={handleChange}
              />
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="amount"
                name="amount"
                type="text"
                errors={errors.amount}
                value={values.amount}
                onChange={handleChange}
              />
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="per_month"
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
                  Delete Bill
                </DeleteButton>
              )}
              <LoadingButton
                loading={sending}
                type="submit"
                className="ml-auto btn-indigo"
              >
                Update Bill
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
