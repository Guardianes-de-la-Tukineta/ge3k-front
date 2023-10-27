import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { customerStore } from "../../zustand/customerStore/customerStore";
import { PurchaseStore } from "../../zustand/PurchaseOrder/PurchaseStore";
import style from "./FormPurchase.module.css";
import logo from "../../Images/FavicoinGe3k.png";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const FormPurchaseOrder = () => {
  const { loadCurrentCustomer, authenticatedCustomer, updateCustomer } =
    customerStore(); // Agrega la función updateCustomer
  const { user, isAuthenticated } = useAuth0();
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    address: "",
    email: "",
    birthdate: "",
    phone: "",
  });
  const { CreatedOrder } = PurchaseStore();

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user.email) {
      loadCurrentCustomer(user.email);
    }
  }, [isAuthenticated, user.email]);

  useEffect(() => {
    if (authenticatedCustomer) {
      setUserData(authenticatedCustomer);
    }
  }, [authenticatedCustomer]);

  const handleCreatePurchaseOrder = () => {
    CreatedOrder({
      customerId: authenticatedCustomer.id,
      base_url: "https://ge3k-client-team.vercel.app",
      name: userData.name,
      surname: userData.surname,
      birthdate: userData.birthdate,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
      status: "",
    });
  };

  const handleToggleEdit = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updatedData = {
        phone: userData.phone,
        address: userData.address,
      };

      if (isEditingAddress) {
        updatedData.address = userData.address;
      }

      if (isEditingPhone) {
        updatedData.phone = userData.phone;
      }

      updateCustomer(updatedData, authenticatedCustomer.email);

      Swal.fire({
        title: "Success",
        text: "Your data has been updated successfully",
        icon: "success",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }

    setIsEditing(!isEditing);
    setIsEditingAddress(false); // Restablece el estado de edición de dirección
    setIsEditingPhone(false); // Restablece el estado de edición de teléfono
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <div className="row mb-3">
      <form className={`col-8 ${style.form}`}>
        <div className="row mb-2">
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor="name" className={` ${style.formLabel}`}>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={userData.name}
                readOnly
                className="form-control"
                style={{ fontWeight: "700", color: "#636161" }}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="address" className={` ${style.formLabel}`}>
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={userData.address}
                readOnly={!isEditing}
                onChange={handleInputChange}
                className={`form-control ${
                  isEditing ? style.editable : style.non_editable
                }`}
                style={{ fontWeight: "700" }}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email" className={`${style.formLabel}`}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                readOnly
                className="form-control"
                style={{ fontWeight: "700", color: "#636161" }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor="surname" className={` ${style.formLabel}`}>
                Surname
              </label>
              <input
                type="text"
                id="surname"
                name="surname"
                value={userData.surname}
                readOnly
                className="form-control"
                style={{ fontWeight: "700", color: "#636161" }}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="phone" className={` ${style.formLabel}`}>
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={userData.phone}
                readOnly={!isEditing}
                onChange={handleInputChange}
                className={`form-control ${
                  isEditing ? style.editable : style.non_editable
                }`}
                style={{ fontWeight: "700" }}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="birthdate" className={` ${style.formLabel}`}>
                Birthdate
              </label>
              <input
                type="birthdate"
                id="birthdate"
                name="birthdate"
                value={userData.birthdate}
                readOnly
                className="form-control"
                style={{ fontWeight: "700", color: "#636161" }}
              />
            </div>
          </div>
        </div>
        <div className="col-12 text-end ">
          <button
            className={isEditing ? style.buttonSave : style.buttonEdit}
            onClick={handleToggleEdit}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
      </form>
      <div className="col-md-2 mx-5">
        <Link to="/">
          <img className={style.logo} src={logo} alt="" />
        </Link>
      </div>
      <div className="col-12 text-end ">
        <button
          className={style.buttonConfirm}
          onClick={handleCreatePurchaseOrder}
        >
          Pay
        </button>
      </div>
    </div>
  );
};

export default FormPurchaseOrder;
