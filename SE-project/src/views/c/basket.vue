<!--购物车中的商品并提供购买和删除功能-->
<template>
  <div class="basketView">
    <el-row>
      <el-col :span="5">&nbsp;</el-col>
      <el-col :span="14">
        <el-row class="search">
          <el-col :span="8">
            <el-button
              @click="buy()"
              size="small"
              type="primary">
              buy all
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
            width="200">
            <template slot-scope="scope">
              <img :src="scope.row.product_image" class="avatar"  width="40%">
            </template>
          </el-table-column>
          <el-table-column
            prop="product_name"
            label="name"
            width="200">
          </el-table-column>
          <el-table-column
            prop="price"
            label="price"
            width="100">
          </el-table-column>
          <el-table-column
            prop="num"
            label="number"
            width="100">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="operate"
            width="100">
            <template slot-scope="scope">
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
      <el-col :span="5">&nbsp;</el-col>
    </el-row>

  </div>
</template>

<script>
import { add } from 'lodash';
import ajax,{baseURL} from '../../axios';

// 导出默认对象
export default {
  // 数据
  data () {
    return {
      entities: []
    }
  },
  // 注册组件
  components: {
  },
  // 挂载
  mounted() {
    this.search();
  },
  methods: {
    
    search(curPage){
      // 设置当前页数，如果curPage有值，则从curPage - 1开始，否则从0开始
      this.curPage = curPage? (curPage - 1):0;
      // 发起ajax请求
      ajax({
        // 请求地址
        url: '/c/bill/getBaskets.json',
        // 请求方法
        method: 'get',
        // 请求参数
        params: {
        }
      })
        .then((data) => {
          // 如果data.flag为false，则提示错误信息
          if(data.flag === false){
            this.$message.info(data.message);
            return;
          }
          // 将获取到的数据赋值给entities
          this.entities = data.data;
        })
        // 如果请求失败，则提示错误信息
        .catch((error) => {
          this.$message.error('Interface call exception:'+error);
        })
        // 无论请求成功还是失败，都会执行的代码
        .finally(() => {
        });
    },
    
   // 购买函数
buy(){
    // 弹出确认框，提示用户是否确认购买
      this.$confirm('buy sure?', 'hints', {
        confirmButtonText: 'sure',
        cancelButtonText: 'cancel',
        type: 'warning'
      }).then(() => {
        // 如果用户确认购买，发送请求到服务器
        ajax({
          url: '/c/bill/buy.json',
          method: 'post',
          data: {
          }
        })
        .then((data) => {
          // 如果data.flag为false
          if(data.flag === false){
            // 提示错误信息
            this.$message.info(data.message);
            // 结束
            return;
          }
          // 刷新页面
          this.search();
          // 提示购买成功
          this.$message({
            type: 'success',
            message: 'buy successful!'
          });
        })
        .catch((error) => {
          // 如果接口调用异常，则提示用户
          this.$message.error('Interface call exception:'+error);
        })
        // 无论接口调用是否成功，都会执行finally中的代码
        .finally(() => {
        });
      }).catch(() => {
        // 如果接口调用异常，则提示用户
        this.$message.error('Interface call exception');
      });
    },


   // 删除指定索引的元素
 del(index){
  // 弹出确认框，询问用户是否确定删除
  this.$confirm('delete sure?', 'hints', {
    // 确定按钮的文本
    confirmButtonText: 'sure',
    // 取消按钮的文本
    cancelButtonText: 'canael',
    // 提示框的类型
    type: 'warning'
  }).then(() => {
    // 如果用户确定删除，发送ajax请求
    ajax({
      // 请求的url
      url: '/c/bill/deleteBasket.json',
      // 请求的方法
      method: 'get',
      // 请求的参数
      params: {
        id: this.entities[index].id
      }
    })
          .then((data) => {
            if(data.flag === false){
              this.$message.info(data.message);
              return;
            }
            this.search();
            this.$message({
              type: 'success',
              message: 'delete scuessful!'
            });
          })
          .catch((error) => {
            this.$message.error('Interface call exception: '+error);
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
  // 设置宽度为100%
  width:100%;
  // 设置高度为100%
  height:100%;

  .el-row{
    // 设置顶部边距10px
    margin-top: 10px;
    // 设置底部边距10px
    margin-bottom: 10px;
  }

  .search{

    // 设置搜索框的宽度为70%
    .el-input{
      width: 70%;
    }

  }

  .cell{
    /* 设置display属性，让cell元素变为flex布局 */
    display: flex;
    /* 设置align-items属性，让flex-wrap中的内容按照预先设定的对齐方式对齐 */
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
  /* 更改上传按钮的样式 */
  .avatar-uploader .el-upload:hover {
    /* 边框颜色 */
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
    /* 设置图片宽度为40px，高度为40px */
    width: 40px;
    height: 40px;
    /* 图片居中显示 */
    display: block;
  }

}

</style>
