<template>

    <h1>Create</h1>

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
                    <label class="control-label" for="LocationName">Location name</label>
                    <input v-model="locationName" class="form-control" type="text" />
                </div>
                <div class="form-group">
                    <input @click="submitClicked()" type="submit" value="Create" class="btn btn-primary" />
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

@Options({
    components: {

    },
    props: {},
    emits: {}
})
export default class LocationCreate extends Vue {
    locationsStore = useLocationsStore();
    locationService = new LocationService();

    locationName: string = '';
    errorMsg: string | null = null;

    async submitClicked(): Promise<void> {
        if (this.locationName.length > 0) {
            let res = await this.locationService.add({
                locationName: this.locationName,
            })

            console.log(res);

            if (res.status >= 300) {
                this.errorMsg = res.status + ' ' + res.errorMsg;
            } else {
                this.locationsStore.$state.locations = await this.locationService.getAll();
                this.$router.push('/locations');
            }
        } else {
            this.errorMsg = 'Too short!';
        }
    }
}
</script>