import data from '../input/data.json';
import Queue from './helpers/Queue';
import Request from './models/Request';
import ScheduleService from './services/ScheduleService';
import Logger from './helpers/logger';

const queue = new Queue();

// Read data and enqueue it
data.forEach((service) => {
    const { endpoint, method, requests } = service;
    requests.forEach((request) => {
        queue.add(new Request(endpoint, method, request.data, request.schedule));
    });

    Logger.log('All requests queued');
});

// Start
let next = queue.remove();
const startDate = new Date();
Logger.log(`Service Queue app started at ${startDate}`);

while (next) {
    const {
        endpoint, method, body, schedule,
    } = next;

    ScheduleService.schedule(endpoint, method, body, startDate, schedule);

    next = queue.remove();
}
