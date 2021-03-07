# docker build -t raphtalia-api . && docker run -it --init -p 8000:8000 raphtalia-api

FROM hayd/alpine-deno:1.7.2

EXPOSE 8000
WORKDIR /
USER root

ADD . .
#RUN deno cache mod.ts

CMD ["run", "--allow-net", "--allow-read", "mod.ts"]
