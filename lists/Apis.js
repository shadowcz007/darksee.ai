const { Text, Relationship, Url, DateTime, Virtual } = require('@keystonejs/fields');
const base = require("./Base");

//默认都是走post请求
module.exports = {
    fields: {
        ...base.fields,
        //api地址
        url: {
            type: Url,
            isRequired: true,
            isUnique: true,
            defaultValue: "http://0.0.0.0"
            // schemaDoc:"----"
        },
        //传参
        postData: {
            type: Text,
            isMultiline: true
        },
        result: {
            type: Virtual,
            graphQLReturnType: `String`,
            // resolver:item => (`${item.url} ${item.defaultData}`),
            resolver: async (item) => {
                // console.log(`请求，${item.url} ${item.postData}`)
                const response = await fetch(item.url, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: item.postData,
                });
                const data = await response.json();
                //错误机制
                // console.log(data)
                return JSON.stringify(data)
            },
        },
    },
    hooks: {
        ...base.hooks,
    },
};