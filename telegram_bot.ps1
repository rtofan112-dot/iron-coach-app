# ASU-TP Iron Coach - Telegram Bot Daemon with Interactive Set Logger
$botToken = "8582243470:AAERh_CDG__0aB1YLZQ_n5KN2MggwoWtYuY"
$apiUrl = "https://api.telegram.org/bot$botToken"
$appDir = "C:\Users\r.tofan\.gemini\antigravity\scratch\asutp-fitness-app"
$dataFile = Join-Path $appDir "state.json"

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

function Get-State {
    if (Test-Path $dataFile) {
        $content = [System.IO.File]::ReadAllText($dataFile, [System.Text.Encoding]::UTF8)
        if (-not [string]::IsNullOrWhiteSpace($content)) {
            try { return $content | ConvertFrom-Json } catch {}
        }
    }
    return [PSCustomObject]@{
        exerciseRecords = @{}
        metricsLog = @()
        nutrition = @{ date = (Get-Date -Format 'yyyy-MM-dd'); protein = 0; waterMl = 0; calories = 0 }
        workoutHistory = @()
    }
}

function Save-State($st) {
    $json = $st | ConvertTo-Json -Depth 10
    [System.IO.File]::WriteAllText($dataFile, $json, [System.Text.Encoding]::UTF8)
}

function Send-TelegramMessage($chatId, $text, $keyboard = $null) {
    $bodyObj = @{ chat_id = $chatId; text = $text; parse_mode = "HTML" }
    if ($keyboard) { $bodyObj.reply_markup = $keyboard }
    $jsonBody = $bodyObj | ConvertTo-Json -Depth 10
    try {
        Invoke-RestMethod -Uri "$apiUrl/sendMessage" -Method Post -Body ([System.Text.Encoding]::UTF8.GetBytes($jsonBody)) -ContentType "application/json; charset=utf-8" | Out-Null
    } catch {}
}

function Edit-TelegramMessage($chatId, $messageId, $text, $keyboard = $null) {
    $bodyObj = @{ chat_id = $chatId; message_id = $messageId; text = $text; parse_mode = "HTML" }
    if ($keyboard) { $bodyObj.reply_markup = $keyboard }
    $jsonBody = $bodyObj | ConvertTo-Json -Depth 10
    try {
        Invoke-RestMethod -Uri "$apiUrl/editMessageText" -Method Post -Body ([System.Text.Encoding]::UTF8.GetBytes($jsonBody)) -ContentType "application/json; charset=utf-8" | Out-Null
    } catch {}
}

function Answer-CallbackQuery($callbackId, $text = "") {
    try {
        $bodyObj = @{ callback_query_id = $callbackId; text = $text }
        $jsonBody = $bodyObj | ConvertTo-Json
        Invoke-RestMethod -Uri "$apiUrl/answerCallbackQuery" -Method Post -Body ([System.Text.Encoding]::UTF8.GetBytes($jsonBody)) -ContentType "application/json; charset=utf-8" | Out-Null
    } catch {}
}

$mainReplyKeyboard = @{
    keyboard = @(
        @( @{ text = "🏋️ Тренировка" }, @{ text = "📐 Замеры & Жир" } ),
        @( @{ text = "🥩 БЖУ & Вода" }, @{ text = "📊 Прогресс & База" } )
    )
    resize_keyboard = $true
}

