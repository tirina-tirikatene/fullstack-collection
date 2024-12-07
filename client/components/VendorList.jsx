import { useQuery } from '@tanstack/react-query';
import VendorProfile from './VendorProfile';
import { fetchVendors } from '../apis/api'

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
          <VendorProfile key={vendor.id} vendor={vendor} />
      //   <li key={vendor.id}>
      //     <h2>{vendor.name}</h2>
      //     <p>Location: {vendor.location}</p>
      //     <p>Description: {vendor.description}</p>
      //   </li>
       ))
      ) : (
        <li>No vendors found</li>
      )}
    </ul>
  )
}

export default VendorList