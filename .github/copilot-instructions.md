本项目是一个前后端结合项目，前端使用 `gin` 框架，后端使用 `Angular` 框架。以下是一些关于如何使用和开发该项目的指导。
# 项目结构
本项目的目录结构如下：

```
api # 包含了后端代码的接口实现
 |-- cron # 提供接口手动调用定时任务
 |-- front # 接口访问前端静态文件
 |-- statsviz # 提供接口访问后端的监控数据
 |-- user # 提供用户相关的接口
 |-- websocket # 提供 WebSocket 相关的接口
bean # 包含了后端的实体类
cron # 包含了定时任务的实现
middleware # 包含了后端的中间件实现
router # 包含了后端的路由实现
service # 包含了后端的服务实现
 |-- database # 数据库相关的服务
 |-- log # 日志相关的服务
 |-- version # 获取当前环境
 |-- websocket # WebSocket 相关的服务 
static # 包含前端项目编译后的静态文件
web # 包含了前端代码
Dockerfile # Dockerfile 用于构建 Docker 镜像
main.go # 项目的入口文件
```