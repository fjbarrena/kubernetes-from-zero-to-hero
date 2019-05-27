<template>
  <div class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <table-list
            :title="title"
            :sub-title="subTitle"
            :data="roles"
            :columns="columns"
            :actions="actions"
          ></table-list>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="pull-right">
          <router-link to="role-detail/-1" class="btn btn-success btn-fill">New</router-link>
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
      roles: [],
      response: {},
      columns: ["id", "name", "description", "methods", "resources"],
      actions: [
        {
          class: "ti-new-window",
          link: "role-detail"
        }
      ]
    };
  },
  created() {
    Service.getRoles()
      .then(response => {
        console.log(JSON.stringify(response.data));
        this.response = response.data;
        response.data.map(role => {
          this.roles.push({
            id: role.id,
            name: role.name,
            description: role.description,
            resources: "",
            methods: ""
          });
          role.permissions.map(permission => {
            //TODO-fix: esto es un problema de los datos, no deberia ser necesario, ya que todo permission debe tener un resource
            if (permission.resource) {
              this.roles.push({
                id: "",
                name: "",
                description: "",
                resources: permission.resource.url,
                methods: permission.methods
              });
            }
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
