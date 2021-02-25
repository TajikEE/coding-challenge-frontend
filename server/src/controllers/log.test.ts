import { getAllLogs, calculateCallCount } from './log';

const sampleLogs = [
    {
        identifier: 'f53b3e0e-6a21-11eb-9439-0242ac130002',
        agentIdentifier: '356b03dc-9ec5-11e7-97a6-d501104f897e',
        number: '+49151484522',
        dateTime: '2020-10-05T14:48:00.000Z',
        duration: 230,
    },
    {
        identifier: '0b96031e-6a22-11eb-9439-0242ac130002',
        agentIdentifier: '356b03dc-9ec5-11e7-97a6-d501104f897e',
        number: '+49151484522',
        dateTime: '2020-10-06T13:50:00.000Z',
        duration: 93,
    },
];

const sampleCounter = { '+49151484522': 2};

const sampleLogsWithName = [
    {
        identifier: 'f53b3e0e-6a21-11eb-9439-0242ac130002',
        agentIdentifier: '356b03dc-9ec5-11e7-97a6-d501104f897e',
        number: '+49151484522',
        dateTime: '2020-10-05T14:48:00.000Z',
        duration: 230,
        name: 'Test Man'
    },
    {
        identifier: '0b96031e-6a22-11eb-9439-0242ac130002',
        agentIdentifier: '356b03dc-9ec5-11e7-97a6-d501104f897e',
        number: '+49151484522',
        dateTime: '2020-10-06T13:50:00.000Z',
        duration: 93,
        name: 'Test Woman'
    },
];

describe('calculateCallCount', () => {
    it ('aggregates the duplicates phone number count', ()=> {
        expect(calculateCallCount(sampleLogs)).toStrictEqual(sampleCounter);
    });
});

describe('getAllLogs', () => {
    let mockReadLogFile: jest.SpyInstance<any, unknown[]>;

    beforeEach(() => {
        mockReadLogFile = jest.spyOn(require('./readFiles'), 'readLogsFile');
        mockReadLogFile.mockImplementation(() => sampleLogsWithName);
    });

    it('gets the list of mapped logs and phone number counter', () => {
        expect(getAllLogs()).toStrictEqual({allLogs: sampleLogsWithName, numberCounter: sampleCounter});
    });

});
