<template>
    <div class="row">
        <!-- Right Column -->
        <div class="col-4">

            <!-- Product Description -->
            <div class="product-description">
                <span>Phones</span>
                <h1>iPhone 13 Pro Max</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quaerat saepe, nisi officia esse
                    pariatur
                    quibusdam nihil explicabo ipsam reprehenderit neque molestiae possimus vitae iste. Ad dolorem facere
                    quibusdam nemo!</p>
                <h2>Locations</h2>
                <LocationView></LocationView>
            </div>

            <!-- Product Pricing -->
            <div class="product-price">
                <h2>Price</h2>
                <span>1795 </span>
                <CurrencyView></CurrencyView>
                <button class="btn btn-primary" style="border-radius: 20px; margin-left: .5rem;">ADD TO CART</button>
            </div>
        </div>
        <div class="col-8">
            <img data-image="black" src="@/images/iphone13pro.jpg" class="center" style="width:300px;height:450px;" alt="">
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import LocationView from "../location/LocationView.vue";
import CurrencyView from "../currency/CurrencyView.vue";
@Options({
    components: {
        LocationView,
        CurrencyView
    },

})
export default class TestProductUnit extends Vue {


}
</script>

<style>
/* Image */
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
/* Product Description */
.product-description {
    border-bottom: 1px solid #E1E8EE;
    margin-bottom: 20px;
}

.product-description span {
    font-size: 12px;
    color: #358ED7;
    letter-spacing: 1px;
    text-transform: uppercase;
    text-decoration: none;
}

.product-description h1 {
    font-weight: 300;
    font-size: 52px;
    color: #43484D;
    letter-spacing: -2px;
}

.product-description p {
    font-size: 16px;
    font-weight: 300;
    color: #86939E;
    line-height: 24px;
}
</style>
