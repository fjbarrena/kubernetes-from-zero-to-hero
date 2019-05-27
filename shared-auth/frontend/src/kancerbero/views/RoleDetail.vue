<template>
  <div class="card">
    <div class="header">
      <h4 class="title">Role</h4>
    </div>
    <div class="content">
      <form>
        <div class="row">
          <div class="col-md-1">
            <fg-input type="text" label="Id" :disabled="true" v-model="data.id"></fg-input>
          </div>
          <div class="col-md-3">
            <fg-input type="text" label="Name" :disabled="false" v-model="data.name"></fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <fg-input type="text" label="Description" v-model="data.description"></fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <h5 class="title pull-left">Permissions</h5>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <label>Available Resources</label>
            <select id="availableResources" size="5" class="form-control border-input auto">
                              <option v-for="resource in resources" :value="resource">{{resource.url}}</option>
                                    </select>
          </div>
          <div class="col-md-4">
            <label>Selected Resources</label>
            <select id="selectedResources" size="5" class="form-control border-input auto">
                                  <option v-for="permission in data.permissions"  :value="permission.resource">{{permission.resource.url}}</option>
                                    </select>
          </div>
          <div class="col-md-4">
            <label>Methods</label>
            <select id="selectedMethods" multiple size="5" class="form-control border-input auto">
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="PATCH">PATCH</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="pull-right">
              <button class="btn btn-info ti-plus" @click.prevent="addResource()"></button>
            </div>
          </div>
          <div class="col-md-4">
            <div class="pull-right">
              <div class="btn btn-danger ti-minus" @click.prevent="removeResource()"></div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="pull-left">
              <button class="btn btn-danger btn-fill" @click.prevent="destroy">Delete</button>
            </div>
            <div class="pull-right">
              <span class="margin-right">
                <input type="checkbox" label="Active" v-model="data.active"></input>
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
        resources: [],
      };
    },
    created() {
      if (this.$route.params.id < 0) return;
      Service.getRole(this.$route.params.id)
        .then(response => {
          this.data = response.data;
          Service.getResources()
            .then(response => {
              const selectedIds = [];
              if (this.data.permissions) {
                this.data.permissions.map(permission => {
                  selectedIds.push(permission.resource.id);
                });
              }
              response.data.map(resource => {
                if (selectedIds.indexOf(resource.id) < 0) {
                  this.resources.push(resource);
                }
              });
            })
            .catch(error => {
              console.log("There was an error:", error.response);
            })
        });
    },
    methods: {
      addResource() {
        const availableResources = document.getElementById('availableResources');
        const selectedResource = availableResources.options[availableResources.selectedIndex]
        const selectedResources = document.getElementById('selectedResources');
        selectedResources[selectedResources.length] = selectedResource;
      },
      removeResource() {
        const availableResources = document.getElementById('availableResources');
        const selectedResources = document.getElementById('selectedResources');
        const selectedResource = selectedResources.options[selectedResources.selectedIndex]
        availableResources[availableResources.length] = selectedResource;
      },
      save() {
        Service.saveRole(this.data)
          .then(response => {
            this.data = response.data;
            alert('saved!')
          })
          .catch(error => {
            console.log("There was an error:", error.response);
          });
  
      },
      destroy() {
        Service.deleteRole(this.data.id)
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
  
  .auto {
    overflow: auto;
  }
</style>
