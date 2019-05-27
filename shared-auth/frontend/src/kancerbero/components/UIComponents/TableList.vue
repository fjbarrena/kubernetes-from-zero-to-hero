<template>
  <div>
    <div class="header">
      <slot name="header">
        <h4 class="title">{{title}}</h4>
        <p class="category">{{subTitle}}</p>
      </slot>
    </div>
    <div class="content table-responsive table-full-width">
      <table class="table" :class="tableClass">
        <thead>
          <th v-for="column in columns" :key=column>{{column | capitalize}}</th>
          <th v-if="hasActions()">Actions</th>
        </thead>
        <tbody>
          <!-- <div v-for="item in data"> -->
          <tr v-for="item in data" :key=item.id :class="`${item.id?'':'detail-row'}`">
            <td v-for="column in columns" :key=column>
              <span v-if="hasValue(item, column)">{{itemValue(item, column)}}</span>
            </td>
            <td>
              <span v-for="action in actions" :key=action.link>
                  <router-link
                    v-if="itemId(item)"
                    v-bind:to="`${action.link}/${itemId(item)}`"
                    v-bind:class="`icon-med ${action.class}`"
                  ></router-link>
                </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      enableType: {
        type: Boolean,
        default: false
      },
      actions: Array,
      columns: Array,
      data: Array,
      type: {
        type: String, // striped | hover
        default: "Striped"
      },
      title: {
        type: String,
        default: ""
      },
      subTitle: {
        type: String,
        default: ""
      }
    },
    computed: {
      tableClass() {
        return `table-${this.type}`;
      }
    },
  
    methods: {
      hasActions() {
        if (this.actions && this.actions.length > 0) {
          return true;
        } else {
          return false;
        }
      },
      hasValue(item, column) {
        let value = item[column.toLowerCase()];
        // console.log(value + " typeof " + typeof value);
        if (
          value !== "undefined" &&
          (typeof value === "string" || typeof value === "number")
        ) {
          return true;
        } else {
          return false;
        }
      },
      itemClass(item, column) {
        let value = item[column.toLowerCase()];
        console.log("returning class " + value.class);
        return value.class;
      },
      itemLink(item, column) {
        let value = item[column.toLowerCase()];
        console.log("returning class " + value.class);
        return value.link;
      },
      itemValue(item, column) {
        let value = item[column.toLowerCase()];
        return value;
      },
      itemId(item) {
        let value = item["id"];
        return value;
      },
    },
    filters: {
      capitalize(value) {
        if (!value) return "";
        value = value.toString();
        return value.charAt(0).toUpperCase() + value.slice(1);
      }
    }
  };
</script>

<style>
  .icon-med {
    font-size: 1.5em;
    margin: 5px;
    color: #68b3c8;
  }
  
  .detail-row {
    /* TODO fix CSS para que agrupe por resources*/
    border-top: yellow;
    border-right: none;
    border-bottom: none;
    border-left: none;
  }
</style>
 
