import { NavigationId, Navigation } from 'navigation'

// This is temporary and will be removed when we have
// real data
const navigationsMock: Record<NavigationId, Navigation> = {
  '10000': {
    id: 10000,
    title: 'Main Navigation',
    items: [
      {
        id: 10001,
        label: 'Apparel & Accessories',
        link: '/apparel---accessories/',
      },
      {
        id: 10002,
        label: 'Home & Decor',
        link: '/home---decor/',
      },
      {
        id: 10003,
        label: 'More',
        subNavigation: 10004,
      },
    ],
  },
  '10004': {
    id: 10004,
    title: 'More',
    items: [
      {
        id: 10005,
        label: 'About us',
        link: '/about-us',
        subNavigation: '10008',
      },
      {
        id: 10006,
        label: 'About you',
        link: '/about-us',
        subNavigation: '10014',
      },
      {
        id: 10007,
        label: 'About them',
        link: '/about-us',
        subNavigation: '10020',
      },
    ],
  },
  '10008': {
    id: 10008,
    title: 'About us',
    items: [
      {
        id: 10009,
        label: 'Who we are',
        link: '/about-us',
      },
      {
        id: 10010,
        label: 'What we are',
        link: '/about-us',
      },
      {
        id: 10011,
        label: 'What we eat',
        link: '/about-us',
      },
      {
        id: 10012,
        label: 'Where we live',
        link: '/about-us',
      },
      {
        id: 10013,
        label: 'What we do',
        link: '/about-us',
      },
    ],
  },
  '10014': {
    id: 10014,
    title: 'About you',
    items: [
      {
        id: 10015,
        label: 'Who you are',
        link: '/about-us',
      },
      {
        id: 10016,
        label: 'What you are',
        link: '/about-us',
      },
      {
        id: 10017,
        label: 'What you eat',
        link: '/about-us',
      },
      {
        id: 10018,
        label: 'Where you live',
        link: '/about-us',
      },
      {
        id: 10019,
        label: 'What you do',
        link: '/about-us',
      },
    ],
  },
  '10020': {
    id: 10020,
    title: 'About them',
    items: [
      {
        id: 10021,
        label: 'Who they are',
        link: '/about-us',
      },
      {
        id: 10022,
        label: 'What they are',
        link: '/about-us',
      },
      {
        id: 10023,
        label: 'What they eat',
        link: '/about-us',
      },
      {
        id: 10024,
        label: 'Where they live',
        link: '/about-us',
      },
      {
        id: 10025,
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
