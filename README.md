# employee-LMS-server

审批流后台管理系统前端运用了Vue3框架和ElementPlus组件库，后端运用了Koa2，使用MongDB数据库来存储信息，Mongoose来操作MongDB数据库。主要由用户管理、菜单管理、角色管理、部门管理、审批流申请、审批流审核等六大块系统功能组成。

## 功能模块图

![image](https://github.com/Erika-Huang/employee-LMS-client/assets/87916335/488580a5-acb6-4bdd-b152-8d739c20be70)

## 页面展示
### 登录界面——为了方便用户操作，登录界面设置非常简单
![image](https://github.com/Erika-Huang/employee-LMS-client/assets/87916335/f9ef78ef-1588-42f9-9d7a-6f0246fbb0ec)
### 欢迎页
![image](https://github.com/Erika-Huang/employee-LMS-client/assets/87916335/7e9f238f-487a-4284-8256-03524fff41e2)
### 用户管理
![image](https://github.com/Erika-Huang/employee-LMS-client/assets/87916335/abc3358b-66ec-4277-81cb-01092f4c830d)
#### 用户管理-点击新增/编辑按钮
![image](https://github.com/Erika-Huang/employee-LMS-client/assets/87916335/8a1dfb20-b039-4360-b998-f64136056e63)
![image](https://github.com/Erika-Huang/employee-LMS-client/assets/87916335/29d0aa46-96f8-434d-8a46-0ff4401c36e1)
### 菜单管理
![image](https://github.com/Erika-Huang/employee-LMS-client/assets/87916335/93e3d4b6-88b7-4a96-9eea-fe3f2e01a4d4)
#### 菜单管理-点击菜单管理中的新增按钮
![image](https://github.com/Erika-Huang/employee-LMS-client/assets/87916335/56e77572-f668-4cf5-9dea-d00a9c6b1f6e)
![image](https://github.com/Erika-Huang/employee-LMS-client/assets/87916335/33c86a1e-ecec-4744-a031-802115a765fb)
### 角色管理
![image](https://github.com/Erika-Huang/employee-LMS-client/assets/87916335/055e5dc5-e5f2-4c1d-93ee-9de9bb028ae1)
#### 角色管理-设置权限/用户创建
![image](https://github.com/Erika-Huang/employee-LMS-client/assets/87916335/7620bf38-dab9-4a16-9e37-63d77be6961d)
![image](https://github.com/Erika-Huang/employee-LMS-client/assets/87916335/2cfdfe5d-bf45-439c-9a47-dec4dcdc8ffe)
### 部门管理
![image](https://github.com/Erika-Huang/employee-LMS-client/assets/87916335/d7af3bad-f556-4735-b795-ec492fd7b91e)
### 休假申请
![image](https://github.com/Erika-Huang/employee-LMS-client/assets/87916335/7bede77a-d746-459c-8e87-414625df3bba)
#### 休假申请——查看
![image](https://github.com/Erika-Huang/employee-LMS-client/assets/87916335/9b780af1-07a5-48df-a79b-3cd64c399b77)
### 待我审批——登录人事部员工的账号，只给其审批管理权限，因此系统管理页面其看不见。查看待我审批。
![image](https://github.com/Erika-Huang/employee-LMS-client/assets/87916335/b6e40edd-b547-4695-912e-dd69170d776b)

#### 待我审批——点击审核按钮
![image](https://github.com/Erika-Huang/employee-LMS-client/assets/87916335/d2ba8d2f-0243-4a6a-9026-01cc5f67c805)

### 系统404页面——当访问错误的地址时，出现404页面
![image](https://github.com/Erika-Huang/employee-LMS-client/assets/87916335/4052bde1-8d43-4b81-a08a-d2efb48e5323)

## 重要文件夹及文件说明
1. 后端
config文件夹——连接数据库
logs文件夹——日志文件存放
models文件夹——数据表模型
public文件夹——公共静态资源
routes文件夹——页面的核心功能后端实现
utils文件夹——公共函数封装、二次封装日志包logjs
2. 前端
api文件夹——api接口统一定义和存放
assets文件夹——公共静态资源存放
components文件夹——公共组件
config文件夹——环境配置封装
router文件夹——路由渲染和路由路径
store文件夹——Vuex状态管理、Mutations业务层数据提交
utils文件夹——axios二次封装-请求拦截，响应拦截、
             storage二次封装、工具函数封装
views文件夹——前端页面存放
## 使用说明

1. 下载 [前端代码](https://github.com/Erika-Huang/employee-LMS-client) 和 [后端代码](https://github.com/Erika-Huang/employee-LMS-server)， 分别打开文件，使用Robo3T，连接数据库后，创建对应的数据库：manager
在数据库的Collections中创建
counters
depts
leaves
menus
roles
users
其中，users中创建一个用户
```json
{
    "state" : 1,
    "role" : "0",
    "roleList" : [ 
        "653122ec3456ea022d646d13"
    ],
    "deptId" : [ 
        "652fd80757265465d3fd8201", 
        "653124113456ea022d646d70"
    ],
    "userId" : 100001,
    "userName" : "admin",
    "userPwd" : "21232f297a57a5a743894a0e4a801fc3",
    "userEmail" : "admin@erika.com",
    "createTime" : "2023-08-31T13:32:06.381Z",
    "lastLoginTime" : "2023-08-21T13:32:06.381Z",
    "__v" : 0,
    "job" : "架构师",
    "mobile" : "17611020022"
}
```
其中userPwd为密码admin的md5加密后的样子
然后剩下的均可通过项目运行起来之后在项目中创建。
登录账号：admin
密码：admin

当使用后面的功能时，记得重新回来修改admin用户中的deptId、roleList，前提是先创建部门和角色

## 项目运行
1. 分别打开项目，在该项目路径下运行 `yarn `
2. 下载安装包之后，输入` yarn dev `即可

