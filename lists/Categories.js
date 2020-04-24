const { Text, Checkbox, Relationship } = require('@keystonejs/fields');
const base = require("./Base");


module.exports = {
  fields: {
    //类型
    name: {
      type: Text,
      isRequired: true,
      isUnique: true
    },
    //上位
    hypernym: {
      type: Relationship,
      ref: 'Category',
      many: true
    },
    desc:{
      type: Text,
      defaultValue:""
    },
    //语种
    // lang:{
    //   type:Text,
    //   defaultValue:"zh"
    // },
    createTime:base.fields.createTime
  },
  hooks: {
    ...base.hooks,
  }
};