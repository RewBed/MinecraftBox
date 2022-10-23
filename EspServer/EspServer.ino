#include <ESP8266WiFi.h>
#include <WebSocketsServer.h>
#include <AccelStepper.h>

WebSocketsServer webSocket = WebSocketsServer(81);

// Replace with your network credentials
const char* ssid     = "SSID";
const char* password = "89313535212";

// Assign output variables to GPIO pins
const int rel = D8;

const char* flashLightOn = "flashLight-on";
const char* flashLightOff = "flashLight-off";

// ULN2003 Motor Driver Pins
#define IN1 5
#define IN2 4
#define IN3 14
#define IN4 12

const int stepsPerRevolution = 2048;

// initialize the stepper library
AccelStepper stepper(AccelStepper::HALF4WIRE, IN1, IN3, IN2, IN4);
bool stepperIsMove = false;
float stepperSpeed = 300;

void setup() {
  Serial.begin(115200);

  // set the speed and acceleration
  stepper.setMaxSpeed(500);
  stepper.setAcceleration(100);
  
  // set target position
  // stepper.moveTo(stepsPerRevolution);

  // Initialize the output variables as outputs
  pinMode(rel, OUTPUT);
  
  // Set outputs to LOW
  digitalWrite(rel, LOW);

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
  // check current stepper motor position to invert direction
  /*
  if (stepper.distanceToGo() == 0){
    stepper.moveTo(-stepper.currentPosition());
    Serial.println("Changing direction");
  }
  // move the stepper motor (one step at a time)
  stepper.run();
  */
  
  if(stepperIsMove) {
    stepper.runSpeed();
  }
  
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
            
              if(digitalRead(rel) == 1) {
                webSocket.sendTXT(num, flashLightOn);
              }
              else {
                webSocket.sendTXT(num, flashLightOff);
              }
            }
            break;
        case WStype_TEXT:
            if(String((char*)payload) == String(flashLightOn)) {
              digitalWrite(rel, HIGH);
              webSocket.broadcastTXT(flashLightOn);              
            }
            else if(String((char*)payload) == String(flashLightOff)) {
              digitalWrite(rel, LOW);
              webSocket.broadcastTXT(flashLightOff);              
            }
            else if(String((char*)payload) == "left") {
              Serial.println("left");
              stepper.setSpeed(stepperSpeed);
              stepperIsMove = true;
            }
            else if(String((char*)payload) == "right") {
              Serial.println("left");
              stepper.setSpeed(0 - stepperSpeed);
              stepperIsMove = true;
            }
            else if(String((char*)payload) == "stop") {
              Serial.println("left");
              stepper.setSpeed(0);
              stepperIsMove = false;
            }
                    
            Serial.println("From client");
            break;
    }
}




















