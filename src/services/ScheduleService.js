import Logger from '../helpers/logger';
import FetchHelper from '../helpers/FetchHelper';

class ScheduleService {
    constructor() {
        this.running = [];
    }

    schedule(endpoint, method, body, refDate, schedule, current = 0) {
        Logger.log(`Scheduled #${current + 1} request to ${body.email}`);
        const fetchHelper = new FetchHelper(endpoint, method);
        const timeout = Number.parseInt(schedule[current].substring(0, schedule[current].length - 1), 10) * 1000;

        return setTimeout(() => {
            Logger.log(`Fired request to ${body.email} after ${timeout} `);
            fetchHelper
                .send(body)
                .then((res) => {
                    if (res.paid === false) {
                        const next = current + 1;

                        if (schedule.length > next) {
                            return this.schedule(endpoint, method, body, refDate, schedule, next);
                        }
                    }

                    return res;
                });
        }, timeout);
    }
}

export default new ScheduleService();
