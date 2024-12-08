import React, { useState } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addVendor } from '../apis/api'

const VendorFormAdd = () => {
  const [vendor, setVendor] = useState({ name: '', location: '', description: ''})
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addVendor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors']})
    }
  })

  const handleChange = (e) => { 
    const { name, value } = e.target;
    setVendor({ ...vendor, [name]: value });
};
const handleSubmit = (e) => {
  e.preventDefault();
  mutation.mutate(vendor)
  setVendor({ name: '', location: '', description: '' })
}

return ( <form onSubmit={handleSubmit}>
  <input type="text" name="name" placeholder="Name" value={vendor.name} onChange={handleChange} required />
  <input type="text" name="location" placeholder="Location" value={vendor.location} onChange={handleChange} required />
  <input type="text" name="description" placeholder="Description" value={vendor.description} onChange={handleChange} required />
  <button type="submit">Add Vendor</button>
  </form>
  );
}

export default VendorFormAdd