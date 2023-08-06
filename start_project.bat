@REM @REM arrancar mongodb dimoni que s'ha d'executar en segon pla
start cmd.exe /k "cd c:\program files\mongodb\server\5.0\bin && mongod.exe"
@REM @REM obrir API rest
start cmd.exe /k "cd C:\SERGI\TRAINNINGS\UDEMY\MASTER REACT\node\api-rest-node && npm start"
@REM @REM compilar app i que es vagi executant
start cmd.exe /k "cd C:\SERGI\TRAINNINGS\UDEMY\MASTER REACT\015_project03 && npm run dev"


@REM @REM MongoDBCompass
start C:\Users\SERGI\AppData\Local\MongoDBCompass\MongoDBCompass.exe
@REM Postman
start C:\Users\SERGI\AppData\Local\Postman\Postman.exe