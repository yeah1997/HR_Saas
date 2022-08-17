import request from '@/utils/request'

// Login Request
export function getEmployeeSimple() {
    return request({
        method: "GET",
        url: "/sys/user/simple",
    })
}