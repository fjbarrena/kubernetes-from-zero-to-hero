<template>
  <div class="card">
    <div class="header">
      <h4 class="title">Id Provider</h4>
    </div>
    <div class="content">
      <form>
        <div class="row">
          <div class="col-md-1">
            <fg-input type="text" label="Id" :disabled="true" v-model="data.id"></fg-input>
          </div>
          <div class="col-md-5">
            <fg-input type="text" label="Name" :disabled="false" v-model="data.name"></fg-input>
          </div>
          <div class="col-md-2">
            <fg-input type="text" label="Type" :disabled="false" v-model="data.type"></fg-input>
          </div>
          <div class="col-md-2">
            <fg-input type="text" label="Order" :disabled="false" v-model="data.order"></fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-10">
            <fg-input type="text" label="Description" v-model="data.description"></fg-input>
          </div>
        </div>
  
        <div>
          <h5 class="title">Connection Settings</h5>
        </div>
        <div class="row" v-if="data.connectionParams">
          <div class="col-md-4">
            <fg-input type="text" label="Url" v-model="data.connectionParams.url"></fg-input>
          </div>
          <div class="col-md-6">
            <fg-input type="text" label="Base" v-model="data.connectionParams.base"></fg-input>
          </div>
        </div>
        <div class="row" v-if="data.connectionParams">
          <div class="col-md-4">
            <fg-input type="password" label="Password" v-model="data.connectionParams.password"></fg-input>
          </div>
          <div class="col-md-6">
            <fg-input type="text" label="User" v-model="data.connectionParams.user"></fg-input>
          </div>
        </div>
        <div>
          <h5 class="title">Filter Settings</h5>
        </div>
        <div class="row" v-if="data.searchParams">
          <div class="col-md-4">
            <fg-input type="text" label="Scope" v-model="data.searchParams.scope"></fg-input>
          </div>
          <div class="col-md-6">
            <fg-input type="text" label="Filter" v-model="data.searchParams.filter"></fg-input>
          </div>
        </div>
        <span v-if="data.mappingParams && data.mappingParams.role">
          <h5 class="title">Role Mapping</h5>
          <div class="row">
            <div class="col-md-10">
              <pre>{{data.mappingParams.role}}</pre>
            </div>
          </div>
        </span>
            <span v-if="data.mappingParams && data.mappingParams.input">
          <h5 class="title">Input Mapping</h5>
          <div class="row">
            <div class="col-md-10">
              <pre>{{data.mappingParams.input}}</pre>
            </div>
          </div>
        </span>
            <span v-if="data.mappingParams && data.mappingParams.output">
          <h5 class="title">Output Mapping</h5>
          <div class="row">
            <div class="col-md-10">
              <pre>{{data.mappingParams.output}}</pre>
            </div>
          </div>
        </span>
  
        <div class="row">
          <div class="col-md-12">
            <div class="pull-left">
              <button class="btn btn-danger btn-fill" @click.prevent="destroy">Delete</button>
            </div>
            <div class="pull-right">
              <span class="margin-right">
                          <input type="checkbox" label="Active" v-model="data.active"/>
                          <label>Active</label>
                          </span>
              <button class="btn btn-warn btn-fill" @click.prevent="goBack">Back</button>
              <button class="btn btn-info btn-fill" @click.prevent="save">Save</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import Service from "SharedAuth/services/backendService.js";
  export default {
    data() {
      return {
        data: {},
        id: {},
      };
    },
    created() {
      if (this.$route.params.id < 0) {
        return
      }
      Service.getProvider(this.$route.params.id)
        .then(response => {
          this.data = response.data;
        })
        .catch(error => {
          console.log("There was an error:", error.response);
        });
    },
    methods: {
      save() {
        Service.saveProvider(this.data)
          .then(response => {
            this.data = response.data;
            alert('saved!')
          })
          .catch(error => {
            console.log("There was an error:", error.response);
          });
  
      },
      destroy() {
        Service.deleteProvider(this.data.id)
          .then(() => {
            alert('deleted!');
            this.data = {}
          })
          .catch(error => {
            console.log("There was an error:", error.response);
          });
      },
      goBack() {
        window.history.length > 1 ?
          this.$router.go(-1) :
          this.$router.push('/')
      }
    }
  };
</script>

<style>
  .margin-right {
    margin-right: 80px !important;
  }
</style>
