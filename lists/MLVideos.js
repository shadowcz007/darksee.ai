const { File,Text, Float, Relationship } = require('@keystonejs/fields');
const { LocalFileAdapter } = require('@keystonejs/file-adapters');
 
const base = require("./Base");

const fileAdapter = new LocalFileAdapter({
    src: './public/files/mlvideos',
    path: '/files/mlvideos',
  });


module.exports = {
    fields: {
        //类型
        name: {
            type: Text,
            isRequired: true,
            //isUnique: true
        },
        //
        author: {
            type: Text,
            defaultValue: ""
        },
        video:{
            type: Text,
            defaultValue: ""
        },
        title: {
            type: Text,
            defaultValue: ""
        },
        tags: {
            type: Relationship,
            ref: 'Tag',
            many: true
        },
        url: {
            type: Text,
            // defaultValue:"",
            isUnique: true,
            isRequired: true,
        },
        faceCount: {
            type:Float,
            defaultValue:0.0
        },
        desc: {
            type: Text,
            defaultValue: ""
        },
        //本地记录视频的id
        vid:{
          type:Text,
          defaultValue:"",
          isUnique: true,
        },
        imgUrl: {
            type: File,
            adapter: fileAdapter,
            //isRequired: true,
        },
        createTime: base.fields.createTime
    },
    hooks: {
        ...base.hooks,
    }
};