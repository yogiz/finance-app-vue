
const state = {
    sidebarShow: 'responsive',
    sidebarMinimize: false
}

export const sidebar = {
    namespaced: true,
    state: state,
    actions:{
        tglSidebarDesktop({commit}){
            commit('toggleSidebarDesktop')
        },
        tglSidebarMobile({commit}){
            commit('toggleSidebarMobile')
        },
        SET({commit}, [variable, value]){
            commit('set', [variable, value])
            
        }
    },
    mutations:{
        toggleSidebarDesktop (state) {
            const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)

            state.sidebarShow = sidebarOpened ? false : 'responsive'
        },
        toggleSidebarMobile (state) {
            const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
            console.log("hali", sidebarClosed)

            state.sidebarShow = sidebarClosed ? true : 'responsive'
        },
            set (state, [variable, value]) {
            state[variable] = value
        }
    }
}