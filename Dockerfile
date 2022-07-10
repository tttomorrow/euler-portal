FROM gplane/pnpm as Builder

RUN pnpm -v

RUN mkdir -p /home/opendesign/web
WORKDIR /home/opendesign/web
COPY . /home/opendesign/web

RUN pnpm install
RUN pnpm build:p

FROM nginx:1.20.0

COPY --from=Builder /home/opendesign/web/packages/portal/.vitepress/dist /usr/share/nginx/html/
RUN chmod -R 755 /usr/share/nginx/html
COPY ./deploy/nginx/nginx.conf /etc/nginx/nginx.conf

ENV RUN_USER nginx
ENV RUN_GROUP nginx
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]

