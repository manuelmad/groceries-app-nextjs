import "./UpdateShoppingList.css";
import { shores_list } from "../page";
import { productsArray } from "../page";

// import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
// import { db } from "../firebase/firebase-config";

// const div = document.querySelector('.quantity-modal');

// export const updateShoppingList = (event)=> {
//     const currentValue = event.target.value;
//     const div = document.querySelector('.quantity-modal');

// 	// Stop the process if the first option (default) is selected
// 	if(currentValue == "default") {
// 		return;
// 	}

// 	div.innerHTML = "";

// 	let div2 = document.createElement('div');

// 	let p = document.createElement('p');
// 	p.innerHTML = `Por favor, indique la cantidad de <span>${currentValue}</span> que desea comprar:</br>`;

// 	let p2 = document.createElement('p');

// 	let input = document.createElement('input');
// 	input.setAttribute('type', 'number');

// 	let span = document.createElement('span');
// 	span.innerHTML = `${productsArray.find(item => item.name == currentValue)["measurement"]}.`;

// 	let button = document.createElement('button');
// 	button.innerText = "Añadir";

// 	button.addEventListener('click', async ()=> {
// 		let quantity = input.value;

// 		if(quantity <= 0) {
// 			alert("Por favor, introduzca una cantidad mayor a cero.");
// 			return;
// 		}

// 		// Asign the product to update
// 		let productToUpdate = productsArray.find(item => item["name"] == currentValue);
// 		// console.log(productToUpdate);

// 		// Give a new value to quantity so the database is updated
// 		await updateDoc(doc(db, 'products', productToUpdate["name"]), {
// 			quantity: quantity
// 		});

// 		setQuantityModalDisplay({display:"none"});
// 	});

// 	let button_cancel = document.createElement('button');
// 	button_cancel.innerText = "Cancelar";

// 	button_cancel.addEventListener('click', ()=> {
// 		// hideQuantityModal();
//         setQuantityModalDisplay({display:"none"});
// 	});

// 	p2.appendChild(input);
// 	p2.appendChild(span);
// 	p2.appendChild(button);
// 	p2.appendChild(button_cancel);
// 	div2.appendChild(p);
// 	div2.appendChild(p2);
// 	div.appendChild(div2);

// 	// showQuantityModal();
//     // setQuantityModalDisplay({display:"flex"});
// }

export function UpdateShoppingList({quantityModalDisplay,
    setQuantityModalDisplay,
    currentValue,
    setCurrentValue,
    selectedProduct,
    setSelectedProduct
}) {
    const hideQuantityModal = () => {
        setQuantityModalDisplay({display:"none"});
    }

    // let measurement = selectedProduct.measurement;

    const addProductToShoppingList = ()=> {
        const quantity_input = document.getElementById("quantity_input");
        let quantity = quantity_input.value;
    
        if(quantity <= 0) {
            alert("Por favor, introduzca una cantidad mayor a cero.");
            return;
        }

        // Asign the product to update
        let productToUpdate = productsArray.find(item => item["name"] == currentValue);
        // console.log(productToUpdate);

        // Give a new value to quantity so the database is updated
        updateDoc(doc(db, 'products', productToUpdate["name"]), {
            quantity: quantity
        });

        hideQuantityModal();
    }

    // const showQuantityModal = () => {
    //     setQuantityModalDisplay({display:"flex"});
    // }

    // const updateShoppingList = (event) => {
    //     const currentValue = event.target.value;
    //     const div = document.querySelector('.quantity-modal');
    
    //     // Stop the process if the first option (default) is selected
    //     if(currentValue == "default") {
    //         return;
    //     }
    
    //     div.innerHTML = "";
    
    //     let div2 = document.createElement('div');
    
    //     let p = document.createElement('p');
    //     p.innerHTML = `Por favor, indique la cantidad de <span>${currentValue}</span> que desea comprar:</br>`;
    
    //     let p2 = document.createElement('p');
    
    //     let input = document.createElement('input');
    //     input.setAttribute('type', 'number');
    
    //     let span = document.createElement('span');
    //     span.innerHTML = `${productsArray.find(item => item.name == currentValue)["measurement"]}.`;
    
    //     let button = document.createElement('button');
    //     button.innerText = "Añadir";
    
    //     button.addEventListener('click', async ()=> {
    //         let quantity = input.value;
    
    //         if(quantity <= 0) {
    //             alert("Por favor, introduzca una cantidad mayor a cero.");
    //             return;
    //         }
    
    //         // Asign the product to update
    //         let productToUpdate = productsArray.find(item => item["name"] == currentValue);
    //         // console.log(productToUpdate);
    
    //         // Give a new value to quantity so the database is updated
    //         await updateDoc(doc(db, 'products', productToUpdate["name"]), {
    //             quantity: quantity
    //         });
    
    //         hideQuantityModal();
    //     });
    
    //     let button_cancel = document.createElement('button');
    //     button_cancel.innerText = "Cancelar";
    
    //     button_cancel.addEventListener('click', ()=> {
    //         hideQuantityModal();
    //     });
    
    //     p2.appendChild(input);
    //     p2.appendChild(span);
    //     p2.appendChild(button);
    //     p2.appendChild(button_cancel);
    //     div2.appendChild(p);
    //     div2.appendChild(p2);
    //     div.appendChild(div2);
    
    //     // showQuantityModal();
    //     setQuantityModalDisplay({display:"flex"});
    // }


    return(
        <div className="quantity-modal"  style={quantityModalDisplay}>
            <div>
                <p>Por favor, indique la cantidad de <span>{currentValue}</span> que desea comprar:</p>
                <p>
                    <input type="number" id="quantity_input"></input>
                    <span>{selectedProduct.measurement}.</span>
                    <button onClick={addProductToShoppingList}>Añadir</button>
                    <button onClick={hideQuantityModal}>Cancelar</button>
                </p>
            </div>
	    </div>
    );
}