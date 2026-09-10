$c = [System.IO.File]::ReadAllText("index.html", [System.Text.Encoding]::UTF8)

$c = $c -replace 'Тренировка А \(База Верх \+ Ноги\)', 'День А: Ноги, Грудь, Бицепс'
$c = $c -replace 'Наклонный жим 30°, Горизонтальный жим, Жим ногами 45°, Тяга к поясу, Сгибания ног, Махи в стороны, Трицепс.', 'Жим ногами, Разгибания ног, Наклонный жим 30°, Бабочка, Бицепс стоя.'
$c = $c -replace 'Тренировка А \(База\)', 'День А'
$c = $c -replace 'База Верх \+ Ноги', 'Ноги, Грудь, Бицепс'
$c = $c -replace 'Тренировка А', 'День А'

$c = $c -replace 'Тренировка Б', 'День Б'
$c = $c -replace '>Спина \+ Плечи<', '>Спина, Плечи, Трицепс<'

[System.IO.File]::WriteAllText("index.html", $c, (New-Object System.Text.UTF8Encoding($false)))
Write-Host "Replaced index.html"
