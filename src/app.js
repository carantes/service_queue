import data from '../input/data.json';
import Queue from './helpers/Queue';
import Request from './models/Request';
import ScheduleService from './services/ScheduleService';
import Logger from './helpers/logger';

Logger.log('Service Queue app started');

// Read data and enqueue it
const queue = new Queue();
data.forEach((service) => {
    const { endpoint, method, requests } = service;
    requests.forEach((request) => {
        queue.add(new Request(endpoint, method, request.data, request.schedule));
    });

    Logger.log('All requests queued');
});

// Run
let next = queue.remove();
while (next) {
    const {
        endpoint, method, body, schedule,
    } = next;

    ScheduleService.schedule(endpoint, method, body, schedule);
    next = queue.remove();
}
