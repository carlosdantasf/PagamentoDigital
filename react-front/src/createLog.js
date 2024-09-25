import {container, TYPES} from 'cbtu-monitoring'

export const createLog = (level, message) => {
    const myService = container.get(TYPES.MyService);
    myService.createLog(level, message);
};