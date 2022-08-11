import request from '@/utils/request'

// Login Request
export function login(data) {
    return request({
        method: "POST",
        url: "/sys/login",
        data
    })
}

// Get User Info
export function getUserInfo() {
    return request({
        method: "POST",
        url: "/sys/profile",
    })
}

// Get user detail Infomation
export function getUserDetailById(id) {
    return request({
        url: `/sys/user/${id}`,
    })
}
