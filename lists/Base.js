const { Text, Relationship, Url, DateTime, Virtual } = require('@keystonejs/fields');
// const utils = require("../utils/utils")


// Access control functions
const userIsAdmin = ({ authentication: { item: user } }) => Boolean(user && user.isAdmin);
const userOwnsItem = ({ authentication: { item: user } }) => {
  if (!user) {
    return false;
  }
  return { id: user.id };
};
const userIsAdminOrOwner = auth => {
  const isAdmin = access.userIsAdmin(auth);
  const isOwner = access.userOwnsItem(auth);
  return isAdmin ? isAdmin : isOwner;
};
const access = { userIsAdmin, userOwnsItem, userIsAdminOrOwner };



module.exports = {
    fields: {
        //标题
        name: {
            type: Text,
            isRequired: true,
        },
        //类型
        tags: {
            type: Relationship,
            ref: 'Tag',
            many: true
        },
        //发布者
        author: {
            type: Relationship,
            ref: 'User'
        },
        createTime: {
            type: DateTime,
            format: 'MM/DD/YYYY hh:mm',
            yearRangeFrom: 1901,
            yearPickerType: 'select',
            //defaultValue:new Date()
        }
    },
    hooks: {
        // Hooks for create and update operations
        // resolveInput: async ({
        //     operation,
        //     existingItem,
        //     originalInput,
        //     resolvedData,
        //     context,
        //     actions,
        // }) => {

        //     console.log('resolveInput',resolvedData)
        //     return resolvedData;
        // },
        // validateInput: async ({
        //     operation,
        //     existingItem,
        //     originalInput,
        //     resolvedData,
        //     context,
        //     actions,
        // }) => {

        //     console.log('validateInput',resolvedData)
        //     return resolvedData;
        // },
        beforeChange: async ({
            operation,
            existingItem,
            originalInput,
            resolvedData,
            context,
            actions,
        }) => {
            //在这里hook
            // console.log('beforeChange', resolvedData)
            
            if (resolvedData.createTime == null) {
                resolvedData.createTime = (new Date()).toISOString();
            //     //utils.formatDate();
            }
            return resolvedData;
        },
        // afterChange:  async ({
        //     operation,
        //     existingItem,
        //     originalInput,
        //     resolvedData,
        //     context,
        //     actions,
        // }) => {

        //     console.log('afterChange',resolvedData)
        //     return resolvedData;
        // },

        // Hooks for delete operations
        // validateDelete: async (...) => { ... },
        // beforeDelete: async (...) => { ... },
        // afterDelete: async (...) => { ... },
    },
    access: {
        // read: access.userIsAdminOrOwner,
        update: access.userIsAdminOrOwner,
        create: access.userIsAdmin,
        delete: access.userIsAdmin,
        auth: true,
      },
};