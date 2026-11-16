---
title: RaceBox Data
group: motorsport
summary: A Delphi library and demo app that read RaceBox Mini, Mini S and Micro devices over Bluetooth LE, capturing live 25 Hz GPS and motion data and downloading recorded sessions to CSV.
visibility: public
repo: https://github.com/JohnHutch123/RaceBox-Data
license: zlib
status: wip
tech: [delphi, freepascal, bluetooth, racebox, vcl, github]
keywords: [RaceBox Delphi, RaceBox Bluetooth, RaceBox CSV export, GPS data logger Delphi, RaceBox Mini S download]
references:
  - label: RaceBox BLE protocol documentation
    url: https://www.racebox.pro/products/mini-micro-protocol-documentation
    note: Revision 9, the protocol this library implements.
  - label: RaceBox
    url: https://www.racebox.pro
    note: GPS performance meters and data loggers.
  - label: Delphi System.Bluetooth
    url: https://docwiki.embarcadero.com/RADStudio/en/Using_Bluetooth_Low_Energy
    note: Delphi's built-in Bluetooth LE classes; no third-party libraries.
order: 2
---

## Overview

RaceBox Data reads a RaceBox Mini, Mini S or Micro from a Windows PC over Bluetooth LE: live GPS and
motion data at 25 Hz, and the sessions recorded on the device (standalone recording on Mini S and Micro).
Downloaded sessions can be saved as CSV.

It is the data-capture step for later lap timing, track maps and run reviews, so every reading ends up in
one plain record, `TRaceBoxSample`.

## Features

- Scan, connect and unlock a RaceBox from Delphi, using `System.Bluetooth` (RAD Studio 12, Windows 10 or later).
- Live samples at 25 Hz: position, altitude, speed, heading, G-forces, gyro rates and fix quality.
- Download the device memory, split it into sessions and save each as CSV, or keep the raw bytes.
- Protocol and session units have no Bluetooth dependency and also build with Free Pascal.
- Tests cover every example packet in the RaceBox protocol document, the stream parser, session splitting and the CSV round trip.

## Status

The protocol and session units pass their tests under Free Pascal and Delphi. The Bluetooth client and
demo compile cleanly but have not yet been run against a real RaceBox. Plotting, display and review of the
data are still to come.

## Licence

zlib.
