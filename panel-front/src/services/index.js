import axios from "axios";

const URL = import.meta.env.VITE_REACT_API_URL;

export const signIn = async (credentials) => {
	try {
		const result = await axios.post(`${URL}/signin`, credentials);
		return result.data;
	} catch (ex) {
		if (ex.status === 422 || ex.status === 401) return ex.status;
		throw ex;
	};
}

export const getAllCustomers = async () => {
	try {
		const result = await axios.get(`${URL}/customers`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			}
		});
		return result.data;
	} catch (ex) {
		throw ex;
	}
};

export const createCustomer = async (customerData) => {
	try {
		const result = await axios.post(`${URL}/customers`, customerData, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			}
		});
		return result.data;
	} catch (ex) {
		throw ex;
	}
};

export const getAllAppointments = async () => {
	try {
		const result = await axios.get(`${URL}/appointments`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			}
		});
		return result.data;
	} catch (ex) {
		throw ex;
	}
};

export const createAppointment = async (appointmentData) => {
	try {
		const result = await axios.post(`${URL}/appointments`, appointmentData, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		return result.data;
	} catch (ex) {
		throw ex;
	}
};

export const importCustomers = async (file) => {
	try {
		const formData = new FormData();
		formData.append("file", file);
		const result = await axios.post(`${URL}/customers/import`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return result.data;
	} catch (ex) {
		throw ex;
	}
}
