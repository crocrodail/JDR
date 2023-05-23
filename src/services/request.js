

export default function Request(url, body) {
    return new Promise((resolve) => {
        fetch(url, body)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    if (response.status === 401) {
                        localStorage.removeItem('user');
                        window.location.reload();
                    }
                    throw new Error('Something went wrong');
                }
            })
            .then((responseJson) => {
                resolve(responseJson)
            })
            .catch((error) => {
                resolve({
                    status: 520,
                    error: error.message
                })
            });
    })
}