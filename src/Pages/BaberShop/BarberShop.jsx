import React from 'react';
import Barber from "../../Components/Table/Barber"
import './style.css';

const OrderDetail = () => {
  return (
    <>
    <div className="content d-flex justify-content-center align-items-center flex-column vh-100">
      <div className="box">
        <Barber />
      </div>
    </div>
    </>
  )
}

export default OrderDetail