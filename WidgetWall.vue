<template>
  <div id="widgetwall">
    <div v-if="parent === 'cms' ">
      <li v-for="widget in lists">
        {{ widget.title }}
      </li>
    </div>
    <div v-if="category">
      <li v-for="widget in lists">
        {{ widget.title }}
      </li>
    </div>
  </div>
</template>
<script>
import { extraQuickSearchByQuery } from 'src/modules/extra-indexer/components/search'
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'
import { Logger } from '@vue-storefront/core/lib/logger'
import _ from 'lodash'

export default {
  name: 'WidgetWall',
  data () {
    return {
      lists: [],
      grouped: [],
      parent: '',
      category: ''
    }
  },
  created () {
    console.log(this.$parent._props)
    if (this.$parent._props && this.$parent._props.group === 'cms') {
      this.parent = this.$parent._props.group
      let query = new SearchQuery()
      let path = this.$root._route.fullPath.split('/').pop()
      query.applyFilter({ key: 'route_parameters.route', value: { 'eq': path }})
      return extraQuickSearchByQuery({ query, entityType: 'widget_instance' })
        .then((resp) => {
          this.lists = resp.items
        })
        .catch(err => {
          Logger.error(err, 'faq')()
        })
    }
    if (this.$parent.categoryId) {
      this.category = this.$parent.categoryId
      let query = new SearchQuery()
      query.applyFilter({ key: 'route_parameters.category', value: { 'in': this.$parent.categoryId }})
      return extraQuickSearchByQuery({ query, entityType: 'widget_instance' })
        .then((resp) => {
          this.lists = resp.items
        })
        .catch(err => {
          Logger.error(err, 'faq')()
        })
    }
  }
}
</script>
