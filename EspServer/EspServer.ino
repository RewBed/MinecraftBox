#include <ESP8266WiFi.h>
#include <WebSocketsServer.h>

WebSocketsServer webSocket = WebSocketsServer(81);

// Replace with your network credentials
const char* ssid     = "SSID";
const char* password = "89313535212";

// Assign output variables to GPIO pins
const int output5 = 0;
const int output4 = 2;

const char* flashLightOn = "flashLight-on";
const char* flashLightOff = "flashLight-off";

void setup() {
  Serial.begin(115200);
  
  // Initialize the output variables as outputs
  pinMode(output5, OUTPUT);
  pinMode(output4, OUTPUT);
  
  // Set outputs to LOW
  digitalWrite(output5, LOW);
  digitalWrite(output4, LOW);

  // Connect to Wi-Fi network with SSID and password
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
   
    Serial.print("Connecting to >>> ");
    Serial.print(ssid);
    Serial.print(" : ");
    Serial.println(WiFi.status());
  }

  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  webSocket.begin();
  webSocket.onEvent(webSocketEvent);
}

void loop() {
  webSocket.loop();
}

void webSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length) {

    switch(type) {
        case WStype_DISCONNECTED:
            Serial.println("Disconnected!");
            break;
        case WStype_CONNECTED:
            {
              // int flashlight = digitalRead(output4);
              
              IPAddress ip = webSocket.remoteIP(num);
              Serial.println("Connected");
            
              if(digitalRead(output4) == 1) {
                webSocket.sendTXT(num, flashLightOn);
              }
              else {
                webSocket.sendTXT(num, flashLightOff);
              }
            }
            break;
        case WStype_TEXT:
            if(String((char*)payload) == String(flashLightOn)) {
              digitalWrite(output4, HIGH);
              webSocket.broadcastTXT(flashLightOn);              
            }
            else if(String((char*)payload) == String(flashLightOff)) {
              digitalWrite(output4, LOW);
              webSocket.broadcastTXT(flashLightOff);              
            }
                    
            Serial.println("From client");
            break;
    }
}