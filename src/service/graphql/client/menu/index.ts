import {MenuQuery} from '../../query/menu'
import { useQuery } from '@vue/apollo-composable'
import { useNuxtApp } from '#imports'
export default async function getRoutes(MENU :string) {
  //const { $graphqlClient } = useNuxtApp();
  /*const { data } = await $graphqlClient.useQuery({
    query: MenuQuery,
    variables: { menu: MENU }
  });  
  return data.countries;*/
  return [];
}
