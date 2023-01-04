import React, {useState} from 'react';
import {Product} from "../types/types"
import './Admin.css';
import {v4 as uuidv4} from 'uuid';


interface Props {
  submitAddProduct: (new_product:Product) => any;
}


const  ProductForm:React.FC <Props> = (props) => {
  const {submitAddProduct} = props;

  const getNewProdObj = () :Product => {
      //let newUUIDString = uuidv4().toString();

      return {
        product_id: null,
        name: "",
        image_url: "",
        description: "", 
        price: 0.00, 
        inventory: 10
      }
  }
  
  const [newProd, setNewProd] = useState<Product>(getNewProdObj());
  

  const handleChange = (fieldName: string, fieldValue: string | number): void => {
    console.log(`HandleChange: ${fieldName} ${fieldValue}`)
    setNewProd({
      ...newProd,
      [fieldName]: fieldValue
    })
  };

  const handleClick = ():void => {
      submitAddProduct(newProd)

      // reset the form
      setNewProd(getNewProdObj())
      // bit of a cheat - a bit of JSQuery - clear page fields
      Array.from(document.querySelectorAll('input')).forEach(node => {
        node.value=""
      })
  }


  return (
    <div>

        <div className="prod-form-display">
            <div>Name: {newProd.name}</div>
            <div>Price: {newProd.price}</div>
            <div>Inventory: {newProd.inventory}</div>
            <div>ImageURL: {newProd.image_url}</div>
            <div>Description: {newProd.description}</div>
        </div>
        {/*  updates newProd directly  - can do it both ways*/}
        <div className="prod-form">
            <div className="prod-input-field">
                <input 
                    type="text"
                    placeholder="Name"
                    onChange={event => {
                        setNewProd({
                          ...newProd,
                          ["name"]: event.target.value
                        });

                    }}
                />
            </div>

            <div className="prod-input-field">
              <input 
                  type="text"
                  name="price"
                  placeholder="Price"
                  onChange = {event => {handleChange(event.target.name, parseFloat(event.target.value)) }}
              />
            </div>

            <div className="prod-input-field">
              <input 
                  type="text"
                  name="inventory"
                  placeholder="Inventory"
                  onChange = {event => {handleChange(event.target.name, parseInt(event.target.value)) }}
              />
            </div>

            <div className="prod-input-field">
              <input 
                  type="text"
                  placeholder="Image Url"
                  name="image_url"
                  onChange = {event => {handleChange(event.target.name, event.target.value) }}
              />
            </div>

            <div className="prod-input-field">
              <textarea 
                  placeholder="Description"
                  name="description"
                  onChange = {event => {handleChange(event.target.name, event.target.value) }}
              />
            </div>


        </div>
        <button onClick={handleClick}>Add</button>
        
    </div>
  );
}

export default ProductForm;


// if sending entire event
//const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {


//   <div className="prod-input-field">
//   <select 
//         name="us_state"
//         onChange = {event => {handleChange(event.target.name, event.target.value) }}
//   >

//      {   stateOptions.map(state => <option key={state} value={state}>{state}</option>   )}
         
//   </select>
// </div>








// onChange = {handleChange}
// onChange = {(event) => {handleChange(event)}}
//   onChange={event => {
//     setNewProd({
//       ...newProd,
//       ["price"]: parseFloat(event.target.value)
//     });
// }}
// <button onClick={handleClick}>Add</button>


// {   stateOptions.forEach(state => {

//   <option value={state}>{state}</option>
//  )
// })

// }
