import {gql} from 'graphql-tag'

export const MenuQuery = gql`
query MenuQuery ($menu: string!){
  menu(name: $menu) {
    id
    items {
      internal
      title
      url
      route {
        ... on RouteInternal {
          __typename
          entity {
            ... on NodePageNews {
              id
              image {
                alt
                height
                mime
                size
                title
                url
              }
              body {
                format
                summary
                value
              }
              paragraph {
                ... on ParagraphParagraph1Poc {
                  id
                  body {
                    format
                  }
                }
              }
              path
              status
              title
            }
            ... on NodePageNewsList {
              id
              body {
                format
                value
              }
              path
              title
            }
          }
        }
      }
    }
  }
}`