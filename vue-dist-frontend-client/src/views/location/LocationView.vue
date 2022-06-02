<template>
    <div class="row" v-for="item of locationsStore.locations">
        <div class="col">
            {{item.locationName}}: 1
        </div>
    </div>
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
export default class LocationView extends Vue {
    locationsStore = useLocationsStore();
    locationService = new LocationService();
    identityStore = new IdentityService();

    async mounted(): Promise<void> {
        this.locationsStore.$state.locations =
            await this.locationService.getAll();
        // this.locationsStore.convertToLangMany;
    }
}
</script>