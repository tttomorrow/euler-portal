FROM gplane/pnpm as Builder

RUN pnpm -v

RUN mkdir -p /home/openeuler/web
WORKDIR /home/openeuler/web
COPY . /home/openeuler/web

RUN rm -rf ./app/zh
RUN rm -rf ./app/en
RUN cp ./app/.vitepress/config.ru.ts ./app/.vitepress/config.ts

RUN pnpm install
RUN pnpm build

FROM swr.cn-north-4.myhuaweicloud.com/opensourceway/openeuler/nginx:1.22.0-22.03-lts

COPY --from=Builder /home/openeuler/web/app/.vitepress/dist /usr/share/nginx/html/
RUN chmod -R 755 /usr/share/nginx/html
RUN rm -rf  /usr/share/nginx/html/zh \
    && rm -rf  /usr/share/nginx/html/en
COPY ./deploy/deploy-ru/nginx.conf /etc/nginx/nginx.conf

ENV RUN_USER nginx
ENV RUN_GROUP nginx
EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]
