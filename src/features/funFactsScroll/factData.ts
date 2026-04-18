import type { FactItem } from "./types";

export const factItems: Array<FactItem> = [
    {
        id: 1,
        category: "Bioacoustics",
        title: 'The Loudest "Pop" in the Sea',
        description:
            "A tiny segmented marine worm, Leocratides kimuraorum, can produce a popping sound at 157 decibels, louder than a jet engine, simply by snapping its mouth parts.",
        links: [
            {
                label: "Watch",
                href: "https://www.youtube.com/watch?v=CK905ivFQ_A",
            },
        ],
        media: {
            type: "youtube",
            embedUrl: "https://www.youtube.com/embed/CK905ivFQ_A",
        },
    },
    {
        id: 2,
        category: "Bioacoustics",
        title: 'Elephant "Rumble" GPS',
        description:
            "Elephants communicate using infrasound below 20 Hz. These vibrations can travel through the ground for miles, and elephants detect them through their feet to help find water and avoid danger.",
        links: [
            {
                label: "Watch",
                href: "https://www.youtube.com/watch?v=vDi-iFF2oWg",
            },
        ],
        media: {
            type: "youtube",
            embedUrl: "https://www.youtube.com/embed/vDi-iFF2oWg",
        },
    },
    {
        id: 3,
        category: "Bioacoustics",
        title: "Bat Tech",
        description:
            "Many bats echolocate at frequencies up to 110 kHz, far above human hearing. Some moths have evolved sonar-jamming clicks that interfere with a bat's internal targeting system.",
        links: [
            {
                label: "Watch",
                href: "https://www.youtube.com/watch?v=tiB-WfJXECc",
            },
        ],
        media: {
            type: "youtube",
            embedUrl: "https://www.youtube.com/embed/tiB-WfJXECc",
        },
    },
    {
        id: 4,
        category: "Ecoacoustics",
        title: "Acoustic Complexity Index",
        description:
            "A healthy, biodiverse rainforest has a dense and complex soundscape where species occupy distinct frequency niches. If the forest becomes quiet or repetitive, it can signal ecological collapse.",
        links: [
            {
                label: "More",
                href: "https://babel.syr.edu/soundscapes-and-ecoacoustics/#:~:text=Of%20particular%20interest%20to%20me,often%20the%20level%20of%20complexity.",
            },
        ],
        media: {
            type: "links",
            heading: "Further reading",
            links: [
                {
                    label: "Ecoacoustics article",
                    href: "https://babel.syr.edu/soundscapes-and-ecoacoustics/#:~:text=Of%20particular%20interest%20to%20me,often%20the%20level%20of%20complexity.",
                },
            ],
        },
    },
    {
        id: 5,
        category: "Ecoacoustics",
        title: 'Reef "Dinner Bells"',
        description:
            "Larval fish and coral polyps use the sound of a healthy reef to navigate across the ocean and find a place to settle. If a reef goes silent, they can fail to find their way home.",
        links: [
            {
                label: "More",
                href: "https://news.mongabay.com/2010/07/amazing-reefs-how-corals-hear-an-interview-with-steve-simpson/",
            },
        ],
        media: {
            type: "links",
            heading: "Further reading",
            links: [
                {
                    label: "Interview with Steve Simpson",
                    href: "https://news.mongabay.com/2010/07/amazing-reefs-how-corals-hear-an-interview-with-steve-simpson/",
                },
            ],
        },
    },
    {
        id: 6,
        category: "Plant acoustics",
        title: 'The Thirsty "Scream"',
        description:
            "Research has shown that stressed or dehydrated plants such as tomato and tobacco emit ultrasonic clicks. Humans cannot hear them, but other organisms may be able to detect and respond to them.",
        links: [
            {
                label: "More",
                href: "https://www.earthdate.org/episodes/hearing-speaking-plants",
            },
            {
                label: "Paper",
                href: "https://www.cell.com/cell/fulltext/S0092-8674(23)00262-3",
            },
        ],
        media: {
            type: "links",
            heading: "Sources",
            links: [
                {
                    label: "EarthDate overview",
                    href: "https://www.earthdate.org/episodes/hearing-speaking-plants",
                },
                {
                    label: "Cell paper",
                    href: "https://www.cell.com/cell/fulltext/S0092-8674(23)00262-3",
                },
            ],
        },
    },
    {
        id: 7,
        category: "Plant acoustics",
        title: 'Flowers that "Hear" Bees',
        description:
            "Some flowers, including Evening Primrose, respond to the frequency of bee wingbeats. Within minutes, they can increase the sugar concentration of their nectar to become more appealing to pollinators.",
        links: [
            {
                label: "Paper",
                href: "https://onlinelibrary.wiley.com/doi/full/10.1111/ele.13331",
            },
        ],
        media: {
            type: "links",
            heading: "Source paper",
            links: [
                {
                    label: "Ecology Letters paper",
                    href: "https://onlinelibrary.wiley.com/doi/full/10.1111/ele.13331",
                },
            ],
        },
    },
    {
        id: 8,
        category: "Plant acoustics",
        title: "Root Radar",
        description:
            "Pea plant roots have been shown to grow toward the sound of running water even when the water is enclosed in a pipe and there is no measurable moisture in the surrounding soil.",
        links: [
            {
                label: "Paper",
                href: "https://link.springer.com/article/10.1007/s00442-017-3862-z",
            },
        ],
        media: {
            type: "links",
            heading: "Source paper",
            links: [
                {
                    label: "Oecologia paper",
                    href: "https://link.springer.com/article/10.1007/s00442-017-3862-z",
                },
            ],
        },
    },
];