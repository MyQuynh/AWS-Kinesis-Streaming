import { RouteProps } from 'react-router-dom';
import NotFoundPage from '../features/error/NotFoundPage';
import HashtaggerCaptionPage from '../features/hashtagger/HashtaggerCaptionPage';
import HashtaggerImagePage from '../features/hashtagger/HashtaggerImagePage';
import HashtaggerURLPage from '../features/hashtagger/HashtaggerURLPage';
import LandingPage from '../features/landing/LandingPage';
import WiseInsightsPage from '../features/wise-insights/WiseInsightsPage';

const routes: RouteProps[] = [
  {
    path: '/',
    component: LandingPage,
    exact: true,
  },
  {
    path: '/home',
    component: LandingPage,
    exact: true,
  },
  {
    path: '/hashtagger/caption',
    component: HashtaggerCaptionPage,
    exact: true,
  },
  {
    path: '/hashtagger/image',
    component: HashtaggerImagePage,
    exact: true,
  },
  {
    path: '/hashtagger/url',
    component: HashtaggerURLPage,
    exact: true,
  },
  {
    path: '/wise-insights',
    component: WiseInsightsPage,
    exact: true,
  },
  {
    path: '*',
    component: NotFoundPage,
  },
];

export default routes;
