# MedSer Changelog

A running log of all changes made to the MedSer home server. Most recent changes appear first.

---

## [17-04-2026] Networking: Server lost LAN access - ethernet cable disconnected
- All services unreachable locally and remotely despite all Docker containers showing healthy
- `ip a` showed eth0 as NO-CARRIER, bond0 and br0 both DOWN - server had silently fallen back to WiFi at 192.168.1.113 instead of the usual 192.168.1.131
- Services were actually running fine, just on the wrong IP
- Physical ethernet cable was reconnected, eth0 came back UP and rejoined bond0/br0, IP returned to 192.168.1.131

---

## [17-04-2026] Docker/qBittorrent: tun0 interface reverted to lo again - fixed + self-healing added
- Trackers showing unreachable again, same recurring issue as 15-04 and 11-04
- Confirmed via qBittorrent.conf that Session.Interface had reverted to lo
- Fixed manually via qBittorrent API
- Root cause still unknown - suspect container recreates wiping the setting
- Added tun0 enforcement to sync-qbit-port.sh so the script self-heals this every 5 minutes automatically going forward

---

## [17-04-2026] Docker/qBittorrent: Created sync-qbit-port.sh - auto port sync and interface enforcement
- ProtonVPN via Gluetun periodically rotates the forwarded port, causing qBittorrent to listen on a stale port
- Written in bash using Gluetun's internal control API (port 8000 inside container) and qBittorrent Web API
- Syncs forwarded port from Gluetun to qBittorrent listen port every 5 minutes
- Also enforces tun0 as the network interface, self-healing the recurring lo revert bug
- Script saved to /mnt/user/scripts/sync-qbit-port.sh
- Cron job registered via /boot/config/go for persistence across reboots: `*/5 * * * *`
- Script (without credentials) committed to this repo at scripts/sync-qbit-port.sh

---

## [15-04-2026 8:30am] Docker/qBittorrent: Network interface reverted to lo again - fixed manually
- All trackers showing "skipping tracker announce (unreachable)", DHT 0 nodes, no downloads or uploads
- qBittorrent Advanced settings had reverted network interface back to `lo` (loopback) instead of `tun0`
- Changed back to `tun0` manually via WebUI - torrents resumed
- This is the same issue fixed on 11-04, recurring for unknown reasons - root cause not yet identified
- TODO: investigate why the network interface setting resets (likely on container recreate wiping qBittorrent config, or a qBit config persistence issue) and find a way to set it permanently, possibly via qBittorrent.conf in appdata or an environment variable

---

## [15-04-2026] Docker/qBittorrent: Added vpn-watchdog to fix namespace breakage on reboot
- Unraid's rc.docker restarts containers individually on boot using `docker start`, completely bypassing compose `depends_on` rules
- This meant qBittorrent was starting before Gluetun was healthy and getting stuck in its own isolated network namespace every reboot
- Added `vpn-watchdog` service to compose using `docker:cli` image -- listens for any Gluetun `start` event and restarts qBittorrent 10 seconds later
- Catches all cases regardless of what triggered the Gluetun restart (boot, manual, Watchtower)
- Recreated qBittorrent via `docker compose up -d --force-recreate qbittorrent` to restore access

---

## [14-04-2026] Hardware: Installed replacement SAS drive
- Swapped in Seagate ST4000NM0023 4TB SAS (serial Z1Z142CE00009350H47W) to replace dead drive Z1Z97F0T
- SMART test came back clean — 0 grown defects, 0 uncorrected errors
- Drive was already formatted to 512-byte logical block size, no sg_format needed

---

## [14-04-2026 9:30am] Docker/Gluetun: Set timezone to Brisbane for log clarity
- Added `TZ=Australia/Brisbane` to Gluetun environment in `docker-compose.yaml`
- Gluetun logs were previously in UTC causing confusion when debugging - now show AEST

---

