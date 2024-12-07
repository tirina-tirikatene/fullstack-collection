import React from "react";

const VendorProfile = ({ vendor }) => {
  return (
    <div className="vendor-profile">
      <h2>{vendor.name}</h2>
      <p>Location: {vendor.location}</p>
      <p>Description: {vendor.description}</p>
    </div>
  )
}

export default VendorProfile