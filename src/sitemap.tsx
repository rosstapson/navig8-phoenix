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
    label: 'apps',
    labelDisabled: true,
    icon: UilCube,
    pages : [
      {
        name: 'dashboard',
        icon: 'clipboard',
        flat: true,
        active: true,
        pages: [
          {
            name: 'orders',
            path: 'index',
            pathName: 'default-dashboard',
            topNavIcon: 'shopping-cart',
            active: true,
          },
          {
            name: 'operational',
            path: 'dashboard/project-management',
            pathName: 'project-management-dashboard',
            topNavIcon: 'clipboard',
            active: true,
          },
          {
            name: 'financial',
            path: 'dashboard/crm',
            pathName: 'crm',
            topNavIcon: 'phone',
            active: true,
          },
          {
            name: 'crm clients',
            path: 'dashboard/travel-agency',
            pathName: 'travel-agency',
            topNavIcon: 'briefcase',
            active: true,
          },
          {
            name: 'suppliers',
            path: 'apps/social/feed',
            pathName: 'social-feed',
            topNavIcon: 'share-2',
            active: true,
          },
        ]
      },
      {
        name: 'orders/files',
        icon: 'shopping-cart',
        active: true,
        pages: [
          {
            name: 'create order',
            path: 'apps/orders/create-new',
            pathName: 'new-order',
            active: true,
          },
          {
            name: 'unallocated orders',
            path: 'apps/orders/order-list-view',
            pathName: 'order-list-unallocated',
            active: true,
          },
          {
            name: 'all orders',
            path: 'apps/orders/order-list-view',
            pathName: 'order-list-all',
            active: true,
          },
          {
            name: 'documents',
            path: 'apps/orders/documents',
            pathName: 'orders-documents',
            active: true,
          },
          {
            name: 'history',
            path: 'apps/crm/analytics',
            pathName: 'crm-analytics',
            active: true,
          },
          {
            name: 'notifications',
            path: 'apps/crm/analytics',
            pathName: 'crm-analytics',
            active: true,
          },
          {
            name: 'reports',
            path: 'apps/orders/reports',
            pathName: 'orders-reports',
            active: true,
          },
        ]
      },
      {
        name: 'clients',
        icon: 'phone',
        active: true,
        pages: [
          {
            name: 'create client',
            path: 'apps/clients/add-client',
            pathName: 'clients-add-client',
            active: true,
          },
          {
            name: 'dashboard',
            path: 'apps/clients/client-list',
            pathName: 'client-list',
            active: true,
          },
          {
            name: 'history',
            path: 'apps/clients/deal-details',
            pathName: 'clients-deal-details',
            active: true,
          },
          {
            name: 'documents',
            path: 'apps/clients/documents',
            pathName: 'client-documents',
            active: true,
          },
          {
            name: 'notifications',
            path: 'apps/clients/notifications',
            pathName: 'clients-notifications',
            active: true,
          },
          {
            name: 'reports',
            path: 'apps/clients/reports',
            pathName: 'client-reports',
            active: true,
          }

        ]
      },
      {
        name: 'suppliers',
        icon: 'package',
        active: true,
        pages: [
          {
            name: 'create supplier',
            path: 'apps/suppliers/add-supplier',
            pathName: 'suppliers-add-supplier',
            active: true,
          },
          {
            name: 'dashboard',
            path: 'apps/suppliers/supplier-list',
            pathName: 'suppliers-supplier-list',
            active: true,
          },
          {
            name: 'history',
            path: 'apps/suppliers/history',
            pathName: 'suppliers-history',
            active: true,
          },
          {
            name: 'documents',
            path: 'apps/suppliers/documents',
            pathName: 'supplier-documents',
            active: true,
          },
          {
            name: 'notifications',
            path: 'apps/suppliers/notifications',
            pathName: 'suppliers-notifications',
            active: true,
          },
          {
            name: 'reports',
            path: 'apps/suppliers/reports',
            pathName: 'suppliers-reports',
            active: true,
          }

        ]
      },
      {
        name: 'fleet',
        icon: 'truck',
        active: true,
        pages: [
          {
            name: 'tracking',
            path: 'apps/fleet/analytics',
            pathName: 'fleet-analytics',
            active: true,
          },
          {
            name: 'dashboard',
            path: 'apps/fleet/deals',
            pathName: 'fleet-deals',
            active: true,
          },
          {
            name: 'create asset',
            path: 'apps/fleet/add-asset',
            pathName: 'fleet-add-asset',
            active: true,
          },
          {
            name: 'expenses',
            active: true,
            pages: [
              {
                name: 'diesel',
                path: 'apps/fleet/lead-details',
                pathName: 'fleet-lead-details',
                active: true,
              },
              {
                name: 'tyres',
                path: 'apps/fleet/lead-details',
                pathName: 'fleet-lead-details',
                active: true,
              },
              {
                name: 'maintenance',
                path: 'apps/fleet/lead-details',
                pathName: 'fleet-lead-details',
                active: true,
              },
              {
                name: 'breakdown',
                path: 'apps/fleet/lead-details',
                pathName: 'fleet-lead-details',
                active: true,
              },
              {
                name: 'driver/staff',
                path: 'apps/fleet/lead-details',
                pathName: 'fleet-lead-details',
                active: true,
              },
              {
                name: 'oils & lubes',
                path: 'apps/fleet/lead-details',
                pathName: 'fleet-lead-details',
                active: true,
              },
              
              {
                name: 'reports',
                path: 'apps/fleet/lead-details',
                pathName: 'fleet-lead-details',
                active: true,
              },
            ]

          },
          {
            name: 'notifications',
            path: 'apps/fleet/lead-details',
            pathName: 'fleet-lead-details',
            active: true,
          },
          {
            name: 'documents',
            path: 'apps/fleet/documents',
            pathName: 'fleet-documents',
            active: true,
          },
          {
            name: 'insurance',
            path: 'apps/fleet/deals',
            pathName: 'fleet-deals',
            active: true,
          },
          {
            name: 'invoices',
            path: 'apps/fleet/deal-details',
            pathName: 'fleet-deal-details',
            active: true,
          },
          {
            name: 'reports',
            path: 'apps/fleet/deal-details',
            pathName: 'fleet-deal-details',
            active: true,
          },
          

        ]
      },
      
      {
        name: 'locations',
        icon: 'globe',
        active: true,
        pages: [
          {
            name: 'create location',
            path: 'apps/locations/add-location',
            pathName: 'locations-add-location',
            active: true,
          },
          {
            name: 'dashboard',
            path: 'apps/crm/deals',
            pathName: 'crm-deals',
            active: true,
          },
          
          {
            name: 'reports',
            path: 'apps/crm/reports',
            pathName: 'crm-reports',
            active: true,
          }

        ]
      },
      {
        name: 'routes',
        icon: 'compass',
        active: true,
        pages: [
          {
            name: 'create location',
            path: 'apps/routes/add-location',
            pathName: 'routes-add-location',
            active: true,
          },
          {
            name: 'dashboard',
            path: 'apps/crm/deals',
            pathName: 'crm-deals',
            active: true,
          },
          
          {
            name: 'reports',
            path: 'apps/crm/reports',
            pathName: 'crm-reports',
            active: true,
          }

        ]
      },
      {
        name: 'quotes',
        icon: 'dollar-sign',
        active: true,
        pages: [
          {
            name: 'create quote',
            path: 'apps/routes/add-location',
            pathName: 'routes-add-location',
            active: true,
          },
          {
            name: 'dashboard',
            path: 'apps/crm/deals',
            pathName: 'crm-deals',
            active: true,
          },
          {
            name: 'history',
            path: 'apps/crm/reports',
            pathName: 'crm-reports',
            active: true,
          },
          {
            name: 'reports',
            path: 'apps/crm/reports',
            pathName: 'crm-reports',
            active: true,
          }

        ]
      },
      {
        name: 'chat',
        icon: 'message-square',
        path: 'apps/chat',
        pathName: 'app-chat',
        active: true,
      },
      {
        name: 'email',
        icon: 'mail',
        active: true,
        pages: [
          {
            name: 'inbox',
            path: 'apps/email/inbox',
            pathName: 'email-inbox',
            active: true,
          },
          {
            name: 'email-detail',
            path: 'apps/email/email-detail',
            pathName: 'email-detail',
            active: true,
          },
          {
            name: 'compose',
            path: 'apps/email/compose',
            pathName: 'email-compose',
            active: true,
          },
        ]
      },
      {
        name: 'notifications',
        icon: 'bell',
        path: 'pages/notifications',
        pathName: 'notifications-page',
        active: true,
      },
      {
        name: 'events',
        icon: 'bookmark',
        active: true,
        pages: [
          {
            name: 'create an event',
            path: 'apps/events/create-an-event',
            pathName: 'create-an-event',
            active: true,
          },
          {
            name: 'Event detail',
            path: 'apps/events/event-detail',
            pathName: 'event-detail',
            active: true,
          },
        ]
      },
      
      {
        name: 'file-manager',
        icon: 'folder',
        path: 'apps/file-manager/list-view',
        pathName: 'file-list-view',
        active: true,
      },
      {
        name: 'calendar',
        icon: 'calendar',
        path: 'apps/calendar',
        pathName: 'app-calendar',
        active: true,
      },
       {
        name: 'faq',
        icon: 'help-circle',
        active: true,
        pages: [
          {
            name: 'faq-accordion',
            path: 'pages/faq/faq-accordion',
            pathName: 'faq-accordion',
            active: true,
          },
          {
            name: 'faq-tab',
            path: 'pages/faq/faq-tab',
            pathName: 'faq-tab',
            active: true,
          },
        ]
      },
      {
        name: 'admin users',
        icon: 'users',
        path: 'apps/chat',
        pathName: 'app-chat',
        active: true,
      },
    ],
  },
  
];
