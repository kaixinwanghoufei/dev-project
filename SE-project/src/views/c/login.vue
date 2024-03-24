<!--用户输入用户名和密码进行登录的功能-->
<template>
  <div class="loginView" v-bind:style="{backgroundImage:'url(' + bg + ')'}">
    <div class="login">
      <el-card>
        <h2>project</h2>
        <h1>GameShop<el-tag size="small">consumer end</el-tag></h1>

        <el-divider></el-divider>
        <div>
          <el-input class="input" prefix-icon="el-icon-user" v-model="username" placeholder="account"></el-input>
          <el-input class="input" prefix-icon="el-icon-lock" v-model="password" placeholder="password" show-password></el-input>
          <el-button class="loginButton" @click="login()" type="primary" round>login in</el-button>
        </div>
        <el-button class="loginButton" @click="gotoB()" round>Switch to the store owner's end</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
import ajax from '../../axios';

export default {
  data () {
    return {
      // 用户名
      username: "user001",
      // 手机号
      phone: "",
      // 密码
      password: "123456",
      // 是否保存密码
      isSavePassword: true,
      
      // 背景图片
      bg: require('@/assets/loginc.png'),
    }
  },
  components: {
  },
  mounted() {
  },
  methods: {
    
   login() {
      // 发送ajax请求
      ajax({
        // 请求地址
        url: '/c/login.json',
        // 请求方式
        method: 'get',
        // 请求参数
        params: {
          // 用户名
          userName: this.username,
          // 密码
          password: this.password,
          // 是否保存密码
          isSavePassword: this.isSavePassword
        }
      })
       .then((data) => {
          //判断是否登录成功
          if(data.flag === false){
            //提示登录失败
            this.$message.info('login failed');
            return;
          }
          //提示登录成功
          this.$message.info('login successful');
          //跳主页
          this.$router.push({
            path: '/indexc',
            query: {
            },
          });
        })
        .catch((error) => {
          this.$message.error('Interface call exception:'+error);
        })
        .finally(() => {
            // 结束时执行
        });
    },
   gotoB(){
      // 跳转到登录页
      this.$router.push({
        path: '/loginb',
        query: {
        },
      });
    },
  },
}
</script>

<style lang="less">
.loginView {

  // background: var(--u);
 width:100%;
  //设置高度为100%
  height:100%;
  //设置定位为fixed
  position:fixed;
  //设置元素为flex布局
  display:flex;
  //设置主轴对齐方式为flex-end
  justify-content: flex-end;
  //设置交叉轴对齐方式为center
  align-items: center;
  //设置背景图片大小为100% 100%
  background-size:100% 100%;
  //设置margin为0
  margin:0;
  //设置padding为0
  padding:0;
  //设置边框为0
  border:0;

  .login {
    width:25%;
    margin-right: 15%;

    .el-card{
      // 设置圆角
      border-radius: 16px;
      // 设置内边距
      padding: 6px;

      .input{
        // 设置底部外边距
        margin-bottom: 20px;
      }
      .loginButton{
        // 设置宽度
        width: 100%;
        // 设置顶部外边距
        margin-top: 20px;
        // 设置左边外边距
        margin-left: 0px;
      }

      .el-tag{
        // 设置左边外边距
        margin-left: 4px;
      }

     h1 {
        // 设置文字颜色
        color: #494949;
        // 设置文字大小
        font-size: 28px;
        // 设置文字居中
        display: flex;
        align-items: center;
        justify-content:center;
        // 设置文字间距
        margin-block-start: 0.67em;
        margin-block-end: 0.67em;
      }

     h2 {
        // 设置h2标签的左边距
        left: 40px;
        // 设置h2标签的颜色
        color: #494949;
        // 设置h2标签的字体粗细
        font-weight: 500;
        // 设置h2标签的字体大小
        font-size: 18px;
      }
    }


  }

}

</style>
