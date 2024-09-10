#!/bin/sh
# 获取宿主机的 IP 地址（示例）
export MYSQLHOST=$(hostname -I | awk '{print $1}')
exec "$@"
