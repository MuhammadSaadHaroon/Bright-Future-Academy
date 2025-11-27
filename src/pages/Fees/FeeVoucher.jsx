import React from "react";

const voucherData = [
  { className: "Class 1", monthly: 500, yearly: 6000 },
  { className: "Class 2", monthly: 600, yearly: 7200 },
  // ... same as above
];

export default function FeeVoucher(){
  return (
    <div className="form-card">
      <h2>Fee Vouchers</h2>
      <div className="fee-container">
        {voucherData.map((v,i)=>(
          <div className="fee-box" key={i}>
            <h4>Fee Voucher - {v.className}</h4>
            <p>Monthly Fee: {v.monthly}</p>
            <p>Yearly Fee: {v.yearly}</p>
            <button className="btn">Pay Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}
