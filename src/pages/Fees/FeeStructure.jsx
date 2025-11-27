import React from "react";

const feeData = [
  { className: "Class 1", monthly: 500, yearly: 6000 },
  { className: "Class 2", monthly: 600, yearly: 7200 },
  { className: "Class 3", monthly: 700, yearly: 8400 },
  { className: "Class 4", monthly: 800, yearly: 9600 },
  { className: "Class 5", monthly: 900, yearly: 10800 },
  { className: "Class 6", monthly: 1000, yearly: 12000 },
  { className: "Class 7", monthly: 1100, yearly: 13200 },
  { className: "Class 8", monthly: 1200, yearly: 14400 },
  { className: "Class 9", monthly: 1300, yearly: 15600 },
  { className: "Class 10", monthly: 1400, yearly: 16800 },
];

export default function FeeStructure(){
  return (
    <div className="form-card">
      <h2>Fees Structure</h2>
      <div className="fee-container">
        {feeData.map((f,i)=>(
          <div className="fee-box" key={i}>
            <h4>{f.className}</h4>
            <p>Monthly Fee: Rs {f.monthly}</p>
            <p>Yearly Fee: Rs {f.yearly}</p>
            <button className="btn">Pay Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}
