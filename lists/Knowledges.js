const { Text, Checkbox, Relationship, DateTime, Url } = require('@keystonejs/fields');
const { Markdown } = require('@keystonejs/fields-markdown');
const { File } = require('@keystonejs/fields');
const { LocalFileAdapter } = require('@keystonejs/file-adapters');

const fileAdapter = new LocalFileAdapter({
  src: './public/files',
  path: '/files',
});


const base = require("./Base");


module.exports = {
  fields: {
    ...base.fields,
    category:{
      type:Relationship,
      ref:'Category',
      many: true
    },
    //摘要
    brief: {
      type: Markdown,
      // isRequired: false,
      // isMultiline: true
    },
    // content:{
    //   type:Markdown
    // },
    //图片
    image: {
      type: File,
      adapter: fileAdapter,
      //isRequired: true,
    },
    url: {
      type: Url
    },
    //是否置顶
    isTop: {
      type: Checkbox,
      defaultValue: false,
    },
    //是否发布
    isPublic: {
      type: Checkbox,
      defaultValue: false,
    },
  },
  hooks: {
    ...base.hooks,
  }
};