import greenImage from '../../assets/optimised/green.webp'
import citizenScienceImage from '../../assets/optimised/citizenscience.webp'
import iotImage from '../../assets/optimised/iot.webp'
import greenTwoImage from '../../assets/optimised/green2.webp'
import type { PageLinkInfo } from './types'

export const pageLinks: Array<PageLinkInfo> = [
    {
        to: '/map',
        title: 'Interactive Bioacoustic Map',
        description: 'Search and listen to the sounds of nature',
        imageUrl: greenTwoImage,
        imageAlt: 'Forest landscape for the interactive bioacoustic map',
    },
    {
        to: '/learning',
        title: 'Learn the Science',
        description: 'Fun science related learning',
        imageUrl: greenImage,
        imageAlt: 'Nature learning themed image',
    },
    {
        to: '/diy',
        title: 'DIY Hardware Setup',
        description: 'Setting up your own IOT audio recording devices',
        imageUrl: iotImage,
        imageAlt: 'IoT audio recording hardware',
    },
    {
        to: '/contribute',
        title: 'How to Contribute',
        description: 'How to contribute to citizen science datasets',
        imageUrl: citizenScienceImage,
        imageAlt: 'Citizen science contribution theme',
    },
]