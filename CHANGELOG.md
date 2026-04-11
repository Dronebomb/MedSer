# MedSer Changelog

A running log of all changes made to the MedSer home server. Most recent changes appear first.

---

## [11-04-2026] Docker: Fixed Gluetun port forwarding failing on startup
**Change:** qBittorrent WebUI bind address changed from * to 0.0.0.0 in Tools > Options > Web UI, forcing it to listen on IPv4. Previously it was binding to IPv6 only (:::8081), causing the Gluetun port forwarding script to fail when connecting to 127.0.0.1:8081. Also connected GitHub MCP to Claude via custom connector for automated changelog updates.
**Outcome:** Working

---

## [08-04-2026] Networking: Exposed changelog app via Cloudflare Tunnel
**Change:** Added public hostname changelog.medser.vip pointing to 192.168.1.131:5056.
**Outcome:** Working

---

## [08-04-2026] Docker: Deployed medser-changelog web app
**Change:** Built a Flask app that logs server changes to a public GitHub repo via the GitHub API. Runs on port 5056. Files at /mnt/user-data/appdata/medser-changelog/.
**Outcome:** Working

---
