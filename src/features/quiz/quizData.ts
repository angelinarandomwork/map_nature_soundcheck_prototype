import type { QuizQuestion } from './types'

export const quizQuestions: Array<QuizQuestion> = [
  {
    id: 'lyrebird',
    prompt: 'Which bird is famous for copying chainsaws, camera shutters, and even car alarms?',
    options: [
      { id: 'peacock', label: 'Peacock' },
      { id: 'lyrebird', label: 'Lyrebird' },
      { id: 'flamingo', label: 'Flamingo' },
      { id: 'pelican', label: 'Pelican' },
    ],
    correctOptionId: 'lyrebird',
    hint: `This bird doesn't need bright colours to display it's wow factor.`,
    funFact: 'Lyrebirds are some of the best sound mimics in the animal kingdom.',
  },
  {
    id: 'octopus',
    prompt: 'Which animal changes colours while sleeping, making scientists think it might actually dream?',
    options: [
      { id: 'jellyfish', label: 'Jellyfish' },
      { id: 'dolphin', label: 'Dolphin' },
      { id: 'octopus', label: 'Octopus' },
      { id: 'penguin', label: 'Penguin' },
    ],
    correctOptionId: 'octopus',
    hint: `If multitasking had a mascot, this intelligent creature would be top of the list.`,
    funFact: 'Sleeping octopuses shift through colours and patterns, almost like a dream sequence.',
  },
  {
    id: 'starling',
    prompt: 'Which bird has become famous online for sounding surprisingly similar to R2-D2 from Star Wars?',
    options: [
      { id: 'starling', label: 'Starling' },
      { id: 'eagle', label: 'Eagle' },
      { id: 'swan', label: 'Swan' },
      { id: 'toucan', label: 'Toucan' },
    ],
    correctOptionId: 'starling',
    hint: 'An unassuming little bird, but always paying excellent attention to the sounds around it.',
    funFact: 'Starlings can mimic robotic sounds so well that scientists studied them using recordings of R2-D2.',
  },
  {
    id: 'evening-primrose',
    prompt: 'Which plant can “hear” bee wing vibrations and make its nectar sweeter within minutes?',
    options: [
      { id: 'sunflower', label: 'Sunflower' },
      { id: 'evening-primrose', label: 'Evening Primrose' },
      { id: 'bamboo', label: 'Bamboo' },
      { id: 'orchid', label: 'Orchid' },
    ],
    correctOptionId: 'evening-primrose',
    hint: 'It might not be the showiest option here but it’s surprisingly active...',
    funFact: 'The flower increases the sugar in its nectar after sensing bees nearby.',
  },
  {
    id: 'rainforest-soundscape',
    prompt: 'Which natural sound is often a sign that a rainforest is healthy and full of biodiversity?',
    options: [
      { id: 'total-silence', label: 'Total silence' },
      { id: 'constant-wind', label: 'Constant wind' },
      {
        id: 'mixed-soundscape',
        label: 'A mix of bird calls, insects, frogs, and animal sounds',
      },
      { id: 'thunderstorms', label: 'Thunderstorms' },
    ],
    correctOptionId: 'mixed-soundscape',
    hint: 'A healthy rainforest ensures everyone in the ecosystem is healthy too.',
    funFact:
      'Scientists use something called the Acoustic Complexity Index to measure how healthy an ecosystem is.',
  },
  {
    id: 'humpback-whale',
    prompt: 'Which marine animal is known for creating songs so complex that scientists compare them to jazz music?',
    options: [
      { id: 'shark', label: 'Shark' },
      { id: 'blue-whale', label: 'Blue Whale' },
      { id: 'humpback-whale', label: 'Humpback Whale' },
      { id: 'dolphin', label: 'Dolphin' },
    ],
    correctOptionId: 'humpback-whale',
    hint: `This ocean giant's musical prowess is so famous you will probably have heard it's recordings to inspire calmness.`,
    funFact:
      'Humpback whales constantly remix their songs, and entire whale populations can slowly adopt new versions.',
  },
  {
    id: 'woodpecker',
    prompt: 'Which bird is often called nature’s best beatboxer because of the drumming sound it makes on trees?',
    options: [
      { id: 'robin', label: 'Robin' },
      { id: 'woodpecker', label: 'Woodpecker' },
      { id: 'sparrow', label: 'Sparrow' },
      { id: 'pigeon', label: 'Pigeon' },
    ],
    correctOptionId: 'woodpecker',
    hint: `Anyone else might get a headache, but not this percussionist.`,
    funFact: 'Woodpeckers drum on trees to mark territory and attract mates.',
  },
  {
    id: 'pistol-shrimp',
    prompt: 'Which animal’s snap is so loud underwater that it can stun prey and briefly create a tiny flash of light?',
    options: [
      { id: 'lobster', label: 'Lobster' },
      { id: 'pufferfish', label: 'Pufferfish' },
      { id: 'squid', label: 'Squid' },
      { id: 'pistol-shrimp', label: 'Pistol Shrimp' },
    ],
    correctOptionId: 'pistol-shrimp',
    hint: 'A tiny creature with a surprisingly explosive trick.',
    funFact:
      'The pistol shrimp’s claw snaps so fast it creates a bubble hotter than the surface of the sun for a split second.',
  },
]
