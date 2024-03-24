<!--展示热销商品并提供添加到购物车的功能-->
<template>
  <div class="bestsellproductView">
    <el-row>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="22">
        <el-row>
          <el-col :span="7" v-for="(t, i) in entities" :key="t.id" style="margin: 10px">
            <el-card :body-style="{ padding: '8px' }" shadow="hover">
              <div style="height: 260px">
                <img :src="t.product_image" class="avatar" width="80%">
              </div>
              <div style="padding: 14px;">
                <span style="font-size:14px; font-weight:500;">{{t.product_name}}</span>
                <div style="margin-top: 20px;">
                  <span v-if="t.isDiscount">
                    <span style="font-size:12px; font-weight:300; text-decoration: line-through;" >{{t.product_price}}dollar</span>
                    <span style="font-size:16px; font-weight:500; color:red">{{t.product_discount_price}}dollar</span>
                  </span>
                  <span v-else>
                    <span >{{t.product_price}}dollar</span>
                  </span>
                  <el-button
                    style="margin-left: 60px;"
                    @click="addBasket(i)"
                    type="text">
                    add to shopping cart
                  </el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="1">&nbsp;</el-col>
    </el-row>

    <el-dialog title="add to shopping cart" :visible.sync="editVisible" width="30%">
      <el-form :model="detail" label-width="80px" size="small">
        <el-form-item label="Fill in quantity" required>
          <el-input-number v-model="detail.num" :precision="2" :step="1"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false" size="small">cancel</el-button>
        <el-button type="primary" @click="save()" size="small">sure</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
// 导入lodash中的add函数
import { add } from 'lodash';
// 导入axios库，并从../../axios中获取ajax和baseURL
import ajax,{baseURL} from '../../axios';

export default {
  data () {
    return {
      // 实体列表
      entities: [],

      // 实体详情
      detail:{},

      // 详情可见性
      detailVisible: false,

      // 编辑可见性
      editVisible: false,
    }
  },
 components: {
  },
  // 当组件被挂载时调用
  mounted() {
    // 调用搜索方法
    this.search();
  },
  methods: {
    // 搜索方法
    search(curPage){
      // 设置当前页码
      this.curPage = curPage? (curPage - 1):0;
      // 发起ajax请求
      ajax({
        url: '/c/product/bestSellList.json',
        method: 'get',
        params: {
        }
      })
       .then((data) => {
          if(data.flag === false){
            // 弹出提示框
            this.$message.info(data.message);
            return;
          }
         this.entities = data.data;
          // 遍历数据，如果折扣价格大于0，则isDiscount属性设置为true
          this.entities.forEach(item => {
            if(item.product_discount_price > 0){
              item.isDiscount = true;
            }
          })
        })
       .catch((error) => {
          this.$message.error('接口调用异常：'+error);
        })
        .finally(() => {
            // 结束时执行
        });
    },
    
   addBasket(index){
      // 设置当前商品
      this.detail = this.entities[index];
      // 显示编辑框
      this.editVisible = true;
    },
    
    save(){
      // 发送ajax请求
      ajax({
        // 请求地址
        url: '/c/bill/addBasket.json',
        // 请求方式
        method: 'post',
        // 请求参数
        data: {
          // 商品id
          product_id: this.detail.id,
          // 商品数量
          num: this.detail.num,
          // 商品价格
          price: this.detail.product_price
        }
      })
      .then((data) => {
        // 判断data.flag是否为false
        if(data.flag === false){
          // 弹出提示框
          this.$message.info(data.message);
          // 返回
          return;
        }
        // 调用搜索方法
        this.search();
        // 弹出提示框
        this.$message({
          type: 'success',
          message: 'save successful!'
        });
       this.editVisible = false;
      })
      .catch((error) => {
        this.$message.error('Interface call exception:'+error);
      })
      .finally(() => {
      });
    }
  }
}
</script>

<style lang="less">
.goodView{
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

  .search{

    .el-input{
      width: 70%;
    }

  }

  .cell{
    //设置单元格内部元素排列方式为flex
    display: flex;
    //设置单元格内部元素垂直居中
    align-items: center;

  }

 .avatar-uploader .el-upload {
    // 边框颜色
    border: 1px dashed #d9d9d9;
    // 边框圆角
    border-radius: 6px;
    // 鼠标悬浮时变成手型
    cursor: pointer;
    // 定位
    position: relative;
    // 溢出隐藏
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    // 边框颜色改变
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
    // 设置宽度
    width: 60px;
    // 设置高度
    height: 60px;
    // 设置显示模式
    display: block;
  }

}

</style>