import express from 'express';
const app: express.Application = express();
const port = 5000;
import {route} from './modules/utils/route-handler';
import { getPhoneNumber } from './modules/controllers/phone-number';
import { getAgent } from './modules/controllers/agent';
import { getLogs } from './modules/controllers/log';

//separate routes and get data separately
app.get('/logs', route((req, res) => getLogs(req, res)));


app.get('/call/:phoneNumber', route((req, res) => getPhoneNumber(req, res)));

app.get('/agent/:agentId', route((req, res) => getAgent(req, res)));

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
