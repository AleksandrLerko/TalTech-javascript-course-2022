<template>
    <div class="container">
        <h6 class="category">{{ category }}</h6>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <div class="col">
                <div class="height d-flex justify-content-center align-items-center">

                    <div class="card p-3">

                        <div class="d-flex justify-content-between align-items-center ">
                            <div class="mt-2">
                                <h1 class="text-uppercase">Apple</h1>
                                <div class="mt-5">
                                    <h3 class="text-uppercase mb-0">iPhone 13 pro max</h3>
                                    <h5 class="main-heading mt-0">128 GB</h5>
                                </div>
                            </div>
                            <div class="image">
                                <img src="@/images/iphone13pro.jpg" width="100">
                            </div>
                        </div>


                        <p>Oh.So.Pro </p>
                        <p>Price: 1759 <CurrencyView></CurrencyView>
                        </p>

                        <RouterLink to="/productunit" class="btn btn-danger" active-class="active">Check out
                        </RouterLink>
                    </div>

                </div>
            </div>
            <div class="col">
                <div class="height d-flex justify-content-center align-items-center">

                    <div class="card p-3">

                        <div class="d-flex justify-content-between align-items-center ">
                            <div class="mt-2">
                                <h1 class="text-uppercase">Apple</h1>
                                <div class="mt-5">
                                    <h3 class="text-uppercase mb-0">iPhone 13 pro max</h3>
                                    <h5 class="main-heading mt-0">128 GB</h5>
                                </div>
                            </div>
                            <div class="image">
                                <img src="@/images/iphone13pro.jpg" width="100">
                            </div>
                        </div>


                        <p>Oh.So.Pro </p>
                        <p>Price: 1759 <CurrencyView></CurrencyView>
                        </p>

                        <RouterLink to="/productunit" class="btn btn-danger" active-class="active">Check out
                        </RouterLink>
                    </div>

                </div>
            </div>
            <div class="col">
                <div class="height d-flex justify-content-center align-items-center">

                    <div class="card p-3">

                        <div class="d-flex justify-content-between align-items-center ">
                            <div class="mt-2">
                                <h1 class="text-uppercase">Apple</h1>
                                <div class="mt-5">
                                    <h3 class="text-uppercase mb-0">iPhone 13 pro max</h3>
                                    <h5 class="main-heading mt-0">128 GB</h5>
                                    <!-- <div class="d-flex flex-row user-ratings">
                        <div class="ratings">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        </div>
                        <h6 class="text-muted ml-1">4/5</h6>
                    </div> -->
                                </div>
                            </div>
                            <div class="image">
                                <img src="@/images/iphone13pro.jpg" width="100">
                            </div>
                        </div>

                        <!-- <div class="d-flex justify-content-between align-items-center mt-2 mb-2">
            <span>Available colors</span>
            <div class="colors">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            
        </div> -->


                        <p>Oh.So.Pro </p>
                        <p>Price: 1759 <CurrencyView></CurrencyView>
                        </p>
                        <RouterLink to="/productunit" class="btn btn-danger" active-class="active">Check out
                        </RouterLink>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CurrencyView from "../currency/CurrencyView.vue";
@Options({
    components: {
        CurrencyView
    },
    props: {
        category: String
    }

})
export default class TestProductView extends Vue {
    category!: string;

    async mounted(): Promise<void> {
        console.log(this.category);
    }

}
</script>
<style>
.category {
    font-size: 16px;
    font-weight: 300;
    color: #86939E;
    line-height: 24px;
}
</style>
