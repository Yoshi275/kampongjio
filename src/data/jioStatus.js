// export const JIO_COMPLETED = '4jioCompleted';
// export const JIO_OPEN = '1jioOpen';
// export const JIO_CLOSED = '2jioClosed';
// export const JIO_ARRIVED = '3jioArrived';

import { Open, Closed, Arrived, Completed } from '../resources/icons';

export const jioStatusText=(jioStatus) => {
    switch(jioStatus) {
        case '1jioOpen':
            return 'Open';
        case '2jioClosed':
            return 'Closed';
        case '3jioArrived':
            return 'Arrived';
        case '4jioCompleted':
            return 'Completed';
    }
};

export const jioStatusIcon=(jioStatus) => {
    switch(jioStatus) {
        case '1jioOpen':
            return Open;
        case '2jioClosed':
            return Closed;
        case '3jioArrived':
            return Arrived;
        case '4jioCompleted':
            return Completed;
    }
};