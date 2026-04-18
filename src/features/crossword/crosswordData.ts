import type { CrosswordEntry } from './types'

export const CROSSWORD_ROWS = 12
export const CROSSWORD_COLUMNS = 16

export const CROSSWORD_ENTRIES: Array<CrosswordEntry> = [
  {
    id: '1-down',
    number: 1,
    direction: 'down',
    clue: 'In movies, they’re silent killers; in real life, they actually "bark" at intruders to say "Back off before I bite!"',
    answer: 'PIRANHA',
    row: 0,
    column: 7,
  },
  {
    id: '2-across',
    number: 2,
    direction: 'across',
    clue: 'While humans use apps to talk, these tiny creatures use vibrations through leaves and stems to "text" each other.',
    answer: 'INSECT',
    row: 1,
    column: 7,
  },
  {
    id: '3-across',
    number: 3,
    direction: 'across',
    clue: 'These "Natural Rockstars" can reach up to 100 decibels, often emerging in massive "tours" every 13 or 17 years.',
    answer: 'CICADA',
    row: 3,
    column: 4,
  },
  {
    id: '3-down',
    number: 3,
    direction: 'down',
    clue: 'You’d expect this cat to roar, but a cheetah actually makes this bird-like sound when it’s looking for its cubs.',
    answer: 'CHIRP',
    row: 3,
    column: 4,
  },
  {
    id: '4-down',
    number: 4,
    direction: 'down',
    clue: 'For years, we thought they were silent, but they actually hum at 92Hz at night—a low-frequency song that sounds like a meditation track.',
    answer: 'GIRAFFE',
    row: 3,
    column: 13,
  },
  {
    id: '5-across',
    number: 5,
    direction: 'across',
    clue: 'This famous humpback whale became a celebrity in 1985; his species is known for "chart-topping" songs that evolve every season.',
    answer: 'HUMPHREY',
    row: 5,
    column: 7,
  },
  {
    id: '6-across',
    number: 6,
    direction: 'across',
    clue: 'The "superpower" shared by dolphins and Daredevil; they use sound echoes to see the world without using their eyes.',
    answer: 'SONAR',
    row: 6,
    column: 0,
  },
  {
    id: '7-across',
    number: 7,
    direction: 'across',
    clue: 'This legendary band pioneered "biomusic" by layering pig grunts and dog barks into tracks like Sgt. Pepper and Piggies.',
    answer: 'BEATLES',
    row: 9,
    column: 7,
  },
]
