export default function _fetch(credsObj, url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        xhr.onload = function () {
            if (this.status == 200) {
                resolve(this.response);

            } else {
                const error = new Error(this.statusText);

                error.code = this.status;
                error.statusText = JSON.parse(this.response).statusText;

                reject(error);
            }
        };

        xhr.onerror = function (e) {
            reject(new Error(e.error));
        };

        xhr.send(credsObj);
    });
}
