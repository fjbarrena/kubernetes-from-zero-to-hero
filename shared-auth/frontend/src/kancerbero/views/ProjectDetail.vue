<template>
  <div class="card">
    <div class="header">
      <h4 class="title">Project Detail</h4>
    </div>
    <div class="content">
      <form>
        <div class="row">
          <div class="col-md-1">
            <fg-input type="text" label="Id" :disabled="true" v-model="data.id"></fg-input>
          </div>
          <div class="col-md-3">
            <fg-input type="text" label="Name" v-model="data.name"></fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <fg-input type="text" label="Description" v-model="data.description"></fg-input>
          </div>
        </div>
        <!-- <div class="row" v-if="data.authProviders">
               <div class="col-md-10">
                <div class="card">    
                  <table-list
                    :title="titleProv"
                    :data="data.authProviders"
                    :columns="columnsProv"
                  ></table-list>
                </div>
              </div>
            </div> -->
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
  import TableList from "SharedAuth/components/UIComponents/TableList.vue";
  import Service from "SharedAuth/services/backendService.js";
  export default {
    components: {
      TableList
    },
    data() {
      return {
        data: {},
        id: {},
        // titleProv: "Authentication Provider List",
        // subTitle: "List of authentication providers",
        // columnsProv: ["id", "name", "type", "description","active"]
      };
    },
    created() {
      if (this.$route.params.id < 0) return;
      Service.getProvider(this.$route.params.id)
        .then(response => {
          console.log(JSON.stringify(response.data))
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
        if (this.data.active) {
          alert('Provider is active!');
          return
        }
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
