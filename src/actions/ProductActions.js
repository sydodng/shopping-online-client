import ProductActionTypes from '../constants/ProductActionTypes';
import ProductDispatcher from '../components/ProductDispatcher';

const Actions = {
    addProduct(id, categoryId, subcategoryId, name, price, shortDesc, longDesc, isActive, thumbnailImage, smallImage, createDate, lastUpdateDate, manufacturer, weight) {
        ProductDispatcher.dispatch({
            type: ProductActionTypes.ADD_PRODUCT,
            id,
            categoryId,
            subcategoryId,
            name,
            price,
            shortDesc,
            longDesc,
            isActive, 
            thumbnailImage, 
            smallImage, 
            createDate, 
            lastUpdateDate,
            manufacturer,
            weight
        });
    },
    deleteProduct(id) {
        ProductDispatcher.dispatch({
            type: ProductActionTypes.DELETE_PRODUCT,
            id,
        });
    },
    updateProduct(product){
        ProductDispatcher.dispatch({
            type: ProductActionTypes.UPDATE_PRODUCT,
            product,
        });
    },
    toggleProduct(id) {
        ProductDispatcher.dispatch({
            type: ProductActionTypes.TOGGLE_PRODUCT,
            id,
        });
    },
    fetchAllProduct() {
        ProductDispatcher.dispatch({
            type: ProductActionTypes.FETCH_ALL
        });
    },
    showAddForm(){
        ProductDispatcher.dispatch({
            type: ProductActionTypes.SHOW_ADD_FORM
        });
    }
};

export default Actions;