import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserDetails {
	firstname?: string;
	lastname?: string;
	email?: string;
	password?: string;
}

type CartItem = {
	_id: number;
	name: string;
	price: number;
	quantity: number;
	image?: string;
};

type PaymentType = {
	transaction_reference: string;
	amount: number;
};

type BankDetailsType = {
	account_name: string;
	account_number: string;
	bank_name: string;
	bank_code: string;
	expiry_date_in_utc: string;
};

export interface AddressType {
	name: string;
	email: string;
	address: string;
	phoneNumber: string;
}

const initialState = {
	currentUser: {} as UserDetails | any,
	cart: [] as Array<CartItem>,
	totalPrice: 0,
	totalQuantity: 0,
	cartQuantity: 0,
	addresses: {} as AddressType,
	paymentDetails: {} as PaymentType,
	storeLinkId: null,
	bankDetails: {} as BankDetailsType,
};

export const Reducers = createSlice({
	name: "Kwik-ecomerce",
	initialState,
	reducers: {
		updateUserDetails: (state, action: PayloadAction<UserDetails>) => {
			state.currentUser = action.payload;
		},
		setStoreLinkId: (state, action) => {
			state.storeLinkId = action.payload;
		},

		storeBankDetails: (state, action: PayloadAction<BankDetailsType>) => {
			state.bankDetails = action.payload;
		},

		setUserDetails: (state, action: PayloadAction<AddressType>) => {
			state.addresses = action.payload;
		},

		storePaymentDetails: (state, action: PayloadAction<PaymentType>) => {
			state.paymentDetails = action.payload;
		},

		logoutUser: () => initialState,
		addAddress: (state, action: PayloadAction<AddressType>) => {
			state.addresses = action.payload;
		},
		clearCart: (state) => {
			state.cart = [];
			state.totalQuantity = 0;
			state.totalPrice = 0;
		},

		addToCart: (state, action: PayloadAction<CartItem>) => {
			const existingItem = state.cart.find(
				(item) => item._id === action.payload._id,
			);

			if (existingItem) {
				existingItem.quantity += 1;
			} else {
				state.cart.push({ ...action.payload, quantity: 1 });
			}

			state.totalQuantity += 1;
			state.totalPrice += action.payload.price;
		},

		reduceQuantity: (state, action: PayloadAction<number>) => {
			const existingItem = state.cart.find(
				(item) => item._id === action.payload,
			);

			if (existingItem) {
				// Check if quantity is greater than 1, then decrement
				if (existingItem.quantity > 1) {
					existingItem.quantity -= 1;
					state.totalQuantity -= 1;
					state.totalPrice -= existingItem.price;
				} else {
					// Remove item if quantity becomes 0
					state.cart = state.cart.filter((item) => item._id !== action.payload);
					state.totalQuantity -= 1;
					state.totalPrice -= existingItem.price;
				}
			}
		},

		removeFromCart: (state, action: PayloadAction<number>) => {
			const existingItem = state.cart.find(
				(item) => item._id === action.payload,
			);
			if (existingItem) {
				existingItem.quantity -= 1;

				// If quantity is 0, remove the item from the cart
				if (existingItem.quantity === 0) {
					state.cart = state.cart.filter((item) => item._id !== action.payload);
				}

				// Update total quantity and price
				state.totalQuantity -= 1;
				state.totalPrice -= existingItem.price;
			}
		},
		removeAProductCart: (state, action: PayloadAction<number>) => {
			const index = state.cart.findIndex(
				(item) => item?._id === action.payload,
			);

			console.log("this is index", index);
			if (index !== -1) {
				const itemToRemove = state.cart[index];
				state.totalQuantity -= itemToRemove.quantity;
				state.totalPrice -= itemToRemove.quantity * itemToRemove.price;
				state.cart.splice(index, 1);
			}
		},
	},
});

export const {
	updateUserDetails,
	setUserDetails,
	logoutUser,
	addToCart,
	clearCart,
	removeFromCart,
	addAddress,
	removeAProductCart,
	storePaymentDetails,
	setStoreLinkId,
	reduceQuantity,
	storeBankDetails,
} = Reducers.actions;

export default Reducers.reducer;
