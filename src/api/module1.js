import axios from 'axios';

const module1 = {};

module1.getModule = (url, data) => {
    try {
        return axios({
            method: 'get',
            baseURL: process.env.VUE_APP_BASE_URL,
            url,
            params: { ...data },
        });
    } catch (error) {
        return console.error(`[API][module1] getModule is failed url: ${url}, error: ${error}`);
    }
};

module1.postModule = (url, data) => {
    try {
        return axios({
            method: 'post',
            baseURL: process.env.VUE_APP_BASEURL,
            url,
            data,
        });
    } catch (error) {
        return console.error(`[API][module1] postModule is failed url: ${url}, error: ${error}`);
    }
};

module1.putModule = (url, data) => {
    try {
        return axios({
            method: 'put',
            baseURL: process.env.VUE_APP_BASEURL,
            url,
            data,
        });
    } catch (error) {
        return console.error(`[API][module1] putModule is failed url: ${url}, error: ${error}`);
    }
};

module1.patchModule = (url, data) => {
    try {
        return axios({
            method: 'patch',
            baseURL: process.env.VUE_APP_BASEURL,
            url,
            data,
        });
    } catch (error) {
        return console.error(`[API][module1] patchModule is failed url: ${url}, error: ${error}`);
    }
};

module1.deleteModule = (url) => {
    try {
        return axios({
            method: 'delete',
            baseURL: process.env.VUE_APP_BASEURL,
            url,
        });
    } catch (error) {
        return console.error(`[API][module1] deleteModule is failed url: ${url}, error: ${error}`);
    }
};

export default module1;
