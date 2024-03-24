<!--ui-->
<!--显示订单的详细界面-->
<template>
<div class="billView"><!--div元素-->
    <el-row>
      <el-col :span="4">&nbsp;</el-col><!--用于填充左边的空白区域-->
      <el-col :span="16">
        <el-row class="search">
          <el-col :span="24">
            <el-radio-group v-model="type" size="mini" @input="search()">
              <el-radio-button label="all orders">All Orders</el-radio-button>
              <el-radio-button label="bestseller Top10">bestseller Top10</el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-table
          :data="entities"
          style="width: 100%"
          stripe
          size="small">
          <el-table-column
            prop="product_image"
            label="pictures"
            width="200">
            <template slot-scope="scope">
              <img :src="scope.row.product_image" class="avatar"  width="60%">
            </template>
          </el-table-column>
         <el-table-column
            prop="product_name"
            label="name"
            width="160">
          </el-table-column>
          <el-table-column
            prop="bill_date"
            label="sale date"
            width="180"
            :formatter="formatDate">
          </el-table-column>
          <el-table-column
            prop="bill_price"
            label="prices"
            width="100">
          </el-table-column>
          <el-table-column
            prop="num"
            label="Quantity sold"
            width="100">
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="4">&nbsp;</el-col>
    </el-row>
  </div>
</template>

<script>
import ajax,{baseURL} from '../../axios';

export default {
  data () {
    return {
      // 实体列表
      entities: [],
      // 类型
      type: "all",

      // 实体
      entity: {},
    }
  },
  components: {
  },
 mounted() {
    // 当组件加载完成时调用
    this.search();
  },
  methods: {
    
    search(){
      // 发起ajax请求
      ajax({
        // 请求地址
        url: '/b/bill/list.json',
        // 请求方式
        method: 'get',
        // 请求参数
        params: {
          type: this.type
        }
      })
        .then((data) => {
          // 接口返回成功
          if(data.flag === false){
            // 接口返回失败
            this.$message.info(data.message);
            return;
          }
          // 接口返回成功
          this.entities = data.data;
        })
        .catch((error) => {
          // 接口调用异常
          this.$message.error('Interface call exception:'+error);
        })
        .finally(() => {
          // 接口调用结束
        });
    },
  }
}
</script>

<style lang="less">
.foodView{
  //设置宽度为100%
  width:100%;
  //设置高度为100%
  height:100%;

  //设置el-row的上下边距
  .el-row{
    margin-top: 10px;
    margin-bottom: 10px;
  }

  //设置搜索框
  .search{

    //设置el-input的宽度为70%
    .el-input{
      width: 70%;
    }

  }

 .avatar-uploader .el-upload {
    // 设置边框为1px实线
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
    // 鼠标悬停时的边框颜色
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    // 头像上传图标的字体大小
    font-size: 28px;
    // 头像上传图标的颜色
    color: #8c939d;
    // 头像上传图标的宽度
    width: 178px;
    // 头像上传图标的高度
    height: 178px;
    // 头像上传图标的行高
    line-height: 178px;
    // 头像上传图标的文本对齐方式
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }

}

</style>
