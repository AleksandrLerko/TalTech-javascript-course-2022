<template>
    <div class="row scrollMenu">
        <div class="col scrollItem" v-for="item of categoriesStore.categories">
            <RouterLink :to="{ name: 'products', params: { category: item.categoryName } }" class="nav-link text-dark"
                active-class="active">{{ item.categoryName }}</RouterLink>
        </div>
    </div>
</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { IdentityService } from '@/services/IdentityService';
import { useCategoriesStore } from '@/stores/categories';
import { Options, Vue } from "vue-class-component";
import { CategoryService } from '@/services/CategoryService';

@Options({
    components: {

    },
    props: {},
    emits: {}
})
export default class CategoryView extends Vue {
    identityStore = new IdentityService();
    categoryService = new CategoryService();
    categoriesStore = useCategoriesStore();

    async mounted(): Promise<void> {
        this.categoriesStore.$state.categories =
            await this.categoryService.getAll();
        // this.categoriesStore.convertToLangMany;
    }
}
</script>

<style>
/* .scrollMenu {
    background-color: rgb(144, 168, 179);
    overflow-x: scroll;
    white-space: nowrap;
    border-radius: 10px;
} */

.scrollMenu {
    background: #86a3bb;
    overflow: auto;
    position: sticky;
    top: 0;
    left: 0;
    padding: 15px 0;
    white-space: nowrap;
    border-radius: 20px;
}

.scrollItem {
    padding: 10px 30px;
    border-radius: 50px;
    box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.5);
    background: #FFC107;
    margin: 0 15px;
    display: inline-block;
    font-size: 1.1rem;
    cursor: pointer;
    text-align: center;
}

/* overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap; */
ul.nav {
    white-space: nowrap;
    overflow-x: auto;
}

ul.nav li {
    display: inline-block;
    float: none;
}
</style>