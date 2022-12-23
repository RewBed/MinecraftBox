import { defineStore } from 'pinia'

export const DefineStore = defineStore('user', {
    state: () => {
        return {
            isSocketConnected: false as boolean
        }
    },
})