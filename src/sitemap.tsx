import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faHourglassHalf } from '@fortawesome/free-regular-svg-icons';
import { faTurkishLira } from '@fortawesome/free-solid-svg-icons';
import {
  Icon,
  UilChartPie,
  UilCube,
  UilDocumentLayoutRight,
  UilFilesLandscapesAlt,
  UilPuzzlePiece
} from '@iconscout/react-unicons';

export interface Route {
  name: string;
  icon?: IconProp | string | string[];
  iconSet?: 'font-awesome' | 'feather' | 'unicons';
  pages?: Route[];
  path?: string;
  pathName?: string;
  flat?: boolean;
  topNavIcon?: string;
  dropdownInside?: boolean;
  active?: boolean;
  new?: boolean;
  hasNew?: boolean;
  isNext?: boolean;
}

export interface RouteItems {
  label: string;
  horizontalNavLabel?: string;
  icon: Icon;
  labelDisabled?: boolean;
  pages: Route[];
  megaMenu?: boolean;
  active?: boolean;
}

export const routes: RouteItems[] = [
  
  {
    label: "dashboard",
    icon: UilCube,
    pages: [
      {
        name: 'CRM',
        icon: 'phone',
        active: true,
        pages: [
          {
            name: 'analytics',
            path: '/apps/crm/analytics',
            pathName: 'crm-analytics',
            active: true
          },
          {
            name: 'deals',
            path: '/apps/crm/deals',
            pathName: 'crm-deals',
            active: true
          },
          {
            name: 'deal-details',
            path: '/apps/crm/deal-details',
            pathName: 'crm-deal-details',
            active: true
          },
          {
            name: 'leads',
            path: '/apps/crm/leads',
            pathName: 'crm-leads',
            active: true
          },
          {
            name: 'lead details',
            path: '/apps/crm/lead-details',
            pathName: 'crm-lead-details',
            active: true
          },
          {
            name: 'reports',
            path: '/apps/crm/reports',
            pathName: 'crm-reports',
            active: true
          },
          {
            name: 'report details',
            path: '/apps/crm/report-details',
            pathName: 'crm-report-details',
            active: true
          },
          {
            name: 'add-contact',
            path: '/apps/crm/add-contact',
            pathName: 'crm-add-contact',
            active: true
          }
        ]
      },
    ]
  }
];
