<template>
  <div class="card">
    <div class="header">
      <h4 class="title">JWT Configuration</h4>
    </div>
    <div class="content">
      <form>
        <div class="row">
          <div class="col-md-1">
            <input type="checkbox" checked="checked" :disabled="true"/>
          </div>
          <div class="col-md-2">
            <label>JWT Enabled</label>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <fg-input type="text" label="Algorithm" :disabled="true" v-model="metadata.algorithm"></fg-input>
          </div>
        </div>
  
        <div class="row">
          <div class="col-md-4">
            <fg-input type="text" label="Expiration" :disabled="true" v-model="metadata.expiration"></fg-input>
          </div>
        </div>
  
        <div class="row">
          <div class="col-md-8">
            <fg-input type="text" label="Secret" :disabled="true" v-bind:value="metadata.secret"></fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="pull-right">
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
        metadata: {},
        response: {}
      };
    },
    created() {
      Service.getAuthentication(1)
        .then(response => {
          this.metadata = response.data;
        })
        .catch(error => {
          console.log("There was an error:", error.response);
        });
    },
    methods: {
      save() {
        alert("Not implemented");
      },
      goBack() {
        window.history.length > 1 ?
          this.$router.go(-1) :
          this.$router.push('/')
      }
    }
  };
  //https://codepen.io/incyclum/pen/MqXmzo
</script>

<style>
  
</style>


