import Authentication from 'src/SharedAuth/views/Authentication.vue'
import Authorization from 'src/SharedAuth/views/Authorization.vue'
import Configuration from 'src/SharedAuth/views/Configuration.vue'
import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
import DomainDetail from 'src/SharedAuth/views/DomainDetail.vue'
import DomainList from 'src/SharedAuth/views/DomainList.vue'
import Icons from 'src/components/Dashboard/Views/Icons.vue'
import Log from 'src/SharedAuth/views/Log.vue'
import Maps from 'src/components/Dashboard/Views/Maps.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'
import Notifications from 'src/components/Dashboard/Views/Notifications.vue'
// Admin pages
import Overview from 'src/components/Dashboard/Views/Overview.vue'
import ProjectDetail from 'src/SharedAuth/views/ProjectDetail.vue'
import ProjectList from 'src/SharedAuth/views/ProjectList.vue'
import ProviderDetail from 'src/SharedAuth/views/ProviderDetail.vue'
import ProviderList from 'src/SharedAuth/views/ProviderList.vue'
import ResourceDetail from 'src/SharedAuth/views/ResourceDetail.vue'
import ResourceList from 'src/SharedAuth/views/ResourceList.vue'
import RoleDetail from 'src/SharedAuth/views/RoleDetail.vue'
import RoleList from 'src/SharedAuth/views/RoleList.vue'
import TableList from 'src/components/Dashboard/Views/TableList.vue'
import Typography from 'src/components/Dashboard/Views/Typography.vue'
import UserDetail from 'src/SharedAuth/views/UserDetail.vue'
import UserList from 'src/SharedAuth/views/UserList.vue'
import UserProfile from 'src/components/Dashboard/Views/UserProfile.vue'

const routes = [{
        path: '/',
        component: DashboardLayout,
        redirect: '/admin/overview'
    },
    {
        path: '/admin',
        component: DashboardLayout,
        redirect: '/admin/stats',
        children: [
            // SharedAuth ROUTES START
            {
                path: 'domain',
                name: 'domain',
                component: DomainList
            },
            {
                path: 'project',
                name: 'project',
                component: ProjectList
            },
            {
                path: 'user',
                name: 'user',
                component: UserList
            },
            {
                path: 'overview',
                name: 'overview',
                component: Overview
            },
            {
                path: 'authentication',
                name: 'authentication',
                component: Authentication
            },
            {
                path: 'configuration',
                name: 'configuration',
                component: Configuration
            },
            {
                path: 'provider',
                name: 'provider',
                component: ProviderList
            },
            {
                path: 'authorization',
                name: 'authorization',
                component: Authorization
            },
            {
                path: 'resource',
                name: 'resource',
                component: ResourceList
            },
            {
                path: 'role',
                name: 'role',
                component: RoleList
            },
            {
                path: 'logs',
                name: 'logs',
                component: Log
            },
            {
                path: 'domain-detail/:id',
                name: 'Domain Detail',
                component: DomainDetail
            },
            {
                path: 'project-detail/:id',
                name: 'Project Detail',
                component: ProjectDetail
            },
            {
                path: 'user-detail/:id',
                name: 'User Detail',
                component: UserDetail
            },
            {
                path: 'provider-detail/:id',
                name: 'Provider Detail',
                component: ProviderDetail
            },
            {
                path: 'resource-detail/:id',
                name: 'Resource Detail',
                component: ResourceDetail
            },
            {
                path: 'role-detail/:id',
                name: 'Role Detail',
                component: RoleDetail
            },


            // SharedAuth ROUTES END

            // TEMPLATE ROUTES START 
            // https://www.creative-tim.com/product/vue-paper-dashboard
            {
                path: 'overview',
                name: 'overview',
                component: Overview
            },
            {
                path: 'stats',
                name: 'stats',
                component: UserProfile
            },
            {
                path: 'notifications',
                name: 'notifications',
                component: Notifications
            },
            {
                path: 'icons',
                name: 'icons',
                component: Icons
            },
            {
                path: 'maps',
                name: 'maps',
                component: Maps
            },
            {
                path: 'typography',
                name: 'typography',
                component: Typography
            },
            {
                path: 'table-list',
                name: 'table-list',
                component: TableList
            }
        ]
    },
    {
        path: '*',
        component: NotFound
    }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes