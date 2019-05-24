import { ActionCard } from "./ActionCard";

// https://imgur.com/a/f6YHo
const cards: ActionCard[] = [
  {
    name: 'Sweeping Blow',
    level: 1,
    initiative: 64,
    top: {},
    bottom: {},
  },
  {
    name: 'Trample',
    level: 1,
    initiative: 72,
    top: {},
    bottom: {
      lose: true,
    },
  },
  {
    name: 'Provoking Roar',
    level: 1,
    initiative: 10,
    top: {},
    bottom: {},
  },
  {
    name: 'Shield Bash',
    level: 1,
    initiative: 15,
    top: {
      lose: true,
    },
    bottom: {},
  },
  {
    name: 'Grab and Go',
    level: 1,
    initiative: 87,
    top: {},
    bottom: {},
  },
  {
    name: 'Eye for an Eye',
    level: 1,
    initiative: 18,
    top: {},
    bottom: {},
  },
  {
    name: 'Warding Strength',
    level: 1,
    initiative: 32,
    top: {},
    bottom: {
      lose: true,
    },
  },
  {
    name: 'Overwhelming Strength',
    level: 1,
    initiative: 61,
    top: {
      lose: true,
    },
    bottom: {},
  },
  {
    name: 'Spare Dagger',
    level: 1,
    initiative: 27,
    top: {},
    bottom: {},
  },
  {
    name: 'Skewer',
    level: 'x',
    initiative: 35,
    top: {},
    bottom: {
      lose: true,
    },
  },
  {
    name: 'Wall of Doom',
    level: 'x',
    initiative: 20,
    top: {
      lose: true,
    },
    bottom: {},
  },
  {
    name: 'Leaping Cleave',
    level: 1,
    initiative: 54,
    top: {},
    bottom: {},
  },
  {
    name: 'Balanced Measure',
    level: 'x',
    initiative: 77,
    top: {},
    bottom: {},
  },
  {
    name: 'Juggernaut',
    level: 2,
    initiative: 34,
    top: {},
    bottom: {
      lose: true,
    },
  },
  {
    name: 'Fatal Advance',
    level: 2,
    initiative: 40,
    top: {
      lose: true,
    },
    bottom: {},
  },
];

const cardsByName = cards.reduce((memo, c) => ({...memo, [c.name]: c}), {}) as {[key: string]: ActionCard};

export default cardsByName;
