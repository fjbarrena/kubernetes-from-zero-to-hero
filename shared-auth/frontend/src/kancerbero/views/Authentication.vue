<template>
  <div class="card">
    <div class="content">
      <form>
        <div>
          <h5 class="title">Request</h5>
        </div>
        <label>Choose an example:</label>
        <div class="row">
          <div class="col-md-3">
            <div class="pull-right">
              <button class="btn btn-warn btn-fill" @click.prevent="localbbdd()">AUTH BBDD</button>
            </div>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-md-3">
            <fg-input type="text" label="Project" :disabled="false" v-model="body.project"></fg-input>
          </div>
          <div class="col-md-3">
            <fg-input type="text" label="User" :disabled="false" v-model="body.user"></fg-input>
          </div>
          <div class="col-md-3" v-if="body.password">
            <fg-input type="text" label="Password" :disabled="false" v-model="body.password"></fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-9">
            <fg-input type="text" label="HEADER" :disabled="true" v-model="header"></fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <fg-input type="text" label="METHOD" :disabled="true" v-model="method"></fg-input>
          </div>
          <div class="col-md-6">
            <fg-input type="text" label="URL" :disabled="true" v-model="url"></fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-9">
            <label>BODY</label>
          </div>
        </div>
        <div class="row">
          <div class="col-md-9">
            <pre>{{viewbody}}</pre>
          </div>
        </div>
        <div class="row">
          <div class="col-md-9">
            <div class="pull-right">
              <button class="btn btn-info btn-fill" @click.prevent="authenticate()">Authenticate</button>
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
          <div class="col-md-9">
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
      method: "POST",
      url: "http://localhost:3000/api/login",
      body: {},
      response: null,
      status: null,
      headers: null,
      header: JSON.stringify({
        Accept: "application/json",
        "Content-Type": "application/json"
      }),
      id: {}
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
      };
    }
  },
  methods: {
    localbbdd() {
      this.body = {
        user: "elon@tesla.com",
        project: "DB-LOCAL",
        password: "123"
      };
    },
    clear() {
      this.response = null;
    },
    authenticate() {
      this.request = null;
      Service.authenticate(this.body)
        .then(response => {
          console.log(JSON.stringify(response));
          this.response = response.data;
          this.status = response.status + ":" + response.statusText;
          this.headers = JSON.stringify(response.headers);
        })
        .catch(error => {
          console.error("There was an error:", error);
          this.status =
            error.response.data.status + ":" + error.response.data.statusText;
          this.headers = JSON.stringify(error.response.data.headers);
          this.response = error.response.data;
        });
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    }
  }
};
</script>

<style>
.margin-right {
  margin-right: 80px !important;
}

.hidden {
  display: none;
}
</style>
