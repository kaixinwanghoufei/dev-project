<!--web模板实现-->
<!--管理商品的 Vue.js 组件-->
<template>
  <div class="productView">
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

          <el-col :span="4">
            <el-button
              @click="add()"
              size="small"
              type="primary">
              new built
            </el-button>
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
            width="160">
            <template slot-scope="scope">
              <img :src="scope.row.product_image" class="avatar"  width="40%">
            </template>
          </el-table-column>
          <el-table-column
            prop="product_name"
            label="name"
            width="120">
          </el-table-column>
          <el-table-column
            prop="product_desc"
            label="desc"
            width="220">
          </el-table-column>
          <el-table-column
            prop="product_price"
            label="price"
            width="80">
          </el-table-column>
          <el-table-column
            prop="product_discount_price"
            label="discount price"
            width="80">
          </el-table-column>
          <el-table-column
            prop="product_count"
            label="count"
            width="100">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="operate"
            width="150">
            <template slot-scope="scope">
              <el-button
                @click="edit(scope.$index)"
                type="text"
                size="small">
                edit
              </el-button>
              <el-button
                @click="del(scope.$index)"
                type="text"
                size="small">
                delete
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
    </el-row>

    <el-dialog title="products" :visible.sync="editVisible" width="30%">
      <el-form :model="detail" label-width="80px" size="small">
        <el-form-item label="category" required>
          <el-select v-model="detail.category_id" placeholder="selete" style="width: 100%;">
            <el-option v-for="item in categories"
              :key="item.id"
              :label="item.category_name"
              :value="item.id"
              ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="name" required>
          <el-input v-model="detail.product_name"></el-input>
        </el-form-item>
        <el-form-item label="describe" required>
          <el-input v-model="detail.product_desc" type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="price" required>
          <el-input-number v-model="detail.product_price" :precision="2" :step="0.1"></el-input-number>
        </el-form-item>
        <el-form-item label="discount price">
          <el-input-number v-model="detail.product_discount_price" :precision="2" :step="0.1"></el-input-number>
        </el-form-item>
        <el-form-item label="pricture">
          <el-upload
            class="avatar-uploader"
            list-type="picture-card"
            :limit="1"
            :file-list="filelist"
            :action="uploadUrl"
            :on-remove="handleRemove"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <i class="el-icon-plus"></i>
          </el-upload>
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
import * as imageConversion from 'image-conversion' // 导入图片转换库
import ajax,{baseURL} from '../../axios'; // 导入ajax请求库，并获取baseURL