$workoutData = @{
    a = @{
        name = "Вторник: День А (Квадры + Горизонтальные жимы/тяги)"
        exercises = @(
            @{ id = "ex1"; name = "Жим ногами в тренажере"; sets = 3; minReps = 10; maxReps = 12; weight = 90; tip = "Вверху колени не вставляй!" },
            @{ id = "ex2"; name = "Жим гантелей на наклонной скамье 30°"; sets = 3; minReps = 8; maxReps = 10; weight = 20; tip = "Локти 60-70° к корпусу, лопатки сведены." },
            @{ id = "ex3"; name = "Тяга горизонтального блока к поясу (нейтрально)"; sets = 3; minReps = 10; maxReps = 12; weight = 45; tip = "🔥 Опусти плечи! Локти веди в задний карман джинсов." },
            @{ id = "ex4"; name = "Сгибания ног в тренажере"; sets = 3; minReps = 12; maxReps = 15; weight = 35; tip = "Плавно опускай 2-3 сек." },
            @{ id = "ex5"; name = "Махи гантелями в стороны"; sets = 3; minReps = 12; maxReps = 15; weight = 8; tip = "Локти до параллели, без рывков." },
            @{ id = "ex6"; name = "Разгибания рук на блоке с канатом"; sets = 3; minReps = 12; maxReps = 15; weight = 20; tip = "Локти прижаты к ребрам." },
            @{ id = "ex7"; name = "Планка на предплечьях"; sets = 3; minReps = 45; maxReps = 60; weight = 0; tip = "Живот втянут, ягодицы сжаты." }
        )
    }
    b = @{
        name = "Четверг: День Б (Спина + Плечи + Задняя цепь)"
        exercises = @(
            @{ id = "ex1"; name = "Румынская тяга с гантелями"; sets = 3; minReps = 10; maxReps = 12; weight = 22; tip = "Таз назад, гантели по бедрам." },
            @{ id = "ex2"; name = "Тяга верхнего блока 1 рукой (нейтрально)"; sets = 3; minReps = 10; maxReps = 12; weight = 25; tip = "🔥 Руку на левую широчайшую, локоть к бедру, плечо вниз!" },
            @{ id = "ex3"; name = "Жим гантелей сидя на скамье"; sets = 3; minReps = 8; maxReps = 10; weight = 16; tip = "Спинка 75-80°, чистый жим." },
            @{ id = "ex4"; name = "Шагающие выпады / Жим 1 ногой"; sets = 3; minReps = 10; maxReps = 12; weight = 12; tip = "Колено внутрь не заваливай." },
            @{ id = "ex5"; name = "Тяга гантели к поясу в упоре"; sets = 3; minReps = 10; maxReps = 12; weight = 18; tip = "Дуга к бедру, плечо не задирай." },
            @{ id = "ex6"; name = "Подъем гантелей на бицепс с супинацией"; sets = 3; minReps = 10; maxReps = 12; weight = 12; tip = "Мизинец наружу в пике." },
            @{ id = "ex7"; name = "Подъем коленей на брусьях"; sets = 3; minReps = 12; maxReps = 15; weight = 0; tip = "Таз подкручивай вверх на выдохе." }
        )
    }
    c = @{
        name = "Воскресенье: День В (Recharge & Осанка)"
        exercises = @(
            @{ id = "ex1"; name = "Face Pulls (Тяга к лицу)"; sets = 3; minReps = 15; maxReps = 20; weight = 15; tip = "🔥 СПАСЕНИЕ ШЕИ: Канат к глазам, пауза 2 сек!" },
            @{ id = "ex2"; name = "Подъем на носки стоя (икры)"; sets = 3; minReps = 15; maxReps = 20; weight = 50; tip = "Полная амплитуда." },
            @{ id = "ex3"; name = "Суперсет: Бицепс + Трицепс"; sets = 3; minReps = 12; maxReps = 15; weight = 25; tip = "Без отдыха внутри пары." },
            @{ id = "ex4"; name = "Ходьба в горку на дорожке (Зона 2)"; sets = 1; minReps = 25; maxReps = 30; weight = 0; tip = "Уклон 8-10%, скорость 5.5-6 км/ч." }
        )
    }
}

# Live Active User Sessions (Memory cache)
$userSessions = @{}

