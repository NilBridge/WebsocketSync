chcp 65001

if exist tmp (
    rd tmp /s
)


md tmp
md "tmp/WebsocketSync"

xcopy src "tmp/WebsocketSync" /s /e /exclude:%cd%\pack.config

cd 7z

7za.exe a ../tmp/WebsocketSync.zip ../tmp/WebsocketSync/*

cd ../tmp

REN WebsocketSync.zip WebsocketSync.llplugin