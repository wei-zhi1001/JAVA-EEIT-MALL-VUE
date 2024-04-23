<template>
  <main class="main-container">
    <MemberOption class="sidebar"></MemberOption>
    <div class="content-container">
      <div class="profile-card">
        <div class="profile-header">
          <h6 class="display-4 fw-normal">新增評論</h6>
          <label>訂單編號：{{ order.orderId }}</label>
        </div>
        <div class="horizontal-divider"></div>

        <div class="container">
          <form @submit.prevent="submitFeedback">
            <div class="form-group">
              <label for="feedbackType">類型：</label>
              <select v-model="feedback.type" id="feedbackType" required>
                <option value="服務態度">服務態度</option>
                <option value="商品品質">商品品質</option>
                <option value="配送速度">配送速度</option>
                <option value="售後服務">售後服務</option>
                <option value="其他">其他</option>
              </select>
            </div>
            <p/>
            <div class="form-group">
              <label for="feedbackDescription" class="form-label">描述：</label>
              <textarea v-model="feedback.description" id="feedbackDescription" class="textarea-large" required >配送速度快速，非常滿意</textarea>
            </div>
            <button type="submit" class="myButton">提交評論</button>
          </form>
        </div>
      </div>
    </div>
  </main>

  <div class="modal fade" id="blockedAccountModalUp" tabindex="-1" aria-labelledby="blockedAccountModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-light text-black">
          <h5 class="modal-title" id="blockedAccountModalLabel">提示</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          意見反饋新增成功
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MemberOption from "@/components/MemberOption.vue";
import { useUserStore } from "@/stores/userStore";
import { OrdersFeedbackStore } from "@/stores/OrdersFeedbackStore";
import axios from "axios";

export default {

  components: {
    MemberOption,
  },
  data() {
    const userStore = useUserStore();
    return {
      feedback: {
        type: '',
        description: '',
        orderId: null,
        userId:  userStore.userId,
        feedbackDate: null,
        ordersDetailId: null,
      },
      order: null,
    };
  },
  created() {
    const ordersFeedbackStore = OrdersFeedbackStore();
    this.order = ordersFeedbackStore.order;
    if (!this.order) {
      this.$router.push("/MemberCenter/CustomerFeedbackAdd");
    }
  },
  methods: {
    submitFeedback() {
      const userStore = useUserStore();
      if (!userStore.userId) {
        alert("用戶未登入");
        return;
      }
      this.feedback.userId = userStore.userId;
      this.feedback.orderId = this.order.orderId;
      this.feedback.ordersDetailId = 3;
      this.feedback.feedbackDate = new Date().toISOString(); // 设置当前时间为反馈时间

      console.log(this.feedback.userId);
      console.log(this.feedback.orderId);
      console.log(this.feedback.type);
      console.log(this.feedback.description);

      axios.post(`${this.API_URL}/create/customerFeedbacks`, {
        userID: this.feedback.userId,
        orderID: this.feedback.orderId,
        type: this.feedback.type,
        description: this.feedback.description,
        feedbackDate: this.feedback.feedbackDate,
        ordersDetailId: this.feedback.ordersDetailId,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
          .then(response => {
            var myModal = new bootstrap.Modal(document.getElementById('blockedAccountModalUp'));
            myModal.show();
            this.$router.push('/MemberCenter/MemberFeedback');
          })
          .catch(error => {
            alert('新增評論失敗！');
            console.error(error);
          });
    },
  },
  unmounted() {
    const ordersFeedbackStore = OrdersFeedbackStore();
    ordersFeedbackStore.clearOrder();
  }
};
</script>

<style scoped>
.form-group {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
}

.form-label {
  margin-right: 10px;
  white-space: nowrap;
}

.textarea-large {
  flex-grow: 1;
  min-height: 150px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  margin-top: 0;
}

.main-container {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: #333;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
}

.content-container {
  flex-grow: 1;
  padding: 20px;
  background-color: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-card {
  width: 100%;
  max-width: 1000px;
  padding: 20px;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-header {
  text-align: center;
  margin-bottom: 30px;
}

.brand-title {
  font-size: 2.5em;
  color: #333;
}

.horizontal-divider {
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin-bottom: 20px;
}

.myButton{
  display: block;
  margin: 0 auto;
  width: max-content;
  background-color: #84C1FF;
  color: #3C3C3C;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
}
button:hover {
  background-color: #0056b3;
}

.myButton {
  padding: 10px 15px;
  border: black 3px solid !important;
  border-radius: 25px;
  background-color: white;
  color: black;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  display: block;
  margin: auto;
}

.myButton:hover {
  background-color:		black !important;
  color: white;
}
</style>
