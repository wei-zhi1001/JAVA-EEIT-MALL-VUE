<script setup>
import { loadScript } from '@paypal/paypal-js'
import { onBeforeMount, ref } from 'vue'

// Change to your CLIENT ID gotten from the developer dashboard
const CLIENT_ID = 'test'

// Define props
const { cartTotal } = defineProps({
  cartTotal: {
    type: Number,
    default: 0.01,
  }
})

// Define a reactive variable to track payment status
const paid  = ref(false)

// Load PayPal script and render buttons before mounting the component
onBeforeMount(function() {
  loadScript({ 'client-id': CLIENT_ID }).then((paypal) => {
    paypal
        .Buttons({
          createOrder: createOrder,
          onApprove: onApprove,
        })
        .render('#paypal-button-container')
  })
})

// Function to create an order
function createOrder(data, actions) {
  console.log('Creating order...')
  return actions.order.create({
    purchase_units: [
      {
        amount: {
          value: cartTotal,
        },
      },
    ],
  })
}

// Function to handle approval of the order
function onApprove(data, actions) {
  console.log('Order approved...')
  return actions.order.capture().then(() => {
    paid.value = true
    console.log('Order complete!')
  })
}
</script>

<template>
  <div id="button-container">
  <div v-if="!paid" id="paypal-button-container"></div>
  <div v-else id="confirmation">Order complete!</div>
  </div>
</template>

<style>
#button-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
#paypal-button-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

#confirmation {
  color: green;
  margin-top: 1em;
  font-size: 2em;
  text-align: center; /* 将文本水平置中 */
}

</style>
