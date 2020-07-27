export function filesize(size) {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    ' ' +
    ['B', 'kB', 'MB', 'GB', 'TB'][i]
  );
}

// Transforms key/value pairs to FormData() object
export function toFormData(values = {}, method = 'POST') {
  const formData = new FormData();
  for (const field of Object.keys(values)) {
    formData.append(field, values[field]);
  }

  // NOTE: When working with Laravel PUT/PATCH requests and FormData
  // you SHOULD send POST request and fake the PUT request like this.
  // More info: http://stackoverflow.com/q/50691938
  if (method.toUpperCase() === 'PUT') {
    formData.append('_method', 'PUT');
  }

  return formData;
}

export function tlFacility(facility) {
  switch (facility) {
    case 'AC':
      return 'AC';
    case 'Bed':
      return 'Kasur';
    case 'Bathroom':
      return 'KM dalam';
    case 'Furniture':
      return 'Perabotan';
    default:
      return null;
  }
}

export function currency(number, locale = 'id-ID', currency = 'IDR') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(number);
}