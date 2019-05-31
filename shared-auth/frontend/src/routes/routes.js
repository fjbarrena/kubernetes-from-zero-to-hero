import Authentication from "../kancerbero/views/Authentication.vue";
import Authorization from "../kancerbero/views/Authorization.vue";
import Configuration from "../kancerbero/views/Configuration.vue";
import DashboardLayout from "../components/Dashboard/Layout/DashboardLayout.vue";
import DomainDetail from "../kancerbero/views/DomainDetail.vue";
import DomainList from "../kancerbero/views/DomainList.vue";
import Icons from "../components/Dashboard/Views/Icons.vue";
import Log from "../kancerbero/views/Log.vue";
import Maps from "../components/Dashboard/Views/Maps.vue";
// GeneralViews
import NotFound from "../components/GeneralViews/NotFoundPage.vue";
import Notifications from "../components/Dashboard/Views/Notifications.vue";
// Admin pages
import Overview from "../components/Dashboard/Views/Overview.vue";
import ProjectDetail from "../kancerbero/views/ProjectDetail.vue";
import ProjectList from "../kancerbero/views/ProjectList.vue";
import ProviderDetail from "../kancerbero/views/ProviderDetail.vue";
import ProviderList from "../kancerbero/views/ProviderList.vue";
import ResourceDetail from "../kancerbero/views/ResourceDetail.vue";
import ResourceList from "../kancerbero/views/ResourceList.vue";
import RoleDetail from "../kancerbero/views/RoleDetail.vue";
import RoleList from "../kancerbero/views/RoleList.vue";
import TableList from "../components/Dashboard/Views/TableList.vue";
import Typography from "../components/Dashboard/Views/Typography.vue";
import UserDetail from "../kancerbero/views/UserDetail.vue";
import UserList from "../kancerbero/views/UserList.vue";
import UserProfile from "../components/Dashboard/Views/UserProfile.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/admin/overview"
  },
  {
    path: "/admin",
    component: DashboardLayout,
    redirect: "/admin/stats",
    children: [
      // SharedAuth ROUTES START
      {
        path: "domain",
        name: "domain",
        component: DomainList
      },
      {
        path: "project",
        name: "project",
        component: ProjectList
      },
      {
        path: "user",
        name: "user",
        component: UserList
      },
      {
        path: "overview",
        name: "overview",
        component: Overview
      },
      {
        path: "authentication",
        name: "authentication",
        component: Authentication
      },
      {
        path: "configuration",
        name: "configuration",
        component: Configuration
      },
      {
        path: "provider",
        name: "provider",
        component: ProviderList
      },
      {
        path: "authorization",
        name: "authorization",
        component: Authorization
      },
      {
        path: "resource",
        name: "resource",
        component: ResourceList
      },
      {
        path: "role",
        name: "role",
        component: RoleList
      },
      {
        path: "logs",
        name: "logs",
        component: Log
      },
      {
        path: "domain-detail/:id",
        name: "Domain Detail",
        component: DomainDetail
      },
      {
        path: "project-detail/:id",
        name: "Project Detail",
        component: ProjectDetail
      },
      {
        path: "user-detail/:id",
        name: "User Detail",
        component: UserDetail
      },
      {
        path: "provider-detail/:id",
        name: "Provider Detail",
        component: ProviderDetail
      },
      {
        path: "resource-detail/:id",
        name: "Resource Detail",
        component: ResourceDetail
      },
      {
        path: "role-detail/:id",
        name: "Role Detail",
        component: RoleDetail
      },

      // SharedAuth ROUTES END

      // TEMPLATE ROUTES START
      // https://www.creative-tim.com/product/vue-paper-dashboard
      {
        path: "overview",
        name: "overview",
        component: Overview
      },
      {
        path: "stats",
        name: "stats",
        component: UserProfile
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications
      },
      {
        path: "icons",
        name: "icons",
        component: Icons
      },
      {
        path: "maps",
        name: "maps",
        component: Maps
      },
      {
        path: "typography",
        name: "typography",
        component: Typography
      },
      {
        path: "table-list",
        name: "table-list",
        component: TableList
      }
    ]
  },
  {
    path: "*",
    component: NotFound
  }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
