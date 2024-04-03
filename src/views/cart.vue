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

            <div>
              排序：
              <select class="form-select" v-model="selectedSort" @change="sortItems">
                <option value="price-asc">價格低至高</option>
                <option value="price-desc">價格高至低</option>
              </select>
            </div>
          </div>

          <!-- Column Titles -->
          <div class="row text-muted mb-3 text-center align-items-center">
            <div class="col-1">移除</div>
            <div class="col-2">圖片</div>
            <div class="col-3">商品</div>
            <div class="col-2">數量</div>
            <div class="col-2">價格</div>
            <div class="col-2">小計</div>
          </div>

          <!-- Product List -->
          <div v-for="item in cartItems" :key="item.productId" class="card mb-3">
            <div class="card-body">
              <div class="row align-items-center">

                <!-- Remove Item Column -->
                <div class="col-1 text-center">
                  <a href="#" class="text-danger" @click.prevent="deleteCartItem(item.productId)">
                    <i class="fas fa-times"></i>
                  </a>
                </div>

                <!-- Product Image Column -->
                <div class="col-2 text-center">
                  <img :src="`${API_URL}/product/photo/${item.productPhotoId}`" class="img-fluid" alt="product">
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
                <div class="col-2 text-center">
                  <span class="text-secondary">{{ item.productPrice }}</span>
                </div>

                <!-- Product Subtotal Column -->
                <div class="col-2 text-center">
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
            <router-link to="/checkout" class="btn-checkout">
              <button class="checkout-btn">結帳</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      cartItems: [],
      // selectedSort: 'price-asc',
    };
  },
  computed: {
    // sortedCartItems() {
    //   let sortedArray = [...this.cartItems];
    //   if (this.selectedSort === 'price-asc') {
    //     sortedArray.sort((a, b) => a.productPrice - b.productPrice);
    //   } else if (this.selectedSort === 'price-desc') {
    //     sortedArray.sort((a, b) => b.productPrice - a.productPrice);
    //   }
    //
    //   return sortedArray.map(item => ({
    //     ...item,
    //     subtotal: item.productPrice * item.quantity,
    //   }));
    // },
    // cartWithSubtotals() {
    //   return this.cartItems.map(item => ({
    //
    //     ...item,
    //     subtotal: item.productPrice * item.quantity,
    //
    //   })
    //   );
    // },
    total() {
      return this.cartItems.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);
    },
  },
  mounted() {
    axios
      .get(`${this.API_URL}/cart`)
      .then((rs) => {
        this.cartItems = rs.data;
      })
      .catch((err) => {
        console.error(err);
        alert("未登入!");
      });
  },
  methods: {
    deleteCartItem(cartItemId) {
      axios
        .delete(`${this.API_URL}/cart/item/${cartItemId}`)
        .then(() => {
          this.cartItems = this.cartItems.filter(item => item.productId !== cartItemId);

        })
        .catch(error => {
          console.error("delete fail", error);
        });
    },
    increment(item) {
      const index = this.cartItems.findIndex(i => i.productId === item.productId);
      if (index !== -1) {
        this.cartItems[index].quantity++;
      }
    },
    decrement(item) {
      const index = this.cartItems.findIndex(i => i.productId === item.productId);
      if (index !== -1 && this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
      }
    },
    
      sortItems() {
        // This method is triggered when the selected option changes.
        // The sortedCartItems computed property will automatically update.
      },
    
  }
};
</script>

<style>
.list-item {
  border-bottom: 1px solid #e0e0e0;
  /* padding: 1rem; */
}

.quantity-selector {
  /* padding-top: 15px; */
  border-radius: 20px;
  width: 150px;
  height: 30px;
  border: none;
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



.checkout-btn {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  width: 100%;
  cursor: pointer;
}

.checkout-btn:hover {
  background-color: #0056b3;
}
</style>