## [14-04-2026 9:30am] Docker/qBittorrent: Fixed recurring Gluetun namespace mismatch
- qBittorrent was ending up in an isolated network namespace again after any Gluetun restart, same root cause as 13-04 fix
- Confirmed via `/proc/<pid>/ns/net` inode comparison - inodes differed despite compose file having `network_mode: "service:gluetun"`
- Root cause: Docker always bakes the resolved container ID into `NetworkMode` at creation time, so if Gluetun restarts without qBittorrent also restarting, qBit is left orphaned
- Permanent fix: updated `depends_on` in `docker-compose.yaml` to use `condition: service_healthy` and `restart: true` so qBittorrent automatically restarts whenever Gluetun does
- Recreated qBittorrent from compose to apply the fix

---

## [14-04-2026 9:30am] Docker/Gluetun: Fixed Gluetun stuck unhealthy due to broken healthcheck added by Copilot
- Gluetun was reporting unhealthy despite VPN tunnel passing traffic and internal healthcheck logging healthy at startup
- Root cause: Copilot added a custom healthcheck to `docker-compose.yaml` on 13-04 using `wget --spider` which sends a HEAD request - Gluetun's health server at 127.0.0.1:9999 only responds correctly to GET requests, returning a non-200 to HEAD which caused Docker to mark it unhealthy
- Original container predated this change so was unaffected; problem only appeared after container was recreated today
- Fixed by changing healthcheck in compose to `wget -qO-` (GET request) instead of `--spider`
- Both Gluetun and qBittorrent came up healthy after recreate

---

## [13-04-2026] Docker: Fixed qBittorrent 502 / WebUI unreachable
- qBittorrent was stuck in a stale Gluetun network namespace after Gluetun had been recreated at some point — the container's `NetworkMode` was hardcoded to the old Gluetun container ID rather than its name, so after recreation qBittorrent ended up in its own isolated namespace
- Confirmed the mismatch by comparing `/proc/<pid>/ns/net` inodes for both containers — they differed
- Fixed by recreating the qBittorrent container so it reattaches to the current Gluetun namespace using `container:gluetun` by name
- Cloudflare tunnel for qbittorrent.medser.vip and Sonarr/Radarr download client connections restored

---

## [13-04-2026] Backup: Fixed Appdata Backup plugin skipping almost everything
- Backup plugin was scanning the wrong source paths — `/mnt/user/media/config` and `/mnt/user/media/adguardhome` (lowercase `m`) instead of `/mnt/user/Media/config` and `/mnt/user/Media/adguardhome`
- Also removed `/mnt/cache/appdata` as a source since it's redundant with `/mnt/user/appdata`
- Corrected source paths to: `/mnt/user/appdata`, `/mnt/user/Media/config`, `/mnt/user/Media/adguardhome`
- All containers now back up successfully including Sonarr, Radarr, Jellyfin, qBittorrent etc.

---

## [11-04-2026] Docker: Fixed qBittorrent/Gluetun stack
- Replaced expired WireGuard private key via ProtonVPN dashboard (was routing through a random AU host instead of ProtonVPN)
- Added Gluetun to `main_default` Docker network so Radarr/Sonarr can resolve it by hostname
- Fixed qBittorrent network interface set to `lo` (loopback) — changed to VPN tunnel interface, resolving "skipping tracker announce (unreachable)"
- Re-added torrents after session data (BT_backup) was wiped by container recreation; files were intact at /mnt/user/Media/downloads/torrents/

---

## [11-04-2026] Docker: Fixed Gluetun port forwarding failing on startup
- qBittorrent WebUI bind address changed from `*` to `0.0.0.0` — was binding IPv6 only (:::8081), causing the port forwarding up command to fail on 127.0.0.1:8081
- Connected GitHub MCP to Claude for automated changelog updates

---

## [08-04-2026] Networking: Exposed changelog app via Cloudflare Tunnel
- Added public hostname changelog.medser.vip pointing to 192.168.1.131:5056

---

## [08-04-2026] Docker: Deployed medser-changelog web app
- Flask app logging server changes to a public GitHub repo via the GitHub API
- Runs on port 5056, files at /mnt/user-data/appdata/medser-changelog/

---
