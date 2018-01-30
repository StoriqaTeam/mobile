# Storiqa mobile app.

- установите Xcode
- установите `react-native-cli` (`yarn global add react-native-cli`)

- установите зависимости (`yarn`)
- установите зависимости POD (`pod install`)

запуск ios через файл проекта mobile.xcworkspace

*Запуск iOS-версии*
- react-native run-ios


## Trubleshooting

- error: bundling failed: Error: While trying to resolve module `react-native-vector-icons`
    run in terminal `rm ./node_modules/react-native/local-cli/core/__fixtures__/files/package.json`
    проблема началась с версии RN 0.52 ожидаем фиксов

- в любой непонятной ситуевине `watchman watch-del-all && rm -rf node_modules/ && yarn cache clean && yarn install && yarn start -- --reset-cache`

- Native module cannot be null. (нельзя импортировать RN как `import * as RN from 'react-native'`)

- `route 'list' should declare a screen` - непонятная проблема, решилась откатом проекта на билд без POD, сборкой и возвратом, после этого, на последний коммит. По пути чистил node_modules.

### Добавление кастомных шрифтов:

- сгенерировать новый шрифт с помощью http://fontello.com/ для этого можно взять текущий config.json в src/font
- положить сгенерированный fontello.ttf в src/fonts
- для android положить тот же шрифт в android/app/src/main/assets/fonts
