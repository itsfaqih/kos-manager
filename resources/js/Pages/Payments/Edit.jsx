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
  const { errors, payment, invoices } = usePage();
  const [sending, setSending] = useState(false);

  const [values, setValues] = useState({
    description: payment.description || '',
    amount: payment.amount || '',
    invoice_id: payment.invoice_id || ''
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
      route('payments.update', payment.id),
      values
    ).then(() => setSending(false));
  }

  function destroy() {
    if (confirm('Apa anda yakin ingin menghapus data pembayaran ini?')) {
      Inertia.delete(route('payments.destroy', payment.id));
    }
  }

  function restore() {
    if (confirm('Apa anda yakin ingin memulihkan data pembayaran ini?')) {
      Inertia.put(route('payments.restore', payment.id));
    }
  }

  return (
    <Layout>
      <Helmet title={`Pembayaran Penagihan #${payment.id}`} />
      <div>
        <h1 className="mb-8 text-3xl font-bold">
          <InertiaLink
            href={route('payments.index')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Pembayaran
          </InertiaLink>
          <span className="mx-2 font-medium text-indigo-600">/</span>
          {`Penagihan #${payment.invoice_id}`}
        </h1>
        {payment.deleted_at && (
          <TrashedMessage onRestore={restore}>
            Data pembayaran ini telah dihapus.
          </TrashedMessage>
        )}
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
            <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
              {!payment.deleted_at && (
                <DeleteButton onDelete={destroy}>
                  Hapus Pembayaran
                </DeleteButton>
              )}
              <LoadingButton
                loading={sending}
                type="submit"
                className="ml-auto btn-indigo"
              >
                Perbarui Pembayaran
              </LoadingButton>
            </div>
          </form>
        </div>
        {/* <h2 className="mt-12 text-2xl font-bold">Contacts</h2>
        <div className="mt-6 overflow-x-auto bg-white rounded shadow">
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="font-bold text-left">
                <th className="px-6 pt-5 pb-4">Name</th>
                <th className="px-6 pt-5 pb-4">City</th>
                <th className="px-6 pt-5 pb-4" colSpan="2">
                  Phone
                </th>
              </tr>
            </thead>
            <tbody>
              {payment.contacts.map(
                ({ id, name, phone, city, deleted_at }) => {
                  return (
                    <tr
                      key={id}
                      className="hover:bg-gray-100 focus-within:bg-gray-100"
                    >
                      <td className="border-t">
                        <InertiaLink
                          href={route('contacts.edit', id)}
                          className="flex items-center px-6 py-4 focus:text-indigo"
                        >
                          {name}
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
                          href={route('contacts.edit', id)}
                          className="flex items-center px-6 py-4 focus:text-indigo"
                        >
                          {city}
                        </InertiaLink>
                      </td>
                      <td className="border-t">
                        <InertiaLink
                          tabIndex="-1"
                          href={route('contacts.edit', id)}
                          className="flex items-center px-6 py-4 focus:text-indigo"
                        >
                          {phone}
                        </InertiaLink>
                      </td>
                      <td className="w-px border-t">
                        <InertiaLink
                          tabIndex="-1"
                          href={route('contacts.edit', id)}
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
              {payment.contacts.length === 0 && (
                <tr>
                  <td className="px-6 py-4 border-t" colSpan="4">
                    No contacts found.
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
