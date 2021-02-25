import { Log, Counter } from '../data-types/log';
import { getAgentById } from './agent';
import { getResolutionById } from './resolution';
import { Resolution } from '../data-types/resolution';
import { Agent } from '../data-types/agent';
import { readLogsFile } from './readFiles';

export function calculateCallCount(logs: Log[]): Counter {
    const numberCounter = logs.reduce((acc: Counter, log: Log) => {
        if (acc[log.number]) {
            acc[log.number] += 1;
        } else {
            acc[log.number] = 1;
        }

        return acc;
    }, {});

    return numberCounter;
}

export function getAllLogs(): {
  allLogs: Log[];
  numberCounter: Counter;
  } {
    const logs: Log[] = readLogsFile();

    const counter = calculateCallCount(logs);

    const allLogs = logs
        .map((log: Log) => {
            const agent = getAgentById(log.agentIdentifier);

            if (!agent) return;

            log.name = agent.firstName + ' ' + agent.lastName;

            return log;
        })
        .filter((log: Log | undefined): log is Log => log !== undefined);

    return { allLogs, numberCounter: counter };
}

export async function getLogs(
    req,
    res
): Promise<{ allLogs: Log[]; numberCounter: Counter }> {
    const logData = getAllLogs();

    return logData;
}

export function getLogsByPhoneNumber(phoneNumber: string): Log[] {
    const logs: Log[] = readLogsFile();

    const matchedLogsByNumber = logs.filter(
        (log: Log) => log.number === phoneNumber
    );

    matchedLogsByNumber.map((log: Log) => {
        const resolutionItem: Resolution | undefined = getResolutionById(
            log.identifier
        );

        const agent: Agent | undefined = getAgentById(log.agentIdentifier);

        log.resolution = resolutionItem?.resolution;
        log.name = agent?.firstName + ' ' + agent?.lastName;
    });

    return matchedLogsByNumber;
}

export async function getPhoneNumber(req, res): Promise<{ logData: Log[] }> {
    const { phoneNumber } = req.params;
    const logData = await getLogsByPhoneNumber(phoneNumber);
    return { logData };
}
