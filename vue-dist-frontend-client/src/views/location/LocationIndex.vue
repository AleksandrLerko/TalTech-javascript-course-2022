<template>


    <h1>Locations</h1>

    <p>
        <template v-if="identityStore.identityStore.jwt">
            <div>User exists!</div>
        </template>
        <template v-else>
            <div>No user :(</div>
        </template>
        <RouterLink to="/locations/create">Create new</RouterLink>
    </p>
    <table class="table">
        <thead>
            <tr>
                <th>
                    Location name
                </th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item of locationsStore.locations" :key="item.id">
                <td>
                    {{ item.locationName }}
                </td>
                <td>
                    <RouterLink :to="{ name: 'locationsedit', params: { id: item.id } }">Edit</RouterLink> |
                    <RouterLink :to="{ name: 'locationsdelete', params: { id: item.id } }">Delete</RouterLink>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { Options, Vue } from "vue-class-component";
import { useLocationsStore } from '@/stores/locations';
import { LocationService } from '@/services/LocationService';
import { IdentityService } from '@/services/IdentityService';
import type { ILocation } from '@/domain/ILocation';

@Options({
    components: {

    },
    props: {},
    emits: {}
})
export default class LocationIndex extends Vue {
    locationsStore = useLocationsStore();
    locationService = new LocationService();
    identityStore = new IdentityService();

    async mounted(): Promise<void> {
        this.locationsStore.$state.locations =
            await this.locationService.getAll();
        this.locationsStore.convertToLangMany;
    }
}
</script>