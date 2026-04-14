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
  - Note: second SAS slot has a dead drive (Z1Z97F0T) pending swap for eBay replacement

### Cache Pool
- SanDisk X400 128GB M.2
- LITEONIT LCT-128M3S 128GB
- btrfs pool — mirror mode not yet configured

### Boot
- Verbatim STORE_N_GO 124GB USB

## OS
Unraid 7.2.4
