const { Text, Relationship } = require('@keystonejs/fields');
const base = require("./Base");


module.exports = {
  fields: {
    //类型
    name: {
      type: Text,
      isRequired: true,
      isUnique: true
    },
    //同义
    synonymes: {
      type: Relationship,
      ref: 'Tag',
      many: true
    },
    //下位
    // hyponymy:{
    //   type: Relationship,
    //   ref: 'Tag',
    //   many: true
    // },
    //上位
    hypernym:{
      type: Relationship,
      ref: 'Tag',
      many: true
    },
    //分类
    category:{
      type:Relationship,
      ref:'Category',
      many: true
    },
    //是否实体
    // isEntity:{
    //   type: Checkbox,
    //   defaultValue: false,
    // },
    //语种
    lang:{
      type:Text,
      defaultValue:"zh"
    },
    createTime:base.fields.createTime
  },
  hooks: {
    ...base.hooks,
  }
};