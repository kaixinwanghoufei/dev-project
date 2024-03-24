<!--商品类别信息的界面-->
<template>
  <div class="categoryView">
    <el-row>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="20">
        <el-row class="search">
          <el-col :span="4">
            <el-button
              @click="add()"
              size="small"
              type="primary">
              new builld
            </el-button>
          </el-col>

          <el-col :span="20">
          </el-col>
        </el-row>
        <el-table
          :data="entities"
          style="width: 100%"
          stripe
          size="small">
          <el-table-column
            prop="id"
            label="ID"
            width="150">
          </el-table-column>
          <el-table-column
            prop="category_name"
            label="name"
            width="300">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="operation"
            width="300">
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

    <el-dialog title="kinds" :visible.sync="editVisible" width="30%">
      <el-form :model="detail" label-width="80px" size="small">
        <el-form-item label="name" required>
          <el-input v-model="detail.category_name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false" size="small">cancel</el-button>
        <el-button type="primary" @click="save()" size="small">recognize</el-button>
      </div>
    </el-dialog>
  </div>
  
</template>

<script>
import ajax,{baseURL} from '../../axios';

export default {
  data () {
    return {
      // 存储所有实体
      entities: [],

      // 详情页数据
      detail:{},
      // 详情页显示
      detailVisible: false,

      // 编辑页显示
      editVisible: false,
    }
  },
  components: {
  },
  mounted() {
    // 调用搜索方法
    this.search();
  },
  methods: {
    // 搜索方法
    search(){
      // 发送ajax请求获取数据
      ajax({
        url: '/b/category/list.json',
        method: 'get',
        params: {
        }
      })
        .then((data) => {
          // 如果数据标记为false，则提示错误信息
          if(data.flag === false){
            this.$message.info(data.message);
            return;
          }
          // 将获取到的数据赋值给entities
          this.entities = data.data;
        })
        .catch((error) => {
          // 如果出现异常，则提示错误信息
          this.$message.error('Interface call exception:'+error);
        })
        .finally(() => {
          // 无论成功还是失败，都会执行的代码
        });
    },
    // 添加方法
add(){
      // 清空详情
      this.detail = {};
      // 显示编辑框
      this.editVisible = true;
    },
    // 编辑方法
    edit(index){
      // 设置详情
      this.detail = this.entities[index];
      // 显示编辑框
      this.editVisible = true;
    },
    // 保存方法
    save(){
      // 发送ajax请求
      ajax({
        url: '/b/category/save.json',
        method: 'post',
        data: {
          id: this.detail.id,
          category_name: this.detail.category_name
        }
      })
      .then((data) => {
        // 如果flag为false
        if(data.flag === false){
          // 提示错误信息
          this.$message.info(data.message);
          return;
        }
        // 刷新列表
        this.search();
        // 提示成功
        this.$message({
          type: 'success',
          message: 'successful'
        });
        // 隐藏编辑框
        this.editVisible = false;
      })
      .catch((error) => {
        // 提示接口调用异常
        this.$message.error('Interface call exception:'+error);
      })
      .finally(() => {
      });
    },
    // 删除方法
    del(index){
      // 确认删除
      this.$confirm('ok to delete?', 'hints', {
        confirmButtonText: 'sure',
        cancelButtonText: 'cancel',
        type: 'warning'
      }).then(() => {
        // 发送ajax请求
        ajax({
          url: '/b/category/delete.json',
          method: 'get',
          params: {
            id: this.entities[index].id
          }
        })
          .then((data) => {
            // 如果flag为false
            if(data.flag === false){
              // 提示错误信息
              this.$message.info(data.message);
              return;
            }
            // 刷新列表
            this.search();
            // 提示成功
            this.$message({
              type: 'success',
              message: 'deleye successful!'
            });
          })
          .catch((error) => {
            // 提示接口调用异常
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
  // 设置宽度为100%
  width:100%;
  // 设置高度为100%
  height:100%;

  .el-row{
    // 设置行margin-top为10px
    margin-top: 10px;
    // 设置行margin-bottom为10px
    margin-bottom: 10px;
  }

  .search{

    // 宽度为70%
    .el-input{
      width: 70%;
    }

  }

  .cell{
    /* 设置display属性，让cell元素变成flex容器 */
    display: flex;
    /* 设置cell元素内的元素居中 */
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
      // 水平布局
      display: flex;
      justify-content: center;

      .images {
        // 图片大小
        width: 140px;
        height: 140px;
        // 块级显示
        display: block;
      }
    }
  }
}

</style>
