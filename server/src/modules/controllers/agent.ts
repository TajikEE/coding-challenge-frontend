import { getAgentDetailsById } from '../services';

export async function getAgent(req, res): Promise<any> {
    const { agentId } = req.params;

    const logData = await getAgentDetailsById(agentId);

    return logData;
}
