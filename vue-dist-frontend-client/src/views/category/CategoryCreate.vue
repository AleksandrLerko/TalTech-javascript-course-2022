<template>

    <h1>Create</h1>

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
import { useCategoriesStore } from '@/stores/categories';
import { CategoryService } from '@/services/CategoryService';

@Options({
    components: {

    },
    props: {},
    emits: {}
})
export default class CategoryCreate extends Vue {
    categoryService = new CategoryService();
    categoriesStore = useCategoriesStore();

    categoryName: string = '';
    errorMsg: string | null = null;

    async submitClicked(): Promise<void> {
        if (this.categoryName.length > 0) {
            let res = await this.categoryService.add({
                categoryName: this.categoryName,
            })

            console.log(res);

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
}
</script>