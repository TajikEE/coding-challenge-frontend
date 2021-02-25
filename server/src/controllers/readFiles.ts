import fs from 'fs';
import path from 'path';
import { Log} from '../data-types/log';
import { Agent } from '../data-types/agent';
import { Resolution } from '../data-types/resolution';

export function readLogsFile(): Log[] {
    return JSON.parse(
        fs.readFileSync(
            path.resolve(__dirname, '../../../json-data/logs.json'),
            'utf-8'
        )
    );
}

export function readAgentsFile(): Agent[] {
    return JSON.parse(
        fs.readFileSync(
            path.resolve(__dirname, '../../../json-data/agents.json'),
            'utf-8'
        )
    );
}

export function readResolutionsFile(): Resolution[] {
    return JSON.parse(
        fs.readFileSync(
            path.resolve(__dirname, '../../../json-data/resolution.json'),
            'utf-8'
        )
    );
}