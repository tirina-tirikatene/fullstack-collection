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
      setVendor({ name: '', location: '', description: ''})
    }
  })

  const handleChange = (e) => { 
    const { name, value } = e.target;
    setVendor({ ...vendor, [name]: value });
};
const handleSubmit = (e) => {
  e.preventDefault();
  mutation.mutate(vendor)
}

return ( <form onSubmit={handleSubmit}>
  <label htmlFor="name">Name</label>
  <input id="name" type="text" name="name" placeholder="Name" value={vendor.name} onChange={handleChange} required />
  <label htmlFor="location">Location</label>
  <input id="location" type="text" name="location" placeholder="Location" value={vendor.location} onChange={handleChange} required />
  <label htmlFor="description">Description</label>
  <input id="description" type="text" name="description" placeholder="Description" value={vendor.description} onChange={handleChange} required />
  <button type="submit">Add Vendor</button>
  </form>
  );
}

export default VendorFormAdd