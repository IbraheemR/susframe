#include "Arduino.h"
#include "ESPAsyncWebServer.h"
#include "WiFi.h"
#include "SPIFFS.h"
#include "Adafruit_ThinkInk.h"

#include "WifiCredentials.h"

AsyncWebServer server(80);

#define EPD_ECS 17
#define EPD_DC 16
#define EPD_SRCS 4
#define EPD_RST 0
#define EPD_BUSY 2

ThinkInk_270_Tricolor_C44 display(EPD_DC, EPD_RST, EPD_ECS, EPD_SRCS, EPD_BUSY);

TaskHandle_t WriteDisplayHandle;

void writeDisplay(void * parameter) 
{
  display.clearBuffer();
  display.fillRect(50, 50, 100, 100, EPD_RED);

  display.display();

  vTaskDelete(NULL);
}

void setup()
{
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, LOW);

  Serial.begin(115200);

  display.begin();

  display.setBlackBuffer(0, false);
  display.setColorBuffer(1, false);

  display.clearBuffer();

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
      request->send(200);
      xTaskCreate(writeDisplay, "writeDisplay", 5000, NULL, 2, &WriteDisplayHandle);
    }
  );

  server.serveStatic("/", SPIFFS, "/").setDefaultFile("index.html");

  DefaultHeaders::Instance().addHeader("Access-Control-Allow-Origin", "*");

  server.begin();

  digitalWrite(LED_BUILTIN, HIGH);
}

void loop()
{

}