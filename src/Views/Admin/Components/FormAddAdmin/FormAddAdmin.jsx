import React, { useState } from "react";
import style from "./FormAddAdmin.module.css"
import { useForm } from "react-hook-form";
import Spinner from "react-bootstrap/Spinner";



const FormAddAdmin = ({handleCreateNewAdmin, loading}) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


  const onSubmit = async (dataFrom) =>{
    try {
      await handleCreateNewAdmin(dataFrom)
      console.log('fdsfasdfasdfadsf')
      reset();
    } catch (error) {
      console.log('sdafsdfasd')
      console.error("Error al crear un nuevo administrador:", error);
    }

  }


  return (
    <div className={`container-fluid`} style={{ padding: "1rem 2.4rem" }}>
 
      <div className={`row ${style.rowContainer}`}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`col-md-7 ${style.AddProductForm}`}
        >
          <h4 className="text-center">NEW ADMIN</h4>
          <label>
            <span>Name:</span>
            <input
              {...register("name", { required: true, maxLength: 100 })}
              placeholder="Juan Pablo"
            />
            {errors.name && (
              <span className={style.error}>This field is required</span>
            )}
          </label>

          <label>
            <span>Nick Name:</span>
            <input
              {...register("surname", { required: true, maxLength: 500 })}
              placeholder="Juanpi83"
            />
            {errors.description && (
              <span className={style.error}>This field is required</span>
            )}
          </label>

          <label>
            <span>Email:</span>
            <input 

        id='email'
        placeholder="Email" 
        {...register("email", { 
          required: "This field is required.",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "Invalid email address"
          }
        })} 
      />
      {errors.email && <span className={style.error}>{errors.email.message}</span>}
          </label>

          <label>
            <span>Password:</span>
            <input 
               type="password" 
               placeholder="Create a password"
        {...register('password', {
          required: 'This field is required',
          pattern: {
            value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%.*?&]{10,}$/,
            message: 'Use 1 uppercase, 1 number, 1 symbol, and a minimum of 10 characters'
          }
        })}
      />
      {errors.password && <span>{errors.password.message}</span>}
          </label>


          <button>
            {!loading ? (
              "Create New Admin"
            ) : (
              <Spinner animation="border" variant="light" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormAddAdmin;