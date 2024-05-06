import "./AddProductToDatabase.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { productsArray } from "../page";

export function AddProductToDatabase({
    newProductDisplay,
    setNewProductDisplay
}) {
    // Event to hide add new product modal
    const hideNewProductModal = ()=> {
        setNewProductDisplay({display:"none"});
    }

    // Event to add a new product to database
    const addNewProductToDatabase = () => {
        const new_product_name = document.getElementById("new_product_name");
        const new_product_measurement = document.getElementById("new_product_measurement");
        const new_product_quantity = document.getElementById("new_product_quantity");

        let newName = new_product_name.value;
        let newMeasurement = new_product_measurement.value;
        let newQuantity = new_product_quantity.value;

        // If nameless product, stop the process
        if(newName == "") {
            alert(`Por favor, escriba un nombre para el producto.`);
            return;
        }

        // Quantity has to be 0 or greater
        if(newQuantity < 0) {
            alert("Por favor, introduzca una cantidad mayor o igual a cero.");
            return;
        }

        // If product already exists, stop process
        let productExist = productsArray.find(item => item["name"] == newName);

        if(productExist) {
            alert(`El producto "${newName}" ya existe en la base de datos.`);
            return;
        }

        // Add product to database
        setDoc(doc(db, 'products', newName), {
            name: newName,
            measurement: newMeasurement,
            quantity: Number(newQuantity)
        });

        // Close modal
        hideNewProductModal();
    }

    return(
        <div className="add-modal" style={newProductDisplay}>
            <div>
                <p>Escriba el nombre del producto que desea agregar a la base de datos <span style={{color: "red"}}>(oblitatorio)</span>:</p>
                <p><input type="text" placeholder="Nombre del producto" id="new_product_name"></input></p>
                <p>Elija la unidad de medida del producto:</p>
                <p>
                    <select name="" id="new_product_measurement">
                        <option value="grs">grs.</option>
                        <option value="kg">kg.</option>
                        <option value="unidad(es)">unidad(es)</option>
                        <option value="lts">lts.</option>
                    </select>
                </p>
                <p>Ingrese cantidad de unidades del producto (opcional):</p>
                <p><input type="number" id="new_product_quantity"></input></p>
                <p>
                    <button id="new_product_btn" onClick={addNewProductToDatabase}>Agregar producto</button>
                </p>
                <p>
                    <button id="new_product_cancel" onClick={hideNewProductModal}>Cancelar</button>
                </p>
            </div>
        </div>
    );
}