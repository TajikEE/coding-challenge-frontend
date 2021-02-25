import express from 'express';

const app: express.Application = express();
const port = 6000;

import { route } from './utils/route-handler';
import { getAgent } from './controllers/agent';
import { getLogs, getPhoneNumber } from './controllers/log';

//separate routes and get data separately
app.get(
    '/logs',
    route((req, res) => getLogs(req, res))
);

app.get(
    '/call/:phoneNumber',
    route((req, res) => getPhoneNumber(req, res))
);

app.get(
    '/agent/:agentId',
    route((req, res) => getAgent(req, res))
);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
