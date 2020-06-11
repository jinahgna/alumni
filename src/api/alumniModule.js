import axios from 'axios';

const alumniModule = {};

alumniModule.getModule = (url, data) => {
	try {
		return axios({
			method: 'get',
			baseURL: process.env.VUE_APP_BASE_URL,
			url,
			params: {
				...data,
			},
		});
	} catch (error) {
		return console.error(`[API][alumniModule] getModule is failed url: ${url}, error: ${error}`);
	}
};

alumniModule.postModule = (url, data) => {
	try {
		return axios({
			method: 'post',
			baseURL: process.env.VUE_APP_BASE_URL,
			url,
			data,
		});
	} catch (error) {
		return console.error(`[API][alumniModule] postModule is failed url: ${url}, error: ${error}`);
	}
};

alumniModule.putModule = (url, data) => {
	try {
		return axios({
			method: 'put',
			baseURL: process.env.VUE_APP_BASE_URL,
			url,
			data,
		});
	} catch (error) {
		return console.error(`[API][alumniModule] putModule is failed url: ${url}, error: ${error}`);
	}
};

alumniModule.patchModule = (url, data) => {
	try {
		return axios({
			method: 'patch',
			baseURL: process.env.VUE_APP_BASE_URL,
			url,
			data,
		});
	} catch (error) {
		return console.error(`[API][alumniModule] patchModule is failed url: ${url}, error: ${error}`);
	}
};

alumniModule.deleteModule = (url) => {
	try {
		return axios({
			method: 'delete',
			baseURL: process.env.VUE_APP_BASE_URL,
			url,
		});
	} catch (error) {
		return console.error(`[API][alumniModule] deleteModule is failed url: ${url}, error: ${error}`);
	}
};

export default alumniModule;