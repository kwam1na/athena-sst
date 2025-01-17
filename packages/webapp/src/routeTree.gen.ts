/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as OrganizationIndexImport } from './routes/organization/index'
import { Route as OrganizationOrgUrlSlugIndexImport } from './routes/organization/$orgUrlSlug/index'
import { Route as OrganizationOrgUrlSlugStoreIndexImport } from './routes/organization/$orgUrlSlug/store/index'
import { Route as OrganizationOrgUrlSlugSettingsIndexImport } from './routes/organization/$orgUrlSlug/settings/index'
import { Route as OrganizationOrgUrlSlugSettingsStoreUrlSlugImport } from './routes/organization/$orgUrlSlug/settings/$storeUrlSlug'
import { Route as OrganizationOrgUrlSlugStoreStoreUrlSlugIndexImport } from './routes/organization/$orgUrlSlug/store/$storeUrlSlug/index'
import { Route as OrganizationOrgUrlSlugStoreStoreUrlSlugProductsIndexImport } from './routes/organization/$orgUrlSlug/store/$storeUrlSlug/products/index'
import { Route as OrganizationOrgUrlSlugStoreStoreUrlSlugProductsNewImport } from './routes/organization/$orgUrlSlug/store/$storeUrlSlug/products/new'
import { Route as OrganizationOrgUrlSlugStoreStoreUrlSlugProductsProductIdImport } from './routes/organization/$orgUrlSlug/store/$storeUrlSlug/products/$productId'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const OrganizationIndexRoute = OrganizationIndexImport.update({
  path: '/organization/',
  getParentRoute: () => rootRoute,
} as any)

const OrganizationOrgUrlSlugIndexRoute =
  OrganizationOrgUrlSlugIndexImport.update({
    path: '/organization/$orgUrlSlug/',
    getParentRoute: () => rootRoute,
  } as any)

const OrganizationOrgUrlSlugStoreIndexRoute =
  OrganizationOrgUrlSlugStoreIndexImport.update({
    path: '/organization/$orgUrlSlug/store/',
    getParentRoute: () => rootRoute,
  } as any)

const OrganizationOrgUrlSlugSettingsIndexRoute =
  OrganizationOrgUrlSlugSettingsIndexImport.update({
    path: '/organization/$orgUrlSlug/settings/',
    getParentRoute: () => rootRoute,
  } as any)

const OrganizationOrgUrlSlugSettingsStoreUrlSlugRoute =
  OrganizationOrgUrlSlugSettingsStoreUrlSlugImport.update({
    path: '/organization/$orgUrlSlug/settings/$storeUrlSlug',
    getParentRoute: () => rootRoute,
  } as any)

const OrganizationOrgUrlSlugStoreStoreUrlSlugIndexRoute =
  OrganizationOrgUrlSlugStoreStoreUrlSlugIndexImport.update({
    path: '/organization/$orgUrlSlug/store/$storeUrlSlug/',
    getParentRoute: () => rootRoute,
  } as any)

const OrganizationOrgUrlSlugStoreStoreUrlSlugProductsIndexRoute =
  OrganizationOrgUrlSlugStoreStoreUrlSlugProductsIndexImport.update({
    path: '/organization/$orgUrlSlug/store/$storeUrlSlug/products/',
    getParentRoute: () => rootRoute,
  } as any)

const OrganizationOrgUrlSlugStoreStoreUrlSlugProductsNewRoute =
  OrganizationOrgUrlSlugStoreStoreUrlSlugProductsNewImport.update({
    path: '/organization/$orgUrlSlug/store/$storeUrlSlug/products/new',
    getParentRoute: () => rootRoute,
  } as any)

