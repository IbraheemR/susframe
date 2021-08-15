# Sus Frame

A picture frame whose image can be changed over the web.

Made using

- ESP32 / Lolin32 Lite
- Adafruit 2.7" Tri-Color ePaper display
- Platform IO
- sveltejs
- Small IKEA picture frame

Run `./copy_web_data.sh` to build the svelte site and copy output to `/data/`. Files can them be uploaded to SPIFFS as normal.

<hr />

Create `src/WifiCredentials.h` to supply wifi credentials.

```
#define WIFI_SSID "epic-wifi"
#define WIFI_PASSWORD "password123"
```

Or comment out the `#include WifiCredentials.h` line to run in access point mode.
