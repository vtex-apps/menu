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
      },
      {
        id: 10007,
        label: 'About them',
        link: '/about-us',
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
        label: 'WHere we live',
        link: '/about-us',
      },
      {
        id: 10013,
        label: 'What we do',
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
