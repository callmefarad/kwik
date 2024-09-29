// import axios from "axios";
import { Instance } from "./AxiosConfig";

export const Register = async (data: any) => {
	try {
		const response = await Instance.post("/signup", data);
		return response;
	} catch (err) {
		return err;
	}
};

export const LogIn = async (data: any) => {
	try {
		const response = await Instance.post("/login", data);
		return response;
	} catch (err) {
		return err;
	}
};

export const CreatingStore = async (data: any) => {
	try {
		const response = await Instance.post("/create-store", data);
		return response;
	} catch (err) {
		return err;
	}
};

export const getUserDetails = async () => {
	try {
		const response = await Instance.get("/user/userdata");
		// Ensure only the data part is returned
		return response.data;
	} catch (err: any) {
		throw err;
	}
};

export const CreateNewProduct = async (id: any, data: any) => {
	try {
		const response = await Instance.post(`/${id}/create-product`, data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response;
	} catch (err) {
		return err;
	}
};

export const CreatingCardPayment = async (data: any) => {
	try {
		const response = await Instance.post("/card-payment", data);
		return response;
	} catch (err) {
		return err;
	}
};

export const CreatingBankPayment = async (data: any) => {
	try {
		const response = await Instance.post("/create-purchase", data);
		return response;
	} catch (err) {
		return err;
	}
};

export const IntializeBankTransfer = async (data: any) => {
	try {
		const response = await Instance.post("/create-bank-payment", data);
		return response;
	} catch (err) {
		return err;
	}
};
