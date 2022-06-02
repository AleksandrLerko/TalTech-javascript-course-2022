<template>

    <h1>Edit</h1>

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
                    <label class="control-label" for="CurrencyName">Currency name</label>
                    <input v-model="currencyName" class="form-control" type="text" />
                </div>
                <div class="form-group">
                    <input @click="submitClicked()" type="submit" value="Edit" class="btn btn-primary" />
                </div>
            </div>
        </div>
    </div>

    <div>
        <a href="/currencies">Back to List</a>
    </div>

</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { Options, Vue } from "vue-class-component";
import { CurrencyService } from '@/services/CurrencyService';
import { useCurrenciesStore } from '@/stores/currencies';
import { IdentityService } from '@/services/IdentityService';

@Options({
    components: {

    },
    props: {
        id: String
    },
    emits: {}
})
export default class CurrencyEdit extends Vue {
    currencyService = new CurrencyService();
    currenciesStore = useCurrenciesStore();
    identityStore = new IdentityService();
    id!: string;

    currencyName: string = '';
    errorMsg: string | null = null;

    async submitClicked(): Promise<void> {
        if (this.currencyName.length > 0) {
            let res = await this.currencyService.put({
                id: this.id,
                currencyName: this.currencyName
            }, this.id)

            console.log(res);

            if (res.status >= 300) {
                this.errorMsg = res.status + ' ' + res.errorMsg;
            } else {
                this.currenciesStore.$state.currencies = await this.currencyService.getAll();
                this.$router.push('/currencies');
            }
        } else {
            this.errorMsg = 'Too short!';
        }
    }

    async mounted(): Promise<void> {
        this.currenciesStore.$state.currencyUnit = await this.currencyService.getById(this.id);
        this.currencyName = await this.currenciesStore.convertToLangOne;
    }
}
</script>