<!--项目首页的布局和功能-->
<template>
  <div class="indexView">
    <el-container>
      <el-header>
        <div class="left">
          <h2>project</h2>
          <h1>GameShop<el-tag size="mini">client</el-tag></h1>
        </div>
        <div class="right">
          <el-tooltip effect="dark" content="log out" placement="bottom">
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
            <el-menu-item index="1">promotional</el-menu-item>
            <el-menu-item index="2">all products</el-menu-item>
            <el-menu-item index="3">shoppp cart</el-menu-item>
            <el-menu-item index="4">contact</el-menu-item>
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
  // 定义组件
  components: {
  },
  // 数据
  data() {
    return {
      // 激活的索引
      activeIndex: "",

      // 抽屉
      drawer: false,
      // 详情
      details:[],
      // 购物车数量
      cartNum: "",

      // 备注
      remark: "",
    };
  },
 mounted() {
    // 判断active参数是否存在
    if(this.$route.query.active === undefined){
      // 不存在则设置activeIndex为1
      this.activeIndex = "1";
    }else{
      // 存在则设置activeIndex为路由参数active
      this.activeIndex = this.$route.query.active;
    }
  },
  methods: {
    // 选择路径
    handleSelect(index){
      let gotopath = "";
      // 判断选择路径
     if(index === "1"){
        gotopath = "/bestsellproductc";
      }else if(index === "2"){
        gotopath = "/productc";
      }else if(index === "3"){
        gotopath = "/basketc";
      }else if(index === "4"){
        gotopath = "/contactc";
      }

      this.$router.push({
        path: gotopath,
        query: {
          active: index
        },
      },()=>{},()=>{});
    },
 exit(){
      // 弹出确认框
      this.$confirm('out sure?', 'hints', {
        // 确认按钮文字
        confirmButtonText: 'sure',
        // 取消按钮文字
        cancelButtonText: 'canel',
        // 弹出框类型
        type: 'warning'
      }).then(() => {
        // 发送ajax请求
        ajax({
          // 请求地址
          url: '/c/loginOut.json',
          // 请求方式
          method: 'get',
          // 请求参数
          params: {
          }
        })
         .then((data) => {
            if(data.flag === false){
              // 弹出提示框
              this.$message.info(data.message);
              return;
            }
           this.$router.push({
              path: "/loginc",
              query: {
              },
            },()=>{},()=>{});
          })
         .catch((error) => {
            // 接口调用异常处理
            this.$message.error('Interface call exception:'+error);
          })
          .finally(() => {
            // 接口调用结束，无论成功失败，都会执行
          });
      }).catch(() => {
      });
    },
  },
};
</script>

<style lang="less">
.indexView {
  // 设置宽度为100%，高度为100%
  width:100%;
  height:100%;

  // 设置头部样式
  .el-header {
    // 设置头部padding为0
    padding: 0;
    // 设置头部为flex布局
    display: flex;
    // 设置头部背景颜色
    background: #c6d8f2;

    // 设置左边样式
    .left{
      // 设置左边位置为绝对定位
      position: absolute;
      // 设置左边距离顶部为13px
      top: 13px;
      // 设置左边距离左边为20px
      left: 20px;

      // 设置左边标签样式
      .el-tag{
        // 设置左边距为4px
        margin-left: 4px;
      }

      // 设置左边标题样式
      h2{
        // 设置文本居左
        text-align: left;
        // 设置颜色为#999999
        color: #999999;
        // 设置字体粗细为500
        font-weight: 500;
        // 设置字体大小为14px
        font-size: 14px;
        // 设置行前缩进为0em
        margin-block-start: 0em;
        // 设置行后缩进为0em
        margin-block-end: 0em;
      }
      // 设置左边标题样式
      h1{
        // 设置颜色为#464646
        color: #464646;
        // 设置字体粗细为600
        font-weight: 600;
        // 设置字体大小为20px
        font-size: 20px;
        // 设置文本居中
        display: flex;
        align-items: center;
        justify-content:center;
        // 设置行前缩进为0em
        margin-block-start: 0em;
        // 设置行后缩进为0em
        margin-block-end: 0em;
      }
    }

    // 设置右边样式
    .right{
      // 设置右边位置为绝对定位
      position: absolute;
      // 设置右边距离顶部为14px
      top: 14px;
      // 设置右边距离右边为40px
      right: 40px;

      // 设置右边按钮样式
      .el-button--text{
        // 设置字体大小为24px
        font-size: 24px;
      }

      // 设置右边项目样式
      .item {
        // 设置项目距离顶部为-10px
        margin-top: -10px;
        // 设置项目距离右边为40px
        margin-right: 40px;
        // 设置项目提示框距离顶部为10px
        .el-badge__content{
          top: 10px;
        }
      }
    }
  }

  // 设置菜单样式
  .el-menu {
    // 设置宽度为100%
    width: 100%;
    // 设置高度为100%
    height: 100%;
  }

  .main {
    // background: #E5EAF1;
    height: 100%;
    min-height: 700px;
    // padding-top: 5px;
    // padding-left: 20px;
    // padding-right: 20px;
    // padding-bottom: 20px;
  }

 .draw{

    .el-drawer__body{
      // 设置抽屉内部元素的内边距
      padding-left: 5px;
      // 设置抽屉内部元素的高度
      width: 100%;
    }

    .el-button{
      // 设置按钮距离顶部距离
      margin-top: 10px;
    }

    .avatar {
      // 设置头像的宽度
      width: 60px;
      // 设置头像的高度
      height: 60px;
      // 设置头像的显示方式
      display: block;
    }
  }
}
</style>
