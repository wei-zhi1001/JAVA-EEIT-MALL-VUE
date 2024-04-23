<template >
  <link
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css"
      rel="stylesheet"
  />
  <body>
  <div class="page-holder">
    <div class="modal fade" id="productView" tabindex="-1">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content overflow-hidden border-0">
          <button class="btn-close p-4 position-absolute top-0 end-0 z-index-20 shadow-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
          <div class="modal-body p-0">
            <div class="row align-items-stretch">
              <div class="col-lg-6 p-lg-0"><a class="glightbox product-view d-block h-100 bg-cover bg-center" style="background: url(../assets/img/product-5.jpg)" href="img/product-5.jpg" data-gallery="gallery1" data-glightbox="Red digital smartwatch"></a><a class="glightbox d-none" href="img/product-5-alt-1.jpg" data-gallery="gallery1" data-glightbox="Red digital smartwatch"></a><a class="glightbox d-none" href="img/product-5-alt-2.jpg" data-gallery="gallery1" data-glightbox="Red digital smartwatch"></a></div>
              <div class="col-lg-6">
                <div class="p-4 my-md-4">
                  <ul class="list-inline mb-2">
                    <li class="list-inline-item m-0"><i class="fas fa-star small text-warning"></i></li>
                    <li class="list-inline-item m-0 1"><i class="fas fa-star small text-warning"></i></li>
                    <li class="list-inline-item m-0 2"><i class="fas fa-star small text-warning"></i></li>
                    <li class="list-inline-item m-0 3"><i class="fas fa-star small text-warning"></i></li>
                    <li class="list-inline-item m-0 4"><i class="fas fa-star small text-warning"></i></li>
                  </ul>
                  <h2 class="h4">Red digital smartwatch</h2>
                  <p class="text-muted">$250</p>
                  <p class="text-sm mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus. Vestibulum ultricies aliquam convallis.</p>
                  <div class="row align-items-stretch mb-4 gx-0">
                    <div class="col-sm-7">
                      <div class="border d-flex align-items-center justify-content-between py-1 px-3"><span class="small text-uppercase text-gray mr-4 no-select">Quantity</span>
                        <div class="quantity">
                          <button class="dec-btn p-0"><i class="fas fa-caret-left"></i></button>
                          <input class="form-control border-0 shadow-0 p-0" type="text" value="1">
                          <button class="inc-btn p-0"><i class="fas fa-caret-right"></i></button>
                        </div>
                      </div>
                    </div>
                    <router-link to="/cart">
                      <div class="col-sm-5"><a class="btn btn-dark btn-sm w-100 h-100 d-flex align-items-center justify-content-center px-0" >Add to cart</a></div></router-link>
                  </div><a class="btn btn-link text-dark text-decoration-none p-0" href="#!"><i class="far fa-heart me-2"></i>Add to wish list</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <section class="pt-5">
        <header class="text-center">
          <p class="small text-muted small text-uppercase mb-1">Carefully created collections</p>
          <h2 class="h5 text-uppercase mb-4">Browse our categories</h2>
        </header>
        <div class="row">
          <div class="col-md-4">
            <router-link to="/product/iphoneIndex">
              <div class="category-item">
                <img class="img-fluid" src="@/assets/img/iphone.png" alt=""/>
                <strong class="category-item-title">iPhone</strong>
              </div>
            </router-link>
          </div>
          <div class="col-md-4"><router-link to="/product/macbookIndex"><div class="category-item" ><img class="img-fluid" src="../assets/img/macbook2.jpg" alt=""/><strong class="category-item-title">MacBook</strong></div></router-link>
          </div>
          <div class="col-md-4"><router-link to="/product/ipadIndex"><div class="category-item" href="shop.html"><img class="img-fluid" src="../assets/img/ipad.jpg" alt=""/><strong class="category-item-title">iPad</strong></div></router-link>
          </div>
        </div>
      </section>

      <section class="py-5 bg-light">
        <div class="container">
          <div class="row text-center gy-3">
            <div class="col-lg-4">
              <div class="d-inline-block">
                <div class="d-flex align-items-end">
                  <svg class="svg-icon svg-icon-big svg-icon-light">
                    <use xlink:href="#delivery-time-1"> </use>
                  </svg>
                  <div class="text-start ms-3">
                    <h6 class="text-uppercase mb-1">Free shipping</h6>
                    <p class="text-sm mb-0 text-muted">Free shipping worldwide</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="d-inline-block">
                <div class="d-flex align-items-end">
                  <svg class="svg-icon svg-icon-big svg-icon-light">
                    <use xlink:href="#helpline-24h-1"> </use>
                  </svg>
                  <div class="text-start ms-3">
                    <h6 class="text-uppercase mb-1">24 x 7 service</h6>
                    <p class="text-sm mb-0 text-muted">Free shipping worldwide</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="d-inline-block">
                <div class="d-flex align-items-end">
                  <svg class="svg-icon svg-icon-big svg-icon-light">
                    <use xlink:href="#label-tag-1"> </use>
                  </svg>
                  <div class="text-start ms-3">
                    <h6 class="text-uppercase mb-1">Festivaloffers</h6>
                    <p class="text-sm mb-0 text-muted">Free shipping worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
  </div>
  </body>
  <button class="fixed-button" @click="toggleButtons">
    <i :class="iconClass"></i>
  </button>

  <transition name="slide">
    <div v-if="isButtonsVisible" class="buttons-container">
      <button class="sub-button">
        <a href="https://m.me/61558057817825" target="_blank">
          <i class="fab fa-facebook-messenger"></i>
        </a>
      </button>
      <button class="sub-button">
        <a
            href="https://page.line.me/003cdcek?openQrModal=true"
            target="_blank"
        ><i class="bi bi-line"></i
        ></a>
      </button>
      <button class="sub-button"><i class="fab fa-whatsapp"></i></button>
    </div>
  </transition>
