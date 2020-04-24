const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const {StaticApp}=require('@keystonejs/app-static');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');



const initialiseData = require('./utils/initial-data');
const UsersSchema = require('./lists/Users');
//内容、开源项目
const KnowledgesSchema = require('./lists/Knowledges.js');
//标签系统
const TagsSchema = require('./lists/Tags.js');
const CategoriesSchema = require('./lists/Categories.js');
//测试
const ApisSchema=require('./lists/Apis.js');
//实验室
const MLVideosSchema=require('./lists/MLVideos.js');



const PROJECT_NAME = "ai-mix";
const keystone = new Keystone({
  name: PROJECT_NAME,
  secureCookies:false,
  adapter: new Adapter(),
  onConnect: initialiseData,
});

keystone.createList('User', UsersSchema);
keystone.createList('Tag', TagsSchema);
keystone.createList('Category', CategoriesSchema);
keystone.createList('Knowledge', KnowledgesSchema);
keystone.createList('API',ApisSchema);

//实验室
keystone.createList('MLVideo',MLVideosSchema);



const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      enableDefaultRoute: true,
      authStrategy,
    }),
    new StaticApp({
      path:"/",
      src:'public',
      fallback:"newsBlog.html"
    })
  ],
};
