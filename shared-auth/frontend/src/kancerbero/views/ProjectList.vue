<template>
  <div class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <table-list
            :title="title"
            :sub-title="subTitle"
            :data="projects"
            :columns="columns"
            :actions="actions"
          ></table-list>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="pull-right">
          <router-link to="project-detail/-1" class="btn btn-success btn-fill">New</router-link>
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
      title: "Project List",
      subTitle: "List of projects which you have access",
      projects: [],
      response: {},
      columns: [
        "id",
        "name",
        "description",
        "active",
        "providers",
        "resources",
        "roles"
      ],
      actions: [
        {
          class: "ti-new-window",
          link: "project-detail"
        }
      ]
    };
  },
  created() {
    Service.getProjects()
      .then(response => {
        this.response = response.data;
        response.data.map(project => {
          this.projects.push({
            id: project.id,
            name: project.name,
            description: project.description,
            active: project.active,
            providers: project.authProviders.length,
            resources: project.resources.length,
            roles: project.roles.length
          });
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
