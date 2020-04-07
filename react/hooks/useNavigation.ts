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
        id: 10004,
        label: 'About us',
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
