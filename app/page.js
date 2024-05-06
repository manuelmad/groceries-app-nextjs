'use client';
import Image from "next/image";

import { useEffect } from "react";
import { useState } from "react";

import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase/firebase-config";

import { AddProductToDatabase } from "./AddProductToDatabase/AddProductToDatabase.js";
import { UpdateShoppingList } from "./UpdateShoppingList/UpdateShoppingList";

// Icon to delete a product from the shopping list
const x_icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
</svg>`;

// Array with all products in data base
export let productsArray = [];

// Function to add all products to the dropdown list and show the products with quantity > 0 in the shopping list
function addProductsToList(data) {
  // Clean the list ul, array of products and the showed list
  selection_list.innerHTML = "";
  productsArray = [];
  shores_list.innerHTML = "";

  // Adding a default option to the select so it's the first one to see
  let defaultOption = document.createElement('option');
  defaultOption.innerText = "--------";
  defaultOption.value = "default";
  shores_list.appendChild(defaultOption);

  // Add an option to the select for every document in the database
  data.forEach(item => {
    const product = item.data();
    // console.log(product["name"]);

    productsArray.push(product);

    let option = document.createElement('option');
    option.innerText = product["name"];
    option.value = product["name"];

    shores_list.appendChild(option);

    // Show only products with quantity > 0
    if(product["quantity"] > 0) {
      let li = document.createElement("li");
      li.innerHTML = `<span class="red-font">${product["quantity"]}</span><span>${product["measurement"]} de ${product["name"].toLowerCase()}.</span>`;

      let span_x = document.createElement('span');
      span_x.setAttribute('class', 'x-button__container');
      span_x.innerHTML = x_icon;

      span_x.addEventListener('click', async ()=> {
        // Asign the product to delete
        let productToDelete = productsArray.find(item => item["name"] == option.innerText);
        // console.log(productToDelete);

        // Give 0 to quantity so the database is updated and this product no longer will be visible
        await updateDoc(doc(db, 'products', productToDelete["name"]), {
          quantity: 0
        });
      });

      li.appendChild(span_x);
      selection_list.appendChild(li);
    }
  });
}


export default function Home() {
  const [newProductDisplay, setNewProductDisplay] = useState({display:"none"});
  const [quantityModalDisplay, setQuantityModalDisplay] = useState({display:"none"});
  const [currentValue, setCurrentValue] = useState('default');
  const [selectedProduct, setSelectedProduct] = useState({});
  // Accesing elements on DOM
  // const shores_list = document.getElementById('shores_list');
  // const div = document.querySelector('.quantity-modal');
  // const selection_list = document.getElementById("selection_list");

  // Event to show add new product modal
  const selectProductEvent = (event) => {
    setCurrentValue(event.target.value);
    setSelectedProduct(productsArray.find(item => item["name"] == event.target.value));
    setQuantityModalDisplay({display:"flex"});
  }

  // Event to show add new product modal
  const addProductButtonEvent = () => {
    setNewProductDisplay({display:"flex"});
  }

  useEffect(()=> {
    // Get the collection 'products' from firebase
    const productsCollection = collection(db, 'products');

    // Listen to the current collection and get changes everytime a document is updated, created or deleted to update the dropdown list and the shopping list
    onSnapshot(productsCollection, (snapshot)=>{
      addProductsToList(snapshot.docs);
    });

  },[]);

  return (
    <>
      <p className="imgs-container">
        <Image
          className="banana-img"
          src="/imgs/platano-removebg-preview.png"
          alt="banana img"
          width={663}
          height={376}    
        />
        <Image
          className="tomato-img"
          src="/imgs/tomate.png"
          alt="tomato img"
          width={512}
          height={512}    
        />
      </p>
      <main>
        <section className="list-section">
          <article>
            <div>
              <h1>GROCERIES APP</h1>
              <p>
                <span>Elige un producto:</span>
                <select id="shores_list" value={currentValue} onChange={selectProductEvent}></select>
              </p>
            </div>
          </article>
        </section>
        <section className="selection-section">
          <article>
            <div>
              <h2>Lista de Compras</h2>
              <ul id="selection_list">
                
              </ul>
            </div>
          </article>
        </section>
        <section className="add-product__section">
          <Image
            className="cheese-img"
            src="/imgs/queso.png"
            alt="cheese img"
            width={960}
            height={960}    
          />
          <article>
            <div>
              <p>
                <button id="add_product_btn" onClick={addProductButtonEvent}>Agregar producto a la base de datos</button>
              </p>
            </div>
          </article>
        </section>
    </main>
    <UpdateShoppingList
      quantityModalDisplay = {quantityModalDisplay}
      setQuantityModalDisplay={setQuantityModalDisplay}
      currentValue={currentValue}
      setCurrentValue={setCurrentValue}
      selectedProduct={selectedProduct}
      setSelectedProduct={setSelectedProduct}
    />
    <AddProductToDatabase
      newProductDisplay = {newProductDisplay}
      setNewProductDisplay = {setNewProductDisplay}
    />
  </>
  );
}
