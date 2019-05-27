<template>
  <div class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <table-list
            :title="title"
            :sub-title="subTitle"
            :data="resources"
            :actions="actions"
            :columns="columns"
          ></table-list>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="pull-right">
          <router-link to="resource-detail/-1" class="btn btn-success btn-fill">New</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TableList from "SharedAuth/components/UIComponents/TableList.vue";
import Service from "SharedAuth/services/backendService.js";

export default {
  components: {
    TableList
  },
  data() {
    return {
      title: "Resources List",
      subTitle: "",
      resources: [],
      response: {},
      columns: ["id", "url", "name", "description", "active"],
      actions: [
        {
          class: "ti-new-window",
          link: "resource-detail"
        }
        // ,{ class: "fa fa-trash", link: "resource-destroy" }
      ]
    };
  },
  created() {
    Service.getResources()
      .then(response => {
        this.response = response.data;
        response.data.map(resource => {
          this.resources.push({
            id: resource.id,
            url: resource.url,
            name: resource.name,
            description: resource.description,
            active: resource.active
          });
        });
      })
      .catch(error => {
        console.log("There was an error:", error.response);
      });
  },
  methods: {
    create() {
      alert("new");
    }
  }
};
</script>
<style>
</style>
