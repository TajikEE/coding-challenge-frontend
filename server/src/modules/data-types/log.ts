export type Log = {
  identifier: string;
  agentIdentifier: string;
  number: string;
  dateTime: string;
  duration: number;
  name?: string;
  resolution?: string;
};

export interface Counter {
  [key: string]: number;
}
