import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
    state: {
        cartItemCount: 0,
    },
    mutations: {
        updateCartItemCount(state, count) {
            state.cartItemCount = count;
        },
    },
    actions: {
        async fetchCartItems({ commit }, API_URL) {
            const response = await axios.get(`${API_URL}/cart`);
            const cartItems = response.data;
            const itemCount = cartItems.length;
            commit('updateCartItemCount', itemCount);
        },
    },
});

export default store;
