<template>

    <h1>Create</h1>

    <h4>Currencies</h4>
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
                    <input @click="submitClicked()" type="submit" value="Create" class="btn btn-primary" />
                </div>
            </div>
        </div>
    </div>

    <div>
        <a href="/Currencies">Back to List</a>
    </div>

</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { Options, Vue } from "vue-class-component";
import { CurrencyService } from '@/services/CurrencyService';
import { useCurrenciesStore } from '@/stores/currencies';

@Options({
    components: {

    },
    props: {},
    emits: {}
})
export default class CurrencyCreate extends Vue {
    currencyService = new CurrencyService();
    currenciesStore = useCurrenciesStore();

    currencyName: string = '';
    errorMsg: string | null = null;

    async submitClicked(): Promise<void> {
        if (this.currencyName.length > 0) {
            let res = await this.currencyService.add({
                currencyName: this.currencyName,
            })

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
}
</script>