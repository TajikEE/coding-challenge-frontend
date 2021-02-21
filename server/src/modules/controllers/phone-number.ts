import { getLogsByPhoneNumber } from '../services';

export async function getPhoneNumber(req, res): Promise<any> {
    const { phoneNumber } = req.params;
    const logData = await getLogsByPhoneNumber(phoneNumber);
    return { logData };
}
