import request from '@/utils/request'

// Login Request
export function getEmployeeSimple() {
    return request({
        method: "GET",
        url: "/sys/user/simple",
    })
}

// Get employee list
export function getEmployeeList(params) {
    return request({
        method: "GET",
        url: "/sys/user",
        params
    })
}

// Delete employee
export function delEmployee(id) {
    return request({
        method: "DELETE",
        url: `/sys/user/${id}`
    })
}

// Add employee
export function addEmployee(data) {
    return request({
        method: "post",
        url: '/sys/user',
        data
    })
}

// import employee ; data is Array
export function importEmployee(data) {
    return request({
      url: '/sys/user/batch',
      method: 'post',
      data
    })
  }