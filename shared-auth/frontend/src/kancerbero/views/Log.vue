<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <table-list :title="title" :sub-title="subTitle" :data="logs" :columns="columns"></table-list>
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
      title: "Log List",
      subTitle: "",
      logs: [],
      response: {},
      columns: [
        "Response",
        "Operation",
        "Method",
        "Url",
        "Project",
        "Timestamp"
      ]
    };
  },
  created() {
    Service.getLogs()
      .then(response => {
        this.response = response.data;
        response.data.map(log => {
          console.log("resource " + JSON.stringify(log));
          // this.projects.push({
          //   id: project.id,
          //   name: project.name,
          //   description: project.description,
          //   active: project.active,
          //   providers: project.authProviders.length,
          //   resources: project.resources.length,
          //   roles: project.roles.length
          // });
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