const OrganizationOrgUrlSlugStoreStoreUrlSlugProductsProductIdRoute =
  OrganizationOrgUrlSlugStoreStoreUrlSlugProductsProductIdImport.update({
    path: '/organization/$orgUrlSlug/store/$storeUrlSlug/products/$productId',
    getParentRoute: () => rootRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/organization/': {
      id: '/organization/'
      path: '/organization'
      fullPath: '/organization'
      preLoaderRoute: typeof OrganizationIndexImport
      parentRoute: typeof rootRoute
    }
    '/organization/$orgUrlSlug/': {
      id: '/organization/$orgUrlSlug/'
      path: '/organization/$orgUrlSlug'
      fullPath: '/organization/$orgUrlSlug'
      preLoaderRoute: typeof OrganizationOrgUrlSlugIndexImport
      parentRoute: typeof rootRoute
    }
    '/organization/$orgUrlSlug/settings/$storeUrlSlug': {
      id: '/organization/$orgUrlSlug/settings/$storeUrlSlug'
      path: '/organization/$orgUrlSlug/settings/$storeUrlSlug'
      fullPath: '/organization/$orgUrlSlug/settings/$storeUrlSlug'
      preLoaderRoute: typeof OrganizationOrgUrlSlugSettingsStoreUrlSlugImport
      parentRoute: typeof rootRoute
    }
    '/organization/$orgUrlSlug/settings/': {
      id: '/organization/$orgUrlSlug/settings/'
      path: '/organization/$orgUrlSlug/settings'
      fullPath: '/organization/$orgUrlSlug/settings'
      preLoaderRoute: typeof OrganizationOrgUrlSlugSettingsIndexImport
      parentRoute: typeof rootRoute
    }
    '/organization/$orgUrlSlug/store/': {
      id: '/organization/$orgUrlSlug/store/'
      path: '/organization/$orgUrlSlug/store'
      fullPath: '/organization/$orgUrlSlug/store'
      preLoaderRoute: typeof OrganizationOrgUrlSlugStoreIndexImport
      parentRoute: typeof rootRoute
    }
    '/organization/$orgUrlSlug/store/$storeUrlSlug/': {
      id: '/organization/$orgUrlSlug/store/$storeUrlSlug/'
      path: '/organization/$orgUrlSlug/store/$storeUrlSlug'
      fullPath: '/organization/$orgUrlSlug/store/$storeUrlSlug'
      preLoaderRoute: typeof OrganizationOrgUrlSlugStoreStoreUrlSlugIndexImport
      parentRoute: typeof rootRoute
    }
    '/organization/$orgUrlSlug/store/$storeUrlSlug/products/$productId': {
      id: '/organization/$orgUrlSlug/store/$storeUrlSlug/products/$productId'
      path: '/organization/$orgUrlSlug/store/$storeUrlSlug/products/$productId'
      fullPath: '/organization/$orgUrlSlug/store/$storeUrlSlug/products/$productId'
      preLoaderRoute: typeof OrganizationOrgUrlSlugStoreStoreUrlSlugProductsProductIdImport
      parentRoute: typeof rootRoute
    }
    '/organization/$orgUrlSlug/store/$storeUrlSlug/products/new': {
      id: '/organization/$orgUrlSlug/store/$storeUrlSlug/products/new'
      path: '/organization/$orgUrlSlug/store/$storeUrlSlug/products/new'
      fullPath: '/organization/$orgUrlSlug/store/$storeUrlSlug/products/new'
      preLoaderRoute: typeof OrganizationOrgUrlSlugStoreStoreUrlSlugProductsNewImport
      parentRoute: typeof rootRoute
    }
    '/organization/$orgUrlSlug/store/$storeUrlSlug/products/': {
      id: '/organization/$orgUrlSlug/store/$storeUrlSlug/products/'
      path: '/organization/$orgUrlSlug/store/$storeUrlSlug/products'
      fullPath: '/organization/$orgUrlSlug/store/$storeUrlSlug/products'
      preLoaderRoute: typeof OrganizationOrgUrlSlugStoreStoreUrlSlugProductsIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  OrganizationIndexRoute,
  OrganizationOrgUrlSlugIndexRoute,
  OrganizationOrgUrlSlugSettingsStoreUrlSlugRoute,
  OrganizationOrgUrlSlugSettingsIndexRoute,
  OrganizationOrgUrlSlugStoreIndexRoute,
  OrganizationOrgUrlSlugStoreStoreUrlSlugIndexRoute,
  OrganizationOrgUrlSlugStoreStoreUrlSlugProductsProductIdRoute,
  OrganizationOrgUrlSlugStoreStoreUrlSlugProductsNewRoute,
  OrganizationOrgUrlSlugStoreStoreUrlSlugProductsIndexRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/organization/",
        "/organization/$orgUrlSlug/",
        "/organization/$orgUrlSlug/settings/$storeUrlSlug",
        "/organization/$orgUrlSlug/settings/",
        "/organization/$orgUrlSlug/store/",
        "/organization/$orgUrlSlug/store/$storeUrlSlug/",
        "/organization/$orgUrlSlug/store/$storeUrlSlug/products/$productId",
        "/organization/$orgUrlSlug/store/$storeUrlSlug/products/new",
        "/organization/$orgUrlSlug/store/$storeUrlSlug/products/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/organization/": {
      "filePath": "organization/index.tsx"
    },
    "/organization/$orgUrlSlug/": {
      "filePath": "organization/$orgUrlSlug/index.tsx"
    },
    "/organization/$orgUrlSlug/settings/$storeUrlSlug": {
      "filePath": "organization/$orgUrlSlug/settings/$storeUrlSlug.tsx"
    },
    "/organization/$orgUrlSlug/settings/": {
      "filePath": "organization/$orgUrlSlug/settings/index.tsx"
    },
    "/organization/$orgUrlSlug/store/": {
      "filePath": "organization/$orgUrlSlug/store/index.tsx"
    },
    "/organization/$orgUrlSlug/store/$storeUrlSlug/": {
      "filePath": "organization/$orgUrlSlug/store/$storeUrlSlug/index.tsx"
    },
    "/organization/$orgUrlSlug/store/$storeUrlSlug/products/$productId": {
      "filePath": "organization/$orgUrlSlug/store/$storeUrlSlug/products/$productId.tsx"
    },
    "/organization/$orgUrlSlug/store/$storeUrlSlug/products/new": {
      "filePath": "organization/$orgUrlSlug/store/$storeUrlSlug/products/new.tsx"
    },
    "/organization/$orgUrlSlug/store/$storeUrlSlug/products/": {
      "filePath": "organization/$orgUrlSlug/store/$storeUrlSlug/products/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
