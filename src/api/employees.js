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

// Save User detail
export function saveUserDetailById(data) {
    return request({
        method: "PUT",
        url: `/sys/user/${data.id}`,
        data
    })
}

/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetail(id) {
    return request({
        url: `/employees/${id}/personalInfo`
    })
}

/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonal(data) {
    return request({
        url: `/employees/${data.userId}/personalInfo`,
        method: 'put',
        data
    })
}


/** **
 * 获取用户的岗位信息
 *
 * ****/
export function getJobDetail(id) {
    return request({
        url: `/employees/${id}/jobs`
    })
}


/**
 * 保存岗位信息
 * ****/
export function updateJob(data) {
    return request({
        url: `/employees/${data.userId}/jobs`,
        method: 'put',
        data
    })
}

// Assing a Role
export function assignRoles(data) {
    return request({
        url: '/sys/user/assignRoles',
        data,
        method: 'put'
    })
}