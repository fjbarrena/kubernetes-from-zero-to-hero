<template>
  <div class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <table-list
            :title="title"
            :sub-title="subTitle"
            :data="users"
            :columns="columns"
            :actions="actions"
          ></table-list>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="pull-right">
          <router-link to="user-detail/-1" class="btn btn-success btn-fill">New</router-link>
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
      title: "User List",
      subTitle: "List of users",
      users: [],
      response: {},
      columns: ["id", "name", "surname", "email", "active"],
      actions: [
        {
          class: "ti-new-window",
          link: "user-detail"
        }
      ]
    };
  },
  created() {
    Service.getUsers()
      .then(response => {
        this.response = response.data;
        response.data.map(user => {
          this.users.push({
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            active: user.active
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
