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
  const { errors, lodging } = usePage();
  const [sending, setSending] = useState(false);

  const [values, setValues] = useState({
    room_id: lodging.room_id || '',
    renter_id: lodging.renter_id || '',
    start_at: lodging.start_at || '',
    end_at: lodging.end_at || ''
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
      route('lodgings.update', lodging.id),
      values
    ).then(() => setSending(false));
  }

  function destroy() {
    if (confirm('Are you sure you want to delete this lodging?')) {
      Inertia.delete(route('lodgings.destroy', lodging.id));
    }
  }

  function restore() {
    if (confirm('Are you sure you want to restore this lodging?')) {
      Inertia.put(route('lodgings.restore', lodging.id));
    }
  }

  return (
    <Layout>
      <Helmet title={`Lodging Room #${values.room_id} - Renter #${values.renter_id}`} />
      <div>
        <h1 className="mb-8 text-3xl font-bold">
          <InertiaLink
            href={route('lodgings.index')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Lodgings
          </InertiaLink>
          <span className="mx-2 font-medium text-indigo-600">/</span>
          {`Room #${values.room_id} - Renter #${values.renter_id}`}
        </h1>
        {lodging.deleted_at && (
          <TrashedMessage onRestore={restore}>
            This lodging has been deleted.
          </TrashedMessage>
        )}
        <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap p-8 -mb-8 -mr-6">
            <SelectInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Renter"
                name="renter_id"
                errors={errors.renter_id}
                value={values.renter_id}
                onChange={handleChange}
              >
                <option value=""></option>
                <option value="CA">Canada</option>
                <option value="US">United States</option>
              </SelectInput>
              <SelectInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Room"
                name="room_id"
                errors={errors.room_id}
                value={values.room_id}
                onChange={handleChange}
              >
                <option value=""></option>
                <option value="CA">Canada</option>
                <option value="US">United States</option>
              </SelectInput>
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Start at"
                name="start_at"
                errors={errors.start_at}
                value={values.start_at}
                onChange={handleChange}
              />
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="End at"
                name="end_at"
                errors={errors.end_at}
                value={values.end_at}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
              {!lodging.deleted_at && (
                <DeleteButton onDelete={destroy}>
                  Delete Lodging
                </DeleteButton>
              )}
              <LoadingButton
                loading={sending}
                type="submit"
                className="ml-auto btn-indigo"
              >
                Update Lodging
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
              {lodging.contacts.map(
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
              {lodging.contacts.length === 0 && (
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
