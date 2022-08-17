import request from '@/utils/request'

// Get role List
export function getRoleList(params) {
    return request({
        method: "GET",
        url: '/sys/role',
        params
    })
}

// Get Company infomation
export function getCompanyInfo(companyId) {
    return request({
        method: "GET",
        url: `/company/${companyId}`
    })
}

// Delete Role
export function deleteRole(id) {
    return request({
        url: `/sys/role/${id}`,
        method: 'delete'
    })
}

// Get Role Detail
export function getRoleDetail(id) {
    return request({
        method: 'GET',
        url: `/sys/role/${id}`
    })
}

// Update Role Detail
export function updateRole(data) {
    return request({
        method: 'PUT',
        url: `/sys/role/${data.id}`,
        data
    })
}

// Add Role
export function addRole(data) {
    return request({
      url: '/sys/role',
      data,
      method: 'post'
    })
  }