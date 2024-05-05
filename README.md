#

## Start

```shell
sudo docker compose up
```

## Setup notes

### Traefik

- add labels to each service
- home assistant requires to enable trusing reverse proxy and specifiyng ip or range
    ```yaml
    http:
        use_x_forwarded_for: true
        trusted_proxies:
            - '172.20.0.0/16'  # got this from logs of homeassistant container
            - 127.0.0.1
            - ::1
    ```

### Checking DNS on mac

use `dns-sd` to verify dns resolution
```shell
dns-sd -G v4v6 assistant.home
```

reset DNS cache
```shell
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```
