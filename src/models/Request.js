function Request(endpoint, method, body, schedule = ['0s']) {
    this.endpoint = endpoint;
    this.method = method;
    this.body = body;
    this.schedule = schedule;
}

export default Request;
