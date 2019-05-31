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
export default {
  created() {
    this.name = "Nombre";
    this.version = "Version";
  }
};
</script>
<style>
.footer-img {
  max-width: 200px !important;
  height: auto !important;
}
</style>
