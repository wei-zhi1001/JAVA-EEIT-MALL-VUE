<template>
  <main class="bg-light">
    <div class="container py-5">
      <div class="row">
        <div class="col-lg-8">
          <!-- Shopping Cart Header -->
          <div class="d-flex justify-content-between align-items-center mb-4">
            <div class="free-shipping-banner">
              <span class="free-shipping-text">Your order qualifies for free shipping!</span>
              <div class="striped-bar"></div>
            </div>
          </div>

          <!-- Column Titles -->
          <div class="row text-muted mb-3 text-lg align-items-center">
            <div class="col-1">移除</div>
            <div class="col-2">圖片</div>
            <div class="col-3">商品</div>
            <div class="col-2">數量</div>
            <div class="col-2 text-center">價格</div>
            <div class="col-2 text-center">小計</div>
          </div>

          <!-- Product List -->
          <div v-for="item in cartItems" :key="item.cartItemId" class="card mb-3">
            <div class="card-body">
              <div class="row align-items-center">

                <!-- Remove Item Column -->
                <div class="col-auto text-center">
                  <a href="#" class="text-secondary" @click.prevent="deleteCartItem(item.cartItemId)">
                    <i class="fas fa-times"></i>
                  </a>
                </div>

                <!-- Product Image Column -->
                <div class="col-2 text-center">
                  <img :src="getPhotoUrl(item.photoFile)" class="img-fluid" alt="product">
                </div>

                <!-- Product Name Column -->
                <div class="col-3 text-center">
                  <p class="text-secondary">{{ item.productName }}</p>
                </div>

                <!-- Product Quantity Column -->
                <div class="col-2 text-center">
                  <div class="d-flex">
                    <button class="btn btn-outline-secondary" @click="decrement(item)">-</button>
                    <input type="number" class="form-control text-center mx-1" v-model="item.quantity" min="1">
                    <button class="btn btn-outline-secondary" @click="increment(item)">+</button>
                  </div>
                </div>

                <!-- Product Price Column -->
                <div class="col-2 text-end">
                  <span class="text-secondary">{{ item.productPrice }}</span>
                </div>

                <!-- Product Subtotal Column -->
                <div class="col-2 text-end">
                  <span class="text-secondary">{{ item.subtotal }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Checkout Section (Summary) -->
        <div class="col-lg-4">
          <div class="summary-card">
            <div class="summary-title">購物車總計</div>
            <div class="summary-item">
              <span class="item-title">小計</span>
              <span class="item-price">{{ total }}</span>
            </div>
            <!-- Repeat for other summary items if needed -->
            <div class="summary-options">
              <h6 class="options-title">運送方式</h6>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="deliveryOption" id="pickup-center"
                       value="pickup-center" v-model="deliveryOption">
                <label class="form-check-label" for="pickup-center">
                  自行取貨 (商品體驗中心)
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="deliveryOption" id="pickup-hq" value="pickup-hq"
                       v-model="deliveryOption">
                <label class="form-check-label" for="pickup-hq">
                  自行取貨 (總公司)
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="deliveryOption" id="free-shipping"
                       value="free-shipping" v-model="deliveryOption">
                <label class="form-check-label" for="free-shipping">
                  免費運送
                </label>
              </div>
            </div>
            <div class="summary-total">
              <span class="total-title">總計</span>
              <span class="total-price">{{ total }}</span>
            </div>

            <div class="payment-options">
              <h3 class="payment-title">付款方式</h3>
              <div class="payment-options-container">
              <!-- Paypal -->
<!--                <button @click="proceedToCheckout">Proceed to Checkout</button>-->
                <router-link :to="{ path: '/checkout/paypal', query: { subtotal: total  } }" class="payment-option">
                  <div class="payment-option-content">
                    <img src="@/assets/paymentImg/paypal.png" alt="Paypal" class="payment-icon">
                    <span>Paypal</span>
                  </div>
                </router-link>

              <!-- Linepay -->
                <router-link :to="{ path: '/checkout/linepay', query: { subtotal: total  } }" class="payment-option">
                  <div class="payment-option-content">
                    <img src="@/assets/paymentImg/linepay.png" alt="Linepay" class="payment-icon">
                    <span>Linepay</span>
                  </div>
                </router-link>

                <router-link :to="{ path: '/checkout/stripe', query: { subtotal: total  } }" class="payment-option">
                  <div class="payment-option-content">
                    <img src="@/assets/paymentImg/stripe.png" alt="Stripe" class="payment-icon">
                    <span>Stripe</span>
                  </div>
                </router-link>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
// import { mapActions } from 'vuex';
export default {
  data() {
    return {
      cartItems: [],
      indexHtml: '',
    };
  },
  computed: {
    total() {
      return this.cartItems.reduce((total, item) => total + item.subtotal, 0);
    },
  },
  methods: {
    async proceedToCheckout() {
      try {
        // this.$router.push({ path: '/checkout/paypal', query: { total: this.total } });

      } catch (error) {
        console.error(error);

        alert("Failed to proceed to checkout!");
      }
    },
    async fetchCartItems() {
      try {
        const response = await axios.get(`${this.API_URL}/cart`);
        this.cartItems = response.data;
        this.cartItems.forEach(item => {
          this.updateSubtotal(item);
        });
      } catch (error) {
        console.error(error);
        alert("Please log in!");
      }
    },
    async deleteCartItem(cartItemId) {
      try {
        await axios.delete(`${this.API_URL}/cart/item/${cartItemId}`);
        // After deleting, fetch the updated cart items
        await this.fetchCartItems();
      } catch (error) {
        console.error(error);
        alert("Failed to delete item from cart!");
      }
    },
    async decrement(item) {
      if (item.quantity > 1) {
        item.quantity--;
        await this.updateCartItemQuantity(item.cartItemId, item.quantity);
        this.updateSubtotal(item);
      }
    },
    async increment(item) {
      item.quantity++;
      await this.updateCartItemQuantity(item.cartItemId, item.quantity)
      this.updateSubtotal(item);
    },
    async updateCartItemQuantity(cartItemId, quantity) {
      try {
        const cartDto = { cartItemId, quantity };
        const response = await axios.put(`${this.API_URL}/cart/${cartItemId}`, cartDto);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        alert("Failed to update cart item quantity!");
      }
    },
    updateSubtotal(item) {
      item.subtotal = item.quantity * item.productPrice;
    },
    getPhotoUrl(photoFile) {
      if (photoFile) {
        const blob = new Blob([photoFile], { type: 'image/jpeg' });
        return URL.createObjectURL(blob);
      } else {
        return 'placeholder_image_url.jpg';
      }
    }
  },
  mounted() {
    // this.updateCartItemCount();
    this.fetchCartItems();
  },
};
</script>

<style>
.form-control{
  min-width:35px;
}

.quantity-selector input {
  max-width: 40px;
}

.btn-outline-secondary {
  width: 60px;
  border-color: #e0e0e0;
}

/* For WebKit-based browsers */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* For Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

/* For all browsers */
input[type="number"] {
  appearance: none;
}

.free-shipping-banner {
  border: 2px dashed #6fa8dc;
  /* Blue dashed border */
  padding: 15px;
  /* position: relative; */
  margin: 10px 0px 10px 0px;
  width: 700px;;
}

.free-shipping-text {
  color: #656a7a;
  font-weight: bold;
  display: block;
  /* Ensure it takes a full line for positioning */
  margin: 10px 0px 10px 0px;
  
}


  .striped-bar {
      width: 100%;
      height: 10px;
      background-image: repeating-linear-gradient(45deg,
          #6fa8dc,
          #6fa8dc 10px,
          #428bca 10px,
          #428bca 20px);
    }
.summary-card {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 400px;
}

.summary-title {
  font-size: 20px;
  margin-bottom: 16px;
  font-weight: bold;
}

.summary-item,
.summary-total {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.summary-options {
  margin-bottom: 20px;
}

.payment-options {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

.payment-title {
  font-size: 30px;
  margin-bottom: 30px;
}
.payment-options-container {
  width: 280px;
  display: flex;
  justify-content: space-between;
}
.payment-option {
  text-align: center;
  cursor: pointer;
  margin-top: 10px;
}

.payment-option-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.payment-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.payment-options h3 {
  margin-bottom: 20px;
}
</style>