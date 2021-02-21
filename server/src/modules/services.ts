import logs from '../json-data/logs.json';
import agents from '../json-data/agents.json';
import resolutions from '../json-data/resolution.json';

import { Log, Counter } from './data-types/log';
import { Agent } from './data-types/agent';
import { Resolution } from './data-types/resolution';

function getAgentById(id: string): Agent | undefined {
    return agents.find((agent: Agent) => agent.identifier === id);
}

function getResolutionById(id: string): Resolution | undefined {
    return resolutions.find(
        (resolution: Resolution) => resolution.identifier === id
    );
}

function calculateCallCount(logs: Log[]): Counter {
    const numberCounter: Counter = logs.reduce((acc: Counter, log: Log) => {
        if (acc[log.number]) {
            acc[log.number] += 1;
        } else {
            acc[log.number] = 1;
        }
        return acc;
    }, {});

    return numberCounter;
}

export async function getAllLogs(): Promise<{
  allLogs: Log[];
  numberCounter: Counter;
}> {
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

export async function getLogsByPhoneNumber(
    phoneNumber: string
): Promise<Log[]> {
    const matchedLogsByNumber = logs.filter(
        (log: Log) => log.number === phoneNumber
    );

    matchedLogsByNumber.map((log: Log) => {
        const resolutionItem: Resolution = getResolutionById(log.identifier) || {
            identifier: '28c6acec-9ee0-11e7-b66c-3cb9f33ef190',
            resolution: 'John',
        };

        const agent: Agent = getAgentById(log.agentIdentifier) || {
            identifier: '28c6acec-9ee0-11e7-b66c-3cb9f33ef190',
            firstName: 'John',
            lastName: 'Doe',
            email: 'Johndoe@callcenter.xyz',
            photo: 'https://via.placeholder.com/300/3366FF/FFFFFF?text=John.Doe',
        };

        log.resolution = resolutionItem.resolution;
        log.name = agent.firstName + ' ' + agent.lastName;
    });

    return matchedLogsByNumber;
}
export async function getAgentDetailsById(
    agentIdentifier: string
): Promise<any> {
    const matchedLogsByAgent = logs.filter(
        (log: Log) => log.agentIdentifier === agentIdentifier
    );

    matchedLogsByAgent.map((log: Log) => {
        const resolutionItem: Resolution = getResolutionById(log.identifier) || {
            identifier: '28c6acec-9ee0-11e7-b66c-3cb9f33ef190',
            resolution: 'John',
        };

        log.resolution = resolutionItem.resolution;
    });

    const details = getAgentById(agentIdentifier);

    return { matchedLogsByAgent, details };
}
