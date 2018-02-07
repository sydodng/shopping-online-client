import React from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import ProductActionTypes from '../constants/ProductActionTypes';
import ProductDispatcher from './ProductDispatcher';
import ProductActions from '../actions/ProductActions';
//import PropertiesReader from 'properties-reader';

import Product from './Product';
import ProductForm from '../views/ProductForm';
import request from 'request';




class ProductStore extends ReduceStore {
    constructor() {
        super(ProductDispatcher);
    }

    getInitialState() {
        return Immutable.OrderedMap();
    }

    reduce(state, action) {
        /*console.log('ProductStore run...');
        console.log('action=' + JSON.stringify(action));
        console.log('state=' + JSON.stringify(state));
        console.log('-----------------------------------------');*/
        switch (action.type) {
            case ProductActionTypes.FETCH_ALL:
                fetch('http://localhost:9000/v1/product', {
                    'method': 'GET',
                    'content-type': 'application/json'
                })
                .then(result=>result.json())
                .then(function(result){
                    result.map((p,k) => ProductActions.addProduct(
                                p.id,
                                p.categoryId, 
                                p.subcategoryId,
                                p.productDisplayName,
                                p.price,
                                p.productShortDesc,
                                p.productLongDesc,
                                p.isActive,
                                p.thumbnailImage,
                                p.smallImage,
                                p.createDate,
                                p.lastUpdateDate,
                                p.manufacturer,
                                p.weight
                            ));
                    
                })
                .catch(function(error) {
                    console.log(JSON.stringify(error));
                });
                return state;

                
            case ProductActionTypes.ADD_PRODUCT:
                if (action.id === undefined) {
                    return state;
                }
                const id = action.id;
                return state.set(id, new Product({
                    id,
                    categoryId: action.categoryId,
                    subcategoryId: action.subcategoryId,
                    productDisplayName: action.name,
                    price: action.price,
                    productShortDesc: action.shortDesc,
                    productLongDesc: action.longDesc,
                    isActive: action.isActive,
                    thumbnailImage: action.thumbnailImage,
                    smallImage: action.smallImage,
                    createDate: action.createDate,
                    lastUpdateDate: action.lastUpdateDate,
                    manufacturer: action.manufacturer,
                    weight: action.weight
                }));

            case ProductActionTypes.SHOW_ADD_FORM:
                ReactDOM.render(<ProductForm />, document.getElementById('root'));
                return state;

            case ProductActionTypes.DELETE_PRODUCT:
                var url = 'http://localhost:9000/v1/product/' + action.id;
                var options = { 
                    method: 'DELETE',
                    url: url,
                    headers:{ 'content-type': 'application/json' },
                    json: true 
                };
                request(options, function (error, response, body) {
                    console.log('response:', response);
                    if(response.statusCode === 200){
                        console.log('Delete the productId=' + action.id + ' was successful');
                    } else {
                        console.log('Error:', error);
                        console.log('StatusCode:', response.statusCode);
                        console.log('Message:', response.body);
                    }
                });

                
                return state.delete(action.id);

            case ProductActionTypes.TOGGLE_PRODUCT:
                return state.update(
                    action.id,
                    product => product.set('isActive', !product.isActive),
                );

            case ProductActionTypes.UPDATE_PRODUCT:
            var pId = action.product.id;
                ReactDOM.render(<ProductForm productId={pId} />, document.getElementById('root'));
                return state;

            default:
                return state;
        }
    }
}

export default new ProductStore();