import { useQuery } from '@tanstack/react-query';

const fetchVendors = async () => {
  const response = await fetch('/api/vendors');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  console.log('Fetched vendors:', data);
  return data
}

const VendorList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['vendors'],
    queryFn: fetchVendors,
  })

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data && data.length > 0 ? (
        data.map(vendor => (
        <li key={vendor.id}>
          <h2>{vendor.name}</h2>
          <p>Location: {vendor.location}</p>
          <p>Description: {vendor.description}</p>
        </li>
      ))
      ) : (
        <li>No vendors found</li>
      )}
    </ul>
  )
}

export default VendorList