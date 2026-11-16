---
title: Getting started
project: racebox-data
description: Build the demo, connect to a RaceBox and download sessions to CSV.
order: 1
---

> RaceBox Data is a work in progress. The Bluetooth client and demo compile but have not yet been tested
> against a real RaceBox.

## Requirements

- RAD Studio / Delphi 12, Windows 10 or later with Bluetooth LE.
- A RaceBox Mini, Mini S or Micro. Downloading recorded sessions needs a Mini S or Micro with firmware that supports standalone recording.

## Repository layout

| Path | Contents |
|---|---|
| `Source/RaceBox.Protocol.pas` | Packet framing, checksum, commands and decoders. No Bluetooth; also builds with Free Pascal. |
| `Source/RaceBox.Session.pas` | Splits a download into sessions, CSV save and load, decodes a saved raw download. No Bluetooth. |
| `Source/RaceBox.BLE.pas` | `TRaceBoxClient`: scan, connect, live data, unlock, download, erase. Delphi only. |
| `Demo/RaceBoxReader.dpr` | VCL demo app using all of the above. |
| `Tests/RaceBoxProtocolTest.dpr` | Console tests for the protocol and session units. |

## Using the demo

1. Open `Demo/RaceBoxReader.dpr` in RAD Studio 12, build for Win32 or Win64 and run.
2. Switch the RaceBox on. **Close the RaceBox phone app** or turn off your phone's Bluetooth: the device accepts one connection at a time.
3. Press **Scan**, pick the RaceBox and press **Connect**. The first connection can take 10 to 20 seconds; it gives up after 30.
4. If you set a memory security code in the RaceBox app, type it and press **Unlock** (needed after every connect).
5. **Status** shows how many records are stored. **Download** fetches them all; a full memory (196,608 records) takes a few minutes.
6. Select sessions (or none for all) and press **Save CSV…** to write one file per session. **Save raw…** keeps the exact bytes, and **Open file…** decodes a raw file or CSV again without the device.

The RaceBox does not need to be paired in Windows settings first.

## Running the tests

```bash
cd Tests
dcc32 -U..\Source RaceBoxProtocolTest.dpr && RaceBoxProtocolTest
```

Or with Free Pascal:

```bash
fpc -Mdelphi -Fu../Source RaceBoxProtocolTest.dpr
```

GitHub Actions runs the Free Pascal tests on every push.
