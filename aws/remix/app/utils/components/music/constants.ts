import type { IParticlesProps } from '@tsparticles/react';

type Song = {
  story: string;
  instruments: string[];
};
export const MusicConstants = {
  albums: [
    {
      name: 'Existence',
      story:
        'Stories begin at same point. Everyone have all colors like a light. Than each one receives different' +
        ' strikes. Each strikes brings different color. This is refraction. There is no chance to stop refraction.' +
        ' It glows and grows. Each start brings its own strikes and each refraction brings its own color.\n\n' +
        'Everyone belongs same point. Everyone is a piece of the total. There was no different at the beginning,' +
        ' but nothing can stop change when it starts.\n\nIn our existence, we are the ones and we are the all. ' +
        'Every piece has their own poles and points. This why we are exist, this why we are live. We must share all' +
        ' differences, we must start revolution.',
      songs: [
        'Genesis',
        'Nascent',
        'Altarf',
        'The Mettle of Desire',
        'Undesired Strikes',
        '7.05',
        'Unexpected Descent',
        'Renaissance',
        'Cycle'
      ],
      songConstant: 'existenceSongs' as const,
      spotify: 'https://open.spotify.com/embed/album/6UaqgH5DTCwzIWJYoQbRLG',
      soundcloud:
        'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/18336806&amp;auto' +
        '_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;' +
        'visual=true',
      theme: ''
    },
    {
      name: 'Dualities',
      story:
        'Life is about choices. It has other way everytime. Choosing a way leads to a result. But it breaks ' +
        'other ways results. Every reason, problem, creature have more than it seems. Every piece on their Existence' +
        ' and every choices they’ve create began at same point.\n\nTruth has never became real on life. Now, seeing' +
        ' a thing positive doesn’t mean it hasn’t got other sides. When you wise enough to see other sides, truth' +
        ' will be change.\n\nBut there must be one truth to start and prove the life, Existence. It has to be true' +
        ' for ourselves. Maybe it has Dualities. Which we don’t know for now.\n\nFor now our only truth, the starter' +
        ' of Dualities, Existence.',
      songs: [
        'Homeostasis',
        'Walk Through Silence',
        'Gloomy Biding',
        'Equinox',
        'Chonps',
        'Threshold',
        'Flowing Inside Genuineness',
        'Bleak Fray',
        'Into The Farewell'
      ],
      songConstant: 'dualitiesSongs' as const,
      spotify: 'https://open.spotify.com/embed/album/7qtXuWo6do60Z906VJs6GM',
      soundcloud:
        'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/124549927&amp;auto' +
        '_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;' +
        'visual=true',
      theme: ''
    },
    {
      name: 'Ossify',
      story:
        "Which one is the truth, we can't know. Are these bars real or we create all these traps?\n\nOnly one" +
        ' thing is certain; we must break all bars and traps.',
      songs: ['Perception', 'Movement', 'Surrounded Exists'],
      songConstant: '' as const,
      spotify: 'https://open.spotify.com/embed/album/1E7oIunCN1eceG4zD6iA0O',
      soundcloud:
        'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/409211462&color=%23ff5500&' +
        'auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=t' +
        'rue',
      theme: ''
    },
    {
      name: 'Simple Repetitions',
      story:
        'A long dark following a shiny gorgeous day. She was not happy. He was not' +
        ' in peace. Deep inside, it was waiting. They were insisting to break the shield.\n\n' +
        'She had the courage. She was strong but not willed. He had the will but he was not focused. Both knew that they' +
        ' can reach, both knew that they will catch. Repetitions may seem too simple to interfene, yet even a complete' +
        ' break can not stop the next wave.\n\n' +
        'Existence is about the Dualities. A thing is always in between of repetitions of a duality. It is  in Simple' +
        ' Repetitions where we are sure that it exists.',
      songs: [
        'Awakening',
        'Floue',
        'Limpid Perception',
        'Beyond the Border',
        'Giving In',
        'Reunion',
        'Contemplation',
        'Road of Pale Gleam'
      ],
      songConstant: 'simpleRepetitionsSongs' as const,
      spotify: 'https://open.spotify.com/embed/album/1wYdUkeDWHFeEIXLzxxqeo',
      soundcloud:
        'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/951696079%3Fsecret_token%' +
        '3Ds-Ol7ea&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&s' +
        'how_teaser=true&visual=true',
      theme: 'dark'
    }
  ],
  simpleRepetitionsSongs: {
    Awakening: {
      story:
        'An impulse. A preparation. A revolution.\n\nIt was not a dream that he was losing. It was not a' +
        ' nightmare too. It was just a start of repetitions.',
      instruments: ['Piano']
    },
    Floue: {
      story:
        'At some dark times, outside of the bounds, inside the big swirls, try to see different. Only a' +
        ' different can bring back the glint.',
      instruments: ['Cello', 'Oboe', 'Double Bass', 'Bass Clarinet', 'Violin', 'English Horn']
    },
    'Limpid Perception': {
      story:
        'In reality, every same simple touch reflects in exact same way. But from eyes, they seem very complex.' +
        ' Only a clear vision makes them visible.',
      instruments: ['Violin', 'Cello', 'Xylophone', 'Bass']
    },
    'Beyond the Border': {
      story:
        "When the dark can cover the space between two distant, two different who can't give up to love must" +
        ' face with the force of borders.',
      instruments: ['Piano']
    },
    'Giving In': {
      story:
        'Each acceptance creates a new path for another acceptance. Once the one learns to give in, there will' +
        ' be no more way to fix.',
      instruments: ['Piano']
    },
    Reunion: {
      story:
        'It was lost, started to crush and break everything. It collected more and more until it became an' +
        ' unstoppable hurricane.\n\nIt was constant, it was powerful. But in time, everything started to become' +
        ' silent. Things got darker, a while later nothing seemed abnormal.\n\nSuddenly, a needle striked. It was so' +
        ' powerful that the pain started to crush every connection between cells. The energy was flawless and' +
        ' constantly collected more power from the ones which they were hiding in the darkness.\n\nThen needle' +
        " started to strike endlessly until it couldn't produce any more pain. Every inch was shaking. A power which" +
        ' can not be reproducible was circuling through all the veins.\n\nThings were brighter. But they were not' +
        ' shining. At that time everyone understood that there were no come back.',
      instruments: ['Piano']
    },
    Contemplation: {
      story: 'All discrepancy creates a harmony to whom is able to see.',
      instruments: ['Oboe', 'Cellos', 'Tuba', 'Snares', 'Contrabass', 'Vocal']
    },
    'Road of Pale Gleam': {
      story:
        'Long time ago, it was dark that even the palest could shine like very beloved Sun of the Earth. Yet ' +
        'nothing was visible to the travelers of Long Road.\n\n Many of them tried, they shouted, they prayed, they' +
        ' swung desultorily. Once, they gathered together to dig a hole where they though that they can find a sign.' +
        ' Many sparkling minds of them studied hard and they managed to create a tool that can dig a crater like' +
        ' South Pole-Aitken in one tenth of the journey of Long Road. They dug without a break. A lot of them' +
        ' finished their journey during digging. Yet, there was no success. Nothing was visible inside the hollow.' +
        " But this didn't stop them to search more. They started to build a tower to search a sign in the sky. Once" +
        ' the tower was there, it was long as one tenth of Long Road. The second they climbed to the top of the ' +
        'tower, they realized that there is no chance to see it.\n\nThough, there was one, feeble, lonesome,' +
        ' fragile. He was the one, he was the silence. He was expecting nothing. He was just trying, just to ' +
        'understand, not to have something, just to know it. He listened. It was a voice that he heard from the ' +
        'very deep of a gloom. It was saying wait, do not see, only the darkest can see the light of the darkest.',
      instruments: ['Celesta', 'Cello', 'Violin', 'Choir', 'Piano', 'Double Bass']
    }
  } as Record<string, Song>,
  existenceSongs: {
    Genesis: {
      story: 'Belong and beyond.',
      instruments: ['Piano']
    },
    Nascent: {
      story: 'Endings are not real.',
      instruments: ['Piano']
    },
    Altarf: {
      story: 'Poles are strange forces in Existence.',
      instruments: ['Piano', 'Cello', 'Percussion']
    },
    'The Mettle of Desire': {
      story: 'The Mettle of Desire',
      instruments: ['Piano', 'Electric Guitar', 'Bass Guitar']
    },
    'Undesired Strikes': {
      story: "Even try to escape, it'll find you.",
      instruments: ['Piano']
    },
    '7.05': {
      story: 'There is always a moment that the turning point.',
      instruments: ['Piano']
    },
    'Unexpected Descent': {
      story: 'Inevitable.',
      instruments: ['Piano']
    },
    Renaissance: {
      story: 'Every start brings new starts.',
      instruments: ['Piano', 'Cello']
    },
    Cycle: {
      story: 'Will it end?',
      instruments: ['Piano', 'Cello']
    }
  } as Record<string, Song>,
  dualitiesSongs: {
    Homeostasis: {
      story: 'Sunrise or sunset? It depends on your perspective.',
      instruments: ['Piano', 'Cello', 'Percussion', 'Trumpet', 'Clarinet', 'Obua', 'German Cymbal']
    },
    'Walk Through Silence': {
      story:
        'If we start a journey to success, we must go on a way that we must not hear others ideas. This never' +
        " means we don't take advices. We must be deaf to bad effects. We must concentrate to success.\n\n" +
        'I call this situation Walk Through Silence.',
      instruments: ['Piano', 'Viola', 'Violin', 'Saxophone', 'Bass', 'Guitar', 'Cello', 'Textures']
    },
    'Gloomy Biding': {
      story: 'We have to wait.',
      instruments: ['Dark Synthesiser']
    },
    Equinox: {
      story:
        "It's effect is different on every different. When day gets bigger than dark, some will be happy. But" +
        ' there are ones who hate light. Each opposite feel great at least one time in a year.\n\nThis is not only' +
        ' in Equinox effect. This is life effect.',
      instruments: ['Piano']
    },
    Chonps: {
      story:
        'Chonps is a mnemonic for the main elements that occur naturally in living systems.\n\n' +
        'C(Carbon)\n' +
        'H (Hydrogen)\n' +
        'O (Oxygen)\n' +
        'N (Nitrogen)\n' +
        'P (Phosphorus)\n' +
        'S (Sulfur)',
      instruments: ['Piano', 'Saxophone', 'Cello']
    },
    Threshold: {
      story:
        'When time has come, there is no wait for threshold. And when it happens, there can be a pure happiness' +
        ' or sadness.',
      instruments: ['Piano', 'Cello']
    },
    'Flowing Inside Genuineness': {
      story:
        "When it's done, you can feel the emptiness and you feel the true happiness. This is truth.\n" +
        '\n' +
        'When you discover the truth your time has limited. You must enjoy it as much as you can.',
      instruments: ['Piano', 'Viola', 'Saxophone']
    },
    'Bleak Fray': {
      story:
        "Like a hero film, every final fight we take huts fear and hope. Fighter knows in the final they're " +
        'going to win, but he must fight before win.\n\n You can know what is true or which is going to happen. ' +
        "That's not set you free.",
      instruments: ['Piano', 'Strings', 'Viola', 'Violin', 'Trombone', 'Trumpet']
    },
    'Into The Farewell': {
      story: 'They are happening every second. They are unpreventable. They pull us slowly to shade of pain.',
      instruments: ['Piano', 'Flute', 'Cello', 'Trombone']
    }
  } as Record<string, Song>,
  simpleRepetitionParticles: {
    particles: {
      number: {
        value: 80,
        density: { enable: true, value_area: 2525.2724532232724 }
      },
      color: { value: '#fff' },
      shape: {
        type: 'circle',
        stroke: { width: 0, color: '#000000' },
        polygon: { nb_sides: 5 },
        image: { src: 'img/github.svg', width: 100, height: 100 }
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
      },
      size: {
        value: 4,
        random: true,
        anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
      },
      line_linked: {
        enable: false,
        distance: 500,
        color: '#ffffff',
        opacity: 0.4,
        width: 2
      },
      move: {
        enable: true,
        speed: 6,
        direction: 'bottom',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: { enable: false, rotateX: 600, rotateY: 1200 }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: false, mode: 'bubble' },
        onclick: { enable: false, mode: 'repulse' },
        resize: {
          enable: true
        }
      },
      modes: {
        grab: { distance: 400, line_linked: { opacity: 0.5 } },
        bubble: { distance: 400, size: 4, duration: 0.3, opacity: 1, speed: 3 },
        repulse: { distance: 200, duration: 0.4 },
        push: { particles_nb: 4 },
        remove: { particles_nb: 2 }
      }
    },
    retina_detect: true,
    fullScreen: false
  } as IParticlesProps['options']
};
