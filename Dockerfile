FROM 192.168.31.100:2019/ijkzen/jav_spider_build:v1.2 AS builder

WORKDIR /build

COPY . /build/

RUN cd /build/web && npm install && npm run build && rm -rf /build/static/front && mkdir /build/static/front && cp -r /build/web/dist/browser/* /build/static/front && cd /build \
    go env -w GOPROXY=http://192.168.31.100:2029,direct; CGO_ENABLED=0 go build -trimpath -ldflags "-s -w"  main.go

FROM 192.168.31.100:2019/ijkzen/jav_spider_base:v0.7

WORKDIR /app

COPY --from=builder /build/main /app/main

RUN chmod +x /app/main

CMD [ "/app/main" ]