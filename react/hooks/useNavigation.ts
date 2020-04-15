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
