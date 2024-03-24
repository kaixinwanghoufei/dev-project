<!--DOM-->
<!--用户登录的 Vue.js 组件-->
<template>
  <div class="loginbView" v-bind:style="{backgroundImage:'url(' + bg + ')'}">
    <div class="login">
      <el-card>
        <h2>project</h2>
        <h1>GameShop<el-tag type="danger" size="small">store owner</el-tag></h1>

        <el-divider></el-divider>
        <el-input class="input" prefix-icon="el-icon-user" v-model="username" placeholder="account"></el-input>
        <el-input class="input" prefix-icon="el-icon-lock" v-model="password" placeholder="password" show-password></el-input>
        <el-button class="loginButton" @click="login()" type="primary" round>login in</el-button>
        <el-button class="loginButton" @click="gotoC()" round>Switch to Consumer</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
import ajax from '../../axios';

export default {
  data () {
    return {
      username: "admin",
      password: "123456",
      isSavePassword: true,

      bg: require('@/assets/login.png'),
    }
  },
  components: {
  },
  mounted() {
  },
  methods: {
    //登录方法
    login() {
      // 发起一个GET请求，请求地址为/b/login.json
      ajax({
        url: '/b/login.json',
        method: 'get',
        params: {
          // 传入用户名
          userName: this.username,
          // 传入密码
          password: this.password,
          // 传入是否保存密码，0不保存，1保存
          isSavePassword: this.isSavePassword
        }
      })
        .then((data) => {
          //判断是否登录成功
          if(data.flag === false){
            //登录失败
            this.$message.info('login failed');
            return;
          }
          //登录成功
          this.$message.info('login successful');
          //跳主页
          this.$router.push({
            path: '/indexb',
            query: {
            },
          });
        })
        .catch((error) => {
          this.$message.error('Interface call exception:'+error);
        })
        .finally(() => {
        });
    },
    //跳转到注册页面
    gotoC(){
      this.$router.push({
        path: '/loginc',
        query: {
        },
      });
    },
  },
}
</script>

<style lang="less">
.loginbView {
  width:100%;
  height:100%;
  position:fixed;
  display:flex;
  justify-content: flex-end;
  align-items: center;
  background-size:100% 100%;
  margin:0;
  padding:0;
  border:0;

  .login {
    width:25%;width:100%;           // 设置宽度为100%
  height:100%;         // 设置高度为100%
  position:fixed;      // 设置定位为固定
  display:flex;        // 设置显示为弹性盒子
  justify-content: flex-end; // 设置水平对齐方式为flex-end
  align-items: center;// 设置垂直对齐方式为center
  background-size:100% 100%; // 设置背景大小为100% 100%
  margin:0;           // 设置外边距为0
  padding:0;          // 设置内边距为0
  border:0;           // 设置边框为0

    margin-right: 15%;

    .el-card {
      // 设置边框圆角
      border-radius: 16px;
      // 设置内边距
      padding: 6px;

      .input{
        margin-bottom: 20px;
      }
      /* 设置登录按钮的宽度为100%，上外边距为20px，左外边距为0px */
      .loginButton{
        width: 100%;
        margin-top: 20px;
        margin-left: 0px;
      }

      .el-tag{
        /** 修改组件内部样式 */
        margin-left: 4px;
      }

      h1 {
        color: #494949;
        font-size: 28px;
        display: flex;
        align-items: center;
        justify-content:center;
        margin-block-start: 0.67em;
        margin-block-end: 0.67em;
      }

      h2 {
        left: 40px;
        color: #494949;
        font-weight: 500;
        font-size: 18px;
      }
    }
  }
}

</style>
