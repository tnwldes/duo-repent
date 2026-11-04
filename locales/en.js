/* English dictionary. HTML inside strings is allowed only in this file; {name} placeholders are escaped. */
window.DUO_LOCALES = window.DUO_LOCALES || {};
window.DUO_LOCALES.en = {
  meta: {
    title: 'DUO REPENT — Try the iPhone Duo’s downsides',
    desc: 'Try the iPhone Duo’s downsides before you buy one. An unofficial simulation that runs in the phone browser you already have.',
    dateLocale: 'en-US'
  },
  common: { close: 'Close', back: 'Back', on: 'On', off: 'Off' },
  lang: { label: 'Language', ko: '한국어', en: 'English' },

  intro: {
    eyebrow: 'DUO REPENT · UNOFFICIAL SIMULATION',
    h1: 'DUO REPENT',
    tagline: 'The ₩3.29M ($1,999 in the US) iPhone Duo — try its downsides before you buy',
    lead: 'Your current phone screen becomes an iPhone Duo. While you use chat, banking, video and the browser as usual, <b>every downside reviewers pointed out is switched on from the start.</b> No need to tap through them one by one — just use it.',
    start: 'Start Duo mode',
    list: [
      ['📕', 'Folded', 'The short 5.4″ outer screen. Bring up the real keyboard and see how little is left'],
      ['📖', 'Unfolded', 'Rotate your phone sideways for the 7.6″ inner screen. Black bars on unoptimized apps, a crack at the fold, menus pushed to the right'],
      ['📸', 'Screenshots', 'The black bars get captured too. Send one in chat, open it, capture again — the bars stack up'],
      ['🖼️', 'Your own screenshots', 'Load a real app screenshot from your phone and see it on the Duo screen (processed only on your device)'],
      ['☝️', 'Unlock · one hand', 'No Face ID — only the side-button fingerprint unlocks it. Unfolded, parts of the screen are out of thumb reach'],
      ['🌡️', 'Heat · hazy blacks · 254 g', 'Heat while watching video, raised blacks on the matte screen, and the weight difference from your phone']
    ],
    how: '<b>📱 How to use</b> — Hold your phone <b>upright</b> for the folded outer screen; turn it <b>sideways</b> to switch to the unfolded inner screen automatically. If rotation lock is on, or you’re on a computer, use the <b>📖 button</b>. The <b>☰</b> menu has the experience list, effect switches and help.',
    priceH: '💸 For the price of one Duo',
    priceSub: 'Change the storage to recalculate',
    disc: 'An unofficial simulation, not affiliated with Apple. Screen ratios and weight are approximations from published specs; unlock speed, heat and screen texture are dramatized from reviews. Because this is a web page, it can’t appear on top of your real chat app or any other app — it only works inside the look-alike demo apps and screenshots you load yourself. Prices are Korean retail prices in won.'
  },

  rail: {
    pwr: 'Touch', pwrLabel: 'Side button (hold to unlock with fingerprint, tap to turn screen off)',
    unfold: 'Unfold', fold: 'Fold', foldLabelU: 'Unfold (manual)', foldLabelF: 'Fold (manual)',
    snap: 'Capture', snapLabel: 'Take a screenshot',
    home: 'Home', homeLabel: 'Go to home screen',
    weightLabel: 'Weight 254 g — compare with your phone',
    menu: 'Menu', menuLabel: 'Menu: experiences, effects, help, language',
    exit: 'Exit', exitLabel: 'Leave Duo mode'
  },

  mbar: {
    folded: '📕 Folded 5.4″', unfolded: '📖 Open 7.6″',
    auto: '🔄 Auto', manual: '✋ Manual',
    autoLabel: 'Auto switching on — rotate your phone to fold or unfold',
    manualLabel: 'Manual mode — tap to go back to auto switching',
    freeT: 'Free play', freeTip: 'All downsides are on · pick an experience from ☰',
    rotate: '🔄 Turn your phone <b>sideways</b> for the real proportions',
    list: '☰ List',
    needU: 'This one is for the <b>unfolded</b> screen — rotate sideways or tap 📖',
    needF: 'This one is for the <b>folded</b> screen — hold upright or tap 📕'
  },

  lock: {
    hint: '🔒 Press and hold the side button <b>⏻</b>',
    noFace: '🙅 No Face ID — tapping the screen or looking at it won’t unlock it<br><b>Press and hold the ⏻ side button</b>',
    reading: 'Reading fingerprint…',
    fail: '<b style="color:#ff5a5f">Fingerprint not recognized</b><br>Dry your finger and try again',
    tooFast: 'You lifted your finger too soon<br><b>Keep it resting on ⏻</b>',
    off: 'Screen off · press ⏻ to wake'
  },

  toast: {
    start: 'This is the folded Duo. First <b>press and hold ⏻</b> to unlock',
    startU: 'This is the unfolded Duo. First <b>press and hold ⏻</b> to unlock',
    unlockFirst: 'Unlock with ⏻ first',
    foldedLand: 'The folded screen is meant to be held <b>upright</b>',
    unfoldLand: 'Unfolded. The crease, hazy blacks and the crack are all on',
    unfoldPortrait: 'Unfolded · rotate your phone <b>sideways</b> for the real proportions',
    autoFold: 'Held upright — <b>folded</b>',
    autoUnfold: 'Turned sideways — <b>unfolded</b>',
    manualOn: '<b>Manual mode</b> — rotating your phone won’t change it now<br>Tap ✋ Manual below to go back to auto',
    autoOn: '<b>Auto switching</b> — upright folds, sideways unfolds',
    screenOff: 'The screen is off',
    capBars: 'Captured <b>with the black bars</b><br>Tap ＋ in chat to send it',
    capNested: 'A screenshot of a screenshot — <b>the bars stack up</b><br>Send it, open it and capture again',
    capCrack: 'Captured · the crack is physical damage, so it isn’t in the screenshot',
    capOk: 'Captured · find it in Photos and under ＋ in chat',
    heat: '🌡️ The back is getting warm<br><span style="color:#aaa">Reviewers flagged heat during video and recording</span>',
    nope: 'This button is just for show',
    rightui: 'All the menus are on the <b>right</b><br>Hold it in your left hand and your thumb can’t reach',
    zoom: 'No telephoto lens — zoom stops at <b>2× (crop)</b>',
    web: 'This is a demo browser — it can’t open real sites',
    sendHint: 'Tap the photo to open it, then 📸 capture again',
    reach: '☝️ <b>Your thumb can’t reach</b><br>Holding the open Duo in one hand, you can’t tap here',
    hintNone: '<b>{name}</b> hasn’t been updated for the Duo yet,<br>so it stays phone-sized with black bars on both sides',
    hintHalf: 'This app is only half-optimized, so <b>a black band</b> remains on one side',
    hintSafari: 'Buttons are pushed to the <b>right</b>, shrinking the reading area',
    lockSkipped: 'Skipped the lock screen · the unlock experience is first in the list',
    weightHeavier: '<b>{g} g</b> heavier than the phone in your hand<br>like taping {coins} ₩500 coins to the back',
    weightLighter: 'Your current phone is heavier',
    weightPick: 'Pick your phone in Settings<br>to see the weight difference',
    fxOff: 'This effect is off · turn it on under ☰ Effects'
  },

  apps: { talk: 'Chat', bank: 'Bank', video: 'Video', web: 'Browser', photos: 'Photos', memo: 'Notes', camera: 'Camera', settings: 'Settings', price: 'Price', shot: 'My Shot' },

  talk: {
    title: 'Team chat', placeholder: 'Message', send: 'Send', attach: 'Send a photo',
    shots: 'Your screenshots', noShots: 'No screenshots yet.<br>Use the 📸 button on the side to capture the screen.', photo: 'Photo',
    msgs: ['We’re meeting at 3 today, right?', 'Yep, I’ll upload the slides', 'Wait, I heard you got that foldable iPhone', 'So how is it?'],
    replies: ['lol really?', 'Heard the screen is cramped, is it ok?', 'Must be roomy when it’s open', '₩3.29M… I’ll pass', 'Isn’t it heavy?', 'Send me a screenshot', 'Oh that’s neat', 'What are those black bars lol', 'Saw an article about the cracks', 'ok see ya']
  },
  bank: {
    title: 'My account', account: 'Checking', transfer: 'Transfer', history: 'History', recent: 'Recent activity',
    tx: ['Starbucks', 'Taxi', 'Salary', 'Convenience store', 'Phone bill', 'Food delivery']
  },
  video: {
    title: 'Video', playing: 'Playing · Night Sky 4K', idle: 'Night Sky 4K · tap to play', views: '120K views',
    list: ['Matte vs glossy screens in dark scenes', 'Durability test: 3 foldables', 'Café vlog', 'City night timelapse']
  },
  web: {
    headline: '“Six months with the foldable iPhone”', meta: 'Tech Magazine · 3 min read',
    body: 'The wide inner screen is a clear advantage. But every app uses that space differently, so the area you can actually read varies a lot even on the same screen. ',
    home: 'Home'
  },
  photos: { title: 'Photos', shot: 'Screenshot {n}', empty: 'Your screenshots collect here.<br>Use 📸 on the side to capture the screen.', del: 'Delete', share: 'Share' },
  memo: {
    title: 'Notes', head: 'Duo test notes',
    body: 'Apple’s own apps fill the whole unfolded screen. This is what you saw in the ads.<br><br>But every menu button is on the right. Try tapping them while holding it in your left hand.',
    list: ['Duo test notes', 'Groceries', 'Meeting agenda', 'Trip prep']
  },
  camera: { crop: '2× crop zoom (not telephoto)', home: '‹ Home', shutter: 'Shutter' },
  settings: {
    title: 'Settings', secExp: 'Experience', secFx: 'Screen effects', secWeight: 'Weight · iPhone Duo 254 g', secAbout: 'About this phone',
    side: ['Experience', 'Screen effects', 'Weight', 'About'],
    wet: '💧 Wet or sweaty finger', wetSub: '(more failures)', delay: 'Fingerprint read time', sec: '{v}s',
    pick: 'Choose your phone', heavier: '<b style="color:#e5484d">+{g} g</b> · heavier by about {coins} ₩500 coins',
    lighter: 'Your phone is as heavy or heavier', pickHint: 'Choose your phone to compare',
    coinTip: 'To really feel it, tape {coins} coins to the back of your phone for half a day.',
    specNote: 'Weights are manufacturer specs (without case)',
    specs: [['Price', 'From ₩3,290,000 (256GB) · $1,999 in the US'], ['SIM', 'eSIM only'], ['Camera', 'Main + ultra-wide (no telephoto)'], ['Unlock', 'Side-button Touch ID (no Face ID)'], ['Weight', '254 g'], ['Screens', 'Outer 5.4″ · Inner 7.6″']],
    reset: 'Restart the experience'
  },

  shot: {
    title: 'My Shot',
    emptyT: 'Put a real app screen from your phone onto the Duo',
    emptyD: 'Take a normal screenshot of a chat, social or banking app, then load it here. Folded, the top and bottom get cut off; unfolded, black bars appear.',
    pick: '🖼️ Choose a screenshot',
    privacy: 'Your image is processed only inside this browser on this device. It is never uploaded or saved, and it disappears when you close the page.',
    note: 'This is a visual simulation that applies Duo screen conditions to your image — it does not change the real app.',
    another: 'Another', clear: 'Remove',
    mBars: 'Black bars (unoptimized app)', mFit: 'Fit width (scaled-up app)',
    tagFolded: 'Outer screen · what fits at once at your phone’s width', cut: 'Visible down to here · scroll for the rest',
    tagBars: 'Unoptimized app · phone-sized with black bars', tagFit: 'Width-stretched app · bigger text, less content per screen',
    err: 'Couldn’t open that image. Please choose a JPG, PNG, WebP or (where supported) HEIC file.',
    loading: 'Loading…',
    added: 'Loaded · compare with 📖 Unfold / Fold<br>It’s also in Photos and under ＋ in chat'
  },

  price: {
    title: 'Duo price check',
    head: 'One iPhone Duo {label} at <b>{price}</b> buys you',
    th1: 'Compared with', th2: 'How many',
    note: 'Prices checked on November 3, 2026 (Korean retail, in won). Dollar prices were converted at the October 26, 2026 rate (US$1 ≈ ₩{fx}). GPU and CPU prices change daily. Dollar figures in parentheses are approximate conversions.',
    items: {
      coffee: ['Starbucks Americano (tall)', 'Starbucks Korea, tall size'],
      jjm: ['Jajangmyeon (black-bean noodles)', 'Seoul average · Aug 2025'],
      wage: ['Hours at minimum wage', 'Korea’s 2026 hourly minimum wage'],
      netflix: ['Netflix Premium', 'Monthly · 4K, no ads'],
      claude: ['Claude Pro', '$20/month converted · tax may apply'],
      cpu: ['CPU Ryzen 7 9800X3D', 'Korean retail ₩720,000 (Aug 2026)'],
      gpu1: ['GPU RTX 5070 Ti', 'Danawa lowest ₩1.85M (10/27)'],
      gpu2: ['GPU RTX 5090', 'Danawa lowest ₩11.19M (10/27)'],
      ip18: ['iPhone 18 Pro 256GB', 'Korean retail price'],
      fold8: ['Galaxy Z Fold8 256GB', 'Korean retail price'],
      repair: ['Duo inner screen repair', '$999 without AppleCare+, converted']
    },
    units: { cup: ['cup', 'cups'], bowl: ['bowl', 'bowls'], hour: ['hour', 'hours'], month: ['month', 'months'], ea: ['unit', 'units'], card: ['card', 'cards'], phone: ['phone', 'phones'], time: ['repair', 'repairs'] },
    fmt: {
      months: (m, y, r) => [`${m.toLocaleString('en-US')} months`, `${y ? y + (y === 1 ? ' year ' : ' years ') : ''}${r ? r + (r === 1 ? ' month' : ' months') : ''} of subscription`],
      hours: (h, w) => [`${h.toLocaleString('en-US')} hours`, `about ${w} weeks of 40-hour work`],
      under: (q, u, x) => [`${q} ${u[0]}`, `one ${u[0]} costs ${x}× a Duo`],
      count: (n, u) => `${n.toLocaleString('en-US')} ${n === 1 ? u[0] : u[1]}`,
      daily: (y, mo) => `one a day for about ${y ? y + (y === 1 ? ' year ' : ' years ') : ''}${mo} months`,
      left: (s) => `with ${s} left over`,
      repair: (p) => `one crack costs ${p}% of the Duo`
    }
  },

  panel: {
    title: 'DUO REPENT', tabs: { exp: 'Experiences', fx: 'Effects', help: 'Help' },
    expIntro: 'Pick one to jump to the right app. The bar at the bottom shows what you are testing right now.',
    fxIntro: 'These effects are shared by every demo app. Toggle them to compare. Your choices are saved on this device.',
    scopeU: 'Unfolded', scopeB: 'Folded & unfolded', notCaptured: 'Not in screenshots'
  },

  exps: {
    lock:    ['☝️', 'Side-button fingerprint', 'No Face ID. Tapping the screen won’t unlock it — you have to hold ⏻.', 'Hold ⏻ · turn on “wet finger” in Settings for more failures'],
    keyboard:['⌨️', 'Folded screen + keyboard', 'When the real keyboard comes up on the 5.4″ outer screen, only a few lines of chat are left.', 'Hold it upright and tap the message box'],
    compat:  ['⬛', 'Black bars on unoptimized apps', 'Apps that haven’t been updated, like banking and chat, stay phone-sized even when unfolded.', 'Turn sideways to unfold'],
    capture: ['📸', 'Stacking screenshot bars', 'Screenshots include the black bars — send, open and capture again and they stack.', '📸 capture → send with ＋ → open the photo → 📸 again'],
    web:     ['🧭', 'Right-heavy browser', 'Buttons crowd a column on the right, shrinking the reading area.', 'Unfold and see how much text fits'],
    video:   ['▶️', 'Video band + heat', 'A half-optimized video app leaves a black band on one side and heats up on long playback.', 'Tap the video to play and watch the temperature'],
    camera:  ['📷', 'No telephoto camera', '2× is a crop of the main sensor, and there’s nothing beyond it.', 'Try 2×, 3× and 5×'],
    onehand: ['🤚', 'One-handed use', 'Held in one hand, the open Duo puts the right-side menus and top area out of thumb reach.', 'Tap the red area · change hand under Effects'],
    crease:  ['💥', 'Crease · crack · hazy blacks', 'The L-shaped crack reported at launch, raised blacks on the matte screen, and the crease seen at an angle.', 'Toggle them one by one under Effects'],
    shot:    ['🖼️', 'Use your own screenshot', 'How a real app screen from your phone would look on the Duo.', 'Choose a screenshot → compare folded and unfolded'],
    weight:  ['⚖️', '254 g of weight', 'The heaviest iPhone ever. See the difference from your phone in ₩500 coins.', 'Choose your phone in Settings'],
    price:   ['💸', 'The price of one Duo', 'What else ₩3.29M could buy.', 'Try different storage sizes']
  },

  fx: {
    bars:    ['⬛', 'Black bars on unoptimized apps', 'Unfolded, apps that haven’t been updated stay phone-sized with black bars'],
    rightui: ['👉', 'Right-heavy menus', 'Unfolded, buttons crowd a column on the right (off = bottom row)'],
    crease:  ['〰️', 'Crease', 'A vertical crease down the middle (barely visible head-on)'],
    distort: ['🌀', 'Crease distortion', 'The shimmer near the fold when viewed at an angle (exaggerated)'],
    haze:    ['🌫️', 'Hazy blacks', 'The nano-texture matte coating makes blacks look slightly raised'],
    crack:   ['💥', 'Crack', 'The L-shaped crack reported at launch (vertical line + white line to the right)'],
    reach:   ['🤚', 'One-hand thumb reach', 'Unfolded, taps outside your thumb’s reach do nothing'],
    heat:    ['🌡️', 'Heat', 'Temperature rises during long video playback'],
    deadL: 'Out of thumb reach', okL: 'Thumb reach',
    hand:    'Holding hand', handL: 'Left', handR: 'Right'
  },

  help: {
    h: 'Duo downsides that are on right now',
    paras: [
      '🔄 <b>Fold and unfold</b>: Hold it upright for the folded outer screen; turn it sideways and it switches to the unfolded inner screen. Tapping 📖 switches to manual mode; tap ✋ Manual in the bottom bar to go back to auto. Your open app, chat and photos stay as they are when you switch.',
      '📕 <b>Outer screen</b>: 5.4″, about 1.46:1 tall. Calculated as 90% of the iPhone 18 Pro’s screen area; only the proportions are recreated at your phone’s width.',
      '📖 <b>Inner screen</b>: 7.6″, 1.422:1. The vertical crease is barely visible head-on. The crack is the L-shaped crack reported right after launch (a vertical line on the crease + a white line running to the right edge); you can turn it off under ☰ Effects.',
      '⬛ <b>Unoptimized apps</b>: Chat and banking stay portrait-phone-sized with black bars on both sides when unfolded, video leaves a black band on one side, and the browser loses reading space to buttons pushed to the right. Only Apple’s own apps (Photos, Notes, Settings, Camera) fill the screen.',
      '📸 <b>Screenshots</b>: The black bars are saved too. Send one with ＋ in chat, open it and capture again to watch the bars stack.',
      '🖼️ <b>Your own screenshots</b>: Load an app screenshot from your phone and apply folded/unfolded conditions. The image never leaves your device.',
      '☝️ <b>Unlock</b>: No Face ID, so tapping or looking at the screen won’t unlock it. You have to hold the ⏻ side button. A short press turns the screen off.',
      '🤚 <b>One-handed use</b>: Holding the open Duo in one hand, your thumb covers only part of the screen. Turn on “One-hand thumb reach” under ☰ Effects and taps outside it do nothing.',
      '🌗 <b>Nano-texture</b>: The unfolded screen has a matte coating, so blacks look slightly hazy (in exchange for fewer reflections outdoors).',
      '🌡️ <b>Heat</b>: Keep a video playing and the temperature in the status bar climbs. Based on reviews saying the back gets quite hot during recording, FaceTime and some apps.',
      '📷 <b>Camera</b>: There’s no telephoto lens, so 2× is cropped from the main sensor and there’s no optical zoom beyond that.',
      '💸 <b>Price check</b>: The “Price” app on the home screen shows how much coffee, GPUs, Claude Pro and more you could buy for the price of a Duo. It’s an unoptimized app too, so it gets black bars when unfolded.',
      '⚖️ <b>Weight</b>: At 254 g it’s the heaviest iPhone ever, 53 g heavier than the Galaxy Z Fold8 (201 g). Pick your phone in Settings to see the difference in ₩500 coins.'
    ],
    extra: 'Other things a screen can’t recreate: the price (from ₩3.29M / $1,999), eSIM only, MagSafe accessory compatibility, debris in the hinge, and reports of a $999 inner-screen repair without AppleCare+.',
    limitsH: '🚫 What a web page can’t do',
    limits: [
      'It can’t overlay effects on, or control, real apps like your chat, YouTube or banking apps.',
      'It can’t change your phone’s real resolution or aspect ratio — it only recreates the proportions inside this page.',
      'It can’t grab other apps’ screens live. Loading a screenshot you took yourself is the only way.',
      'iPhone Safari doesn’t support orientation lock, full screen or vibration. If rotation lock is on, use the 📖 button.',
      'Adding it to your home screen just opens it in its own window — it still can’t appear over other apps.',
      'You can’t actually feel the weight or heat, so they’re shown with numbers and effects.'
    ],
    srcH: 'Sources', priceSrcH: 'Price sources',
    sources: [
      ['https://futurechosun.com/archives/159864', 'Future Chosun – launch, price, specs (Korean)'],
      ['https://www.coxnews.co.kr/news/articleView.html?idxno=6502', 'Cox News – “crackgate” L-shaped crack (Korean)'],
      ['https://www.ddaily.co.kr/page/view/2026102409515538809', 'Digital Daily – crackgate & repair cost (Korean)'],
      ['https://www.news1.kr/it-science/general-it/6338986', 'News1 – Apple acknowledges screen issue (Korean)'],
      ['https://weibo.com/2/detail/5360782875561547', 'Weibo – stacking black bars in screenshots'],
      ['https://www.tomsguide.com/phones/iphones/polished-but-rough-the-common-flaws-in-the-iphone-duo-found-by-nine-different-reviewers', 'Tom’s Guide – flaws found by nine reviewers'],
      ['https://www.cnn.com/2026/10/21/tech/apple-iphone-duo-review', 'CNN – iPhone Duo review'],
      ['https://www.clien.net/service/board/use/19283778', 'Clien – user impressions (Korean)'],
      ['https://www.fmkorea.com/best/10470626639', 'FM Korea – YouTubers on the downsides (Korean)'],
      ['https://www.ajd.co.kr/contents/basic-tip/detail/%EC%95%84%EC%9D%B4%ED%8F%B0_%EB%93%80%EC%98%A4_%EB%8B%A8%EC%A0%90_5%EA%B0%80%EC%A7%80_%EC%8A%A4%ED%8E%99_%EA%B8%B0%EB%8A%A5_%EA%B0%80%EA%B2%A9_%EC%B0%A8%EC%9D%B4_%EA%B5%AC%EB%A7%A4_%EC%A0%84_%ED%95%84%EB%8F%85-94281', 'AJD – five downsides (Korean)'],
      ['https://namu.wiki/w/iPhone%20Duo/%EB%85%BC%EB%9E%80%20%EB%B0%8F%20%EB%AC%B8%EC%A0%9C%EC%A0%90', 'Namuwiki – controversies (Korean)']
    ],
    priceSources: [
      ['https://glasswallet.com/blog/starbucks-menu-price-guide', 'Starbucks Americano tall ₩4,700'],
      ['https://www.khan.co.kr/article/202509160713001/', 'Kyunghyang – Seoul jajangmyeon average ₩7,577'],
      ['https://www.bizforms.co.kr/365guide/view.asp?number=162', 'Korea 2026 minimum wage ₩10,320'],
      ['https://glasswallet.com/blog/netflix-pricing-guide', 'Netflix Premium ₩17,000'],
      ['https://support.claude.com/en/articles/8325606', 'Claude Pro $20/month'],
      ['https://blog.kwt.co.kr/?p=3067', 'RTX 5090 · 5070 Ti Danawa prices (10/27)'],
      ['https://www.wishbucket.io/items/3616646', 'Ryzen 7 9800X3D Korean price'],
      ['https://www.moyoplan.com/s/843ca3a5', 'iPhone 18 Pro · Galaxy Z Fold8 Korean prices'],
      ['https://www.ddaily.co.kr/page/view/2026102409515538809', 'Duo inner screen repair $999'],
      ['https://www.poundsterlinglive.com/history/USD-KRW-2026', 'USD/KRW rate']
    ]
  }
};
