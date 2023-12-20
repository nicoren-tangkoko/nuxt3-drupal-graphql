
import {gql} from 'graphql-tag'

export const RouterQuery = gql`
query MyQuery {
    entityQuery(entityType: NODE) {
      items {
        id
        entityBundle
        langcode
        ... on NodePageNews {
          url {
            path
          }
        }
        ... on NodePageNewsList {
          url {
            path
          }
        }
        ... on NodePerson {
          url {
            path
          }
        }
        ... on NodeSeminar {
          url {
            path
          }
        }
      }
    }
  }`