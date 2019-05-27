import Sidebar from './SideBar.vue'

const SidebarStore = {
    showSidebar: false,
    sidebarLinks: [
        // start SharedAuth 
        {
            name: 'Domains',
            icon: 'ti-world',
            path: '/admin/domain'
        },
        {
            name: 'Projects',
            icon: 'ti-view-list',
            path: '/admin/project'
        },
        {
            name: 'Users',
            icon: 'fa fa-users',
            path: '/admin/user'
        },
        {
            name: 'Dashboard',
            icon: 'ti-stats-up',
            path: '/admin/overview'
        },
        {
            name: 'Configuration',
            icon: 'ti-panel',
            path: '/admin/configuration'
        },
        {
            name: 'Providers',
            icon: 'fa fa-sign-in',
            path: '/admin/provider'
        },
        {
            name: 'Resources',
            icon: 'ti-files',
            path: '/admin/resource'
        },
        {
            name: 'Roles',
            icon: 'ti-unlock',
            path: '/admin/role'
        },
        {
            name: 'Logs',
            icon: 'ti-server',
            path: '/admin/logs'
        },
        {
            name: 'Authentication',
            icon: 'ti-key',
            path: '/admin/authentication'
        },
        {
            name: 'Authorization',
            icon: 'ti-direction-alt',
            path: '/admin/authorization'
        },
        // {
        //     name: 'Dashboard',
        //     icon: 'ti-panel',
        //     path: '/admin/overview'
        // },
        // {
        //     name: 'User Profile',
        //     icon: 'ti-user',
        //     path: '/admin/stats'
        // },
        // {
        //     name: 'Table List',
        //     icon: 'ti-view-list-alt',
        //     path: '/admin/table-list'
        // },
        // {
        //     name: 'Typography',
        //     icon: 'ti-text',
        //     path: '/admin/typography'
        // },
        // {
        //     name: 'Icons',
        //     icon: 'ti-pencil-alt2',
        //     path: '/admin/icons'
        // },
        // {
        //     name: 'Maps',
        //     icon: 'ti-map',
        //     path: '/admin/maps'
        // },
        // {
        //     name: 'Notifications',
        //     icon: 'ti-bell',
        //     path: '/admin/notifications'
        // }
    ],
    displaySidebar(value) {
        this.showSidebar = value
    }
}

const SidebarPlugin = {

    install(Vue) {
        Vue.mixin({
            data() {
                return {
                    sidebarStore: SidebarStore
                }
            }
        })

        Object.defineProperty(Vue.prototype, '$sidebar', {
            get() {
                return this.$root.sidebarStore
            }
        })
        Vue.component('side-bar', Sidebar)
    }
}

export default SidebarPlugin