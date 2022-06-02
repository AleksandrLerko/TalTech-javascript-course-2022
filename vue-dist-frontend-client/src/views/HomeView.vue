<template>
  <CategoryView></CategoryView>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CategoryView from "./category/CategoryView.vue";
import { IdentityService } from '@/services/IdentityService';
@Options({
  components: {
    CategoryView
  },

})
export default class HomeView extends Vue {
    identityStore = new IdentityService();
}
</script>
