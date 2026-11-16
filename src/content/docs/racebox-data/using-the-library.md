---
title: Using the library
project: racebox-data
description: TRaceBoxClient events, the TRaceBoxSample record, sessions and CSV columns.
order: 2
---

## Connecting and downloading

```pascal
uses RaceBox.Protocol, RaceBox.Session, RaceBox.BLE;

FClient := TRaceBoxClient.Create;
FClient.OnDeviceFound := DeviceFound;      // (Index, Name, Address, Rssi)
FClient.OnConnected := Connected;
FClient.OnLiveSample := LiveSample;        // TRaceBoxSample, 25 Hz
FClient.OnDownloadComplete := DownloadDone;
FClient.StartScan;
...
FClient.Connect(Index);                    // returns at once, connects in the background
FClient.Unlock(123456);                    // only if memory security is on
FClient.StartDownload;
...
procedure TForm1.DownloadDone(Sender: TObject; Cancelled: Boolean);
var Sessions: TRaceBoxSessionList;
begin
  Sessions := FClient.ExtractSessions;     // you own the list now
  RaceBoxSaveSessionsCsv('C:\RaceBox', Sessions);
end;
```

Events run on the main thread, so you can update the user interface from them. `OnStateChanged` fires
whenever `State` changes (scanning, connecting, connected and so on). `ConnectTimeoutMs` (default 30000)
sets how long a connection attempt may take.

## `TRaceBoxSample`

| Field | Unit |
|---|---|
| `UtcTime`, `UnixTimeMs`, `TimeValid` | UTC `TDateTime`, milliseconds since 1970 |
| `Latitude`, `Longitude` | degrees |
| `AltitudeMSL`, `AltitudeWGS` | metres |
| `Speed` / `SpeedKmh` | m/s / km/h |
| `Heading` | degrees, 0 = north |
| `GForceX` / `Y` / `Z` | g (X front/back, Y right/left, Z up/down) |
| `GyroX` / `Y` / `Z` | degrees/s (roll, pitch, yaw) |
| `FixStatus`, `NumSV`, `PDOP`, `HorizAccuracy` … | fix quality |
| `HasGoodFix` | 3D fix with the valid-fix flag set; ignore positions when False |

## Sessions

The device stores everything in one memory and writes a state-change record when recording starts, stops
or pauses, so a new session begins at each recording start. As a fallback, a gap of more than
`MaxGapSeconds` (default 300 s) between samples also starts a new session; set it to 0 to turn that off.

## CSV columns

`utc_time, unix_ms, itow_ms, latitude, longitude, alt_msl_m, alt_wgs_m, speed_kmh, speed_ms, heading_deg,
fix, fix_ok, sats, pdop, h_acc_m, v_acc_m, speed_acc_ms, heading_acc_deg, g_x, g_y, g_z, gyro_x_dps,
gyro_y_dps, gyro_z_dps, battery_raw, fix_flags, latlon_flags`

The decimal point is always `.` and times are UTC. `unix_ms` is the easiest column for lining the data up
with other logs.

## Protocol

The library implements the
[RaceBox BLE protocol documentation, revision 9](https://www.racebox.pro/products/mini-micro-protocol-documentation).
