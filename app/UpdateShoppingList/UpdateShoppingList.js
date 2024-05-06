import "./UpdateShoppingList.css";
import { productsArray } from "../page";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

export function UpdateShoppingList({
    quantityModalDisplay,
    setQuantityModalDisplay,
    currentValue,
    setCurrentValue,
    selectedProduct,
    setSelectedProduct
}) {
    const hideQuantityModal = () => {
        setQuantityModalDisplay({display:"none"});
    }

    const addProductToShoppingList = ()=> {
        const quantity_input = document.getElementById("quantity_input");
        let quantity = quantity_input.value;
    
        if(quantity <= 0) {
            alert("Por favor, introduzca una cantidad mayor a cero.");
            return;
        }

        // Asign the product to update
        let productToUpdate = productsArray.find(item => item["name"] == currentValue);

        // Give a new value to quantity so the database is updated
        updateDoc(doc(db, 'products', productToUpdate["name"]), {
            quantity: quantity
        });

        hideQuantityModal();
    }

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