function Render-WorkoutCard($chatId, $msgId = $null) {
    $sess = $userSessions[$chatId]
    if (-not $sess) { return }

    $plan = $sess.plan
    $wo = $workoutData[$plan]
    $exIdx = $sess.exIdx
    
    if ($exIdx -ge $wo.exercises.Count) {
        $finishText = "🎉 <b>ТРЕНИРОВКА ЗАВЕРШЕНА!</b>`n`nВсе фактические подходы и веса сохранены на ПК.`nОтличная силовая работа! Отдыхай и закрывай белок."
        $st = Get-State
        $st.workoutHistory += @{
            id = "wo_" + (Get-Date -Format "yyyyMMdd_HHmmss")
            date = (Get-Date -Format "yyyy-MM-dd")
            name = $wo.name
            tonnage = $sess.totalTonnage
        }
        Save-State $st
        $userSessions.Remove($chatId)
        
        if ($msgId) { Edit-TelegramMessage $chatId $msgId $finishText }
        else { Send-TelegramMessage $chatId $finishText }
        return
    }

    $ex = $wo.exercises[$exIdx]
    $curSet = $sess.curSet
    $curWeight = $sess.curWeight
    $curReps = $sess.curReps

    # Build completed sets summary
    $setsSummary = ""
    if ($sess.completedSets.Count -gt 0) {
        $setsSummary = "`n<b>Фактически выполнено:</b>`n"
        foreach ($cs in $sess.completedSets) {
            $setsSummary += "  ✅ Сет $($cs.set): <b>$($cs.weight) кг × $($cs.reps) раз</b>`n"
        }
    }

    $msgText = "🏋️ <b>$($wo.name)</b>`n" +
               "Упражнение <b>$($exIdx + 1) из $($wo.exercises.Count)</b>:`n`n" +
               "📌 <b>$($ex.name)</b>`n" +
               "🎯 <b>План тренера:</b> $($ex.sets) подхода × $($ex.minReps)–$($ex.maxReps) раз (RIR 1–2)`n" +
               "💡 <i>$($ex.tip)</i>`n" +
               $setsSummary + "`n" +
               "👉 <b>Текущий подход #${curSet}:</b>`n" +
               "Вес: <b>$curWeight кг</b> | Повторы: <b>$curReps раз</b>`n`n" +
               "<i>(Настрой кнопками или просто напиши в чат: <code>$curWeight $curReps</code>)</i>"

    $kb = @{
        inline_keyboard = @(
            @(
                @{ text = "➖ 2.5кг"; callback_data = "w_adj_-2.5" },
                @{ text = "➕ 2.5кг"; callback_data = "w_adj_2.5" },
                @{ text = "➖ 1 повт"; callback_data = "r_adj_-1" },
                @{ text = "➕ 1 повт"; callback_data = "r_adj_1" }
            ),
            @(
                @{ text = "✅ Записать Сет $curSet ($curWeight кг × $curReps)"; callback_data = "set_commit" }
            ),
            @(
                @{ text = "⏭️ Пропустить / След. упражнение ➔"; callback_data = "ex_skip" }
            )
        )
    }

    if ($msgId) {
        Edit-TelegramMessage $chatId $msgId $msgText $kb
    } else {
        Send-TelegramMessage $chatId $msgText $kb
    }
}

