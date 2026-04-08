# MedSer Changelog

A running log of all changes made to the MedSer home server. Most recent changes appear first.

---

## [2026-04-08] Networking: Exposed changelog app via Cloudflare Tunnel
**AI:**   
**Change:** Added public hostname changelog.medser.vip pointing to 192.168.1.131:5056.  
**Outcome:** ✅ Working

---

## [2026-04-08] Docker: Deployed medser-changelog web app
**AI:**   
**Change:** Built a Flask app that logs server changes to a public GitHub repo via the GitHub API. Runs on port 5056. Files at /mnt/user-data/appdata/medser-changelog/.  
**Outcome:** ✅ Working

---

