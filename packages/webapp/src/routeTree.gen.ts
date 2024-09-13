/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as OrganizationIndexImport } from './routes/organization/index'
import { Route as OrganizationOrgNameIndexImport } from './routes/organization/$orgName/index'
import { Route as OrganizationOrgNameStoreIndexImport } from './routes/organization/$orgName/store/index'
import { Route as OrganizationOrgNameStoreStoreNameIndexImport } from './routes/organization/$orgName/store/$storeName/index'
import { Route as OrganizationOrgNameStoreStoreNameProductsIndexImport } from './routes/organization/$orgName/store/$storeName/products/index'
import { Route as OrganizationOrgNameStoreStoreNameProductsNewImport } from './routes/organization/$orgName/store/$storeName/products/new'
import { Route as OrganizationOrgNameStoreStoreNameProductsProductIdImport } from './routes/organization/$orgName/store/$storeName/products/$productId'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const OrganizationIndexRoute = OrganizationIndexImport.update({
  path: '/organization/',
  getParentRoute: () => rootRoute,
} as any)

const OrganizationOrgNameIndexRoute = OrganizationOrgNameIndexImport.update({
  path: '/organization/$orgName/',
  getParentRoute: () => rootRoute,
} as any)

const OrganizationOrgNameStoreIndexRoute =
  OrganizationOrgNameStoreIndexImport.update({
    path: '/organization/$orgName/store/',
    getParentRoute: () => rootRoute,
  } as any)

const OrganizationOrgNameStoreStoreNameIndexRoute =
  OrganizationOrgNameStoreStoreNameIndexImport.update({
    path: '/organization/$orgName/store/$storeName/',
    getParentRoute: () => rootRoute,
  } as any)

const OrganizationOrgNameStoreStoreNameProductsIndexRoute =
  OrganizationOrgNameStoreStoreNameProductsIndexImport.update({
    path: '/organization/$orgName/store/$storeName/products/',
    getParentRoute: () => rootRoute,
  } as any)

const OrganizationOrgNameStoreStoreNameProductsNewRoute =
  OrganizationOrgNameStoreStoreNameProductsNewImport.update({
    path: '/organization/$orgName/store/$storeName/products/new',
    getParentRoute: () => rootRoute,
  } as any)

const OrganizationOrgNameStoreStoreNameProductsProductIdRoute =
  OrganizationOrgNameStoreStoreNameProductsProductIdImport.update({
    path: '/organization/$orgName/store/$storeName/products/$productId',
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
    '/organization/$orgName/': {
      id: '/organization/$orgName/'
      path: '/organization/$orgName'
      fullPath: '/organization/$orgName'
      preLoaderRoute: typeof OrganizationOrgNameIndexImport
      parentRoute: typeof rootRoute
    }
    '/organization/$orgName/store/': {
      id: '/organization/$orgName/store/'
      path: '/organization/$orgName/store'
      fullPath: '/organization/$orgName/store'
      preLoaderRoute: typeof OrganizationOrgNameStoreIndexImport
      parentRoute: typeof rootRoute
    }
    '/organization/$orgName/store/$storeName/': {
      id: '/organization/$orgName/store/$storeName/'
      path: '/organization/$orgName/store/$storeName'
      fullPath: '/organization/$orgName/store/$storeName'
      preLoaderRoute: typeof OrganizationOrgNameStoreStoreNameIndexImport
      parentRoute: typeof rootRoute
    }
    '/organization/$orgName/store/$storeName/products/$productId': {
      id: '/organization/$orgName/store/$storeName/products/$productId'
      path: '/organization/$orgName/store/$storeName/products/$productId'
      fullPath: '/organization/$orgName/store/$storeName/products/$productId'
      preLoaderRoute: typeof OrganizationOrgNameStoreStoreNameProductsProductIdImport
      parentRoute: typeof rootRoute
    }
    '/organization/$orgName/store/$storeName/products/new': {
      id: '/organization/$orgName/store/$storeName/products/new'
      path: '/organization/$orgName/store/$storeName/products/new'
      fullPath: '/organization/$orgName/store/$storeName/products/new'
      preLoaderRoute: typeof OrganizationOrgNameStoreStoreNameProductsNewImport
      parentRoute: typeof rootRoute
    }
    '/organization/$orgName/store/$storeName/products/': {
      id: '/organization/$orgName/store/$storeName/products/'
      path: '/organization/$orgName/store/$storeName/products'
      fullPath: '/organization/$orgName/store/$storeName/products'
      preLoaderRoute: typeof OrganizationOrgNameStoreStoreNameProductsIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  OrganizationIndexRoute,
  OrganizationOrgNameIndexRoute,
  OrganizationOrgNameStoreIndexRoute,
  OrganizationOrgNameStoreStoreNameIndexRoute,
  OrganizationOrgNameStoreStoreNameProductsProductIdRoute,
  OrganizationOrgNameStoreStoreNameProductsNewRoute,
  OrganizationOrgNameStoreStoreNameProductsIndexRoute,
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
        "/organization/$orgName/",
        "/organization/$orgName/store/",
        "/organization/$orgName/store/$storeName/",
        "/organization/$orgName/store/$storeName/products/$productId",
        "/organization/$orgName/store/$storeName/products/new",
        "/organization/$orgName/store/$storeName/products/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/organization/": {
      "filePath": "organization/index.tsx"
    },
    "/organization/$orgName/": {
      "filePath": "organization/$orgName/index.tsx"
    },
    "/organization/$orgName/store/": {
      "filePath": "organization/$orgName/store/index.tsx"
    },
    "/organization/$orgName/store/$storeName/": {
      "filePath": "organization/$orgName/store/$storeName/index.tsx"
    },
    "/organization/$orgName/store/$storeName/products/$productId": {
      "filePath": "organization/$orgName/store/$storeName/products/$productId.tsx"
    },
    "/organization/$orgName/store/$storeName/products/new": {
      "filePath": "organization/$orgName/store/$storeName/products/new.tsx"
    },
    "/organization/$orgName/store/$storeName/products/": {
      "filePath": "organization/$orgName/store/$storeName/products/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
