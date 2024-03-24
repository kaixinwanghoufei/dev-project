<template> <!-- 开始的标签 -->
  <div class="connectView"><!-- 添加元素 -->
    <el-table
          :data="entities"
          style="width: 100%"
          stripe
          size="small">
          <!-- 发送成员列 -->
          <el-table-column
            prop="usercName"
            label="send member"
            width="120"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <!-- 根据mine值判断标签类型 -->
              <el-tag
                :type="scope.row.mine == '1' ? 'primary' : 'info'"
                disable-transitions>{{scope.row.usercName}}</el-tag>
            </template>
          </el-table-column>
          <!-- 内容列 -->
          <el-table-column
            prop="content"
            label="内容"
            width="280">
          </el-table-column>
        </el-table>
        <br/>
        <!-- 表单 -->
        <el-form :model="entity" label-width="80px" size="small">
          <!-- 沟通内容输入框 -->
          <el-form-item label="沟通内容">
            <el-input v-model="entity.content" type="textarea" :rows="2"></el-input>
          </el-form-item>
        </el-form>
        <!-- 对话框底部按钮 -->
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="connect()" size="small">发送</el-button>
        </div>
  </div>
</template>

<script>
import ajax,{baseURL} from '../axios';

export default {
  data () {
    return {
      entities: [], // 实体列表

      search_name: "", // 搜索名称
      search_type: "热销", // 搜索类型

      entity:{
        content: ""
      },
    }
  },
  props: {
    orderId: {
      type: Number, // 类型
      required: true, // 是否必须传递
    }
  },
  components: {
  // 声明组件
  },
  mounted() {
    // 页面加载完毕后调用init函数
    this.init();
    // 设置定时器，每隔2000毫秒调用一次init函数
    this.timer = setInterval(
      this.init
    ,2000)
  },
  beforeDestroy() {
    // 页面销毁前清除定时器
    clearInterval(this.timer);
  },
 methods: {
    // 初始化函数
    init(){
      // 发送ajax请求
      ajax({
        // 请求地址
        url: '/c/order/imlist.json',
        // 请求方式
        method: 'get',
        // 请求参数
        params: {
          orderId: this.orderId
        }
      })
        .then((data) => {
          // 接口返回失败
          if(data.flag === false){
            // 提示错误信息
            this.$message.info(data.message);
            return;
          }
          // 接口返回成功
          // 获取返回的数据
          this.entities = data.data;
          console.info(this.entities)
        })
        // 捕获错误
        .catch((error) => {
          // 提示错误信息
          this.$message.error('接口调用异常：'+error);
        })
        // 最终执行
        .finally(() => {
          // 关闭loading
        });
    },
   connect(){
      // 发送ajax请求
      ajax({
        // 请求的url
        url: '/c/order/connect.json',
        // 请求的方法
        method: 'get',
        // 请求的参数
        params: {
          // 订单id
          orderId: this.orderId,
          // 实体内容
          content: this.entity.content,
        }
      })
        .then((data) => {
          // 如果发送失败
          if(data.flag === false){
            // 弹出提示
            this.$message.info(data.message);
            return;
          }
          // 发送成功，弹出提示
          this.$message({
              type: 'success',
              message: '发送成功!'
            });
          // 初始化
          this.init();
          // 清空内容
          this.entity.content = "";
        })
        .catch((error) => {
          // 接口调用异常，弹出错误提示
          this.$message.error('接口调用异常：'+error);
        })
        .finally(() => {
          // 接口调用完毕
        });
    },
  }
}
</script>

<style lang="less">
.connectView{

}

</style>