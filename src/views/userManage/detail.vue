<template>
  <detail-title>客户详情</detail-title>
  <div class="detail-body">
    <div class="user-info">
      <sub-title>客户信息</sub-title>
      <div class="info-box">
        <div class="info-item">
          <div class="label">公司/机构</div>
          <div class="value">上海XXXXXXXXXXX有限公司</div>
        </div>
        <div class="info-item">
          <div class="label">手机号</div>
          <div class="value">135****9933</div>
        </div>
        <div class="info-item">
          <div class="label">邮箱</div>
          <div class="value">135****9933@163.com</div>
        </div>
      </div>
    </div>
    <div class="user-list">
      <sub-title>账户列表</sub-title>
      <div class="list-box">
        <t-table :columns="userColumns" :query="query" :pageSize="10"></t-table>
      </div>
    </div>
    <div class="billing-info">
      <sub-title>订单信息</sub-title>
      <div class="billing-box">
        <a-table :columns="billingColumns" :data="billingList" :bordered="false" :pagination="false">
          <template #empty>
            <table-empty></table-empty>
          </template>
        </a-table>
      </div>
    </div>
    <div class="safe-setting">
      <sub-title>安全设置</sub-title>
      <div class="safe-box">
        <a-button type="primary" @click="reset">重置密码</a-button>
        <a-button class="mgL15" type="primary" @click="changePhone">换绑手机</a-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { isOnlyNumber, isPhoneNumber } from '@/config';
import { orderTypeConfig } from '@/config/config';
import { Input, InputPassword, Modal, type TableColumnData } from '@arco-design/web-vue';
import { ref, reactive, h, onMounted } from 'vue';
const userColumns = reactive<TableColumnData[]>([
  {
    title: '用户ID',
    dataIndex: 'id',
  },
  {
    title: '用户名',
    dataIndex: 'nickName',
  },
  {
    title: '客户姓名',
    dataIndex: 'userName',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '类型',
    dataIndex: 'type',
  },
  {
    title: '备注',
    dataIndex: 'remarks',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
])
const userList = ref([
  {
    id: 1,
    nickName: '樱桃',
    userName: '小铭',
    phone: '137****9983',
    email: '123*****99@qq.com',
    type: '主账户',
    remarks: '',
    createTime: '2022-11-07 14:16:12'
  },
  {
    id: 2,
    nickName: '橘子',
    userName: '小铭',
    phone: '137****9983',
    email: '123*****99@qq.com',
    type: '子账户',
    remarks: 'XXX',
    createTime: '2022-11-07 14:16:12'
  },
  {
    id: 3,
    nickName: '葡萄',
    userName: '小铭',
    phone: '137****9983',
    email: '123*****99@qq.com',
    type: '子账户',
    remarks: 'XXXXXXX',
    createTime: '2022-11-07 14:16:12'
  }
])
const query = ref(null);
const setQuery = () => {
  query.value = (page, size) => {
    const params = {
      pageIndex: page,
      pageSize: size
    };
    return Promise.resolve({
      data: userList.value,
      total: 10
    })
  };
};
const billingColumns = reactive<TableColumnData[]>([
  {
    title: '订单ID',
    dataIndex: 'id',
  },
  {
    title: '类型',
    dataIndex: 'type',
    width: 80,
    render: ({ record }) => {
      return h('span', {
        // style: {
        //   color: orderTypeConfig[record.type].color
        // }
      }, orderTypeConfig[record.type].label);
    }
  },
  {
    title: '购买时间',
    dataIndex: 'buyTime',
  },
  {
    title: '生效时间',
    dataIndex: 'effectTime',
  },
  {
    title: '失效时间',
    dataIndex: 'failureTime',
  },
  {
    title: '数据包总量',
    dataIndex: 'totalPackets',
  },
  {
    title: '数据包余额',
    dataIndex: 'packetBalance',
  },
])

const billingList = ref([
  {
    id: 1,
    type: 1,
    buyTime: '2023-05-16 15:30:20',
    effectTime: '2023-05-16 15:30:20',
    failureTime: '2023-06-16 15:30:20',
    totalPackets: 13355,
    packetBalance: 335
  },
  {
    id: 2,
    type: 0,
    buyTime: '2023-05-16 15:30:20',
    effectTime: '2023-05-16 15:30:20',
    failureTime: '2023-06-16 15:30:20',
    totalPackets: 13355,
    packetBalance: 335
  }
])

onMounted(() => {
  setQuery();
})

const inputPasswordModel = ref('');
const isCheckPassword = ref(false);
const ModalContent = {
  setup() {
    return () => h('div', { class: 'info-modal-content' }, [
      h(InputPassword,
        {
          placeholder: '请输入新密码',
          modelValue: inputPasswordModel.value,
          'onUpdate:modelValue': (val) => {
            inputPasswordModel.value = val;
          },
          error: isCheckPassword.value,
          onChange: (val) => {
            isCheckPassword.value = !val;
          }
        }),
      h('div',
        {
          style: `font-size: 12px;color:rgb(var(--danger-6));display: ${isCheckPassword.value ? 'block' : 'none'}`
        },
        '新密码不能为空'
      )
    ])
  },
}

const reset = () => {
  inputPasswordModel.value = '';
  isCheckPassword.value = false;
  Modal.confirm({
    title: '重置密码',
    content: () => h(ModalContent),
    maskClosable: false,
    onBeforeOk: () => {
      isCheckPassword.value = !inputPasswordModel.value
      return !!inputPasswordModel.value
    },
  })
}

const phoneModel = ref('');
const isCheckPhone = ref(false);

const ModalPhoneContent = {
  setup() {
    return () => h('div', { class: 'info-modal-content' }, [
      h(Input,
        {
          placeholder: '请输入手机号码',
          modelValue: phoneModel.value,
          'onUpdate:modelValue': (val) => {
            phoneModel.value = val;
          },
          onInput: (val) => {
            phoneModel.value = val.replace(isOnlyNumber, '');
          },
          error: isCheckPhone.value,
          onChange: (val) => {
            const isValidate = isPhoneNumber.test(val);
            isCheckPhone.value = !isValidate;
          }
        },
        {
          prepend: '+86',
        }
      ),
      h('div',
        {
          style: `font-size: 12px;color:rgb(var(--danger-6));display: ${isCheckPhone.value ? 'block' : 'none'};margin-left: 52px;`
        },
        '请输入正确手机号'
      )
    ])
  }
}
const changePhone = () => {
  phoneModel.value = '';
  isCheckPhone.value = false;
  Modal.confirm({
    title: '修改绑定手机',
    content: () => h(ModalPhoneContent),
    maskClosable: false,
    onBeforeOk: () => {
      const isValidate = isPhoneNumber.test(phoneModel.value);
      isCheckPhone.value = !isValidate;
      return isValidate;
    },
  })
}


</script>
<style lang="less" scoped>
.detail-body {
  flex: 1;
  background: #fff;
  padding-bottom: 20px;
  overflow: hidden;
  overflow-y: auto;

  .info-box {
    display: flex;
    margin: 0 20px;
    flex-direction: row;
    background: #FBFBFB;

    .info-item {
      flex: 1;
      flex-shrink: 0;
      padding: 16px;
      position: relative;

      &:not(&:first-child) {
        &::before {
          content: '';
          width: 1px;
          height: 52px;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          background: #E9EBEF;
        }
      }

      .label {
        line-height: 22px;
        font-size: 14px;
        color: #89919A;
        margin-bottom: 6px;
      }

      .value {
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        color: #161616;
      }
    }
  }

  .list-box,
  .billing-box,
  .safe-box {
    padding: 0 20px;
  }
}</style>