import {getToken, setToken, removeToken, setTimeStamp} from '@/utils/auth'

import { login, getUserInfo, getUserDetailById } from '@/api/user'

const state = {
  token: getToken(),
  userInfo: {}
}
const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },

  setUserInfo(state, userInfo){
    state.userInfo = userInfo
  },
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  async login(context, data) {
    const result = await login(data) // Get token
    context.commit('setToken', result)  // Set token

    setTimeStamp()  // Set time stamp
  },

  // Get user info
  async getUserInfo(context) {
    const result = await getUserInfo()
    const detailInfo =  await getUserDetailById(result.userId)  // Get User detail Infomation
    
    const allInfo = {...result, ...detailInfo}
    
    context.commit('setUserInfo', allInfo)

    return allInfo
  },

  logout(context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}