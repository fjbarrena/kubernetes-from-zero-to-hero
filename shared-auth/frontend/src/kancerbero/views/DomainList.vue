<template>
  <div class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <table-list
            :title="title"
            :sub-title="subTitle"
            :data="domains"
            :columns="columns"
            :actions="actions"
          ></table-list>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="pull-right">
          <router-link to="domain-detail/-1" class="btn btn-success btn-fill">New</router-link>
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
      title: "Domain List",
      subTitle: "List of domains",
      domains: [],
      response: {},
      columns: ["Id", "Name", "Description", "Active"],
      actions: [
        {
          class: "ti-new-window",
          link: "domain-detail"
        }
      ]
    };
  },
  created() {
    Service.getDomains()
      .then(response => {
        this.response = response.data;
        response.data.map(domain => {
          let _domain = {
            id: domain.id,
            name: domain.name,
            description: domain.description,
            active: domain.active
          };
          this.domains.push(_domain);
        });
      })
      .catch(error => {
        console.log("There was an error:", error.response);
      });
  }
};
</script>
<style>
</style>
