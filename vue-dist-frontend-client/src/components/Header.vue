<template>
    <header>
        <nav
            class="container navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
            <div class="container-fluid">
                <RouterLink class="navbar-brand" to="/">Online shopping system</RouterLink>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                    <ul class="navbar-nav flex-grow-1">
                        <li class="nav-item">
                            <div class="nav-link text-dark">Lang</div>
                        </li>
                        <form class="w-100 me-3">
                            <input type="search" class="form-control" placeholder="Search..." aria-label="Search">
                        </form>
                    </ul>
                    <ul class="navbar-nav">
                        <template v-if="identityStore.$state.jwt == null">
                            <li class="nav-item">
                                <a class="btn btn-primary" href="/Identity/Account/register">Register</a>
                            </li>
                            <li class="nav-item">
                                <a class="btn btn-success" style="margin-left: 0.3rem" href="/Identity/account/login">Login</a>
                            </li>
                        </template>
                        <template v-else>
                            <li class="nav-item">
                                <div class="nav-link text-dark" title="Manage">You are now logged in!</div>
                            </li>
                            <li class="nav-item">
                                <a class="btn btn-outline-primary me-2" href="/">Logout</a>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';
import { Options, Vue } from "vue-class-component";
// import { usePersonsStore } from '@/stores/persons';
import { useIdentityStore } from '@/stores/identity';
// import CategoryView from "../views/category/CategoryView.vue";

@Options({
    components: {
        // CategoryView
    }
})
export default class Header extends Vue {
    // personsStore = usePersonsStore();
    identityStore = useIdentityStore();

}
</script>

<style>
.customInput {
    border-radius: 30px;
    font-family: 'Open Sans', sans-serif;
    padding: 0.3em;
}

.customButton {
    border-radius: 30px;
    padding-left: 0.3rem;
}
</style>