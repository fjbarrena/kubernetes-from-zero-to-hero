import axios from 'axios'

const BASE_URL = 'http://localhost:3000/api'
const AUTHORIZATION_PATH = '/auth'
const apiClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: false, // This is the default
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getDomains() {
        return apiClient.get('/admin/domain')
    },
    getDomain(id) {
        if (id < 0) return {};
        return apiClient.get('/admin/domain/' + id)
    },
    deleteDomain(id) {
        return apiClient.delete('/admin/domain/' + id)
    },
    createDomain(domain) {
        return apiClient.post('/admin/domain/', domain)
    },
    saveDomain(domain) {
        return apiClient.put('/admin/domain/', domain)
    },

    getProviders() {
        return apiClient.get('/admin/authprovider')
    },
    getProvider(id) {
        return apiClient.get('/admin/authprovider/' + id)
    },
    deleteProvider(id) {
        return apiClient.delete('/admin/authprovider/' + id)
    },
    createProvider(authprovider) {
        return apiClient.post('/admin/authprovider/', authprovider)
    },
    saveProvider(authprovider) {
        return apiClient.put('/admin/authprovider/', authprovider)
    },

    getUsers() {
        return apiClient.get('/admin/user')
    },
    getUser(id) {
        return apiClient.get('/admin/user/' + id)
    },
    deleteUser(id) {
        return apiClient.delete('/admin/user/' + id)
    },
    createUser(user) {
        return apiClient.post('/admin/user/', user)
    },
    saveUser(user) {
        return apiClient.put('/admin/user/', user)
    },

    getProject(id) {
        return apiClient.get('/admin/project/' + id)
    },
    getProjects() {
        return apiClient.get('/admin/project')
    },
    deleteProjects(id) {
        return apiClient.delete('/admin/project/' + id)
    },
    createProjects(project) {
        return apiClient.post('/admin/project/', project)
    },
    saveProjects(project) {
        return apiClient.put('/admin/project/', project)
    },


    getAuthentication(id) {
        return apiClient.get('/admin/metadata/' + id)
    },

    getResources() {
        return apiClient.get('/admin/resource/')
    },
    getResource(id) {
        if (id < 0) return {};
        return apiClient.get('/admin/resource/' + id)
    },
    deleteResource(id) {
        return apiClient.delete('/admin/resource/' + id)
    },
    createResource(resource) {
        return apiClient.post('/admin/resource/', resource)
    },
    saveResource(resource) {
        return apiClient.put('/admin/resource/', resource)
    },

    getRoles() {
        return apiClient.get('/admin/role/')
    },
    getRole(id) {
        return apiClient.get('/admin/role/' + id)
    },
    deleteRole(id) {
        return apiClient.delete('/admin/role/' + id)
    },
    createRole(role) {
        return apiClient.post('/admin/role/', role)
    },
    saveRole(role) {
        return apiClient.put('/admin/role/', role)
    },

    getLogs() {
        return apiClient.get('/admin/log/')
    },
    getLog(id) {
        return apiClient.get('/admin/log/' + id)
    },
    getMetadata() {
        const packagejson = require('../../../package.json');
        const version = packagejson.version
        const name = packagejson.name
        return {
            name,
            version,
        };
    },
    authenticate(body) {
        return apiClient.post('/login', body)
    },
    authorize(method, bearer, resource) {
        switch (method) {
            case 'GET':
                {
                    return axios.get(BASE_URL + AUTHORIZATION_PATH + resource, {
                        headers: {
                            Authorization: 'Bearer ' + bearer
                        }
                    })
                }
            case 'POST':
                {
                    return axios.post(BASE_URL + AUTHORIZATION_PATH + resource, {}, {
                        headers: {
                            Authorization: 'Bearer ' + bearer
                        }
                    })
                }
            case 'PUT':
                {
                    return axios.put(BASE_URL + AUTHORIZATION_PATH + resource, {}, {
                        headers: {
                            Authorization: 'Bearer ' + bearer
                        }
                    })
                }
            case 'DELETE':
                {
                    return axios.delete(BASE_URL + AUTHORIZATION_PATH + resource, {
                        headers: {
                            Authorization: 'Bearer ' + bearer
                        }
                    })
                }
            default:
                {
                    console.error('Method not implemented');
                    break;
                }
        }
        return {
            data: 'ok',
            status: '200',
            statusText: 'guay',
            headers: 'headers',
        }
    },
}