<template>
  <footer class="footer">
    <div class="container-fluid">
      <nav class="pull-left">
        <ul>
          <li>
            <router-link :to="{path:'/admin/overview'}">{{name}} v{{version}}</router-link>
          </li>
        </ul>
      </nav>
      <div class="pull-right">
        <!-- -->
      </div>
    </div>
  </footer>
</template>
<script>
import Service from "SharedAuth/services/backendService.js";
export default {
  created() {
    const metadata = Service.getMetadata();
    this.name = metadata.name;
    this.version = metadata.version;
  }
};
</script>
<style>
.footer-img {
  max-width: 200px !important;
  height: auto !important;
}
</style>
