import React from 'react';
import request from 'request';

import ProductActions from '../actions/ProductActions';
import Immutable from 'immutable';

import Product from '../components/Product';


class ProductForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {newProduct: {
            'id': 0,
            'categoryId': 0,
            'subcategoryId': 0,
            'productDisplayName': '',
            'price': 0,
            'productShortDesc': '',
            'productLongDesc': '',
            'isActive': true,
            'thumbnailImage': '',
            'smallImage': '',
            'createDate': '',
            'lastUpdateDate': '',
            'manufacturer': '',
            'weight': 0
        },
        categories: []};
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount(){
        console.log('Prop=' + this.props.productId);
        if(this.props.productId !== undefined){
            request.get('http://localhost:9000/v1/product/'+this.props.productId, function(error, response, body){
                var jsonRes = JSON.parse(response.body);
                console.log('response=' + jsonRes);
                
                if(response.statusCode === 200){
                    this.setState( (state) => (
                        {newProduct: {
                            'id': jsonRes.id,
                            'categoryId': jsonRes.categoryId,
                            'subcategoryId': jsonRes.subcategoryId,
                            'productDisplayName': jsonRes.productDisplayName,
                            'price': jsonRes.price,
                            'productShortDesc': jsonRes.productShortDesc,
                            'productLongDesc': jsonRes.productLongDesc,
                            'isActive': jsonRes.isActive,
                            'thumbnailImage': jsonRes.thumbnailImage,
                            'smallImage': jsonRes.smallImage,
                            'createDate': jsonRes.createDate,
                            'lastUpdateDate': jsonRes.lastUpdateDate,
                            'manufacturer': jsonRes.manufacturer,
                            'weight': jsonRes.weight
                        }}) );

                }else{
                    console.log('Error:', error);
                    console.log('StatusCode:', response.statusCode);
                    console.log('Message:', response.body);
                }

            }.bind(this));
        }

        this.getCategories();
    }



    handleChange(propertyName, event) {
        const newProduct = this.state.newProduct;
        const target = event.target;
        //const value = target.type === 'checkbox' ? target.checked : target.value;
        newProduct[propertyName] = target.value;

        this.setState({newProduct: newProduct});
    }

    handleSubmit(event) {
        var today = new Date();
        var currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '-' 
                        + today.getHours() + '-' + today.getMinutes() + '-' + today.getSeconds();
        const newProduct = this.state.newProduct;

        newProduct['createDate'] = currentDate;
        newProduct['lastUpdateDate'] = currentDate;
        newProduct['subcategoryId'] = 100001;
        newProduct['thumbnailImage'] = '';
        newProduct['smallImage'] = '';
        newProduct['isActive'] = true;

        var url = 'http://localhost:9000/v1/product';
        if(this.props.productId !== undefined){
            newProduct['id'] = this.props.productId;
            url += '/' + this.props.productId;
        }else{
            newProduct['id'] = 0;
        }

        
        var options = { 
            method: 'POST',
            url: url,
            headers:{ 'content-type': 'application/json' },
            body: newProduct,
            json: true 
        };

        request(options, function (error, response, body) {
            if(response.statusCode === 200){
                console.log('The product update successful');
                // redirect to List product  page


            } else {
                console.log('Error:', error);
                console.log('StatusCode:', response.statusCode);
                console.log('Message:', response.body);
            }
        });


        event.preventDefault();
    }

    render(){

        return(
            <div className='container'>
                <form onSubmit={this.handleSubmit}>

                    <div className="form-group">
                        <label>Category</label> 
                        <select className="custom-select" onChange={this.handleChange.bind(this, 'categoryId')}>
                            <option value="0">Select one...</option>
                            {this.state.categories.map( (category, i) =>
                                <option key={i} value={category.id} selected={this.state.newProduct.categoryId === category.id}>{category.name}</option>  
                            )}
                        </select>

                    </div>

                    <div className="form-group">
                        <label>Product Name</label> 
                        <input type="text" className="form-control" placeholder="Product Name" value={this.state.newProduct.productDisplayName} onChange={this.handleChange.bind(this, 'productDisplayName')} />
                    </div>
                    <div className="form-group">
                        <label>Product Price</label> 
                        <input type="text" className="form-control" placeholder="Price" value={this.state.newProduct.price} onChange={this.handleChange.bind(this, 'price')} />
                    </div>
                    <div className="form-group">
                        <label>Short Description</label> 
                        <input type="text" className="form-control" placeholder="Short Description" value={this.state.newProduct.productShortDesc} onChange={this.handleChange.bind(this, 'productShortDesc')} />
                    </div>
                    <div className="form-group">
                        <label>Long Description</label> 
                        <input type="text" className="form-control" placeholder="Long Description" value={this.state.newProduct.productLongDesc} onChange={this.handleChange.bind(this, 'productLongDesc')} />
                    </div>
                    <div className="form-group">
                        <label>Manufacturer</label> 
                        <input type="text" className="form-control" placeholder="Manufacturer" value={this.state.newProduct.manufacturer} onChange={this.handleChange.bind(this, 'manufacturer')} />
                    </div>
                    <div className="form-group">
                        <label>Weight</label> 
                        <input type="text" className="form-control" placeholder="Product weight" value={this.state.newProduct.weight} onChange={this.handleChange.bind(this, 'weight')} />
                    </div>

                    <input type="submit" className="btn btn-default" value='Save' onClick={this.handleSubmit.bind(this)}/>
                </form>
            </div>
        );

    }


    getCategories(){
        var categories = [];
        var url = 'http://localhost:9000/v1/categories';
        var options = { 
            method: 'GET',
            url: url,
            headers:{ 'content-type': 'application/json' },
            json: true 
        };

        request(options, function (error, response, body) {
            if(response.statusCode === 200){
                response.body.map( (category, i) => categories.push(category));
                this.setState({categories: categories});
            } else {
                console.log('Error:', error);
                console.log('StatusCode:', response.statusCode);
                console.log('Message:', response.body);
            }
        }.bind(this));

        //return categories;
    }
    
}

export default ProductForm;