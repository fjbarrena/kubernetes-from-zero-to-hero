<template>
  <div class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <table-list :title="title" :sub-title="subTitle" :data="providers" :actions="actions" :columns="columns"></table-list>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="pull-right">
          <router-link to="provider-detail/-1" class="btn btn-success btn-fill">New</router-link>
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
        title: "Authentication Provider List",
        subTitle: "List of authentication providers",
        providers: [],
        response: {},
        columns: ["id", "name", "type", "description", "domains", "active"],
        actions: [{
          class: "ti-new-window",
          link: "provider-detail"
        }],
      };
    },
    created() {
      Service.getProviders()
        .then(response => {
          this.response = response.data;
          response.data.map(provider => {
            this.providers.push({
              id: provider.id,
              name: provider.name,
              type: provider.type,
              description: provider.description,
              domains: provider.domains ? provider.domains.length : "0",
              active: provider.active
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
