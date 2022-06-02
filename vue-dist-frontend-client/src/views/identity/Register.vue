<template>
    <h1>Register</h1>

    <div class="row">
        <div class="col-md-4">
            <h2>Create a new account.</h2>
            <hr />

            <div v-if="errorMsg != null" class="text-danger validation-summary-errors" data-valmsg-summary="true">
                <ul>
                    <li>{{ errorMsg }}</li>
                </ul>
            </div>
            <div>
                <div class="form-group">
                    <label class="control-label" for="email">Email</label>
                    <input v-model="email" class="form-control" type="email" />
                </div>
                <div class="form-group">
                    <label class="control-label" for="password">Password</label>
                    <input v-model="password" class="form-control" type="password" />
                </div>
                <div class="form-group">
                    <label class="control-label" for="firstName">First Name</label>
                    <input v-model="firstName" class="form-control" type="text" />
                </div>
                <div class="form-group">
                    <label class="control-label" for="lastName">Last Name</label>
                    <input v-model="lastName" class="form-control" type="text" />
                </div>
                <div class="form-group">
                    <input @click="registerClicked()" type="submit" value="Create" class="btn btn-primary" />
                </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { Options, Vue } from "vue-class-component";
import { IdentityService } from '@/services/IdentityService';
import { useIdentityStore } from '@/stores/identity';

@Options({
    components: {

    },
    props: {},
    emits: {}
})
export default class Register extends Vue {
    identityStore = useIdentityStore();

    email: string = '';
    password: string = '';
    firstName: string = '';
    lastName: string = '';
    errorMsg: string | null = null;

    identityService = new IdentityService();
    async registerClicked(): Promise<void> {
        let res = await this.identityService.registerUser(this.email, this.password, this.firstName, this.lastName);
        console.log(res);
        console.dir(res);


        this.identityStore.$state.jwt = res.data!;
        this.$router.push('/')
    }
}
</script>