<template>
  <div>
    <!-- 头像区域 -->
    <van-row>
      <van-col span="8" @click="openModel"
        ><img :src="avatar" alt="" style="height: 70px"
      /></van-col>
      <van-col span="8" @click="openModel">{{ userName }}</van-col>
      <van-col span="8" style="color: red; font-size: 15px" @click="logout"
        >退出</van-col
      >
    </van-row>
    <!-- 登录区域 -->
    <div class="login_model" v-if="showModel">
      <section @click="colseModel"></section>
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >提交</van-button
          >
        </div>
      </van-form>
    </div>
    <van-grid :column-num="3" square>
      <van-grid-item icon="cart-circle-o" text="我的订单" @click="kf" />
      <van-grid-item icon="coupon-o" text="优惠卷" @click="kf" />
      <van-grid-item icon="point-gift-o" text="礼品卡" @click="kf" />
      <van-grid-item icon="star-o" text="我的收藏" @click="kf" />
      <van-grid-item icon="flag-o" text="我的足迹" @click="kf" />
      <van-grid-item icon="vip-card-o" text="会员福利" @click="kf" />
      <van-grid-item icon="location-o" text="地址管理" @click="kf" />
      <van-grid-item icon="warn-o" text="账号安全" @click="kf" />
      <van-grid-item icon="service-o" text="联系客服" @click="kf" />
      <van-grid-item icon="question-o" text="帮助中心" @click="kf" />
      <van-grid-item icon="records" text="意见反馈" @click="kf" />
    </van-grid>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avatar: require("@/assets/avatar.jpg"),
      username: "",
      password: "",
      showModel: false,
      userName: "立即登录",
    };
  },
  computed: {},
  methods: {
    // 登录功能
    async onSubmit(values) {
      const res = await this.$http.post("/auth/loginByWeb", {
        username: values["用户名"],
        pwd: values["密码"],
      });
      if (res.errno == 0) {
        let NewUserInfo = JSON.stringify(res.data.userInfo);
        let token = res.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("userInfo", NewUserInfo);
        this.$toast.success("登录成功");
        this.userName = res.data.userInfo.username;
        this.avatar = res.data.userInfo.avatar;
        setTimeout(() => {
          this.colseModel();
        }, 1000);
      }
      console.log(res);
    },
    /* 关闭模态框 */
    colseModel() {
      this.showModel = false;
      this.username = "";
      this.password = "";
    },
    /* 打开模态框 */
    openModel() {
      let token = localStorage.getItem("token");
      if (!token) {
        this.showModel = true;
      }
      return;
    },
    /* 注销 */
    logout() {
      let token = localStorage.getItem("token");
      if (token !== "" && token) {
        localStorage.setItem("token", "");
        this.userName = "立即登录";
        this.avatar = require("@/assets/avatar.jpg");
        this.$toast.success("退出成功");
      } else {
        this.$toast.fail("请先登录");
      }
    },
    kf() {
      this.$toast("抱歉，该功能正在开发中");
    },
  },
  created() {
    let token = localStorage.getItem("token");
    if (token !== "" && token) {
      let userInfo = localStorage.getItem("userInfo");
      let newUserInfo = JSON.parse(userInfo);
      this.avatar = newUserInfo.avatar;
      this.userName = newUserInfo.username;
    }
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.van-row {
  padding: 20px 4%;
  background: #333;
  color: #fff;
  .van-col {
    line-height: 70px;
    font-size: 20px;
    cursor: default;
  }
  img {
    border-radius: 50%;
    display: block;
  }
  &:last-child {
    text-align: right;
  }
}
.login_model {
  width: 100%;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99;
  section {
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
  }
  .van-form {
    width: 90%;
    position: absolute;
    top: 40vh;
    left: 50%;
    margin-left: -45%;
    padding: 10px;
    box-sizing: border-box;
    background: #fff;
  }
}
</style>                                                                                                                                                                                                                                                                                                    