</template>

<script>
function injectSvgSprite(path) {
  var ajax = new XMLHttpRequest();
  ajax.open("GET", path, true);
  ajax.send();
  ajax.onload = function(e) {
    var div = document.createElement("div");
    div.className = 'd-none';
    div.innerHTML = ajax.responseText;
    document.body.insertBefore(div, document.body.childNodes[0]);
  }
}

injectSvgSprite('icons/orion-svg-sprite.svg');

export default {
  data() {
    return {
      isChatIcon: true,
      isRotating: false,
      isButtonsVisible: false,
    };
  },
  computed: {
    iconClass() {
      return this.isChatIcon ? "fas fa-comment" : "fas fa-times";
    },
  },
  methods: {
    async toggleButtons() {
      if (this.isRotating) return; // 如果已經在旋轉中，則不執行

      this.isRotating = true; // 開始旋轉

      await this.rotateIcon(); // 旋轉 icon

      // 切換 icon
      this.isChatIcon = !this.isChatIcon;
      this.isButtonsVisible = !this.isButtonsVisible; // 切換彈出的按鈕列表的可見狀態

      //await this.rotateIcon(); // 再次旋轉 icon

      this.isRotating = false; // 結束旋轉
    },
    rotateIcon() {
      return new Promise((resolve) => {
        const button = document.querySelector(".fixed-button");
        button.classList.add("rotate");
        // 監聽旋轉動畫結束事件
        button.addEventListener("animationend", () => {
          button.classList.remove("rotate");
          resolve();
        });
      });
    },
  },
};
</script>
<style scoped>
.fixed-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.fixed-button i {
  font-size: 25px;
}
.sub-button {
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #2784e7;
  color: #fff;
  border: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
}
.sub-button i {
  font-size: 25px;
}


.rotate {
  animation: rotateIcon 0.3s linear;
}

@keyframes rotateIcon {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
}

.buttons-container {
  position: fixed;
  bottom: 80px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.slide-enter, .slide-leave-to  {
  transform: translateY(0);
  opacity: 1;
}

.slide-enter-to, .slide-leave  {
  transform: translateY(-100%);
  opacity: 0;
}


.sub-button {
  margin-top: 10px;
}

a {
  color: inherit;
  text-decoration: none;
}
a:link {
  color: inherit;
  text-decoration: none;
}

a:visited {
  color: inherit;
  text-decoration: none;
}
</style>