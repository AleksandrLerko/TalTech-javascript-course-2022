<template>

    <h1>Delete</h1>

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
                    <input @click="submitClicked()" type="submit" value="Delete" class="btn btn-primary" />
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

@Options({
    components: {

    },
    props: {
        id: String
    },
    emits: {}
})
export default class CategoryDelete extends Vue {
    categoryService = new CategoryService();
    categoriesStore = useCategoriesStore();
    id!: string;

    categoryName: string = '';
    errorMsg: string | null = null;

    async submitClicked(): Promise<void> {
        await this.categoryService.delete(this.id)
        this.$router.push('/categories');
    }
}
</script>