# 1. 使用官方的 Node.js 镜像，选择 LTS 版本
FROM node:22-alpine

RUN apk add --no-cache tzdata

# 设置时区
ENV TZ=Asia/Shanghai

# 将时区文件链接到本地
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime && \
    echo $TZ > /etc/timezone
    
# 2. 在容器内创建并设置工作目录
WORKDIR /app

# 3. 将 package.json 和 package-lock.json（如果存在）复制到工作目录中
COPY package*.json ./

# 4. 安装应用依赖
RUN npm install

# 如果你使用的是 yarn，请替换为：
# RUN yarn install



# 5. 将应用的源代码复制到容器内的工作目录
COPY . .

# 6. 声明应用程序运行的端口
EXPOSE 3000

# 7. 启动应用
ENTRYPOINT [ "npm","run","start" ]