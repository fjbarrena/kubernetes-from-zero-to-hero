<template>
  <div class="card">
    <div class="header">
      <h4 class="title">Domain</h4>
    </div>
    <div class="content">
      <form>
        <div class="row">
          <div class="col-md-1">
            <fg-input type="text" label="Id" :disabled="true" v-model="data.id"></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text" label="Projects" v-model="data.name"></fg-input>
          </div>
          <!-- <div class="col-md-1">
            <fg-input type="text" label="Name" :disabled="true" v-model="data.projects"></fg-input>
          </div> -->
        </div>

        <div class="row">
             <div class="col-md-6">
            <fg-input type="text" label="Description" v-model="data.description"></fg-input>
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
    };
  },
  created() {
    if (this.$route.params.id >0) {
    Service.getDomain(this.$route.params.id)
      .then(response => {
        console.log(JSON.stringify(response.data))
           this.data = response.data;
      })
      .catch(error => {
        console.log("There was an error:", error.response);
      });
    }
  },
  methods: {
    save() {
        Service.saveDomain(this.data)
      .then(response => {
        this.data = response.data;
        alert('saved!')
      })
      .catch(error => {
        console.log("There was an error:", error.response);
      });
      
    },
    destroy() {
      Service.deleteDomain(this.data.id)
      .then(() => {
        alert('deleted!');
        this.data = {}
      })
      .catch(error => {
        console.log("There was an error:", error.response);
      });
    },
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  }
};
</script>
<style>
.margin-right{
    margin-right: 80px !important;
}
</style>
