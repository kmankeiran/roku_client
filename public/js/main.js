import LoginComponent from './components/TheLoginComponent.js';
import AllUsers from './components/TheAllUsersComponent.js';

const router = new VueRouter({
    routes: [
        { path: '/', name: 'root', component: LoginComponent },
        { path: '/users', name: 'users', component: AllUsers }
    ]
});

(() => {
    const vm = new Vue({
        data: {
            authenticated: false,
            isAdmin: false
        },

        created: function() {
            // use this if you want
        },

        methods: {
            logout() {
                this.$router.push({ name: "root" });
            }

        },

        //equivalent of router: router
        router
    }).$mount("#app");
})();