<template>


  <h1>Categories</h1>

  <p>
    <template v-if="identityStore.identityStore.jwt">
      <div>User exists!</div>
    </template>
    <template v-else>
      <div>No user :(</div>
    </template>
    <RouterLink to="/categories/create">Create new</RouterLink>
  </p>
  <table class="table">
    <thead>
      <tr>
        <th>
          Currency name
        </th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item of categoriesStore.categories" :key="item.id">
        <td>
          {{ item.categoryName }}
        </td>
        <td>
          <RouterLink :to="{ name: 'categoriesedit', params: { id: item.id } }">Edit</RouterLink> |
          <RouterLink :to="{ name: 'categoriesdelete', params: { id: item.id } }">Delete</RouterLink>
        </td>
      </tr>
    </tbody>
  </table>
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
export default class CategoryIndex extends Vue {
  identityStore = new IdentityService();
  categoryService = new CategoryService();
  categoriesStore = useCategoriesStore();

  async mounted(): Promise<void> {
    this.categoriesStore.$state.categories =
      await this.categoryService.getAll();
    this.categoriesStore.convertToLangMany;
  }
}
</script>