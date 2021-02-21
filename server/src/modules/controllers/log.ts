import { getAllLogs } from '../services';

export async function getLogs(req, res): Promise<any> {
    const logData = await getAllLogs();

    return logData;
}