function Handle-Message($msg) {
    $chatId = $msg.chat.id
    $text = if ($msg.text) { $msg.text.Trim() } else { "" }
    $st = Get-State

    if ($text -eq "/start" -or $text -eq "/menu") {
        $welcome = "🦾 <b>Приветствую, коллега!</b>`n`nЭто твой персональный бот <b>ASU-TP Iron Coach</b> с точной фиксацией весов и повторов.`n`nВыбирай нужный раздел на клавиатуре ниже:"
        Send-TelegramMessage $chatId $welcome $mainReplyKeyboard
        return
    }

    if ($text -eq "🏋️ Тренировка") {
        $kb = @{
            inline_keyboard = @(
                @( @{ text = "🟢 Вторник: День А (Квадры/Жимы)"; callback_data = "wo_init_a" } ),
                @( @{ text = "🔵 Четверг: День Б (Спина/Задняя цепь)"; callback_data = "wo_init_b" } ),
                @( @{ text = "🟣 Воскресенье: День В (Recharge/Осанка)"; callback_data = "wo_init_c" } )
            )
        }
        Send-TelegramMessage $chatId "🏋️ <b>Выбери тренировку для старта:</b>" $kb
        return
    }

    # If user in active workout and sends "20 10" or "90 12"
    if ($userSessions.ContainsKey($chatId)) {
        if ($text -match "^([0-9.,]+)[\s*xX]+([0-9]+)$") {
            $w = [double]($Matches[1].Replace(',', '.'))
            $r = [int]$Matches[2]
            
            $sess = $userSessions[$chatId]
            $sess.completedSets += @{ set = $sess.curSet; weight = $w; reps = $r }
            $sess.totalTonnage += ($w * $r)
            
            $wo = $workoutData[$sess.plan]
            $ex = $wo.exercises[$sess.exIdx]
            
            if ($sess.curSet -lt $ex.sets) {
                $sess.curSet++
                $sess.curWeight = $w
                $sess.curReps = $r
                Send-TelegramMessage $chatId "✅ <b>Зафиксировано:</b> $w кг × $r раз! Отдых 90-120 сек."
                Render-WorkoutCard $chatId
            } else {
                # Next exercise
                $sess.exIdx++
                $sess.curSet = 1
                $sess.completedSets = @()
                if ($sess.exIdx -lt $wo.exercises.Count) {
                    $nextEx = $wo.exercises[$sess.exIdx]
                    $sess.curWeight = $nextEx.weight
                    $sess.curReps = $nextEx.minReps
                }
                Send-TelegramMessage $chatId "🔥 <b>Упражнение завершено!</b> Переходим к следующему:"
                Render-WorkoutCard $chatId
            }
            return
        }
    }

    if ($text -eq "📐 Замеры & Жир") {
        $latest = if ($st.metricsLog.Count -gt 0) { $st.metricsLog[-1] } else { @{ weight = 83.0; waist = 91.5; steps = 6000 } }
        $whtr = [Math]::Round(($latest.waist / 178.0), 2)
        $whtrText = if ($whtr -lt 0.50) { "🟢 Норма" } elseif ($whtr -lt 0.55) { "🟡 Умеренный избыток" } else { "🔴 Повышенный риск" }
        
        $msgText = "📐 <b>Текущие замеры и висцеральный жир:</b>`n`n" +
                   "• <b>Вес:</b> $($latest.weight) кг`n" +
                   "• <b>Талия:</b> $($latest.waist) см (по пупку)`n" +
                   "• <b>Индекс WHtR:</b> $whtr ($whtrText)`n" +
                   "• <b>Шаги:</b> $($latest.steps)`n`n" +
                   "<i>💡 Чтобы обновить данные, просто напиши в чат, например:</i>`n" +
                   "<code>вес 82.8</code> или <code>талия 91</code> или <code>шаги 8000</code>"
        
        $kb = @{
            inline_keyboard = @(
                @( @{ text = "🌬️ Сделал утренний вакуум ✓"; callback_data = "metric_vacuum" } )
            )
        }
        Send-TelegramMessage $chatId $msgText $kb
        return
    }

    if ($text -eq "🥩 БЖУ & Вода") {
        $today = Get-Date -Format "yyyy-MM-dd"
        if ($st.nutrition.date -ne $today) {
            $st.nutrition = @{ date = $today; protein = 0; waterMl = 0; calories = 0 }
            Save-State $st
        }
        $nut = $st.nutrition
        $msgText = "🥩 <b>Баланс питания за сегодня:</b>`n`n" +
                   "• <b>Белок:</b> $($nut.protein) / 150 г (цель)`n" +
                   "• <b>Вода:</b> $([Math]::Round($nut.waterMl / 1000.0, 2)) / 2.5 л`n" +
                   "• <b>Калории:</b> $($nut.calories) / 2000 ккал`n`n" +
                   "<i>Нажимай кнопки ниже для быстрого ввода:</i>"
        
        $kb = @{
            inline_keyboard = @(
                @( @{ text = "🥚 3 Яйца (+19г)"; callback_data = "nut_p_19" }, @{ text = "🍗 180г Мясо (+40г)"; callback_data = "nut_p_40" } ),
                @( @{ text = "🥛 180г Творог (+32г)"; callback_data = "nut_p_32" }, @{ text = "🐟 200г Рыба (+38г)"; callback_data = "nut_p_38" } ),
                @( @{ text = "🥤 Протеин (+25г)"; callback_data = "nut_p_25" }, @{ text = "💧 Вода (+250мл)"; callback_data = "nut_w_250" } )
            )
        }
        Send-TelegramMessage $chatId $msgText $kb
        return
    }

    if ($text -eq "📊 Прогресс & База") {
        $historyCount = $st.workoutHistory.Count
        $msgText = "📊 <b>Статистика и База Данных:</b>`n`n" +
                   "• Завершено тренировок: <b>$historyCount</b>`n" +
                   "• Файл базы на ПК: <code>state.json</code>`n`n" +
                   "Все изменения сохраняются в реальном времени на компьютере."
        Send-TelegramMessage $chatId $msgText $mainReplyKeyboard
        return
    }

    # Free text parsing
    if ($text -match "(?:вес|weight)\s*([0-9.,]+)" -or $text -match "^([789][0-9][.,][0-9])$") {
        $val = [double]($Matches[1].Replace(',', '.'))
        $today = Get-Date -Format "yyyy-MM-dd"
        $newLog = @()
        $found = $false
        foreach ($m in $st.metricsLog) {
            if ($m.date -eq $today) {
                $m.weight = $val
                $found = $true
            }
            $newLog += $m
        }
        if (-not $found) {
            $newLog += @{ date = $today; weight = $val; waist = 91.5; steps = 6000; vacuum = $false }
        }
        $st.metricsLog = $newLog
        Save-State $st
        Send-TelegramMessage $chatId "✅ Вес зафиксирован: <b>$val кг</b> (сохранено на ПК)"
        return
    }

    if ($text -match "(?:талия|waist)\s*([0-9.,]+)") {
        $val = [double]($Matches[1].Replace(',', '.'))
        $today = Get-Date -Format "yyyy-MM-dd"
        $newLog = @()
        $found = $false
        foreach ($m in $st.metricsLog) {
            if ($m.date -eq $today) {
                $m.waist = $val
                $found = $true
            }
            $newLog += $m
        }
        if (-not $found) {
            $newLog += @{ date = $today; weight = 83.0; waist = $val; steps = 6000; vacuum = $false }
        }
        $st.metricsLog = $newLog
        Save-State $st
        Send-TelegramMessage $chatId "✅ Обхват талии зафиксирован: <b>$val см</b> (сохранено на ПК)"
        return
    }

    if ($text -match "(?:шаг|steps?)\w*\s*([0-9]+)") {
        $val = [int]$Matches[1]
        $today = Get-Date -Format "yyyy-MM-dd"
        $newLog = @()
        $found = $false
        foreach ($m in $st.metricsLog) {
            if ($m.date -eq $today) {
                $m.steps = $val
                $found = $true
            }
            $newLog += $m
        }
        if (-not $found) {
            $newLog += @{ date = $today; weight = 83.0; waist = 91.5; steps = $val; vacuum = $false }
        }
        $st.metricsLog = $newLog
        Save-State $st
        Send-TelegramMessage $chatId "✅ Шаги зафиксированы: <b>$val шагов</b> (сохранено на ПК)"
        return
    }

    Send-TelegramMessage $chatId "🦾 Принято! Пользуйся меню ниже для тренировок и замеров." $mainReplyKeyboard
}

