<template>

    <h1>Edit</h1>

    <h4>Categories</h4>
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
                    <label class="control-label" for="CategoryName">Category name</label>
                    <input v-model="categoryName" class="form-control" type="text" />
                </div>
                <div class="form-group">
                    <input @click="submitClicked()" type="submit" value="Edit" class="btn btn-primary" />
                </div>
            </div>
        </div>
    </div>

    <div>
        <a href="/categories">Back to List</a>
    </div>

</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { Options, Vue } from "vue-class-component";
import { useCategoriesStore } from '@/stores/categories';
import { CategoryService } from '@/services/CategoryService';
import { IdentityService } from '@/services/IdentityService';

@Options({
    components: {

    },
    props: {
        id: String,
        name: String
    },
    emits: {}
})
export default class CategoryEdit extends Vue {
    categoryService = new CategoryService();
    categoriesStore = useCategoriesStore();
    identityStore = new IdentityService();
    id!: string;
    name!: string;

    categoryName: string = '';
    errorMsg: string | null = null;

    async submitClicked(): Promise<void> {
        if (this.categoryName.length > 0) {
            let res = await this.categoryService.put({
                id: this.id,
                categoryName: this.categoryName
            }, this.id)

            // console.log(res);

            if (res.status >= 300) {
                this.errorMsg = res.status + ' ' + res.errorMsg;
            } else {
                this.categoriesStore.$state.categories = await this.categoryService.getAll();
                this.$router.push('/categories');
            }
        } else {
            this.errorMsg = 'Too short!';
        }
    }

    async mounted(): Promise<void> {
        console.log("mounted")
        console.log(this.id);
        console.log(this.name);
        this.categoriesStore.$state.categoryUnit = await this.categoryService.getById(this.id);
        this.categoryName = await this.categoriesStore.convertToLangOne;
    }
}
</script>