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


uint8_t displayData[264 * 176 * 2 / 8];

void writeDisplay(void * parameter) 
{
  uint8_t * data = (uint8_t * ) parameter;

  Serial.println("DATA REVIEVED!");

  for (size_t i = 0; i < 264 * 176 * 2 / 8; i++)
  {

    int pos = i * 4;
    int x = pos % 264;
    int y = pos / 264;

    display.writePixel(x, y, data[i] & 0b11);
    display.writePixel(x+1, y, (data[i] >> 2) & 0b11);
    display.writePixel(x+2, y, (data[i] >> 4) & 0b11);
    display.writePixel(x+3, y, (data[i] >> 6) & 0b11);
  }

  Serial.println("DISPLAYING...");

  display.display();

  Serial.println("DONE!");

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

  DefaultHeaders::Instance().addHeader("Access-Control-Allow-Origin", "*");

  server.on(
    "/image",
    HTTP_POST,
    [](AsyncWebServerRequest * request){
      request->send(200);
    }, 
    NULL, 
    [](AsyncWebServerRequest * request, uint8_t *data, size_t len, size_t index, size_t total) {
      for(size_t i=0; i<len; i++){
        displayData[i+index] = data[i];
      }
      if(index + len == total){
        xTaskCreate(writeDisplay, "writeDisplay", 5000, (void * ) &displayData, 2, &WriteDisplayHandle);
      }
    
    }
  );

  server.serveStatic("/", SPIFFS, "/").setDefaultFile("index.html");


  server.begin();

  digitalWrite(LED_BUILTIN, HIGH);
}

void loop()
{

}