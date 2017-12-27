import fetch from 'node-fetch';

const handleFetchErrors = (res) => {
    if (res.status !== 201) {
        throw new Error('Failed to fetch data');
    }

    return res;
};

const sampleService = (endpoint, method) => (
    {
        send(data) {
            return fetch(endpoint, {
                method,
                body: JSON.stringify(data),
            })
                .then(handleFetchErrors)
                .then(res => res.json());
        },
    }
);

export default sampleService;
