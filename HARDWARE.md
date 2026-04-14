# MedSer Hardware

Current hardware inventory for the MedSer home server (192.168.1.131).

## Motherboard
Gigabyte B550M AORUS ELITE

## CPU
AMD Ryzen 5 2600 (6-core, 12-thread @ 3400MHz)

## RAM
16GB DDR4

## GPU
NVIDIA GeForce GTX 1050 Ti 4GB
(insufficient for local AI inference — RTX 3060 12GB or RTX 4060 8GB upgrade planned, budget ~AUD $200)

## HBA
LSI SAS3008 in IT mode (SFF-8643 to SFF-8482 cabling)

## Storage

### Array
- Disk 1: Seagate ST1000DM003 1TB SATA (XFS)
- Disk 2: Seagate ST4000NXCLAR4000 4TB SAS — serial Z1Z8F9E3 (XFS)
- Disk 3: Seagate ST4000NM0023 4TB SAS — serial Z1Z142CE00009350H47W (replacement for dead Z1Z97F0T, installed 14-04-2026)
  - SMART: healthy, 0 grown defects, 0 uncorrected errors, already formatted to 512-byte logical block size

### Cache Pool
- SanDisk X400 128GB M.2
- LITEONIT LCT-128M3S 128GB
- btrfs pool — mirror mode not yet configured

### Boot
- Verbatim STORE_N_GO 124GB USB

## OS
Unraid 7.2.4

---

## Key Paths

> Note: these paths are based on known state as of mid-April 2026. Some may have shifted during the failed appdata migration — verify before relying on them.

| Path | Purpose |
|------|---------|
| `/mnt/user/Media` | Main media directory |
| `/mnt/user/Media/config/` | Container appdata/configs (non-standard — originally from YAMS) |
| `/mnt/user/Media/adguardhome/` | AdGuard Home config |
| `/mnt/user/appdata/` | Unraid appdata share (also backed up) |
| `/mnt/user/appdata/compose/main/` | Main Docker Compose stack |
| `/mnt/user/appdata/compose/custom/` | Custom stack (Frigate, Home Assistant, Mosquitto) |
| `/mnt/user/Media/downloads/torrents/` | Torrent files |
| `/mnt/user-data/appdata/medser-changelog/` | Changelog Flask app |
| `/mnt/disks/Samsung_S2_Portable/config/frigate/` | Frigate config — Samsung drive rejected, this path is likely broken |
