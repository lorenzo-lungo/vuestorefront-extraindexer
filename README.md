### This is the base extra indexer for new stuff on Elasticsearch

#### Copy the extra-indexer directory to vue-storefront/src/modules 

#### In vue-storefront/src/modules/index.ts add `import { indexerModule } from './extra-indexer';` and add

```javascript
export const registerModules: VueStorefrontModule[] = [
    indexerModule //add only this to the list not the full export const
]
``` 

#### For the widgetwall.vue you can add that to your theme components, for categories you only need to import it with `<WidgetWall :parent_id="categoryId" />` while for cms pages you have 2 ways

##### 1) in vue-storefront/src/themes/default/router/index.js or the router of your theme pass in the prop the group cms like this `props: {page: 'faq', title: 'faq', group: 'cms'}`
##### 2) in the component where you are importing the WidgetWall add 
```vue
props: {
    group: {
      type: String,
      default: 'cms'
    }
  }
``` 
#### Either way be sure your component has a page prop and a group prop so you can add the component with `<WidgetWall :group="$props.group" :page="$props.page" />`
