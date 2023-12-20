import { defineNuxtModule, addPlugin, createResolver, extendPages } from '@nuxt/kit'
//import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { ApolloClient } from '@apollo/client/core/ApolloClient.js'
import { InMemoryCache } from '@apollo/client/cache/index.js'
import { RouterQuery } from './service/graphql/query/router/Router'
import { resolve } from 'path'

// Module options TypeScript interface definition
export interface ModuleOptions {
  endpoint: string
}
// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'drupal-graphql',
    configKey: 'drupalGraphql'
  },
  // Default configuration options of the Nuxt module
  defaults: {
    endpoint: ''
  },
  setup (options: ModuleOptions, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    //addPlugin(resolver.resolve('./runtime/plugin'))
    // Create the apollo client
    const apolloClient = new ApolloClient({
      uri: options.endpoint,
      cache: new InMemoryCache()
    })

    apolloClient.query({query: RouterQuery}).then((result) => {
      if(result){
        //console.log(result.data.entityQuery.items)
        result.data.entityQuery.items.forEach((value: any, index: any) => {
          if(value && value.hasOwnProperty("entityBundle")){
            const bundle = value.entityBundle.replaceAll('_','-')
            console.log(value);
            if(value.hasOwnProperty("url")){
              extendPages((pages) => {
                pages.push({
                  name: value.url.path,
                  path: value.url.path,
                  file: resolve('pages/' + bundle + '.vue')
                })
              })
            }
          }
        });
      }
    })
  }
})
