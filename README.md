# retrocam

Retro Cam
復古擬真底片相機模擬器 / Web-based Vintage Film Camera Simulator

繁體中文 | English

繁體中文
📖 項目簡介

Retro Cam Ultimate 是一個完全基於 Web 技術 (HTML5/CSS3/JS) 構建的沉浸式相機模擬器。它不僅僅是拍照，更還原了傳統底片相機的「操作手感」。從拉動過片桿、聽見機械快門聲，到在暗房中等待顯影的過程，此專案旨在行動裝置上重現類比攝影的儀式感。

✨ 核心功能
1. 擬真操作體驗 (Skeuomorphic UI)

機械結構：包含可互動的快門按鈕、過片撥桿、計數器與機背鎖扣。

音效回饋：真實錄製的快門聲與過片機械聲。

3D 機身結構：使用 CSS 3D Transforms 構建的可翻開機背，內部隱藏著相簿系統。

2. 專業濾鏡模擬

內建 5 種獨特的底片與感光元件模擬模式：

B&W (Tri-X 400)：經典黑白顆粒感。

COLOR (Game-Cam)：低位元復古遊戲機色彩。

DIGI (CCD Sensor)：早期數碼相機的高飽和度與輝光。

FILM (JPN-Cyan)：帶有漏光效果的日系青色調。

HC-BW (Acros 100)：高對比度黑白風格。

3. 拍攝與沖洗流程

拍攝模式：支援「單張拍攝」與「36張膠卷模式」。

過片機制：拍攝後必須手動拉動撥桿 (Advance Lever) 才能進行下一次操作或沖洗。

樣式選擇：拉動撥桿沖洗時，可選擇三種相紙風格：

Standard：標準滿版。

Instant：拍立得風格 (下留白多，序號位於左下角)。

Film：菲林齒孔風格 (序號位於照片左上角)。

暗房動畫：照片會隨著時間慢慢顯影，從模糊變清晰。

4. 智能相簿系統

機背相簿：點擊機身右側鎖扣可打開機背，檢視已沖洗的照片。

永久序號：每張照片擁有全域唯一的流水編號 (No.1, No.2...)，即使刪除舊照片，新照片序號也會持續遞增。

管理功能：支援多選刪除、下載與分享。

導出選項：下載時可選擇是否保留照片上的「序號」烙印。

5. 技術特性

IndexedDB：照片數據儲存在瀏覽器本地數據庫中，重新整理網頁不會丟失。

PWA 支援：可添加到主畫面，支援全屏沈浸式體驗。

強制全屏：自動檢測視窗狀態，確保用戶始終在全屏模式下操作以獲得最佳體驗。

🎮 如何使用

啟動相機：點擊 "POWER ON" 進入全屏模式並允許相機權限。

取景與拍攝：

透過機頂的小觀景窗預覽，或點擊它進入「全屏取景器」。

點擊快門按鈕拍攝。

過片與沖洗：

拍攝後，點擊並拖動右上角的「過片撥桿」。

選擇您喜歡的相紙樣式 (Standard/Instant/Film)。

等待顯影動畫完成，照片將自動存入相簿。

檢視相簿：

點擊機身右側的「機背鎖扣」，機背將向左翻開。

在相簿中選擇照片進行下載 (Download)、分享 (Share) 或刪除 (Delete)。

再次點擊鎖扣或完成操作後，機背將自動關閉回到拍攝模式。

English
📖 Introduction

Retro Cam Ultimate is an immersive camera simulator built entirely with Web technologies (HTML5/CSS3/JS). It goes beyond simple photography by recreating the "tactile feel" of traditional analog cameras. From winding the advance lever and hearing the mechanical shutter, to waiting for the photo to develop in a virtual darkroom, this project aims to bring the ritual of analog photography to mobile devices.

✨ Key Features
1. Skeuomorphic User Experience

Mechanical Mechanics: Interactive shutter button, film advance lever, frame counter, and back door lock.

Audio Feedback: Realistic recordings of shutter and winding lever sounds.

3D Camera Body: A functional camera back built with CSS 3D Transforms that opens to reveal the photo album.

2. Professional Film Simulation

Includes 5 unique film and sensor simulation modes:

B&W (Tri-X 400): Classic black and white with grain.

COLOR (Game-Cam): Retro low-bit console colors.

DIGI (CCD Sensor): High saturation and bloom of early digital cameras.

FILM (JPN-Cyan): Japanese cyan tones with light leak effects.

HC-BW (Acros 100): High-contrast black and white.

3. Shooting & Developing Process

Shooting Modes: Supports "Single Shot" and "36-Exposure Roll" modes.

Winding Mechanism: You must manually pull the Advance Lever after shooting to reset the shutter or start developing.

Print Styles: Choose from three styles when developing:

Standard: Full borderless image.

Instant: Polaroid style (Larger bottom border, serial number on bottom-left).

Film: Film strip with sprockets (Serial number inside the photo, top-left).

Darkroom Animation: Photos slowly develop from blurry/negative to clear images.

4. Smart Album System

In-Camera Album: Click the lock on the right side of the body to swing the camera back open and view developed photos.

Global Serial Numbers: Each photo gets a unique, persistent serial number (No.1, No.2...) that increments indefinitely.

Management: Support for multi-selection delete, download, and share.

Export Options: Choose whether to include the "Serial Number" stamp when downloading.

5. Technical Highlights

IndexedDB: Photos are stored locally in the browser's database, persisting across reloads.

PWA Support: optimized for "Add to Home Screen" usage.

Enforced Fullscreen: Automatically detects window state and ensures the user stays in fullscreen mode for the best experience.

🎮 How to Use

Power On: Click "POWER ON" to enter fullscreen mode and allow camera access.

View & Shoot:

Preview via the small viewfinder on the top plate, or click it to enter the "Full-Screen Viewfinder".

Press the shutter button to take a photo.

Wind & Develop:

After shooting, click (or pull) the "Advance Lever" on the top right.

Select your desired print style (Standard/Instant/Film).

Watch the developing animation; the photo is automatically saved to the album.

Access Album:

Click the "Back Lock" on the right side of the camera body; the back door will swing open.

Select photos to Download, Share, or Delete.

Click the lock again or finish an action to close the back and return to shooting mode.

🛠 Technologies Used

HTML5 (Canvas API for image processing)

CSS3 (Flexbox, Grid, 3D Transforms, Animations)

JavaScript (ES6+)

getUserMedia: Camera stream access.

IndexedDB: Client-side storage for photos.

Web Audio API: Sound effects generation.

Fullscreen API & Screen Orientation API.

📄 License

Designed by Chan Kwun Kin.
This project is for educational and personal use.
