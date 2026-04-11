# MedSer Changelog

A running log of all changes made to the MedSer home server. Most recent changes appear first.

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
