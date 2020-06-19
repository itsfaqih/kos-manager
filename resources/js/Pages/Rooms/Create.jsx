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
        number: '',
        length: '',
        width: '',
        facilities: '',
        cost_per_month: '',
        
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
        Inertia.post(route('rooms.store'), values).then(() => {
            setSending(false);
        });
    }

    return ( <Layout >
        <Helmet title = "Create Room" / >
        <div>
        <h1 className = "mb-8 text-3xl font-bold" >
        <InertiaLink href = { route('rooms') } className = "text-indigo-600 hover:text-indigo-700" > Rooms </InertiaLink> 
        <span className = "font-medium text-indigo-600" > /</span > Create </h1> 
        <div className = "max-w-3xl overflow-hidden bg-white rounded shadow" >
        <form onSubmit = { handleSubmit } >
        <div className = "flex flex-wrap p-8 -mb-8 -mr-6" >
        <TextInput className = "w-full pb-8 pr-6 lg:w-1/2" label = "Number" name = "number" errors = { errors.number } value = { values.number } onChange = { handleChange }/> 
        <TextInput className = "w-full pb-8 pr-6 lg:w-1/2" label = "length" name = "length" type = "text" errors = { errors.length } value = { values.length } onChange = { handleChange }/>
        <TextInput className = "w-full pb-8 pr-6 lg:w-1/2" label = "width"  name = "width" type = "text" errors = { errors.width } value = { values.width } onChange = { handleChange }/>
        <TextInput className = "w-full pb-8 pr-6 lg:w-1/2" label = "Facilities" name = "facilities" type = "text" errors = { errors.facilities } value = { values.facilities } onChange = { handleChange }/> 
        <TextInput className = "w-full pb-8 pr-6 lg:w-1/2" label = "Cost Per Month" name = "cost_per_month" type = "text" errors = { errors.cost_per_month } value = { values.cost_per_month } onChange = { handleChange }/> 
        </div> 
        <div className = "flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200" >
        <LoadingButton loading = { sending } type = "submit" className = "btn-indigo">Create Rooms </LoadingButton> 
        </div> 
        </form> 
        </div> 
        </div> 
        </Layout>
    );
};