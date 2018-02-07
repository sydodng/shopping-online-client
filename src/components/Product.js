import Immutable from 'immutable';

const Product = Immutable.Record({
  id: 0,
  categoryId: 0,
  subcategoryId: 0,
  productDisplayName: '',
  price: 0,
  productShortDesc: '',
  productLongDesc: '',
  isActive: true,
  thumbnailImage: '',
  smallImage: '',
  createDate: '',
  lastUpdateDate: '',
  manufacturer: '',
  weight: 0,
});

export default Product;