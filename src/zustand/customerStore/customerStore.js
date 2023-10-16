import { create } from "zustand"; // crear estados globales y actions
import zukeeper from 'zukeeper' //poder usar la extension de chrome para zustand("zustand dev-tools")
import axios from "axios";
import { format } from "date-fns";

// endpoints :
//  /customers POST body:{customer}

//  /customers/:id  PUT body:{customerID}

//  /customers/email/:mail GET params: {juampillin@gmail.com}

    
  
    export const customerStore = create(
      zukeeper((set) => ({
        allCustomers: [],
        currentCustomer: {}, // es undefined o talves se colocara el perfil de invitado
        authenticatedCustomer: null,
        
        createCustomer: async (customer) => {
          const fecha = customer.birthdate; 
          // Convierte el objeto Date en una cadena de fecha en formato "AAAA-MM-DD"
          // customer.birthdate= format(fecha, "yyyy-MM-dd");
          // console.log("creo el cusotmer ",customer);
          try {
              const response = await axios.post('https://ge3k-server.onrender.com/customers/', customer, {
                  headers: {
                      'Content-Type': 'application/json', // Indica que estás enviando datos en formato JSON
              },
            });
        
            // Verifica si la solicitud fue exitosa y obtén los datos de la respuesta
            if (response.status > 199 && response.status < 300) {
                const data = response.data;
            
                set((state) => ({
                ...state,
                currentCustomer: customer,
              }));
            } else {
                // Maneja el caso en el que la solicitud no fue exitosa
                console.error('La solicitud no fue exitosa:', response.status, response.statusText);
              }
            } catch (error) {
                // Maneja los errores de la solicitud
                console.error('Error al crear el cliente:', error);
              }
              customer.birthdate= fecha;// cambio otra vez el formato de la fecha para que no rompa todo
            },

        
            

            updateCustomer: async (customer,email) => {
              // Define la URL de la solicitud PUT
              const url = `https://ge3k-server.onrender.com/customers/email/${email}`;
              const fecha = customer.birthdate; 
              delete customer.createdAt;
              delete customer.email;
              delete customer.deletedAt;
              delete customer.id;
              delete customer.password;
              
              try {
                  // Realiza la solicitud PUT con los datos del cliente en el cuerpo
                // console.log(url, customerUp)
                const response = await axios.put(url, customer, {
                  headers: {
                    'Content-Type': 'application/json', // Indica que estás enviando datos en formato JSON
                  },
                });
                
                if (response.status === 200) {
                    // const data = response.data;
                
                    set((state) => ({
                    ...state,
                    currentCustomer: customer,
                  }));
                } else {
                    // Maneja el caso en el que la solicitud no fue exitosa
                    console.error('La solicitud no fue exitosa:', response.status, response.statusText);
                  }
                } catch (error) {
                    // Maneja los errores de la solicitud
                    console.error('Error al actualizar el cliente:', error);
                  }
                  customer.birthdate= fecha;// cambio otra vez el formato de la fecha para que no rompa todo
                },
      
        /*la action que sigue busca un customer en el back con su id*/      
        getAllCustomers: async () => {
          // console.log("entro a getallcustomer");
          try {
            const response = await axios.get(`https://ge3k-server.onrender.com/customers/`);
        
            if (response.status === 200) { // Cambiado de 201 a 200 para verificar si la respuesta es exitosa
              const { data } = response;
              // console.log("getallcustomer",data);
              set((state) => ({
                ...state,
                allCustomers: data,
              }));
            } 
            
          } catch (error) {
            console.error("Error obteniendo customer:", error);
          }
        },
        
        /*la action que sigue busca un customer en el back con su id*/      
        getCustomerByEmail: async (email) => {
          
          try {
            const response = await axios.get(`https://ge3k-server.onrender.com/customers/email/${email}`);
        
            if (response.status === 200) { // Cambiado de 201 a 200 para verificar si la respuesta es exitosa
              const { data } = response;
              set((state) => ({
                ...state,
                currentCustomer: data,
              }));
            } else {
              // Maneja el caso en el que el perfil no esté registrado
              console.error('El email no fue encontrado en la base de datos:');
              set((state) => ({
                ...state,
                currentCustomer: {},
              }));
            }
          } catch (error) {
            console.error("Error obteniendo customer:", error);
          }
        },  

        // Función para cargar los datos del usuario actual (autenticado)
        loadCurrentCustomer: (email) => {
          axios.get(`https://ge3k-server.onrender.com/customers/email/${email}`)
            .then((response) => {
              console.log("response");
              console.log(response);
              const customer = response.data;
              set({ authenticatedCustomer: customer });
            })
            .catch((error) => {
              console.error("Error loading customer:", error);
              set({ authenticatedCustomer: null });
            });
        },

  }))
);
window.store = customerStore;