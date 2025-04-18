FROM node:20.19.0-alpine3.21 AS build
WORKDIR /app
COPY . .
RUN npm config set registry https://registry.npmmirror.com && \
    npm install && \
    npm run build

FROM svenstaro/miniserve:0.29.0-alpine AS runtime
# 设置端口
ENV MINISERVE_PORT=9263
WORKDIR /app
COPY --from=build /app/dist /app

EXPOSE 9263

CMD ["--index", "/app/index.html"]

# docker build -t firfe/archo_zh-cn:2025.04.18 .

