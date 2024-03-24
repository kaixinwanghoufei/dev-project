<!--商品并添加到购物车的 Vue.js 组件-->
<template>
  <div class="allproductView">
    <el-row>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="20">
        <el-row class="search">
          <el-col :span="20">
            <el-radio-group v-model="category_id" size="mini" @input="search()">
              <el-radio-button label="">all</el-radio-button>
              <el-radio-button v-for="t of categories" :key="t.id" :label="t.id">
                {{t.category_name}}
              </el-radio-button>
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
            label="picture"
            width="200">
            <template slot-scope="scope">
              <!-- 使用 scope.row.product_image 获取图片的 src 属性值 -->
              <img :src="scope.row.product_image" class="avatar"  width="70%">
            </template>
          </el-table-column>
          <!-- 产品名称 -->
          <el-table-column
            prop="product_name"
            label="name"
            width="150">
          </el-table-column>
          <!-- 产品描述 -->
          <el-table-column
            prop="product_desc"
            label="desc"
            width="250">
          </el-table-column>
          <!-- 产品价格 -->
          <el-table-column
            prop="product_price"
            label="price"
            width="100">
            <template slot-scope="scope">
              <div v-if="scope.row.isDiscount">
                <span style="text-decoration: line-through;" >{{scope.row.product_price}}dollar</span>
                <span style="font-size:16px; font-weight:500; color:red">{{scope.row.product_discount_price}}dollar</span>
              </div>
              <div v-else>
                <span >{{scope.row.product_price}}dollar</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="operate"
            width="160">
            <template slot-scope="scope">
              <el-button
                @click="addBasket(scope.$index)"
                type="text"
                size="small">
                add to shopping cart
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="curPage"
          :page-size="pageSize"
          :total="totalRows"
          @current-change="search">
        </el-pagination>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
    </el-row>

    <el-dialog title="add to shoop" :visible.sync="editVisible" width="30%">
      <!-- 定义一个对话框，标题为add to shoop，编辑状态为editVisible，宽度为30% -->
      <el-form :model="detail" label-width="80px" size="small">
        <!-- 定义一个表单，模型为detail，标签宽度为80px，表单大小为small -->
        <el-form-item label="number of input" required>
          <!-- 定义一个表单项，标签为number of input，必填 -->
          <el-input-number v-model="detail.num" :precision="2" :step="1"></el-input-number>
        </el-form-item>
      </el-form>
      <!-- 定义一个对话框的底部，包含两个按钮，一个为cancel，另一个为sure -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false" size="small">cancel</el-button>
        <el-button type="primary" @click="save()" size="small">sure</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { add } from 'lodash';
import ajax,{baseURL} from '../../axios';

export default {
  data () {
    return {
      // 存储搜索到的实体
      entities: [],
      // 存储搜索到的类别
      categories: [],

      // 存储用户选择的类别id
      category_id: "",

      // 存储详情信息
      detail:{},
      // 存储文件列表
      filelist:[],

      // 总记录数
      totalRows: 0,
      // 当前页码
      curPage:0,
      // 每页显示的记录数
      pageSize:15,

      // 详情对话框是否可见
      detailVisible: false,

      // 编辑对话框是否可见
      editVisible: false,
    }
  },
  components: {
  },
  mounted() {
    // 初始化
    this.init();
    // 搜索
    this.search();
  },
  methods: {
    init(){
      ajax({
        url: '/c/product/getCategories.json',
        method: 'get',
        params: {
        }
      })
        .then((data) => {
          if(data.flag === false){
            this.$message.info(data.message);
            return;
          }
          this.categories = data.data;
        })
        .catch((error) => {
          this.$message.error('Interface call exception:'+error);
        })
        .finally(() => {
        });
    },
    
    search(curPage){
      // 设置当前页码，如果传入的curPage参数大于0，则取传入参数，否则取默认值0
      this.curPage = curPage? (curPage - 1):0;
      // 发起axios请求，获取当前页面products数据
      ajax({
        url: '/c/product/list.json',
        method: 'get',
        params: {
          category_id: this.category_id,
          curPage: this.curPage
        }
      })
        .then((data) => {
          // 判断是否请求失败
          if(data.flag === false){
            // 请求失败时弹出信息
            this.$message.info(data.message);
            // 结束函数
            return;
          }
          // 请求成功时将数据赋值给entities
          this.entities = data.data.dataList;
          // 循环entities，判断每个商品是否有折扣价格
          this.entities.forEach(item => {
            if(item.product_discount_price > 0){
              // 如果有折扣价格，将isDiscount设置为true
              item.isDiscount = true;
            }
          })
          // 将当前页，总行数，每页大小赋值给对应的变量
          this.curPage = data.data.curPage;
          this.totalRows = data.data.totalRows;
          this.pageSize = data.data.pageSize;
        })
        // 请求异常时弹出错误信息
        .catch((error) => {
          this.$message.error('Interface call exception:'+error);
        })
        // 请求完成时清空message
        .finally(() => {
        });
    },
    
    // 打开添加购物车窗口
 addBasket(index){
      // 设置购物车信息为当前选中的商品信息
      this.detail = this.entities[index];
      // 打开购物车编辑窗口
      this.editVisible = true;
    },
    
    save(){
      // 发送ajax请求，向服务器添加购物车
      ajax({
        url: '/c/bill/addBasket.json',
        method: 'post',
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
        // 如果接口返回的flag为false，表示有错误发生
        if(data.flag === false){
          // 显示错误信息
          this.$message.info(data.message);
          return;
        }
        // 继续执行搜索
        this.search();
        // 显示成功信息
        this.$message({
          type: 'success',
          message: 'save successful!'
        });
        // 关闭编辑窗口
        this.editVisible = false;
      })
      .catch((error) => {
        // 显示接口调用异常
        this.$message.error('Interface call exception:'+error);
      })
      .finally(() => {
        // 清除编辑窗口的内容
      });
    }
  }
}
</script>

<style lang="less">
.goodView{
  // 设置宽度为100%，高度为100%
  width:100%;
  height:100%;

  // 设置el-row的样式
  .el-row{
    // 设置上下margin为10px
    margin-top: 10px;
    margin-bottom: 10px;
  }

  // 设置搜索框的样式
  .search{

    .el-input{
      // 设置宽度为70%
      width: 70%;
    }

  }

  // 设置cell的样式
  .cell{
    // 设置flex布局
    display: flex;
    // 设置主轴对齐方式为居中
    align-items: center;

  }

  .avatar-uploader .el-upload {
    /* 设置边框样式 */
    border: 1px dashed #d9d9d9;
    /* 设置边框圆角 */
    border-radius: 6px;
    /* 设置鼠标悬停样式 */
    cursor: pointer;
    /* 设置相对定位 */
    position: relative;
    /* 设置溢出隐藏 */
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    /* 设置边框颜色 */
    border-color: #409EFF;
    /* 设置鼠标悬停时的背景颜色 */
    background-color: #F8FAFF;
  }
  .avatar-uploader-icon {
    /** 设置字体大小 */
    font-size: 28px;
    /** 设置字体颜色 */
    color: #8c939d;
    /** 设置元素宽度 */
    width: 178px;
    /** 设置元素高度 */
    height: 178px;
    /** 设置行高 */
    line-height: 178px;
    /** 设置文本居中 */
    text-align: center;
  }
  .avatar {
    // 设置图片宽度为90px
    width: 90px;
    // 设置图片高度为90px
    height: 90px;
    // 设置图片以块级元素显示
    display: block;
  }

}

</style>