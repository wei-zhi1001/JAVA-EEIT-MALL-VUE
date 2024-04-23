<template>
  <main class="main-container">
    <MemberOption class="sidebar"></MemberOption>
    <div class="content-container">
      <div class="profile-card">
        <div class="profile-header">
          <h1 class="display-4 fw-normal">會員密碼修改</h1>
        </div>
        <div class="horizontal-divider"></div>
        <div class="startdiv"> (<span class="start">*</span> 為必填欄位)</div>
        <div class="form-container">
          <form @submit.prevent="submitUpdate" class="member-form">

            <div v-if="memberPasswordData" class="form-group">
              <label for="userName">姓名</label>
              <input type="text" id="userName" v-model="memberPasswordData.userName" :disabled="true" />
            </div>

            <div v-if="memberPasswordData" class="form-group">
              <label>電子信箱</label>
              <input type="text" v-model="memberPasswordData.email" :disabled="true" />
            </div>

            <div v-if="memberPasswordData" class="form-group">
              <label>密碼<span class="start">*</span></label>
              <input type="password" v-model="inputemberPasswordData.password" autocomplete="current-password"/>
              <div class="icon-label-group">
                <template v-if="sendfirstcode">
                  <img v-if="!IsInputMemberPasswordData" src="/wrong.jpg" class="icon-background" />
                  <label v-if="!confirmPasswordData.password" class="missing-data-label">密碼錯誤</label>
                </template>
              </div>
            </div>

            <div v-if="memberPasswordData && ResetPasswordData" class="form-group">
              <label>重設密碼<span class="start">*</span></label>
              <input type="password" v-model="ResetPasswordData.password" autocomplete="new-password"/>
              <div class="icon-label-group">
                <img v-if="!this.ResetPasswordData.password" src="/wrong.jpg" class="icon-background" />
                <label v-if="!ResetPasswordData.password" class="missing-data-label">尚未填寫</label>
              </div>
            </div>

            <div v-if="memberPasswordData && confirmPasswordData" class="form-group">
              <label>確認密碼<span class="start">*</span></label>
              <input type="password" v-model="confirmPasswordData.password" autocomplete="new-password"/>

              <div class="icon-label-group">
                <img :src="IsConfirmPassword ? '/greentick.jpg' : '/wrong.jpg'" class="icon-background" />
                <label v-if="!confirmPasswordData.password" class="missing-data-label">尚未填寫</label>
                <label v-else-if="confirmPasswordData.password !== ResetPasswordData.password && ResetPasswordData.password && confirmPasswordData.password" class="missing-data-label">密碼錯誤</label>
              </div>
            </div>
            <div>
              <div>
                <div class="vinput">
                  <div>驗證碼<span class="start">*</span> </div>
                  <input type="text" v-model="VerificationCode"/>
                  <span v-if="sendFirstVerificationCode">
                      <img :src="VerificationCodePass ? '/greentick.jpg' : '/wrong.jpg'" class="icon-background" />
                      <label v-if="!VerificationCodePass" class="missing-data-label">驗證碼錯誤</label>
                      </span>
                </div>
                <br>
                <div class="button-group">
                  <button
                      type="primary"
                      @click="sendCode"
                      :disabled="disableSend"
                      :class="['myButton', 'vbutton', { 'disabled': disableSend }]"
                  >
                    {{ buttonText }}
                  </button>
                  <button @click="submitUpdate" :disabled="disableupdate" class="myButton">重設密碼</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>

  <div class="modal fade" id="blockedAccountModalValid" tabindex="-1" aria-labelledby="blockedAccountModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-light text-black">
          <h5 class="modal-title" id="blockedAccountModalLabel">提示</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          驗證碼驗發送成功,請確認您的電子信箱
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">確認</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="blockedAccountModalPass" tabindex="-1" aria-labelledby="blockedAccountModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-light text-black">
          <h5 class="modal-title" id="blockedAccountModalLabel">提示</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          重設密碼成功
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MemberOption from "@/components/MemberOption.vue";
import axios from "axios";
import {useUserStore} from "@/stores/userStore.js";
export default {
  data() {
    return {
      memberPasswordData: null,
      inputemberPasswordData: {password: ''},
      ResetPasswordData: {password: ''},
      confirmPasswordData: {password: ''},
      email: '',
      disableSend: false,
      disableupdate: false,
      VerificationCode: '',
      VerificationCodePass: false,
      IsConfirmPassword: false,
      IsInputMemberPasswordData: '',
      sendfirstcode: false,
      sendFirstVerificationCode: false,
      feedbackDTO: {
        userID: null,
        orderID: null,
      },
      memberRePasswordDTO:{
        userID: null,
        password: null,
      },

      countdown: null,
      buttonText: '取得驗證碼',
    };
  },
  created() {
    this.inputemberPasswordData.password = "";
    this.ResetPasswordData.password = "";
    this.confirmPasswordData.password = "";
  },
  components: {
    MemberOption,
  },
  watch: {
    // 監聽ResetPasswordData.password和confirmPasswordData.password的變化
    'ResetPasswordData.password'(newVal, oldVal) {
      this.updateIsConfirmPassword();
    },
    'confirmPasswordData.password'(newVal, oldVal) {
      this.updateIsConfirmPassword();
    },
    'inputemberPasswordData.password'(newVal, oldVal) {
      this.updateInputPassword();
    }
  },
  methods: {
    getMemberPasswordData(userId) {
      axios
          .get(`${this.API_URL}/member/showrepassworddata?userId=${userId}`)
          .then((response) => {
            console.log(response);
            this.memberPasswordData = response.data;
            this.email = response.data.email
          })
          .catch((error) => {
            console.log(error);
          });
    },
    sendCode() {
      this.disableSend = true;
      console.log(this.email);
      this.buttonText = '重新取得驗證碼';
      let counter = 31;
      this.countdown = setInterval(() => {
        counter--;
        if (counter > 0) {
          this.buttonText = `重新取得驗證碼(${counter})`;
        } else {
          this.buttonText = '重新取得驗證碼';
          this.disableSend = false;
          clearInterval(this.countdown);
        }
      }, 1000);

      axios.post(`${this.API_URL}/register`, {email: this.email})
          .then(res => {
            console.log(res.data)
            if (res.data.code === 1) {
              var myModal = new bootstrap.Modal(document.getElementById('blockedAccountModalValid'));
              myModal.show();
            } else {
              alert(res.data.message);
              this.disableSend = false;
            }
          })
          .catch(error => {
            console.error(error);
            alert('發送驗證碼失敗');
            this.disableSend = false;
          });
    },

    verifyCodeNumber() {
      return new Promise((resolve, reject) => {
        axios.post(`${this.API_URL}/verifyCode`, { email: this.email, code: this.VerificationCode })
            .then(res => {
              this.sendFirstVerificationCode=true;
              if (res.data.code === 1) {
                this.VerificationCodePass = true;
                resolve(true);

              } else {
                alert("驗證碼驗證錯誤");
                this.VerificationCodePass = false;
                reject(false);

              }
            })
            .catch(error => {
              console.error(error);
              alert('驗證碼發送錯誤!');
              this.VerificationCodePass = false;
              reject(error);
            });
      });
    },
    confirmAndResetPassword() {
      if (this.ResetPasswordData.password && this.confirmPasswordData.password) {
        if (this.confirmPasswordData.password !== this.ResetPasswordData.password) {
          this.IsConfirmPassword = false;
          alert("密碼重設與確認不符");
          return false;
        } else {
          this.IsConfirmPassword = true;
          return true;
        }
      }
      return false;
    },
    updateIsConfirmPassword() {
      if (this.ResetPasswordData.password && this.confirmPasswordData.password) {
        if (this.confirmPasswordData.password !== this.ResetPasswordData.password) {
          this.IsConfirmPassword = false;
        } else {
          this.IsConfirmPassword = true;
        }
      }
    },

    updateInputPassword(){
      this.memberRePasswordDTO.password = this.inputemberPasswordData;
    },

    oringPassword() {
      return new Promise((resolve, reject) => {
        axios.put(`${this.API_URL}/member/memberInputPassword`, {
          userID: this.memberRePasswordDTO.userID,
          password: this.inputemberPasswordData.password
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
            .then(res => {
              this.sendfirstcode = true;
              if(res.data === true){
                console.log(res);
                this.IsInputMemberPasswordData = true;
                resolve(true);

              }else{
                console.log(res);
                this.IsInputMemberPasswordData = false;
                alert('原密碼錯誤!');
                reject(false);

              }
            })
            .catch(error => {
              console.error(error);
              alert('原密碼發送錯誤!');
              reject(error);
            });
      });
    },

    submitUpdate: async function() {
      if (this.disableupdate) return;

      this.disableSend = true;
      this.disableupdate = true;

      try {
        const codeVerified = await this.verifyCodeNumber();
        if (!codeVerified) throw new Error('驗證碼驗證失敗');

        const passwordCorrect = await this.oringPassword();
        if (!passwordCorrect) throw new Error('原始密碼不正確');

        const passwordConfirmed = this.confirmAndResetPassword();
        if (!passwordConfirmed) throw new Error('密碼重設與確認不符');

        await axios.put(`${this.API_URL}/update/memberRePasswordDTO`, {
          userID: this.memberRePasswordDTO.userID,
          password: this.ResetPasswordData.password
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        var myModal = new bootstrap.Modal(document.getElementById('blockedAccountModalPass'));
        myModal.show();
      } catch (error) {
        console.error(error);
        clearInterval(this.countdown);
      } finally {
        this.disableSend = false;
        this.disableupdate = false;
        clearInterval(this.countdown);
        this.buttonText = '重新取得驗證碼';
      }
    }
  },
  mounted() {
    const userStore = useUserStore();
    if (userStore.isLoggedIn) {
      this.getMemberPasswordData(userStore.userId);
    } else {
      console.log("會員未登入");
    }
    this.updateIsConfirmPassword();
    this.memberRePasswordDTO.userID = userStore.userId;
    if (this.countdown) {
      clearInterval(this.countdown);
    }
  },
};
</script>

<style scoped>
.icon-background {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: cover;
  background-position: center;
  margin: 0;
}

.icon-label-group {
  display: flex;
  align-items: center;
  gap: 10px;
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
  max-width: 700px;
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

.brand-slogan {
  font-size: 1em;
  color: #666;
}

.member-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.missing-data-label {
  color: red;
  font-size: 12px;
  margin: 0;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input[type="text"],
.form-group input[type="password"],
.form-group input[type="email"],
.form-group input[type="tel"] {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.content-container {
  margin-bottom: 50px;
}

.horizontal-divider {
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin-bottom: 20px;
}

.input-wrapper input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}
.myButton{
  background-color: white;
  border-color: black;
  color: black;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  margin-top: 10px;
  margin-left: 10px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: black;
  color: white;
}

.member-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
}

.form-group label {
  margin-bottom: 5px;
}

.form-group input {
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
}

.start{
  color: red;
}
.startdiv{
  display: block;
  text-align: right;
  margin-left: auto;
  margin-right: 20px;
}

.myButton {
  border: 2px solid black;
  padding: 10px 15px;
  border-radius: 20px;
  background-color: white;
  color: black;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  display: block;
  margin: 0;
  width: auto;
}

.myButton:hover {
  background-color: black;
  color: white;
}

.vbutton{
  margin-right: 10px;
}
.vinput{
  width: 200px;
  margin-left: 20px;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

@media (max-width: 600px) {
  .button-group {
    flex-direction: column;
  }
}

.myButton.disabled {
  background-color: #ccc;
  color: #666;
  border-color: #999;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
