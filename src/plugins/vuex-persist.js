import VuexPersistence from 'vuex-persist'
 
export default ({ store }) => {
  new VuexPersistence({
    key: 'authUser',
    storage: window.localStorage,
  }).plugin(store)
}