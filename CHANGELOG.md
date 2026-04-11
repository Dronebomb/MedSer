# MedSer Changelog

A running log of all changes made to the MedSer home server. Most recent changes appear first.

---

## [2026-04-11] Docker: Fixed qBittorrent/Gluetun stack
**Change:** Resolved multiple issues with the torrent stack — expired WireGuard key replaced via ProtonVPN dashboard; Gluetun added to `main_default` network so Radarr/Sonarr can resolve it by hostname; qBittorrent network interface changed from `lo` to VPN tunnel interface fixing tracker announces; torrents re-added after session data was lost from container recreation.
**Outcome:** ✅ Working

---

## [2026-04-11] Docker: Fixed Gluetun port forwarding failing on startup
**Change:** qBittorrent WebUI bind address changed from * to 0.0.0.0 in Tools > Options > Web UI, forcing it to listen on IPv4. Previously it was binding to IPv6 only (:::8081), causing the Gluetun port forwarding script to fail when connecting to 127.0.0.1:8081. Also connected GitHub MCP to Claude via custom connector for automated changelog updates.
**Outcome:** ✅ Working

---

## [2026-04-08] Networking: Exposed changelog app via Cloudflare Tunnel
**Change:** Added public hostname changelog.medser.vip pointing to 192.168.1.131:5056.
**Outcome:** ✅ Working

---

## [2026-04-08] Docker: Deployed medser-changelog web app
**Change:** Built a Flask app that logs server changes to a public GitHub repo via the GitHub API. Runs on port 5056. Files at /mnt/user-data/appdata/medser-changelog/.
**Outcome:** ✅ Working

---
