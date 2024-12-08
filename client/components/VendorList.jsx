import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import VendorProfile from './VendorProfile';
import { deleteVendor, fetchVendors, updateVendor } from '../apis/api'
import { useState } from 'react';

const VendorList = () => {
  const queryClient = useQueryClient();
  const [editVendor, setEditVendor] = useState(null);
  const [editedVendor, setEditedVendor] = useState({});

  const { data, error, isLoading } = useQuery({
    queryKey: ['vendors'],
    queryFn: fetchVendors,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteVendor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] })
    }
  })

  const updateMutation = useMutation({
    mutationFn: updateVendor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] })
      setEditVendor(null);
    }
  })
  
  const handleDelete = (id) => {
    deleteMutation.mutate(id)
  }

  const handleEdit = (vendor) => {
    setEditVendor(vendor);
    setEditedVendor(vendor)
  }

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setEditedVendor({ ...editedVendor, [name]: value })
  }

  const handleUpdateSubmit = (e) => {
    e.preventDefault()
    updateMutation.mutate(editedVendor)
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {editVendor ? (
        <form onSubmit={handleUpdateSubmit}>
        <input 
          type="text"
          name="name"
          value={editedVendor.name}
          onChange={handleUpdateChange}
          required /> 
        <input type="text"
          name="location"
          value={editedVendor.location}
          onChange={handleUpdateChange} required />
        <input type="text"
          name="description"
          value={editedVendor.description}
          onChange={handleUpdateChange} required />
        <button type="submit">Update Vendor</button>
        <button type="button" onClick={() => setEditVendor(null)}>Cancel</button>
        </form>
        ) : (
      data && data.length > 0 ? (
        data.map(vendor => (
          <div key={vendor.id}>
          <VendorProfile vendor={vendor} />
          <button onClick={() => handleEdit(vendor)}>Edit</button>
          <button onClick={() => handleDelete(vendor.id)}>Delete</button>
          </div>
       ))
      ) : (
        <div>No vendors found</div>
      )
      )}
    </div>
  )
}

export default VendorList