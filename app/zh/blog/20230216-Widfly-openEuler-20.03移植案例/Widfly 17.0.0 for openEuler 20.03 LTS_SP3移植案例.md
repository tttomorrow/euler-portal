---
title: "Widfly-17.0.0-migrate"
date: 2023-02-09
category: blog
tags:
    - Widfly
    - porting Guide
sig: sig-Compatibility-Infra
archives: 2023-02
author: bald
summary: "详细介绍了Widfly-17.0.0软件移植到openEuler操作系统的具体操作步骤"
---

# Widfly 17.0.0 for openEuler 20.03 LTS_SP3移植案例

## 简介

JBoss是一套开源的企业级Java中间件系统，用于实现基于SOA的企业应用和服务，基于J2EE的开放源代码的应用服务器。 JBoss代码遵循LGPL许可，可以在任何商业应用中免费使用。JBoss是一个管理EJB的容器和服务器，支持EJB1.1、EJB 2.0和EJB3的规范。但JBoss核心服务不包括支持servlet/JSP的Web容器，一般与Tomcat或Jetty绑定使用。

开发语言：Java 

一句话描述：应用服务器 

建议版本：WildFly 17.0.0.Final

## 环境要求

### 硬件要求

| **项目** | **说明**                      |
| -------- | ----------------------------- |
| 服务器   | TaiShan 200服务器（型号2280） |
| CPU      | 鲲鹏920 5250处理器            |
| 内存     | 无要求                        |
| 存储     | 无要求                        |
| 磁盘分区 | 无要求                        |
| 网络     | 能访问互联网                  |

### 操作系统

| 项目          | 版本                        |
| ------------- | --------------------------- |
| **OpenEuler** | **OpenEuler 20.03 LTS_SP3** |

### 软件要求

| 版本           | 下载地址                                                     |
| -------------- | ------------------------------------------------------------ |
| WildFly 17.0.0 | [**https://github.com/wildfly/wildfly.git**](https://github.com/wildfly/wildfly.git) |



## 安装依赖包

```
 yum install -y gcc gcc-c++ openssl-devel java-1.8.0*
```

> ![](./images/image3.png)
> 
>![](./images/image1.png)**说明**
> 
> JDK安装成功后检查以下路径确认是否安装成功。
>
> ![](./images/image4.png)



##  关闭防火墙

> ![](./images/image1.png)**说明**
> 
>测试环境下通常会关闭防火墙以避免部分网络因素影响，视实际需求做配置。

**步骤1** 停止防火墙。

```
  systemctl stop firewalld.service
```

**步骤2** 关闭防火墙。

```
  systemctl disable firewalld.service
```

**步骤3** 查看防火墙状态。

```
  systemctl status firewalld.service
```



##  配置扩展文件描述符

**步骤1** 打开limits.conf文件。

```
  vi /etc/security/limits.conf
```

**步骤2** 在文件中写入以下配置后，保存并退出文件。

```
 * soft nofile 102400                                                 
 * hard nofile 102400                                                 
```

![](./images/image1.png)**说明**

*：表示所有用户；

hard：表示严格的设定，必定不能超过这个设定的数值；

soft：表示警告的设定，可以超过这个设定值，但是若超过则有警告信息。

**步骤3** 重启服务器使文件配置生效。



##  安装Maven-3.8.7

**步骤1** 进入"/root"路径，下载maven-3.8.7安装包。

下载地址：

[**https://mirrors.bfsu.edu.cn/apache/maven/maven-3/3.8.7/binaries/apache-maven-3.8.7-bin.tar.gz**](https://mirrors.bfsu.edu.cn/apache/maven/maven-3/3.8.7/binaries/apache-maven-3.8.7-bin.tar.gz)

**步骤2** 解压到当前目录下。

```
  tar -zxvf apache-maven-3.8.7-bin.tar.gz
```

**步骤3** 配置环境变量。

- 编辑vi /etc/profile文件。

```
  vi /etc/profile
```

- 在文件末尾加入以下内容后保存并退出。

```
 export M2_HOME=/root/apache-maven-3.8.7                               
 export PATH=$PATH:$JAVA_HOME/bin:$M2_HOME/bin                      
```

- 生效环境变量。

```
  source /etc/profile
```

**步骤4** 验证maven版本。

```
  mvn -v
```

出现以下回显则表示安装完成。

![](./images/image5.png)





##  编译WildFly 17.0.0源码

**步骤1** 下载WildFly源码。

```
 cd /root                                                              
 git clone https://github.com/wildfly/wildfly.git                     
```

![](./images/image6.png)

**步骤2** 切换到WildFly 17.0.0版本。

```
 cd wildfly                                                            
 git checkout 17.0.0.Final                                             
```

![](./images/image7.png)

**步骤3** 执行编译。

使用自己的 Maven 安装进行构建，其中构建和执行过程参考[**https://github.com/wildfly/wildfly**](https://github.com/wildfly/wildfly)

```
  mvn install
```

编译运行图示1

![](./images/image8.png)

编译运行图示2

![](./images/image9.png)

若显示**BUILD SUCCESS**，则编译通过。

![](./images/image1.png)**说明**

执行安装编译后会生产对应的.jar包，收集相关的.jar包的命令如下，其中wildfly-jar文件中的内容为编译所生成的全部jar包：

```
 cd /root                                                              
 mkdir wildfly-jar                                                    
 cd /root/wildfly-jar                                                  
 find . -name "*.jar" -exec cp -rf {} /root/wildfly-jar/ \;            
 cd /root                                                              
 tar -cvjf wildfly-jar.tar.gz wildfly-jar                              
```



