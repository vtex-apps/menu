import { NavigationId, Navigation } from 'navigation'

// This is temporary and will be removed when we have
// real data
const navigationsMock: Record<NavigationId, Navigation> = {
  '10000': {
    id: '10000',
    title: 'Main Navigation',
    items: [
      {
        id: '10001',
        label: 'only vertical',
        subNavigation: '10026',
      },
      {
        id: '10002',
        label: 'only horizontal',
        subNavigation: '10033',
      },
      {
        id: '10003',
        label: 'horizontal -> vertical',
        subNavigation: '10004',
      },
      {
        id: '10039',
        label: 'vertical -> horizontal',
        subNavigation: '10040',
      },
      {
        id: '10141',
        label: 'horizontal -> vertical -> vertical',
        subNavigation: '10041',
      },
      {
        id: '10080',
        label: 'brands',
        subNavigation: '10081',
      },
    ],
  },
  '10081': {
    id: '10081',
    title: 'CSGO Maps',
    items: [
      {
        id: '10082',
        label: 'Mirage',
        link: '#',
      },
      {
        id: '10083',
        label: 'Dust 2',
        link: '#',
      },
      {
        id: '10084',
        label: 'Overpass',
        link: '#',
      },
      {
        id: '10085',
        label: 'Inferno',
        link: '#',
      },
      {
        id: '10086',
        label: 'Nuke',
        link: '#',
      },
      {
        id: '10087',
        label: 'Vertigo',
        link: '#',
      },
      {
        id: '10088',
        label: 'Train',
        link: '#',
      },
    ],
  },
  '10041': {
    id: '10041',
    title: 'Dota heroes',
    items: [
      {
        id: '10042',
        label: 'Strength',
        link: '#',
        subNavigation: '10045',
      },
      {
        id: '10043',
        label: 'Agility',
        subNavigation: '10046',
      },
      {
        id: '10044',
        label: 'Intelligence',
        subNavigation: '10047',
      },
    ],
  },
  '10047': {
    id: '10047',
    title: 'Intelligence',
    items: [
      {
        id: '10068',
        label: 'Dire',
        subNavigation: '10070',
      },
      {
        id: '10069',
        label: 'Radiant',
        subNavigation: '10071',
      },
    ],
  },
  '10070': {
    id: '10070',
    title: 'Dire',
    items: [
      {
        id: '10072',
        label: 'Invoker',
        link: '/',
      },
      {
        id: '10073',
        label: 'Dazzle',
        link: '/',
      },
      {
        id: '10074',
        label: 'Visage',
        link: '/',
      },
    ],
  },
  '10071': {
    id: '10071',
    title: 'Radiant',
    items: [
      {
        id: '10075',
        label: 'Void Spirit',
        link: '/',
      },
      {
        id: '10076',
        label: 'Enchantress',
        link: '/',
      },
      {
        id: '10077',
        label: 'Storm Spirit',
        link: '/',
      },
      {
        id: '10078',
        label: 'Dark Willow',
        link: '/',
      },
    ],
  },
  '10060': {
    id: '10060',
    title: 'Dire',
    items: [
      {
        id: '10062',
        label: 'Arc Warden',
        link: '/',
      },
      {
        id: '10063',
        label: 'Terrorblade',
        link: '/',
      },
      {
        id: '10064',
        label: 'Spectre',
        link: '/',
      },
      {
        id: '10079',
        label: 'Venomancer',
        link: '/',
      },
    ],
  },
  '10061': {
    id: '10061',
    title: 'Radiant',
    items: [
      {
        id: '10065',
        label: 'Monkey King',
        link: '/',
      },
      {
        id: '10066',
        label: 'Pangolier',
        link: '/',
      },
      {
        id: '10067',
        label: 'Phantom Lancer',
        link: '/',
      },
    ],
  },
  '10046': {
    id: '10046',
    title: 'Agility',
    items: [
      {
        id: '10058',
        label: 'Dire',
        subNavigation: '10060',
      },
      {
        id: '10059',
        label: 'Radiant',
        subNavigation: '10061',
      },
    ],
  },
  '10045': {
    id: '10045',
    title: 'Strength',
    items: [
      {
        id: '10048',
        label: 'Dire',
        subNavigation: '10050',
      },
      {
        id: '10049',
        label: 'Radiant',
        subNavigation: '10051',
      },
    ],
  },
  '10050': {
    id: '10050',
    title: 'Dire',
    items: [
      {
        id: '10052',
        label: 'Pudge',
      },
      {
        id: '10053',
        label: 'Slardar',
      },
      {
        id: '10054',
        label: 'Bristleback',
      },
    ],
  },
  '10051': {
    id: '10051',
    title: 'Radiant',
    items: [
      {
        id: '10055',
        label: 'Dragon Knight',
      },
      {
        id: '10056',
        label: 'Earth Spirit',
      },
      {
        id: '10057',
        label: 'Earth Shaker',
      },
    ],
  },
  '10033': {
    id: '10033',
    title: 'Home & Decor',
    items: [
      {
        id: '10034',
        label: 'My home, my rules',
        link: '#',
      },
      {
        id: '10035',
        label: 'My home, my rules',
        link: '#',
      },
      {
        id: '10036',
        label: 'My home, my rules',
        link: '#',
      },
      {
        id: '10037',
        label: 'My home, my rules',
        link: '#',
      },
      {
        id: '10038',
        label: 'My home, my rules',
        link: '#',
      },
    ],
  },
  '10026': {
    id: '10026',
    title: 'Main Navigation',
    items: [
      {
        id: '10027',
        label: 'Hats',
        link: '/apparel--accessories/hats',
      },
      {
        id: '10028',
        label: 'Shoes',
        link: '/apparel--accessories/shoes',
      },
      {
        id: '10029',
        label: 'Accessories',
        link: '/apparel--accessories/accessories',
      },
      {
        id: '10030',
        label: 'Watches',
        link: '/apparel--accessories/watches',
      },
      {
        id: '10031',
        label: 'Eyeglasses',
        link: '/apparel--accessories/eyeglasses',
      },
      {
        id: '10032',
        label: 'Clothing',
        link: '/apparel--accessories/clothing',
      },
    ],
  },
  '10004': {
    id: '10004',
    title: 'Title of the menu More',
    items: [
      {
        id: '10005',
        label: 'About us',
        link: '/about-us',
        subNavigation: '10008',
      },
      {
        id: '10006',
        label: 'About you',
        link: '/about-us',
        subNavigation: '10014',
      },
      {
        id: '10007',
        label: 'About them',
        link: '/about-us',
        subNavigation: '10020',
      },
    ],
  },
  '10040': {
    id: '10004',
    title: 'Title of the menu More',
    items: [
      {
        id: '10005',
        label: 'About us',
        link: '/about-us',
        subNavigation: '10008',
      },
      {
        id: '10006',
        label: 'About you',
        link: '/about-us',
        subNavigation: '10014',
      },
      {
        id: '10007',
        label: 'About them',
        link: '/about-us',
        subNavigation: '10020',
      },
    ],
  },
  '10008': {
    id: '10008',
    title: 'About us',
    items: [
      {
        id: '10009',
        label: 'Who we are',
        link: '/about-us',
      },
      {
        id: '10010',
        label: 'What we are',
        link: '/about-us',
      },
      {
        id: '10011',
        label: 'What we eat',
        link: '/about-us',
      },
      {
        id: '10012',
        label: 'Where we live',
        link: '/about-us',
      },
      {
        id: '10013',
        label: 'What we do',
        link: '/about-us',
      },
    ],
  },
  '10014': {
    id: '10014',
    title: 'About you',
    items: [
      {
        id: '10015',
        label: 'Who you are',
        link: '/about-us',
      },
      {
        id: '10016',
        label: 'What you are',
        link: '/about-us',
      },
      {
        id: '10017',
        label: 'What you eat',
        link: '/about-us',
      },
      {
        id: '10018',
        label: 'Where you live',
        link: '/about-us',
      },
      {
        id: '10019',
        label: 'What you do',
        link: '/about-us',
      },
    ],
  },
  '10020': {
    id: '10020',
    title: 'About them',
    items: [
      {
        id: '10021',
        label: 'Who they are',
        link: '/about-us',
      },
      {
        id: '10022',
        label: 'What they are',
        link: '/about-us',
      },
      {
        id: '10023',
        label: 'What they eat',
        link: '/about-us',
      },
      {
        id: '10024',
        label: 'Where they live',
        link: '/about-us',
      },
      {
        id: '10025',
        label: 'What they do',
        link: '/about-us',
      },
    ],
  },
}

export default function useNavigation(navigationId: NavigationId | undefined) {
  const navigations = navigationsMock
  return navigationId && navigations[navigationId]
    ? navigations[navigationId]
    : null
}
