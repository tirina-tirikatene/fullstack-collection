const API_URL = 'http:localhost:3000/api/vendors'

export const fetchVendors = async () => {
  try {
    const response = await fetch('/api/vendors');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json()
} catch (error) {
  console.error('Error fetching vendors:', error)
  throw error;
}};

export const addVendor = async (vendor) => { 
  try { const response = await fetch(API_URL, { 
    method: 'POST', 
    headers: { 'Content-Type': 'application/json',}, 
    body: JSON.stringify(vendor), 
    });
  if (!response.ok) { 
  throw new Error('Network response was not ok'); 
} return response.json(); 
} catch (error) { 
    console.error('Error adding vendor:', error); 
  throw error; 
 }}

export const deleteVendor = async (id) => {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
  } catch (error) {
    console.error('Error deleting vendor:', error)
    throw error;
  }
}