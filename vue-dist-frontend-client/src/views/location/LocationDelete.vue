<template>

    <h1>Delete</h1>

    <h4>Locations</h4>
    <hr />
    <div class="row">
        <div class="col-md-4">
            <div v-if="errorMsg != null" class="text-danger validation-summary-errors" data-valmsg-summary="true">
                <ul>
                    <li>{{ errorMsg }}</li>
                </ul>
            </div>


            <div>
                <div class="form-group">
                    <input @click="submitClicked()" type="submit" value="Delete" class="btn btn-primary" />
                </div>
            </div>
        </div>
    </div>

    <div>
        <a href="/Locations">Back to List</a>
    </div>

</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { Options, Vue } from "vue-class-component";
import { useLocationsStore } from '@/stores/locations';
import { LocationService } from '@/services/LocationService';
import { IdentityService } from '@/services/IdentityService';

@Options({
    components: {

    },
    props: {
        id: String
    },
    emits: {}
})
export default class LocationEdit extends Vue {
    locationsStore = useLocationsStore();
    locationService = new LocationService();
    identityStore = new IdentityService();
    id!: string;

    locationName: string = '';
    errorMsg: string | null = null;

    async submitClicked(): Promise<void> {
        await this.locationService.delete(this.id)
        this.$router.push('/locations');
    }
}
</script>