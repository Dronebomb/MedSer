# MedSer Changelog

A running log of all changes made to the MedSer home server. Most recent changes appear first.

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
