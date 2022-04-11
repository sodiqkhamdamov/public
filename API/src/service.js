import axios from 'axios';
const url = 'http://94.158.54.194:9092/api';
export const fetchProducts = async (p) => {
	try {
		const res = await axios.get(`${url}/product?page=${p}&perPage=2`);
		return res.data;
	} catch (err) {
		console.log('err: ', err.message);
	}
};

export const createProduct = async (product) => {
	const date = new Date();
	try {
		const res = await axios.post(`${url}/product`, {
			product_type_id: 0,
			name_uz: product.name_uz,
			cost: product.cost,
			address: product.address,
			created_date: date,
		});
		return {
			product_type_id: 0,
			name_uz: product.name_uz,
			cost: product.cost,
			address: product.address,
			created_date: date,
		};
	} catch (err) {
		console.log('err: ', err.message);
	}
};
export const updateProduct = async (product) => {
	try {
		const res = await axios.put(`${url}/product`, product);
		return product;
	} catch (err) {
		console.log('err: ', err.message);
	}
};

export const deleteProduct = async (id) => {
	try {
		const res = await axios.delete(`${url}/product/${id}`);
		return res;
	} catch (err) {
		console.log('err: ', err.message);
	}
};
