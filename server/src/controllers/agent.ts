import { readLogsFile, readAgentsFile } from './readFiles';
import { Log } from '../data-types/log';
import { Agent } from '../data-types/agent';
import { getResolutionById } from './resolution';
import { Resolution } from '../data-types/resolution';

export function getAgentById(id: string): Agent | undefined {
    const agents = readAgentsFile();
    return agents.find((agent: Agent) => agent.identifier === id);
}

export function getAgentDetailsById(
    agentIdentifier: string
): { matchedLogsByAgent: Log[]; details: Agent | undefined } {
    const logs: Log[] = readLogsFile();

    const matchedLogsByAgent = logs.filter(
        (log: Log) => log.agentIdentifier === agentIdentifier
    );

    matchedLogsByAgent.map((log: Log) => {
        const resolutionItem: Resolution | undefined = getResolutionById(
            log.identifier
        );

        log.resolution = resolutionItem?.resolution;
    });

    const details = getAgentById(agentIdentifier);

    return { matchedLogsByAgent, details };
}

export async function getAgent(
    req,
    res
): Promise<{ matchedLogsByAgent: Log[]; details: Agent | undefined }> {
    const { agentId } = req.params;

    const agentDetails = getAgentDetailsById(agentId);

    return agentDetails;
}
