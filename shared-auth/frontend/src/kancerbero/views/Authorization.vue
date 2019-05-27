<template>
  <div class="card">
    <div class="content">
      <form>
        <div>
          <h5 class="title">Request</h5>
        </div>
        <br>
        <div class="row">
          <div class="col-md-9">
            <fg-input type="text" label="HEADERS" :disabled="true" v-model="header"></fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-9">
            <fg-input size="100" type="text" label="Bearer" v-model="bearer"></fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-2">
            <label class=" border-input">
              Method
            </label>
            <select v-model="method" class="form-control border-input">
                  <option value="GET" selected>GET</option>
                  <option value="PUT">PUT</option>
                  <option value="POST">POST</option>
                  <option value="DELETE">DELETE</option>
                </select>
          </div>
          <div class="col-md-4">
            <fg-input type="text" label="URL" value="http://localhost:3000/api/auth" :disabled="true"></fg-input>
          </div>
          <div class="col-md-3">
            <fg-input type="text" label="Resource" v-model="resource"></fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-9">
            <div class="pull-right">
              <button class="btn btn-info btn-fill" @click.prevent="authorize()">Authorize</button>
            </div>
          </div>
        </div>
        <div class="row" v-if="response">
          <hr>
          <div>
            <h5 class="title">Response</h5>
          </div>
        </div>
        <div class="row" v-if="response">
          <div class="col-md-9">
            <fg-input type="text" label="Status" v-model="status"></fg-input>
          </div>
        </div>
        <div class="row" v-if="response">
          <div class="col-md-9">
            <fg-input type="text" label="Headers" v-model="headers"></fg-input>
          </div>
        </div>
        <div class="row" v-if="response">
          <div class="col-md-8">
            <textarea readonly cols="80" rows="10">{{response}}</textarea>
          </div>
        </div>
        <div class="row" v-if="response">
          <div class="col-md-9">
            <div class="pull-right">
              <button class="btn btn-danger btn-fill" @click.prevent="clear()">Clear</button>
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
        method: "GET",
        url: "",
        body: {},
        response: null,
        bearer: "",
        resource: "",
        status: null,
        headers: null,
        header: JSON.stringify({
          'Content-Type': 'application/json'
        }),
        id: {},
      };
    },
    computed: {
      viewbody() {
        return JSON.stringify(this.body);
      },
      requestify() {
        return JSON.stringify(this.request);
      },
      responded() {
        return {
          hidden: this.response === null
        }
      }
    },
    methods: {
      clear() {
        this.response = null;
      },
      authorize() {
        Service.authorize(this.method, this.bearer, this.resource)
          .then(response => {
            console.log(JSON.stringify(response))
            this.response = response.data;
            this.status = response.status + ":" + response.statusText;
            this.headers = JSON.stringify(response.headers)
          })
          .catch(error => {
            console.error("There was an error:", error);
            this.status = error.response.status + ":" + error.response.statusText;
            this.headers = JSON.stringify(error.response.headers)
            this.response = error.response.data;
          });
  
      },
      goBack() {
        window.history.length > 1 ?
          this.$router.go(-1) :
          this.$router.push('/')
      }
    }
  }
</script>

<style>
  .margin-right {
    margin-right: 80px !important;
  }
  
  .hidden {
    display: none;
  }
</style>
