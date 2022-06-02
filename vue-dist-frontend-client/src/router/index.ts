import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from '@/views/identity/Login.vue';
import Register from '@/views/identity/Register.vue';
import CategoryIndexVue from "@/views/category/CategoryIndex.vue";
import CategoryCreateVue from "@/views/category/CategoryCreate.vue";
import CategoryEditVue from "@/views/category/CategoryEdit.vue";
import CategoryDeleteVue from "@/views/category/CategoryDelete.vue";
import CurrencyIndexVue from "@/views/currency/CurrencyIndex.vue";
import CurrencyCreateVue from "@/views/currency/CurrencyCreate.vue";
import CurrencyEditVue from "@/views/currency/CurrencyEdit.vue";
import CurrencyDeleteVue from "@/views/currency/CurrencyDelete.vue";
import LocationIndexVue from "@/views/location/LocationIndex.vue";
import LocationCreateVue from "@/views/location/LocationCreate.vue";
import LocationEditVue from "@/views/location/LocationEdit.vue";
import LocationDeleteVue from "@/views/location/LocationDelete.vue";
import TestProductViewVue from "@/views/product/TestProductView.vue";
import TestProductUnitVue from "@/views/product/TestProductUnit.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: '/identity/account/login',
      name: 'login',
      component: Login
    },
    {
      path: '/identity/account/register',
      name: 'register',
      component: Register
    },
    { path: "/categories", name: "categories", component: CategoryIndexVue},
    { path: "/categories/index", name: "categoriesindex", component: CategoryIndexVue},
    { path: "/categories/create", name: "categoriescreate", component: CategoryCreateVue},
    { path: "/categories/edit/:id", name: "categoriesedit", component: CategoryEditVue, props: true},
    { path: "/categories/delete/:id", name: "categoriesdelete", component: CategoryDeleteVue, props: true},
    { path: "/currencies", name: "currencies", component: CurrencyIndexVue},
    { path: "/currencies/index", name: "currenciesindex", component: CurrencyIndexVue},
    { path: "/currencies/create", name: "currenciescreate", component: CurrencyCreateVue},
    { path: "/currencies/edit/:id", name: "currenciesedit", component: CurrencyEditVue, props: true},
    { path: "/currencies/delete/:id", name: "currenciesdelete", component: CurrencyDeleteVue, props: true},
    { path: "/locations", name: "locations", component: LocationIndexVue},
    { path: "/locations/index", name: "locationsindex", component: LocationIndexVue},
    { path: "/locations/create", name: "locationscreate", component: LocationCreateVue},
    { path: "/locations/edit/:id", name: "locationsedit", component: LocationEditVue, props: true},
    { path: "/locations/delete/:id", name: "locationsdelete", component: LocationDeleteVue, props: true},
    { path: "/products", name: "products", component: TestProductViewVue, props: true},
    { path: "/productunit", name: "productunit", component: TestProductUnitVue},
  ],
});

export default router;
