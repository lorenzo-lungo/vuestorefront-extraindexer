<template>
  <div id="widgetwall">
    <div v-if="$props.group ">
      <li v-for="widget in lists" :key="widget.id">
        {{ widget.title }}
      </li>
    </div>
    <div v-if="$props.parent_id">
      <li v-for="widget in lists" :key="widget.id">
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
    props: {
      parent_id: {
        type: Number
      },
      group: {
        type: String
      },
      page: {
        type: String
      }
    },
    data () {
      return {
        lists: []
      }
    },
    beforeMount () {
      this.getList()
      this.getCmsList()
    },
    watch: {
      parent_id () {
        this.getList()
      },
      page () {
        this.getCmsList()
      }
    },
    methods: {
      getList () {
        if (this.$props.parent_id) {
          let query = new SearchQuery()
          query.applyFilter({key: 'cat_parameters', value: {'in': this.$props.parent_id}})
          return extraQuickSearchByQuery({query, entityType: 'widget_instance'})
                  .then((resp) => {
                    this.lists = resp.items
                  })
                  .catch(err => {
                    Logger.error(err, 'widget')()
                  })
        }
      },
      getCmsList () {
        if (this.$props.group && this.$props.group === 'cms') {
          let query = new SearchQuery()
          let adjustedFullPath = this.$root._route.fullPath.replace(/\/+$/, '')
          let path = adjustedFullPath.split('/').pop()
          if (this.$props.page === 'homepage') {
            path = 'homepage'
          }
          query.applyFilter({ key: 'decoded_parameters.route', value: { 'eq': path }})
          return extraQuickSearchByQuery({ query, entityType: 'widget_instance' })
                  .then((resp) => {
                    this.lists = resp.items
                  })
                  .catch(err => {
                    Logger.error(err, 'widget')()
                  })
        }
      }
    }
  }
</script>
