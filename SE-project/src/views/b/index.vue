<!--网页的主页面布局-->
<template>
  <div class="indexView">
    <el-container>
      <el-header>
        <div class="left">
          <h2>project</h2>
          <h1>GameShop<el-tag type="danger" size="mini">store owner</el-tag></h1>
        </div>
        <div class="right">
          <el-tooltip effect="dark" content="exit program" placement="bottom">
            <el-button type="text" @click="exit()"><i class="el-icon-upload2"></i></el-button>
          </el-tooltip>
        </div>
      </el-header>
      <el-container>
        <el-aside width="180px">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-vertical-demo"
            @select="handleSelect"
            background-color="#526B9C"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="1">category management</el-menu-item>
            <el-menu-item index="2">product management</el-menu-item>
            <el-menu-item index="3">Sales History</el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import ajax,{baseURL} from '../../axios';

export default {
  components: {
  },
  data() {
    return {
      activeIndex: "",
    };
  },
  mounted() {
    // 判断路由中的active参数是否有值
    if(this.$route.query.active === undefined){
      // 如果没有值，则设置activeIndex为1
      this.activeIndex = "1";
    }else{
      // 如果有值，则设置activeIndex为路由中的active参数
      this.activeIndex = this.$route.query.active;
    }
  },
  methods: {
    handleSelect(index){
      // 根据传入的index值判断跳转到哪个页面
      let gotopath = "";
      if(index === "1"){
        // 跳转到分类页面
        gotopath = "/categoryb";
      }else if(index === "2"){
        // 跳转到商品页面
        gotopath = "/productb";
      }else if(index === "3"){
        // 跳转到账单页面
        gotopath = "/billb";
      }

      this.$router.push({
        path: gotopath,
        query: {
          active: index
        },
      },()=>{},()=>{});
    },
    // 退出登录
    exit(){
      // 提示确认退出
      this.$confirm('Confirm exit?', 'hints', {
        confirmButtonText: 'sure',
        cancelButtonText: 'cancel',
        type: 'warning'
      }).then(() => {
        // 确认退出，发送请求
        ajax({
          url: '/b/loginOut.json',
          method: 'get',
          params: {
          }
        })
          .then((data) => {
            // 如果data.flag为false，则提示错误信息
            if(data.flag === false){
              this.$message.info(data.message);
              return;
            }
            // 跳转到登录页面
            this.$router.push({
              path: "/loginb",
              query: {
              },
            },()=>{},()=>{});
          })
          .catch((error) => {
            // 接口调用异常
            this.$message.error('Interface call exception:'+error);
          })
          .finally(() => {
            // 无论成功还是失败，都会执行finally中的代码
          });
      }).catch(() => {
        // 取消登录
      });
    },
  },
};
</script>

<style lang="less">
.indexView {
  width:100%; // 设置indexView的宽度为100%
  height:100%; // 设置indexView的高度为100%

  .el-header {
    padding: 0;
    display: flex;
    background: #c6d8f2;
    // 设置头部背景颜色

    .left{
      position: absolute;
      top: 13px;
      left: 20px;
      /* left: 50%;
      transform: translateX(-50%); */
}
.right{
      position: absolute;
      top: 13px;
      right: 20px;
      // 定义右边框

      .el-tag{
        margin-left: 4px;
      }

      h2{
        /* 文本对齐方式 */
        text-align: left;
        /* 文字颜色 */
        color: #999999;
        /* 字体粗细 */
        font-weight: 500;
        /* 字体大小 */
        font-size: 14px;
        /* 段落开始空格 */
        margin-block-start: 0em;
        /* 段落结束空格 */
        margin-block-end: 0em;
      }
      h1{
        // 设置文字颜色
        color: #464646;
        // 设置字体粗细
        font-weight: 600;
        // 设置字体大小
        font-size: 20px;
        // 设置元素水平居中
        display: flex;
        // 设置元素垂直居中
        align-items: center;
        // 设置元素水平居中
        justify-content:center;
        // 设置元素首行缩进
        margin-block-start: 0em;
        // 设置元素末行缩进
        margin-block-end: 0em;
      }
    }

    .right{
      /* 定位右上角 */
      position: absolute;
      top: 14px;
      right: 40px;

      .el-button--text{
        /* 按钮文字大小 */
        font-size: 24px;
      }
    }
  }

  .el-menu {
    width: 100%;
    height: 100%;
  }

  .main {

    // 设置主页面的高度为100%
    height: 100%;
    // 设置主页面的高度最小为700px
    min-height: 700px;

  }
}
</style>
