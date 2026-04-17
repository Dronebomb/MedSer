#!/bin/bash
# sync-qbit-port.sh
#
# Runs every 5 minutes via cron (registered in /boot/config/go on boot).
#
# Does two things:
#   1. Reads the current port forwarded by Gluetun via its internal control API
#      and updates qBittorrent's listen port to match via the qBit Web API.
#      ProtonVPN periodically rotates the forwarded port - without this, torrents
#      stop seeding/connecting because qBit is listening on a stale port.
#
#   2. Checks that qBittorrent's network interface is set to tun0 (the WireGuard
#      tunnel inside the Gluetun namespace). This setting has been observed to
#      revert to lo (loopback) after container recreates, which causes all tracker
#      announces to fail with "unreachable". The script resets it to tun0 if needed.
#
# Requirements:
#   - qBittorrent must be running in Gluetun's network namespace (network_mode: service:gluetun)
#   - jq must be available on the host (it is on this system)
#   - Gluetun control server runs on port 8000 inside the container (not exposed on host)
#
# Credentials are not stored here. Set these as environment variables or
# substitute your qBittorrent WebUI username and password below.

QBIT_URL="http://localhost:8081"
QBIT_USER="<qbittorrent_webui_username>"
QBIT_PASS="<qbittorrent_webui_password>"

GLUETUN_PORT=$(docker exec gluetun wget -qO- http://localhost:8000/v1/openvpn/portforwarded 2>/dev/null | jq -r '.port')

if [[ -z "$GLUETUN_PORT" || "$GLUETUN_PORT" == "null" || "$GLUETUN_PORT" == "0" ]]; then
    echo "$(date): Failed to get Gluetun forwarded port, skipping"
    exit 1
fi

COOKIE=$(curl -s -c - -d "username=${QBIT_USER}&password=${QBIT_PASS}" "${QBIT_URL}/api/v2/auth/login" | grep SID | awk '{print "SID="$NF}')

if [[ -z "$COOKIE" ]]; then
    echo "$(date): Failed to authenticate with qBittorrent, skipping"
    exit 1
fi

CURRENT_PORT=$(curl -s -b "$COOKIE" "${QBIT_URL}/api/v2/app/preferences" | jq -r '.listen_port')

if [[ "$GLUETUN_PORT" != "$CURRENT_PORT" ]]; then
    curl -s -b "$COOKIE" -d "json={\"listen_port\":${GLUETUN_PORT}}" "${QBIT_URL}/api/v2/app/setPreferences"
    echo "$(date): Updated qBittorrent listen port $CURRENT_PORT -> $GLUETUN_PORT"
else
    echo "$(date): Port already in sync ($CURRENT_PORT), nothing to do"
fi

CURRENT_IFACE=$(docker exec qbittorrent cat /config/qBittorrent/qBittorrent.conf | grep -i "^Session.Interface=" | cut -d'=' -f2)

if [[ "$CURRENT_IFACE" != "tun0" ]]; then
    curl -s -b "$COOKIE" -d 'json={"iface":"tun0","iface_name":"tun0"}' "${QBIT_URL}/api/v2/app/setPreferences"
    echo "$(date): Interface was ${CURRENT_IFACE:-empty}, reset to tun0"
else
    echo "$(date): Interface already tun0, nothing to do"
fi
