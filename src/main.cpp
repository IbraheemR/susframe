#include "Arduino.h"
#include "ESPAsyncWebServer.h"
#include "WiFi.h"
#include "SPIFFS.h"

#include "WifiCredentials.h"

AsyncWebServer server(80);

void setup()
{
  Serial.begin(115200);

  if (!SPIFFS.begin(true)) {
    Serial.println("SPIFFS error!");
    return;
  }

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.println("Connecting to WiFi...");
    delay(1000);
  }

  Serial.println(WiFi.localIP());

  server.on(
    "/image",
    HTTP_POST,
    [](AsyncWebServerRequest * request){}, 
    NULL, 
    [](AsyncWebServerRequest * request, uint8_t *data, size_t len, size_t index, size_t total) {
      for (size_t i = 0; i < len; i++) {
        Serial.print(data[i]);
      }

      Serial.println();
      
      for (size_t i = 0; i < len; i++) {
        Serial.print(i);
      }

      request->send(200);
    }
  );

  server.serveStatic("/", SPIFFS, "/").setDefaultFile("index.html");

  DefaultHeaders::Instance().addHeader("Access-Control-Allow-Origin", "*");

  server.begin();
}

void loop()
{

}