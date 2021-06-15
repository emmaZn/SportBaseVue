
export const state = () => ({
  authUser: {
    uid: null,
    email: null,
    emailVerified: null,
    displayName: null,
    photoURL: null,
    isAdmin: null
  }
})
export const actions = {
}
export const mutations = {
  setUser(authUser, user) {
    authUser.uid = user.uid
    authUser.email = user.email
    authUser.emailVerified = user.emailVerified
    authUser.displayName = user.displayName
    authUser.photoURL = user.photoURL
    authUser.isAdmin = user.isAdmin
  },
  setPhoto(authUser, url) {
    authUser.photoURL = url
  },
  setDisplayName(authUser, name) {
    authUser.displayName = name
  },


  logout(authUser) {
    authUser.uid = null
    authUser.email = null
    authUser.emailVerified = null
    authUser.displayName = null
    authUser.photoURL = null
    authUser.isAdmin = null
  }
}