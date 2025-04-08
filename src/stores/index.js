import { defineStore } from 'pinia';
import { ref } from 'vue';

function initState() {
    return { isCollapse: true };
}

export const useAllStore = defineStore('allData', () => {

    const state = ref(initState());
    return { state };
});