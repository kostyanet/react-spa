export default class AppValues {
	static BASE_URL = 'http://localhost:3000';

	static namePattern = /^[a-zA-Z ,.'-]+$/u;
	static passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
} 