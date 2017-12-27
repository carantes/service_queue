import moment from 'moment';

const Logger = () => (
    {
        log(message) {
            console.log(`${moment().format()}: ${message}`); //eslint-disable-line
        },
    }
);

export default Logger();
