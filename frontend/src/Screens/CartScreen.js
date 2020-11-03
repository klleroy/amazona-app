import React from 'react';

const CartScreen = ({ match, location }) => {
	const productId = match.params.id;
	const qty = location.search ? Number(location.search.split('=')[1]) : 1;
	return (
		<div>
			<h1>Cart Screen</h1>
			<p>
				ADD TO CART : ProductID: {productId} Qty: {qty}
			</p>
		</div>
	);
};

export default CartScreen;
