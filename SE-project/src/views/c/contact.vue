<!--显示联系信息，包括地址、电子邮件和地图-->
<template>
  <div class="contactView">
    <el-row>
      <el-col :span="6">&nbsp;</el-col>
      <el-col :span="12">
        <span>Address: Tiananmen Square, Xicheng District, Beijing</span>
        <el-divider></el-divider>
        <span>email: xxxxxx.gmail.com</span>
        <el-divider></el-divider>
        <img :src="require('@/assets/map.png')" class="avatar"  width="60%">
      </el-col>
      <el-col :span="6">&nbsp;</el-col>
    </el-row>
  </div>
</template>

<script>

// 导出默认的Vue组件
export default {
  // 数据
  data () {
    return {
    }
  },
  // 组件
  components: {
  },
  // 挂载
  mounted() {
  },
  // 方法
  methods: {
  }
}
</script>

<style lang="less">
.myinfoView{
  //设置宽度为100%
  width:100%;
  //设置高度为100%
  height:100%;

  //设置el-row的样式
  .el-row{
    //设置上边距为10px
    margin-top: 10px;
    //设置下边距为10px
    margin-bottom: 10px;
  }

  //设置搜索框的样式
  .search{

    //设置el-input的样式
    .el-input{
      //设置宽度为70%
      width: 70%;
    }

  }

 .avatar-uploader .el-upload {
    // 添加边框
    border: 1px dashed #d9d9d9;
    // 设置边框圆角
    border-radius: 6px;
    // 设置鼠标样式
    cursor: pointer;
    // 设置定位
    position: relative;
    // 设置溢出隐藏
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    // 设置边框颜色
    border-color: #409EFF;
  }
 .avatar-uploader-icon {
    // 设置字体大小
    font-size: 28px;
    // 设置字体颜色
    color: #8c939d;
    // 设置宽度
    width: 178px;
    // 设置高度
    height: 178px;
    // 设置行高
    line-height: 178px;
    // 设置文本居中
    text-align: center;
  }
 .avatar {
    // 设置图片宽度
    width: 100px;
    // 设置图片高度
    height: 100px;
    // 设置图片显示方式为块级元素
    display: block;
  }
  
}

</style>
