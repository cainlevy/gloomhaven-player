import { ActionCard } from "./ActionCard";

// https://imgur.com/a/f6YHo
const cards: {[key: string]: ActionCard} = {
  'Sweeping Blow': {
    name: 'Sweeping Blow',
    level: 1,
    initiative: 64,
    top: {
      effects: ['Attack 2'],
      target: 'three contiguous adjacent hexes',
    },
    bottom: {
      effects: ['Move 3', 'Push 1'],
      target: 'all adjacent enemies',
    },
  },
  'Trample': {
    name: 'Trample',
    level: 1,
    initiative: 72,
    top: {
      effects: ['Attack 3', 'Pierce 2'],
    },
    bottom: {
      effects: ['Move 4', 'Jump', 'Attack 2'],
      target: 'all jumped enemies',
      experience: 2,
      lose: true,
    },
  },
  'Provoking Roar': {
    name: 'Provoking Roar',
    level: 1,
    initiative: 10,
    top: {
      effects: ['Attack 2', 'Disarm'],
    },
    bottom: {
      effects: [`Any enemy who targets one of your adjacent allies with an attack this round targets you with that attack instead, regardless of the attack's range.`],
    },
  },
  'Shield Bash': {
    name: 'Shield Bash',
    level: 1,
    initiative: 15,
    top: {
      effects: ['Attack 4', 'Stun'],
      experience: 2,
      lose: true,
    },
    bottom: {
      effects: ['Shield 1'],
      target: 'self',
    },
  },
  'Grab and Go': {
    name: 'Grab and Go',
    level: 1,
    initiative: 87,
    top: {
      effects: ['Loot 1'],
    },
    bottom: {
      effects: ['Move 4'],
    },
  },
  'Eye for an Eye': {
    name: 'Eye for an Eye',
    level: 1,
    initiative: 18,
    top: {
      effects: ['Retaliate 2'],
      target: 'self',
      duration: 'round',
      experience: 'Gain 1 each time you retaliate',
    },
    bottom: {
      effects: ['Heal 2', 'Range 1', '+Nature'],
    },
  },
  'Warding Strength': {
    name: 'Warding Strength',
    level: 1,
    initiative: 32,
    top: {
      effects: ['Attack 3', 'Push 2'],
    },
    bottom: {
      effects: ['Shield 1'],
      duration: 'Next six sources of damage from attacks targeting you',
      experience: '( ) (*) ( ) (*) ( ) (*)',
      lose: true,
    },
  },
  'Overwhelming Strength': {
    name: 'Overwhelming Strength',
    level: 1,
    initiative: 61,
    top: {
      effects: ['Attack 6'],
      experience: 2,
      lose: true,
    },
    bottom: {
      effects: ['Move 3', 'Push 2'],
      target: 'One adjacent enemy',
    },
  },
  'Spare Dagger': {
    name: 'Spare Dagger',
    level: 1,
    initiative: 27,
    top: {
      effects: ['Attack 3', 'Range 3'],
      experience: 1,
    },
    bottom: {
      effects: ['Attack 2'],
    },
  },
  'Skewer': {
    name: 'Skewer',
    level: 'x',
    initiative: 35,
    top: {
      effects: ['Attack 3', 'Consume Wind to gain Attack 1 & Pierce 1'],
      target: 'two in a line from you',
      experience: 1,
    },
    bottom: {
      effects: ['Move 6'],
      experience: 1,
      lose: true,
    },
  },
  'Wall of Doom': {
    name: 'Wall of Doom',
    level: 'x',
    initiative: 20,
    top: {
      effects: ['Retaliate 2', 'Shield 2'],
      target: 'self',
      duration: 'round',
      experience: 2,
      lose: true,
    },
    bottom: {
      effects: ['Add Attack 1 to all your attacks'],
      duration: 'round',
    },
  },
  'Leaping Cleave': {
    name: 'Leaping Cleave',
    level: 1,
    initiative: 54,
    top: {
      effects: ['Attack 3'],
      target: 'two contiguous adjacent hexes',
      experience: 1,
    },
    bottom: {
      effects: ['Move 3', 'Jump', '+Wind'],
    },
  },
  'Balanced Measure': {
    name: 'Balanced Measure',
    level: 'x',
    initiative: 77,
    top: {
      effects: ['Attack X', 'where X is the number of hexes you have moved so far this turn'],
      experience: 1,
    },
    bottom: {
      effects: ['Move X', 'where X is the amount of damage you have inflicted so far this turn'],
    },
  },
  'Juggernaut': {
    name: 'Juggernaut',
    level: 2,
    initiative: 34,
    top: {
      effects: ['Move 2', 'Attack 2'],
    },
    bottom: {
      effects: ['On the next three sources of damage to you, suffer no damage instead.'],
      experience: '(*) (*) (*)',
      lose: true,
    },
  },
  'Fatal Advance': {
    name: 'Fatal Advance',
    level: 2,
    initiative: 40,
    top: {
      effects: ['Kill one adjacent normal enemy.'],
      experience: 2,
      lose: true,
    },
    bottom: {
      effects: ['Move 4'],
    },
  },
};

export default cards;
