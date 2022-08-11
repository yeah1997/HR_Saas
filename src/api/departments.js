import request from '@/utils/request'

// get departments info
export function getDepartments() {
    return request({
        method: "GET",
        url: "/company/department",
    })
}

// delete departments info
export function delDepartments(id) {
    return request({
        method: "DELETE",
        url: `/company/department/${id}`,
    })
}

// delete departments info
export function addDepartments(data) {
    return request({
        method: "POST",
        url: '/company/department',
        data
    })
}
