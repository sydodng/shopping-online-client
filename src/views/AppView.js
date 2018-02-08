
import React from 'react';
import ProductForm from './ProductForm';
import ProductActions from '../actions/ProductActions';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function AppView(props) {
    return(
      <div>
        <ActionButtonBar {...props}/>

        <Content {...props} />

      </div>
    );
}


function Content(props) {
    if (props.products.size === 0) {
        return null;
    }
    return(
        <section id="main" className='container'>
            <div>Total Product(s): {props.products.size}</div>
            <table id='product-list' className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category Id</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Weight</th>
                        <th>Manufacturer</th>
                        <th>isActive</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                {[...props.products.values()].reverse().map(product => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.productDisplayName}</td>
                        <td>{product.categoryId}</td>
                        <td>{product.price}</td>
                        <td>{product.productLongDesc}</td>
                        <td>{product.weight}</td>
                        <td>{product.manufacturer}</td>
                        <td> <input className="toggle-1" type="checkbox" checked={product.isActive} onChange={() => null} /> </td>
                        <td>
                          <div className='product-action'>
                            
                            <button type="button" className="btn btn-primary" onClick={() => confirmDelete(props, product.id) }><span>Delete</span></button>
                            <button type="button" className="btn btn-primary" onClick={() => props.onUpdateProduct(product) }><span>Edit</span></button>
                          </div>
                        </td>


                    </tr>
                ))}
                </tbody>
            </table>
        </section>

    );
}


function ActionButtonBar(props){
    return (
      <div id='nav'>
        <button type="button" className="btn btn-primary" onClick={() => props.onShowAddForm() }>Add</button>
      </div>
    );
}

function confirmDelete(props, id){
  confirmAlert({
    title: 'Confirm',
    message: "Do you want to delete the product with ID=" + id + "?",
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
    onConfirm: () => props.onDeleteProduct(id),
  });
}


export default AppView;