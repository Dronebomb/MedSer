# MedSer Changelog

A running log of all changes made to the MedSer home server. Most recent changes appear first.

---

## [2026-04-11] Docker: Fixed qBittorrent trackers unreachable (wrong network interface)
**Change:** qBittorrent Advanced settings had Network Interface set to `lo` (loopback) instead of the VPN tunnel interface. Changed to the correct VPN interface, which resolved all trackers showing "skipping tracker announce (unreachable)".
**Outcome:** ✅ Working

---

## [2026-04-11] Docker: Connected Gluetun to main_default network
**Change:** Radarr/Sonarr could not resolve the `gluetun` hostname because Gluetun was only on `yams_network` while Radarr/Sonarr were on `main_default`. Added `main_default` as an additional network to Gluetun in the compose file (with alias `gluetun`) and declared it as external in the networks section. Updated via Compose Manager Plus.
**Outcome:** ✅ Working

---

## [2026-04-11] Docker: Fixed qBittorrent session data lost after container recreation
**Change:** qBittorrent BT_backup directory was empty after container recreation, causing all torrents to disappear from the UI. Files were confirmed intact at /mnt/user/Media/downloads/torrents/. Root cause was container recreation (not restart) wiping in-memory session state. Torrents re-added manually.
**Outcome:** ✅ Working

---

## [2026-04-11] Docker: Fixed Gluetun not connecting to ProtonVPN
**Change:** Gluetun was connecting to a non-ProtonVPN Australian host (Host Universal Pty Ltd) instead of ProtonVPN. Root cause was an expired/invalid WireGuard private key. Generated a new WireGuard key from the ProtonVPN dashboard with NAT-PMP/port forwarding enabled and updated WIREGUARD_PRIVATE_KEY in /mnt/user/appdata/compose/torrent/.env.
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