export default {
  data () {
    return {
      // 商品实体
      entities: [],
      // 商品分类
      categories: [],

      // 分类id
      category_id: "",

      // 商品详情
      detail:{},
      // 文件列表
      filelist:[],
      // 图片
      image:"",

      // 上传地址
      uploadUrl: baseURL+"/b/product/upload.json",
      // 详情模态框是否显示
      detailVisible: false,

      // 编辑模态框是否显示
      editVisible: false,
    }
  },
  components: {
  },
  mounted() {
    this.init();
    this.search();
  },
  methods: {
    init(){
      // 初始化函数
      ajax({
        url: '/b/product/getCategories.json',
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
          // 将data.data赋值给categories
          this.categories = data.data;
        })
        .catch((error) => {
          // 调用接口异常，提示错误信息
          this.$message.error('Interface call exception:'+error);
        })
        .finally(() => {
          // 无论成功或失败都会执行
        });
    },
    
    search(){
      // 搜索函数
     // 向服务器发送ajax请求，获取商品列表
 ajax({
        url: '/b/product/list.json',
        method: 'get',
        params: {
          category_id: this.category_id,
        }
      })
        .then((data) => {
          // 如果data.flag为false，则提示错误信息
          if(data.flag === false){
            this.$message.info(data.message);
            return;
          }
          // 将data.data赋值给entities
          this.entities = data.data;
        })
        .catch((error) => {
          // 调用接口异常，提示错误信息
          this.$message.error('Interface call exception:'+error);
        })
        .finally(() => {
          // 无论成功或失败都会执行
        });
    },
    handleRemove(file, fileList) {
      // 移除图片函数
      this.image = "";
      for(var f of fileList) {
        this.image.push(f.url);
      }
    },
    handleAvatarSuccess(res, file) {
      // 上传图片成功函数
      this.image = file.response.data
    },

    beforeAvatarUpload(file) {
      // 上传图片之前函数
      const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png') || (file.type === 'image/jpg');
      const isLt = file.size / 1024 < 200;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
        return false;
      }
      if (!isLt) {
        this.$message.error('上传头像图片大小不能超过 200KB!');
        return false;
      }

      //图片压缩插件
      return new Promise((resolve) => {
          // 压缩到100KB,这里的100就是要压缩的大小,可自定义
          imageConversion.compressAccurately(file, 10).then(res => {
              resolve(res);
          });
        })
      // return isJPG && isLt;
    },

    // 添加商品
add(){
      // 清空详情
      this.detail = {};
      // 清空图片
      this.image = "";
      // 清空文件列表
      this.filelist = [];
      // 显示编辑框
      this.editVisible = true;
    },
    // 编辑商品
    edit(index){
      // 清空文件列表
      this.filelist = [];
      // 获取当前商品详情
      this.detail = this.entities[index];
      // 获取当前商品图片
      this.image = this.detail.product_image;
      // 将图片添加到文件列表
      this.filelist.push({name: '', url: this.image });
      // 显示编辑框
      this.editVisible = true;
    },
    // 保存商品
    save(){
      // 发送ajax请求，保存商品
     // 向服务器发送ajax请求，保存商品信息
 ajax({
        url: '/b/product/save.json',
        method: 'post',
        data: {
          // 商品id
          id: this.detail.id,
          // 商品分类id
          category_id: this.detail.category_id,
          // 商品名称
          product_name: this.detail.product_name,
          // 商品描述
          product_desc: this.detail.product_desc,
          // 商品图片
          product_image: this.image,
          // 商品价格
          product_price: this.detail.product_price,
          // 商品折扣价格
          product_discount_price: this.detail.product_discount_price,
          // 商品库存
          product_count: this.detail.product_count
        }
      })
      .then((data) => {
        // 如果data.flag为false
        if(data.flag === false){
          // 提示错误信息
          this.$message.info(data.message);
          // 结束函数
          return;
        }
        // 执行搜索
        this.search();
        // 提示成功信息
        this.$message({
          type: 'success',
          message: 'successful'
        });
        // 关闭编辑框
        this.editVisible = false;
      })
      .catch((error) => {
        this.$message.error('Interface call exception:'+error);
      })
      .finally(() => {
      });
    },
    // 删除
    del(index){
      // 确认删除
      this.$confirm('delete sure?', 'hints', {
        confirmButtonText: 'sure',
        cancelButtonText: 'cancel',
        type: 'warning'
      }).then(() => {
        // 发送ajax请求
        ajax({
          url: '/b/product/delete.json',
          method: 'get',
          params: {
            id: this.entities[index].id
          }
        })
          .then((data) => {
            // 判断删除是否成功
            if(data.flag === false){
              this.$message.info(data.message);
              return;
            }
            // 刷新列表
            this.search();
            // 提示删除成功
            this.$message({
              type: 'success',
              message: 'delete successful!'
            });
          })
          .catch((error) => {
            this.$message.error('Interface call exception:'+error);
          })
          .finally(() => {
          });
      }).catch(() => {
      });
    },
  }
}
</script>

<style lang="less">
.goodView{
  // 设置宽度为100%，高度为100%
  width:100%;
  height:100%;

  // 设置行 margin
  .el-row{
    margin-top: 10px;
    margin-bottom: 10px;
  }

  // 设置搜索模块
  .search{

    // 设置搜索框宽度为70%
    .el-input{
      width: 70%;
    }

  }

  .cell{
    display: flex;
    align-items: center;
  }

  .avatar-uploader .el-upload {
    /* 设置边框样式 */
    border: 1px dashed #d9d9d9;
    /* 设置边框圆角 */
    border-radius: 6px;
    /* 设置鼠标样式 */
    cursor: pointer;
    /* 设置相对定位 */
    position: relative;
    /* 设置溢出隐藏 */
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    /* 鼠标悬停时，改变边框颜色 */
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    /* 设置字体大小 */
    font-size: 28px;
    /* 设置字体颜色 */
    color: #8c939d;
    /* 设置图片宽度 */
    width: 178px;
    /* 设置图片高度 */
    height: 178px;
    /* 设置文本居中 */
    line-height: 178px;
    /* 设置文本居中 */
    text-align: center;
  }
  .avatar {
    // 设置图片宽度为60px
    width: 60px;
    // 设置图片高度为60px
    height: 60px;
    // 设置图片以块级元素显示
    display: block;
  }

  .detail{
    .el-dialog__body{
      // 设置body的显示方式为flex
      display: flex;
      // 水平居中
      justify-content: center;

      .images {
        // 设置图片的宽度和高度
        width: 140px;
        height: 140px;
        // 将图片设置为块状元素，可以设置宽度和高度
        display: block;
      }
    }
  }
}

</style>
