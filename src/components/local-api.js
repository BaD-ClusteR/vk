import axios from 'axios';

class LocalAPI {

    constructor() {
        this.state = {
            baseLink: `http://${window.location.hostname}:3000`
        };
    }

    isCorrectVKID(id) {
        id = parseInt(id);
        return (id && id > 0 && id < 99999999999);
    }

    query(link, data, callback) {
        let queryString = "";
        Object.keys(data).forEach((key) => {
            queryString = `${queryString}${queryString !== "" ? "&" : "?"}${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        });
        console.log(`${this.state.baseLink}/${link}${queryString}`);
        axios.get(`${this.state.baseLink}/${link}${queryString}`)
            .then(response => {
                callback(response.data, response.status, response.statusText);
            })
            .catch(error => console.log(`Can't connect to the local API. ${error.toString()}`));
    }

    checkIfUserVisitedFirstTime(vk_id, callback) {
        if (!this.isCorrectVKID(vk_id) && callback) {
            callback(false, "Incorrect VK ID");
        } else {
            this.query("visitor.check", {id: vk_id}, (data, code, statusText) => {
                if (callback)
                    callback(code === 200 && data.result, statusText);
            });
        }
    }

    addVisitor(vk_id, callback) {
        if (!this.isCorrectVKID(vk_id) && callback) {
            callback(false, "Incorrect VK ID")
        } else {
            this.query("visitor.add", { id: vk_id }, (data, code, statusText) => {
                if (callback)
                    callback(code === 200 && data.status && data.status === "ok", statusText);
            });
        }
    }
}

export default LocalAPI;