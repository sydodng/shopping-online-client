import AppView from '../views/AppView';
import {Container} from 'flux/utils';
import ProductStore from '../components/ProductStore';
import ProductActions from '../actions/ProductActions';


function getStores() {
    return [
        ProductStore,
    ];
}

function getState() {
    return {
        products: ProductStore.getState(),
        onDeleteProduct: ProductActions.deleteProduct,
        onToggleProduct: ProductActions.toggleProduct,
        onShowAddForm: ProductActions.showAddForm,
        showAllProducts: ProductActions.fetchAllProduct,
        onUpdateProduct: ProductActions.updateProduct,
    };
}

export default Container.createFunctional(AppView, getStores, getState);