import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'

export const KEY = 'indexer'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
}

export const indexerModule = new VueStorefrontModule(moduleConfig)
