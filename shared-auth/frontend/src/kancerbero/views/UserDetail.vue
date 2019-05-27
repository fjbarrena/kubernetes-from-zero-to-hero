<template>
  <div class="card">
    <div class="header">
      <h4 class="title">User</h4>
    </div>
    <div class="content">
      <form>
        <div class="row">
          <div class="col-md-1">
            <fg-input type="text" label="Id" :disabled="true" v-model="data.id"></fg-input>
          </div>
          <div class="col-md-3">
            <fg-input type="text" label="Email" :disabled="true" v-model="data.email"></fg-input>
          </div>
           <div class="col-md-2">
            <fg-input type="text" label="Groups" v-model="data.group"></fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3">
            <fg-input type="text" label="Name" v-model="data.name"></fg-input>
          </div>
          <div class="col-md-3">
            <fg-input type="text" label="Surname" v-model="data.surname"></fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <ul>
              <li v-for="project in getDomainNames()">{{project}}</li>
            </ul>
          </div>
        </div>

        <!-- <div class="row">
          <div class="col-md-12">
            <fg-input type="text" label="Address" placeholder="Home Address" v-model="user.address"></fg-input>
          </div>
        </div>-->
        <!-- <div class="row">
          <div class="col-md-4">
            <fg-input type="text" label="City" placeholder="City" v-model="user.city"></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text" label="Country" placeholder="Country" v-model="user.country"></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              type="number"
              label="Postal Code"
              placeholder="ZIP Code"
              v-model="user.postalCode"
            ></fg-input>
          </div>
        </div>-->
        <!-- <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>About Me</label>
              <textarea
                rows="5"
                class="form-control border-input"
                placeholder="Here can be your description"
                v-model="user.aboutMe"
              ></textarea>
            </div>
          </div>
        </div>-->
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
      projects: ["uno","dos"],
    };
  },
  created() {
    if (this.$route.params.id < 0) return;
    Service.getUser(this.$route.params.id)
      .then(response => {
           this.data = response.data;
      })
      .catch(error => {
        console.log("There was an error:", error.response);
      });
  },
  computed: {

  },
  methods: {
    save() {
        Service.saveUser(this.data)
      .then(response => {
        this.data = response.data;
        alert('saved!')
      })
      .catch(error => {
        console.log("There was an error:", error.response);
      });
      
    },
    destroy() {
      Service.deleteUser(this.data.id)
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
    },
        getDomainNames() {
      const projects = []
      if (this.data.projects ) {
        for(let id in this.data.projects) {
          const project = this.data.projects[id];
          projects.push(project.name + ' '+project.description)
        }
      }
      return projects;
    }
  }
};
</script>
<style>
.margin-right{
    margin-right: 80px !important;
}
</style>
