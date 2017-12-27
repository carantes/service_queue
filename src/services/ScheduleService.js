import Logger from '../helpers/logger';
import FetchHelper from '../helpers/FetchHelper';

class ScheduleService {
    constructor() {
        this.running = 0;
        this.startDate = new Date();
    }

    schedule(endpoint, method, body, schedule, currentTry = 0) {
        this.running = this.running + 1;
        Logger.log(`Scheduled #${currentTry + 1} request to ${body.email}`);
        const fetchHelper = new FetchHelper(endpoint, method);
        const timeout = Number.parseInt(schedule[currentTry].substring(0, schedule[currentTry].length - 1), 10) * 1000;
        // TODO: Calculate timeout from start date

        return setTimeout(() => {
            Logger.log(`Fired request to ${body.email} after ${timeout} `);
            fetchHelper
                .send(body)
                .then((res) => {
                    if (res.paid === false) {
                        const nextTry = currentTry + 1;

                        if (schedule.length > nextTry) {
                            return this.schedule(endpoint, method, body, schedule, nextTry);
                        }
                    }

                    this.running = this.running > 0 ? this.running = this.running - 1 : 0;
                    Logger.log(`There are ## ${this.running} ## processes on the queue to be fired...`);
                    return res;
                });
        }, timeout);
    }
}

export default new ScheduleService();
