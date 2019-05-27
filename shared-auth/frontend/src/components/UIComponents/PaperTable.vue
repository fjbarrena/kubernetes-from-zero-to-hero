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
          <th v-for="column in columns">{{column}}</th>
        </thead>
        <tbody>
          <tr v-for="item in data">
            <td v-for="column in columns">
              <span v-if="hasValue(item, column)">{{itemValue(item, column)}}</span>
              <span v-if="hasIcon(item, column)">
                <button class="btn btn-sm btn-success btn-icon">
                  <i class="fa fa-eye"></i>
                </button>
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
    hasIcon(item, column) {
      let value = item[column.toLowerCase()];
      if (value !== "undefined" && typeof value === "object") {
        return true;
      } else {
        return false;
      }
    },
    hasValue(item, column) {
      let value = item[column.toLowerCase()];
      if (
        value !== "undefined" &&
        (typeof value === "string" || typeof value === "number")
      ) {
        return true;
      } else {
        return false;
      }
    },
    itemValue(item, column) {
      return item[column.toLowerCase()];
    }
  }
};
</script>
<style>
</style>
 