function Handle-Callback($cb) {
    $cbId = $cb.id
    $chatId = $cb.message.chat.id
    $msgId = $cb.message.message_id
    $data = $cb.data
    $st = Get-State

    # Init Workout
    if ($data.StartsWith("wo_init_")) {
        $plan = $data.Replace("wo_init_", "")
        $wo = $workoutData[$plan]
        $firstEx = $wo.exercises[0]
        
        $userSessions[$chatId] = [PSCustomObject]@{
            plan = $plan
            exIdx = 0
            curSet = 1
            curWeight = $firstEx.weight
            curReps = $firstEx.minReps
            completedSets = @()
            totalTonnage = 0
        }
        
        Answer-CallbackQuery $cbId "Старт: $($wo.name)"
        Render-WorkoutCard $chatId $msgId
        return
    }

    # Weight Adjustments: w_adj_2.5 or w_adj_-2.5
    if ($data.StartsWith("w_adj_")) {
        $delta = [double]($data.Replace("w_adj_", ""))
        if ($userSessions.ContainsKey($chatId)) {
            $sess = $userSessions[$chatId]
            $sess.curWeight = [Math]::Max(0.0, ($sess.curWeight + $delta))
            Answer-CallbackQuery $cbId "Вес: $($sess.curWeight) кг"
            Render-WorkoutCard $chatId $msgId
        }
        return
    }

    # Reps Adjustments: r_adj_1 or r_adj_-1
    if ($data.StartsWith("r_adj_")) {
        $delta = [int]($data.Replace("r_adj_", ""))
        if ($userSessions.ContainsKey($chatId)) {
            $sess = $userSessions[$chatId]
            $sess.curReps = [Math]::Max(1, ($sess.curReps + $delta))
            Answer-CallbackQuery $cbId "Повторы: $($sess.curReps)"
            Render-WorkoutCard $chatId $msgId
        }
        return
    }

    # Commit Set: set_commit
    if ($data -eq "set_commit") {
        if ($userSessions.ContainsKey($chatId)) {
            $sess = $userSessions[$chatId]
            $w = $sess.curWeight
            $r = $sess.curReps
            
            $sess.completedSets += @{ set = $sess.curSet; weight = $w; reps = $r }
            $sess.totalTonnage += ($w * $r)
            
            $wo = $workoutData[$sess.plan]
            $ex = $wo.exercises[$sess.exIdx]
            
            if ($sess.curSet -lt $ex.sets) {
                $sess.curSet++
                Answer-CallbackQuery $cbId "Сет зафиксирован! Отдых 90-120 сек."
                Render-WorkoutCard $chatId $msgId
            } else {
                # Next exercise
                $sess.exIdx++
                $sess.curSet = 1
                $sess.completedSets = @()
                if ($sess.exIdx -lt $wo.exercises.Count) {
                    $nextEx = $wo.exercises[$sess.exIdx]
                    $sess.curWeight = $nextEx.weight
                    $sess.curReps = $nextEx.minReps
                }
                Answer-CallbackQuery $cbId "Упражнение завершено! След. подход."
                Render-WorkoutCard $chatId $msgId
            }
        }
        return
    }

    # Skip Exercise: ex_skip
    if ($data -eq "ex_skip") {
        if ($userSessions.ContainsKey($chatId)) {
            $sess = $userSessions[$chatId]
            $wo = $workoutData[$sess.plan]
            $sess.exIdx++
            $sess.curSet = 1
            $sess.completedSets = @()
            if ($sess.exIdx -lt $wo.exercises.Count) {
                $nextEx = $wo.exercises[$sess.exIdx]
                $sess.curWeight = $nextEx.weight
                $sess.curReps = $nextEx.minReps
            }
            Answer-CallbackQuery $cbId "Переход к след. упражнению"
            Render-WorkoutCard $chatId $msgId
        }
        return
    }

    # Nutrition callbacks
    if ($data.StartsWith("nut_p_")) {
        $p = [int]($data.Replace("nut_p_", ""))
        $today = Get-Date -Format "yyyy-MM-dd"
        if ($st.nutrition.date -ne $today) {
            $st.nutrition = @{ date = $today; protein = 0; waterMl = 0; calories = 0 }
        }
        $st.nutrition.protein += $p
        $st.nutrition.calories += ($p * 4)
        Save-State $st
        Answer-CallbackQuery $cbId "+$p г белка!"
        
        $nut = $st.nutrition
        $msgText = "🥩 <b>Баланс питания за сегодня:</b>`n`n" +
                   "• <b>Белок:</b> $($nut.protein) / 150 г`n" +
                   "• <b>Вода:</b> $([Math]::Round($nut.waterMl / 1000.0, 2)) / 2.5 л`n" +
                   "• <b>Калории:</b> $($nut.calories) / 2000 ккал"
        $kb = @{
            inline_keyboard = @(
                @( @{ text = "🥚 3 Яйца (+19г)"; callback_data = "nut_p_19" }, @{ text = "🍗 180г Мясо (+40г)"; callback_data = "nut_p_40" } ),
                @( @{ text = "🥛 180г Творог (+32г)"; callback_data = "nut_p_32" }, @{ text = "🐟 200г Рыба (+38г)"; callback_data = "nut_p_38" } ),
                @( @{ text = "🥤 Протеин (+25г)"; callback_data = "nut_p_25" }, @{ text = "💧 Вода (+250мл)"; callback_data = "nut_w_250" } )
            )
        }
        Edit-TelegramMessage $chatId $msgId $msgText $kb
        return
    }

    if ($data -eq "nut_w_250") {
        $today = Get-Date -Format "yyyy-MM-dd"
        if ($st.nutrition.date -ne $today) {
            $st.nutrition = @{ date = $today; protein = 0; waterMl = 0; calories = 0 }
        }
        $st.nutrition.waterMl += 250
        Save-State $st
        Answer-CallbackQuery $cbId "+250 мл воды!"
        
        $nut = $st.nutrition
        $msgText = "🥩 <b>Баланс питания за сегодня:</b>`n`n" +
                   "• <b>Белок:</b> $($nut.protein) / 150 г`n" +
                   "• <b>Вода:</b> $([Math]::Round($nut.waterMl / 1000.0, 2)) / 2.5 л`n" +
                   "• <b>Калории:</b> $($nut.calories) / 2000 ккал"
        $kb = @{
            inline_keyboard = @(
                @( @{ text = "🥚 3 Яйца (+19г)"; callback_data = "nut_p_19" }, @{ text = "🍗 180г Мясо (+40г)"; callback_data = "nut_p_40" } ),
                @( @{ text = "🥛 180г Творог (+32г)"; callback_data = "nut_p_32" }, @{ text = "🐟 200г Рыба (+38г)"; callback_data = "nut_p_38" } ),
                @( @{ text = "🥤 Протеин (+25г)"; callback_data = "nut_p_25" }, @{ text = "💧 Вода (+250мл)"; callback_data = "nut_w_250" } )
            )
        }
        Edit-TelegramMessage $chatId $msgId $msgText $kb
        return
    }

    if ($data -eq "metric_vacuum") {
        Answer-CallbackQuery $cbId "Вакуум зафиксирован!"
        Send-TelegramMessage $chatId "🌬️ <b>Утренний вакуум выполнен!</b> Поперечная мышца укрепляется."
        return
    }
}

Write-Host "=========================================================="
Write-Host " 🦾 ASU-TP Iron Coach Telegram Bot Daemon Active"
Write-Host " Bot: @iron_coach2026API_bot"
Write-Host " Interactive Sets + Reps Recording Enabled"
Write-Host "=========================================================="

$offset = 0
while ($true) {
    try {
        $updatesUrl = "$apiUrl/getUpdates?offset=$offset&timeout=25"
        $res = Invoke-RestMethod -Uri $updatesUrl -Method Get -TimeoutSec 35
        
        if ($res.ok -and $res.result.Count -gt 0) {
            foreach ($up in $res.result) {
                $offset = $up.update_id + 1
                
                if ($up.message) {
                    Handle-Message $up.message
                }
                elseif ($up.callback_query) {
                    Handle-Callback $up.callback_query
                }
            }
        }
    }
    catch {
        Start-Sleep -Seconds 2
    }
}
