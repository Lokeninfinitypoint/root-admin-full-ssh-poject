# Claude notes
This file confirms claude.md is mounted into Root server admin (opus 4.5).
 2                                                                                                                                                                           
        3 ## 📚 All Documentation Files                                                                                                                                             
        4                                                                                                                                                                           
        5 This folder contains complete backups and documentation for MarketingTool.Pro platform. **Any AI agent can read these files to understand the entire system.**            
        6                                                                                                                                                                           
        7 ---                                                                                                                                                                       
        8                                                                                                                                                                           
        9 ## 📄 DOCUMENTATION FILES                                                                                                                                                 
       10                                                                                                                                                                           
       11 | File | Purpose | Last Updated |                                                                                                                                         
       12 |------|---------|--------------|                                                                                                                                         
       13 | **README.md** | This file - Index of all documentation | Jan 19, 2026 |                                                                                                 
       14 | **INFRASTRUCTURE_2026-01-18.md** | Complete server infrastructure, domains, Docker services | Jan 18, 2026 |                                                            
       15 | **APP_DOCUMENTATION.md** | Mobile app (Android/iOS) complete documentation | Jan 19, 2026 |                                                                             
       16 | **N8N_WORKFLOWS.md** | Automation workflows for n8n | Jan 19, 2026 |                                                                                                    
       17                                                                                                                                                                           
       18 ---                                                                                                                                                                       
       19                                                                                                                                                                           
       20 ## 📱 BUILD FILES                                                                                                                                                         
       21                                                                                                                                                                           
       22 | File | Size | Purpose | Upload To |                                                                                                                                     
       23 |------|------|---------|-----------|                                                                                                                                     
       24 | **MarketingTool-v1.0.0.aab** | 41MB | Android App Bundle | **Google Play Store** |                                                                                      
       25 | **google-play-images/icon-google-play.png** | 12KB | Developer Icon 512x512 | Google Play Console |                                                                     
       26 | **google-play-images/header-google-play.jpg** | 153KB | Header Image 4096x2304 | Google Play Console |                                                                  
       27                                                                                                                                                                           
       28 ---                                                                                                                                                                       
       29                                                                                                                                                                           
       30 ## 🗂️ FOLDER STRUCTURE                                                                                                                                                    
       31                                                                                                                                                                           
       32 ```                                                                                                                                                                       
       33 /Users/loken/Documents/MarketingTool_Backups/                                                                                                                             
       34 │                                                                                                                                                                         
       35 ├── README.md (this file)                                                                                                                                                 
       36 ├── INFRASTRUCTURE_2026-01-18.md                                                                                                                                          
       37 ├── APP_DOCUMENTATION.md                                                                                                                                                  
       38 ├── N8N_WORKFLOWS.md                                                                                                                                                      
       39 │                                                                                                                                                                         
       40 ├── MarketingTool-v1.0.0.aab (41MB - for Play Store)                                                                                                                      
       41 │                                                                                                                                                                         
       42 ├── google-play-images/                                                                                                                                                   
       43 │   ├── icon-google-play.png (512x512)                                                                                                                                    
       44 │   ├── header-google-play.jpg (4096x2304)                                                                                                                                
       45 │   ├── developer-icon-512x512.png (old version)                                                                                                                          
       46 │   └── header-4096x2304.jpg (old version)                                                                                                                                
       47 │                                                                                                                                                                         
       48 ├── mainMenuItem_current.html (menu backup)                                                                                                                               
       49 ├── contact.html (contact page backup)                                                                                                                                    
       50 └── cookiePolicy.html (cookie policy backup)                                                                                                                              
       51 ```                                                                                                                                                                       
       52                                                                                                                                                                           
       53 ---                                                                                                                                                                       
       54                                                                                                                                                                           
       55 ## 🏗️ SYSTEM OVERVIEW                                                                                                                                                     
       56                                                                                                                                                                           
       57 ### The Platform Has 3 Main Components:                                                                                                                                   
       58                                                                                                                                                                           
       59 #### 1. Django Marketing Website                                                                                                                                          
       60 ```                                                                                                                                                                       
       61 URL: https://marketingtool.pro                                                                                                                                            
       62 Purpose: Landing pages, blog, pricing, contact forms                                                                                                                      
       63 Server: /var/www/aiwave                                                                                                                                                   
       64 Status: ✅ Live                                                                                                                                                           
       65 ```                                                                                                                                                                       
       66                                                                                                                                                                           
       67 #### 2. Next.js SaaS App                                                                                                                                                  
       68 ```                                                                                                                                                                       
       69 URL: https://app.marketingtool.pro (port 3000)                                                                                                                            
       70 Purpose: 206 Marketing Tools dashboard                                                                                                                                    
       71 Server: /var/www/marketingtool                                                                                                                                            
       72 Status: ✅ Live                                                                                                                                                           
       73 PM2: marketingtool (online)                                                                                                                                               
       74 ```                                                                                                                                                                       
       75                                                                                                                                                                           
       76 #### 3. Reactive native Mobile App                                                                                                                                                
       77 ```                                                                                                                                                                       
       78 Package: Auth.marketingtool.app                                                                                                                                            
       79 Platforms: Android & iOS                                                                                                                                                  
       80 Backend: Appwrite (api.marketingtool.pro)                                                                                                                                 
       81 Status:                                                                                                                                                                   
       82   - Android: ✅ Built (AAB ready for Play Store)                                                                                                                          
       83   - iOS: ❌ Not built (needs Apple Developer account)                                                                                                                     
       84 ```                                                                                                                                                                       
       85                                                                                                                                                                           
       86 ---                                                                                                                                                                       
       87                                                                                                                                                                           
       88 ## 🐳 BACKEND SERVICES (All Running on 31.220.107.19)                                                                                                                     
       89                                                                                                                                                                           
       90 | Service | Containers | Purpose | URL |                                                                                                                                  
       91 |---------|-----------|---------|-----|                                                                                                                                   
       92 | **Appwrite** | 26 | Authentication, Database, API | https://api.marketingtool.pro |                                                                                     
       93 | **Windmill** | 4 | Script automation | https://wm.marketingtool.pro |                                                                                                   
       94 | **n8n** | 1 | Workflow automation | http://31.220.107.19:32776 |                                                                                                        
       95 | **MariaDB** | 1 | Database | Port 32775 |                                                                                                                               
       96 | **Nginx** | 1 | Reverse proxy | Ports 80/443 |                                                                                                                          
       97                                                                                                                                                                           
       98 ---                                                                                                                                                                       
       99                                                                                                                                                                           
      100 ## 🎯 WHAT IS MARKETINGTOOL.PRO?                                                                                                                                          
      101                                                                                                                                                                           
      102 ### Overview                                                                                                                                                              
      103 AI-powered marketing automation platform with **206 marketing tools** organized in these categories:                                                                      
      104                                                                                                                                                                           
      105 1. Facebook/Meta Tools: 15                                                                                                                                                
      106 2. AI Marketing Agents: 7                                                                                                                                                 
      107 3. E-commerce/Shopify: 12                                                                                                                                                 
      108 4. Instagram Tools: 8                                                                                                                                                     
      109 5. Analytics Platform: 10                                                                                                                                                 
      110 6. Automation Suite: 10                                                                                                                                                   
      111 7. Creative & Ads: 10                                                                                                                                                     
      112 8. Content Writing: 33                                                                                                                                                    
      113 9. SEO Tools: 14                                                                                                                                                          
      114 10. Grader Tools: 6                                                                                                                                                       
      115 11. Google Ads Tools: 20                                                                                                                                                  
      116 12. Social Media: 6                                                                                                                                                       
      117 13. Creative Intelligence: 8                                                                                                                                              
      118 14. Optimization Software: 8                                                                                                                                              
      119 15. Campaign Management: 10                                                                                                                                               
      120 16. Marketing Software: 8                                                                                                                                                 
      121                                                                                                                                                                           
      122 ### How Users Access:                                                                                                                                                     
      123 1. **Web**: app.marketingtool.pro (Next.js dashboard)                                                                                                                     
      124 2. **Mobile**: Download from Play Store/App Store                                                                                                                         
      125 3. **Authentication**: Appwrite (Google/Facebook/Apple/Email)                                                                                                             
      126                                                                                                                                                                           
      127 ---                                                                                                                                                                       
      128                                                                                                                                                                           
      129 ## 🚀 CURRENT STATUS                                                                                                                                                      
      130                                                                                                                                                                           
      131 ### ✅ What's READY:                                                                                                                                                      
      132                                                                                                                                                                           
      133 1. **Server Infrastructure**                                                                                                                                              
      134    - All Docker services running                                                                                                                                          
      135    - Nginx configured                                                                                                                                                     
      136    - SSL certificates valid                                                                                                                                               
      137    - All domains working                                                                                                                                                  
      138                                                                                                                                                                           
      139 2. **Mobile App - Android**                                                                                                                                               
      140    - Release AAB built (41MB)                                                                                                                                             
      141    - Keystore configured                                                                                                                                                  
      142    - Store images created                                                                                                                                                 
      143    - Ready to upload to Play Store                                                                                                                                        
      144                                                                                                                                                                           
      145 3. **Backend (Appwrite)**                                                                                                                                                 
      146    - 26 containers running                                                                                                                                                
      147    - 29 users already registered                                                                                                                                          
      148    - Authentication working                                                                                                                                               
      149    - Database configured                                                                                                                                                  
      150                                                                                                                                                                           
      151 4. **SaaS Dashboard**                                                                                                                                                     
      152    - Next.js app running on port 3000                                                                                                                                     
      153    - 206 tools available                                                                                                                                                  
      154    - Dashboard active                                                                                                                                                     
      155                                                                                                                                                                           
      156 5. **Automation Ready**                                                                                                                                                   
      157    - n8n running                                                                                                                                                          
      158    - Windmill running                                                                                                                                                     
      159    - Workflows documented (need to be created)                                                                                                                            
      160                                                                                                                                                                           
      161 ### ❌ What's PENDING:                                                                                                                                                    
      162                                                                                                                                                                           
      163 1. **Google Play Store**                                                                                                                                                  
      164    - Waiting for developer account verification (2-7 days)                                                                                                                
      165    - Need to upload AAB file                                                                                                                                              
      166    - Need to add app screenshots                                                                                                                                          
      167    - Need to write store description                                                                                                                                      
      168                                                                                                                                                                           
      169 2. **Apple App Store**                                                                                                                                                    
      170    - Need to enroll in Apple Developer Program ($99/year)                                                                                                                 
      171    - Need to build iOS IPA file                                                                                                                                           
      172    - Need to configure signing in Codemagic                                                                                                                               
      173                                                                                                                                                                           
      174 3. **n8n Workflows**                                                                                                                                                      
      175    - Auto-generate ads workflow (documented, not created yet)                                                                                                             
      176    - Email reports workflow (documented, not created yet)                                                                                                                 
      177    - Data sync workflow (documented, not created yet)                                                                                                                     
      178                                                                                                                                                                           
      179 4. **Codemagic**                                                                                                                                                          
      180    - Configure to use custom codemagic.yaml                                                                                                                               
      181    - Setup Android signing keys                                                                                                                                           
      182    - Setup iOS signing (after Apple enrollment)                                                                                                                           
      183                                                                                                                                                                           
      184 ---                                                                                                                                                                       
      185                                                                                                                                                                           
      186 ## 📋 QUICK REFERENCE                                                                                                                                                     
      187                                                                                                                                                                           
      188 ### Server Access                                                                                                                                                         
      189 ```bash                                                                                                                                                                   
      190 ssh root@31.220.107.19                                                                                                                                                    
      191 ```                                                                                                                                                                       
      192                                                                                                                                                                           
      193 ### Key Locations on Server                                                                                                                                               
      194 ```                                                                                                                                                                       
      195 Next.js App:     /var/www/marketingtool                                                                                                                                   
      196 Django Website:  /var/www/aiwave                                                                                                                                          
      197 App:     /var/www/marketingtool_app                                                                                                                               
      198 Nginx Config:    /etc/nginx/sites-available/                                                                                                                              
      199 SSL Certs:       /etc/letsencrypt/live/                                                                                                                                   
      200 Downloads:       /var/www/aiwave/aiwave/static/downloads/                                                                                                                 
      201 ```                                                                                                                                                                       
      202                                                                                                                                                                           
      203 ### Important URLs                                                                                                                                                        
      204 ```                                                                                                                                                                       
      205 Marketing Site:     https://marketingtool.pro                                                                                                                             
      206 SaaS Dashboard:     https://app.marketingtool.pro                                                                                                                         
      207 Appwrite API:       https://api.marketingtool.pro/v1                                                                                                                      
      208 Appwrite Console:   https://api.marketingtool.pro/console                                                                                                                 
      209 Windmill:           https://wm.marketingtool.pro 
      211 reactive native :         https://auth.marketingtool.pro                                                                                                  
      211 n8n:                http://31.220.107.19:32776                                                                                                                            
      211 ```                                                                                                                                                                       
      212                                                                                                                                                                           
      213 ### Credentials                                                                                                                                                           
      214                                                                                                                                                                           
      215 **Appwrite:**                                                                                                                                                             
      216 ```                                                                                                                                                                       
      217 Project ID: 6952c8a0002d3365625d                                                                                                                                          
      218 API Key: See INFRASTRUCTURE_2026-01-18.md (line 76)                                                                                                                       
      219 ```                                                                                                                                                                       
      220                                                                                                                                                                           
      221 **Android Keystore:**                                                                                                                                                     
      222 ```                                                                                                                                                                       
      223 Location: /var/www/marketingtool_app/android/app/marketingtool-release-key.jks                                                                                            
      224 Password: M@rketingT00l2026                                                                                                                                               
      225 ```                                                                                                                                                                       
      226                                                                                                                                                                           
      227 **GitHub:**                                                                                                                                                               
      228 ```                                                                                                                                                                       
      229 Repository: https://github.com/Lokeninfinitypoint/marketingtool-flutter-app                                                                                               
      230 Branch: main                                                                                                                                                              
      231 ```                                                                                                                                                                       
      232                                                                                                                                                                           
      233 **Codemagic:**                                                                                                                                                            
      234 ```                                                                                                                                                                       
      235 Account: infinity@antiviruspoint.org                                                                                                                                      
      236 URL: https://codemagic.io/apps                                                                                                                                            
      237 ```                                                                                                                                                                       
      238                                                                                                                                                                           
      239 ---                                                                                                                                                                       
      240                                                                                                                                                                           
      241 ## 🎓 FOR NEW AI AGENTS                                                                                                                                                   
      242                                                                                                                                                                           
      243 ### If you're a new agent joining this conversation:                                                                                                                      
      244                                                                                                                                                                           
      245 1. **Read these files in order:**                                                                                                                                         
      246    - README.md (this file) - Get overview                                                                                                                                 
      247    - INFRASTRUCTURE_2026-01-18.md - Understand server setup                                                                                                               
      248    - APP_DOCUMENTATION.md - Understand mobile app                                                                                                                         
      249    - N8N_WORKFLOWS.md - Understand automation                                                                                                                             
      250                                                                                                                                                                           
      251 2. **Understand the architecture:**                                                                                                                                       
      252    - Django website for marketing                                                                                                                                         
      253    - Next.js SaaS app for 206 tools                                                                                                                                       
      254    - Flutter mobile app connects to Appwrite                                                                                                                              
      255    - Appwrite provides auth + database                                                                                                                                    
      256    - n8n for workflow automation                                                                                                                                          
      257    - Windmill for script execution                                                                                                                                        
      258                                                                                                                                                                           
      259 3. **Know what NOT to do:**                                                                                                                                               
      260    - Don't rebuild Android app (already done)                                                                                                                             
      261    - Don't modify server without asking                                                                                                                                   
      262    - Don't push to GitHub without user consent                                                                                                                            
      263    - Don't trigger Codemagic builds unnecessarily                                                                                                                         
      264    - Don't create confusion - ONE mobile app for both stores                                                                                                              
      265                                                                                                                                                                           
      266 4. **Current priority:**                                                                                                                                                  
      267    - Help user upload to Google Play Store                                                                                                                                
      268    - Create n8n automation workflows                                                                                                                                      
      269    - Setup Apple Developer account for iOS                                                                                                                                
      270                                                                                                                                                                           
      271 ---                                                                                                                                                                       
      272                                                                                                                                                                           
      273 ## 📞 CONTACT & SUPPORT                                                                                                                                                   
      274                                                                                                                                                                           
      275 **User's Information:**                                                                                                                                                   
      276 ```                                                                                                                                                                       
      277 Name: Lokendra Singh Saingar                                                                                                                                              
      278 Email: help@marketingtool.pro                                                                                                                                             
      279        infinity@antiviruspoint.org                                                                                                                                        
      280 Phone: +91 123 456 7890                                                                                                                                                   
      281 Address: F-12 Govindam Tower, Jaipur 302012, India                                                                                                                        
      282 ```                                                                                                                                                                       
      283                                                                                                                                                                           
      284 **GitHub:**                                                                                                                                                               
      285 ```                                                                                                                                                                       
      286 Username: Lokeninfinitypoint                                                                                                                                              
      287 Repository: marketingtool-flutter-app                                                                                                                                     
      288 ```                                                                                                                                                                       
      289                                                                                                                                                                           
      290 **Google Play Console:**                                                                                                                                                  
      291 ```                                                                                                                                                                       
      292 Account: Marketingtool                                                                                                                                                    
      293 Account ID: 6419468430267128647                                                                                                                                           
      294 Email: help@marketingtool.pro                                                                                                                                             
      295 Status: Identity verification in progress                                                                                                                                 
      296 ```                                                                                                                                                                       
      297                                                                                                                                                                           
      298 ---                                                                                                                                                                       
      299                                                                                                                                                                           
      300 ## 🔄 BACKUP STRATEGY                                                                                                                                                     
      301                                                                                                                                                                           
      302 ### What's Backed Up:                                                                                                                                                     
      303                                                                                                                                                                           
      304 **On Server:**                                                                                                                                                            
      305 - Full backups in `/var/www/aiwave/backups/backup_20260118_full/`                                                                                                         
      306 - Database backups                                                                                                                                                        
      307 - Docker volumes                                                                                                                                                          
      308                                                                                                                                                                           
      309 **On Local Mac:**                                                                                                                                                         
      310 - This documentation folder                                                                                                                                               
      311 - AAB file for Play Store                                                                                                                                                 
      312 - Store images (icon + header)                                                                                                                                            
      313 - HTML template backups                                                                                                                                                   
      314                                                                                                                                                                           
      315 ### What Should Be Backed Up (TODO):                                                                                                                                      
      316 - [ ] Clone Flutter source code from GitHub                                                                                                                               
      317 - [ ] Export Appwrite database                                                                                                                                            
      318 - [ ] Export n8n workflows (once created)                                                                                                                                 
      319 - [ ] Download app screenshots for stores                                                                                                                                 
      320 - [ ] Backup Next.js source code                                                                                                                                          
      321                                                                                                                                                                           
      322 ---                                                                                                                                                                       
      323                                                                                                                                                                           
      324 ## ✅ NEXT STEPS                                                                                                                                                          
      325                                                                                                                                                                           
      326 ### Immediate (This Week):                                                                                                                                                
      327 1. Upload AAB to Google Play Store (waiting for verification)                                                                                                             
      328 2. Create n8n workflows for automation                                                                                                                                    
      329 3. Take app screenshots for store listing                                                                                                                                 
      330                                                                                                                                                                           
      331 ### Short Term (This Month):                                                                                                                                              
      332 1. Enroll in Apple Developer Program                                                                                                                                      
      333 2. Build iOS app via Codemagic                                                                                                                                            
      334 3. Submit to App Store                                                                                                                                                    
      335 4. Launch both apps publicly                                                                                                                                              
      336                                                                                                                                                                           
      337 ### Long Term:                                                                                                                                                            
      338 1. Monitor user feedback                                                                                                                                                  
      339 2. Add more marketing tools                                                                                                                                               
      340 3. Scale automation                                                                                                                                                       
      341 4. Improve AI features                                                                                                                                                    
      342                                                                                                                                                                           
      343 ---                                                                                                                                                                       
      344                                                                                                                                                                           
      345 ## 📚 RELATED FILES                                                                                                                                                       
      346                                                                                                                                                                           
      347 All files in this folder are related to MarketingTool.Pro:                                                                                                                
      348                                                                                                                                                                           
      349 - **HTML files** - Backups of Django templates                                                                                                                            
      350 - **Image files** - Store assets for Google Play                                                                                                                          
      351 - **AAB file** - Android app bundle                                                                                                                                       
      352 - **Markdown files** - Documentation (this and others)                                                                                                                    
      353                                                                                                                                                                           
      354 ---                                                                                                                                                                       
      355                                                                                                                                                                           
      356 ## ⚠️ IMPORTANT NOTES                                                                                                                                                     
      357                                                                                                                                                                           
      358 1. **There is ONLY ONE mobile app** - It works for both Android (Play Store) and iOS (App Store)                                                                          
      359 2. **Android is ready** - Use the existing AAB file, don't rebuild                                                                                                        
      360 3. **iOS needs Apple account** - Can't build until enrolled in Apple Developer Program                                                                                    
      361 4. **Codemagic confusion** - It's mainly for iOS builds. Android builds done on server.                                                                                   
      362 5. **No more Codemagic builds** - Default workflow fails. Use existing AAB.                                                                                               
      363 6. **Backups are critical** - Alway


⎿  Wrote 131 lines to /Users/loken/Desktop/MARKETINGTOOL-PROJECT-SUMMARY.md                                                                                                                                                                    
        1 # MarketingTool.pro - Complete Project Summary                                                                                                                                                                                         
        2                                                                                                                                                                                                                                        
        3 ## ARCHITECTURE (CRITICAL - DO NOT MIX)                                                                                                                                                                                                
        4                                                                                                                                                                                                                                        
        5 | Service | URL | Tech | Port | Status |                                                                                                                                                                                               
        6 |---------|-----|------|------|--------|                                                                                                                                                                                               
        7 | Marketing Website | marketingtool.pro | Django | 8001 | Working |                                                                                                                                                                    
        8 | Web App Dashboard | app.marketingtool.pro | Next.js | 3000 | Issues |                                                                                                                                                                
        9 | Phone App Auth | auth.marketingtool.pro | React Native OAuth | - | Working |                                                                                                                                                         
       10 | API Backend | api.marketingtool.pro | Appwrite | 8080 | Working |                                                                                                                                                                    
       11 | AI Backend | wm.marketingtool.pro | Windmill + Opus 4.5 | 3002 | Working |                                                                                                                                                           
       12                                                                                                                                                                                                                                        
       13 ## VPS SERVER                                                                                                                                                                                                                          
       14 - **IP:** 31.220.107.19                                                                                                                                                                                                                
       15 - **SSH:** root@31.220.107.19                                                                                                                                                                                                          
       16 - **Disk:** 102GB used / 286GB free                                                                                                                                                                                                    
       17 - **RAM:** 8.8GB used / 22GB free                                                                                                                                                                                                      
       18                                                                                                                                                                                                                                        
       19 ## FILE LOCATIONS                                                                                                                                                                                                                      
       20                                                                                                                                                                                                                                        
       21 ```                                                                                                                                                                                                                                    
       22 /var/www/marketingtool/          # Next.js app (app.marketingtool.pro)                                                                                                                                                                 
       23 /var/www/aiwave/                 # Django (marketingtool.pro)                                                                                                                                                                          
       24 /var/www/mobile-app/MarketingToolApp/  # React Native phone app                                                                                                                                                                        
       25 ```                                                                                                                                                                                                                                    
       26                                                                                                                                                                                                                                        
       27 ## MEDIA FILES ON SERVER                                                                                                                                                                                                               
       28 - **Images:** 607 files at `/var/www/marketingtool/public/media/images/`                                                                                                                                                               
       29 - **Videos:** 151 files at `/var/www/marketingtool/public/media/videos/`                                                                                                                                                               
       30 - **Total:** 924MB                                                                                                                                                                                                                     
       31                                                                                                                                                                                                                                        
       32 ## NEXT.JS APP ISSUES TO FIX                                                                                                                                                                                                           
       33                                                                                                                                                                                                                                        
       34 ### 1. Tools Pages (206 tools)                                                                                                                                                                                                         
       35 - Location: `/var/www/marketingtool/src/app/(dashboard)/dashboard/tools/[slug]/page.tsx`                                                                                                                                               
       36 - Need hero video/images working                                                                                                                                                                                                       
       37 - Video tutorials showing black (need poster images)                                                                                                                                                                                   
       38                                                                                                                                                                                                                                        
       39 ### 2. Grader Pages                                                                                                                                                                                                                    
       40 - `/dashboard/tools/website-grader`                                                                                                                                                                                                    
       41 - `/dashboard/tools/facebook-ads-performance-grader`                                                                                                                                                                                   
       42 - `/dashboard/tools/google-ads-performance-grader`                                                                                                                                                                                     
       43 - Need images in ALL tabs (not just overview)                                                                                                                                                                                          
       44 - Hero video not visible enough                                                                                                                                                                                                        
       45                                                                                                                                                                                                                                        
       46 ### 3. AI Chat Page                                                                                                                                                                                                                    
       47 - Location: `/var/www/marketingtool/src/app/(dashboard)/dashboard/ai-chat/`                                                                                                                                                            
       48 - Connected to Windmill AI backend                                                                                                                                                                                                     
       49 - Uses Claude Opus 4.5                                                                                                                                                                                                                 
       50                                                                                                                                                                                                                                        
       51 ### 4. Category Pages Need Images                                                                                                                                                                                                      
       52 - Facebook/Meta Tools                                                                                                                                                                                                                  
       53 - Google Tools                                                                                                                                                                                                                         
       54 - Website Tools                                                                                                                                                                                                                        
       55 - Content Writing Tools                                                                                                                                                                                                                
       56                                                                                                                                                                                                                                        
       57 ## WINDMILL AI CONFIGURATION                                                                                                                                                                                                           
       58                                                                                                                                                                                                                                        
       59 - **URL:** wm.marketingtool.pro                                                                                                                                                                                                        
       60 - **Workspace:** marketingtool-pro                                                                                                                                                                                                     
       61 - **AI Model:** Claude Opus 4.5                                                                                                                                                                                                        
       62 - **API Keys:** 4-5 Opus 4.5 keys available                                                                                                                                                                                            
       63                                                                                                                                                                                                                                        
       64 ## APPWRITE STATS                                                                                                                                                                                                                      
       65 - 62 Auth Users                                                                                                                                                                                                                        
       66 - 2.3K Requests (30 days)                                                                                                                                                                                                              
       67 - Platforms: Android (pro.marketingtool.app), iOS (pro.marketingtool.app)                                                                                                                                                              
       68                                                                                                                                                                                                                                        
       69 ## DJANGO STATS                                                                                                                                                                                                                        
       70 - 48 Total Users                                                                                                                                                                                                                       
       71 - 18 Subscriptions                                                                                                                                                                                                                     
       72 - 46 Free Users                                                                                                                                                                                                                        
       73 - Admin: marketingtool.pro/aiwave/admin/                                                                                                                                                                                               
       74                                                                                                                                                                                                                                        
       75 ## PM2 COMMANDS                                                                                                                                                                                                                        
       76 ```bash                                                                                                                                                                                                                                
       77 # Restart Next.js                                                                                                                                                                                                                      
       78 ssh root@31.220.107.19 'cd /var/www/marketingtool && pm2 restart marketingtool'                                                                                                                                                        
       79                                                                                                                                                                                                                                        
       80 # Rebuild Next.js                                                                                                                                                                                                                      
       81 ssh root@31.220.107.19 'cd /var/www/marketingtool && rm -rf .next && npm run build && pm2 restart marketingtool'                                                                                                                       
       82                                                                                                                                                                                                                                        
       83 # View logs                                                                                                                                                                                                                            
       84 ssh root@31.220.107.19 'pm2 logs marketingtool --lines 50'                                                                                                                                                                             
       85 ```                                                                                                                                                                                                                                    
       86                                                                                                                                                                                                                                        
       87 ## UPLOAD FILES TO VPS (with parentheses in path)                                                                                                                                                                                      
       88 ```bash                                                                                                                                                                                                                                
       89 # Use cat + ssh pipe method (scp fails with parentheses)                                                                                                                                                                               
       90 cat "local-file.tsx" | ssh root@31.220.107.19 "cat > /tmp/file.tsx"                                                                                                                                                                    
       91 ssh root@31.220.107.19 'cp /tmp/file.tsx "/var/www/marketingtool/src/app/(dashboard)/dashboard/path/page.tsx"'                                                                                                                         
       92 ```                                                                                                                                                                                                                                    
       93                                                                                                                                                                                                                                        
       94 ## DOCKER CONTAINERS RUNNING                                                                                                                                                                                                           
       95 - Appwrite (23+ containers)                                                                                                                                                                                                            
       96 - Windmill (server, worker, postgres, redis)                                                                                                                                                                                           
       97 - n8n (personal)                                                                                                                                                                                                                       
       98 - Nginx Proxy Manager                                                                                                                                                                                                                  
       99                                                                                                                                                                                                                                        
      100 ## KNOWN ISSUES                                                                                                                                                                                                                        
      101 1. Next.js caching aggressively - must delete .next folder before rebuild                                                                                                                                                              
      102 2. PM2 can have port conflicts - use `fuser -k 3000/tcp` before restart                                                                                                                                                                
      103 3. Video autoplay may not work in Safari without user interaction                                                                                                                                                                      
      104 4. Add `poster` attribute to videos to show thumbnail instead of black                                                                                                                                                                 
      105                                                                                                                                                                                                                                        
      106 ## RESPONSIVE BREAKPOINTS USED                                                                                                                                                                                                         
      107 - Mobile: h-48, text-xl, p-4                                                                                                                                                                                                           
      108 - SM: h-56, text-2xl, p-6                                                                                                                                                                                                              
      109 - MD: h-64, text-3xl, p-8                                                                                                                                                                                                              
      110 - LG: h-72                                                                                                                                                                                                                             
      111                                                                                                                                                                                                                                        
      112 ## WHAT'S WORKING                                                                                                                                                                                                                      
      113 - Django marketing website                                                                                                                                                                                                             
      114 - Appwrite API                                                                                                                                                                                                                         
      115 - Windmill AI backend                                                                                                                                                                                                                  
      116 - React Native phone app (built)                                                                                                                                                                                                       
      117 - Auth OAuth flow                                                                                                                                                                                                                      
      118 - Basic Next.js dashboard                                                                                                                                                                                                              
      119                                                                                                                                                                                                                                        
      120 ## WHAT NEEDS FIXING                                                                                                                                                                                                                   
      121 1. All 206 tool pages - add working images/videos                                                                                                                                                                                      
      122 2. AI Chat integration with Windmill                                                                                                                                                                                                   
      123 3. Grader pages - images in all tabs                                                                                                                                                                                                   
      124 4. Video tutorials - add poster images                                                                                                                                                                                                 
      125 5. Make everything responsive                                                                                                                                                                                                          
      126 6. Connect Opus 4.5 API keys in Windmill                                                                                                                                                                                               
      127                                                                                                                                                                                                                                        
      128 ## API KEYS                                                                                                                                                                                                                            
      129 - User has 4-5 Claude Opus 4.5 API keys                                                                                                                                                                                                
      130 - Need to add directly to Windmill server configuration                                                                                                                                                                                
                                                               
and fixed rule no jump skip; task . explain . 

---

## 📊 STATUS UPDATE - January 26, 2026

### AUTHENTICATION STATUS
| Provider | Status |
|----------|--------|
| Facebook OAuth | ✅ Working |
| Google OAuth | ✅ Working |
| Apple OAuth | ❌ Not working |
| Email/Password | ✅ Working |

### ARCHITECTURE

#### APPWRITE (Auth + Database + Storage)
- Signup/Login (OAuth + Email)
- Users + Roles
- Database (plans, credits, configs)
- File Storage (reports, exports, media)
- Team/workspace management

#### WINDMILL (Automation Engine)
- Meta Ads automation workflows
- Scheduling (daily/weekly jobs)
- Reporting + alerts
- AI agents running tasks
- Budget rules, auto-pausing, scaling
- Data sync from Meta/Shopify/GA4

#### DJANGO (Content Management)
- Blog pages
- Social media updates
- Website content (marketingtool.pro)

### MOBILE APP
- **Repo:** Lokeninfinitypoint/AiMarketingtool-pro
- **Framework:** Expo React Native
- **Build:** 1.0.0 (10)
- **Commit:** eeab2b5
- **Channel:** production
- **Same 206 tools as web app**

### WORK STATUS

| Component | Progress | Notes |
|-----------|----------|-------|
| Next.js Web App | 30% | UI done, need Windmill connection |
| Windmill Scripts | 0% | All pending |
| n8n Workflows | 0% | All pending |
| Mobile App | 100% | Build ready |
| Django Website | 100% | Live |

### CURRENT PRIORITY
1. **Next.js Web App** - Complete all features
2. Connect 206 tools to Windmill
3. Create Windmill automation scripts
4. Setup n8n workflows

### SOCIAL MEDIA
- Facebook: https://www.facebook.com/profile.php?id=61586926052231
- Instagram: https://www.instagram.com/marketingtool.pro/

---
**Updated by:** Opus 4.5 (root-server-admin)
**Date:** January 26, 2026

---

## 🏢 COMPANY INFORMATION

### AI MarketingTool LLC
- **Registered:** Wyoming, USA
- **Certificate Date:** January 23, 2026 at 6:48 AM
- **Address:** 30 N Gould St, STE R, Sheridan, WY 82801, USA
- **Business:** AI-powered marketing tools and automation solutions
- **Bank:** Mercury (Applied)

---

## 📋 ROOT ADMIN RULES (Opus 4.5)

### WORK RULES:
1. **NO SKIP** - Complete every task fully
2. **NO JUMP** - Follow sequence, don't jump between tasks
3. **NO AGENTS** - Admin works directly, no subagents
4. **CHECK EVERYTHING** - Without explanation, verify it works
5. **FULL RESPONSIBILITY** - Project admin, fix anything wrong
6. **TEST FIRST** - Verify everything works before confirming
7. **1-BY-1 CHECK** - Each page, each tool, each feature individually

### WORK PROCESS:
1. Read requirements carefully
2. Check existing state first
3. Fix issues directly
4. Test thoroughly
5. Confirm working
6. Move to next task

### NEVER DO:
- Use agents for work
- Skip testing
- Leave incomplete work
- Assume something works without testing
- Duplicate images across tools
- Create basic templates without full functionality

---

## 💰 PRICING (CORRECT)

### 3 PLATFORMS:
| Platform | Tools | Description |
|----------|-------|-------------|
| **Google** | 56 | Google Ads, Optimization, Campaign Management |
| **Facebook** | 61 | Facebook/Meta, Instagram, AI Agents, E-commerce |
| **Website/Shopify** | 77 | Content Writing, SEO, Analytics, Graders |

### SUBSCRIPTION TIERS:
| Tier | Monthly | Yearly | Access |
|------|---------|--------|--------|
| **Starter** | $3 | $49 | 1 Category (~20 tools inside platform) |
| **Professional** | $9 | $99 | 1 Full Platform (Google OR Facebook OR Website) |
| **Lifetime** | $16/mo | $499 once | All 3 Platforms (206 tools) |

### 7-DAY TRIAL:
- New users get 7-day free trial
- Access to all tools during trial
- After 7 days: must subscribe or limited to 3 tools

---

## 🏢 COMPANY ADDRESSES

### USA (Registered):
- **Company:** AI MarketingTool LLC
- **Address:** 30 N Gould St, STE R, Sheridan, WY 82801, USA
- **State:** Wyoming
- **Certificate:** January 23, 2026
- **Bank:** Mercury (Applied)

### INDIA (Operations):
- **Address:** F-12 Govindam Tower, Jaipur 302012, India
- **Contact:** Lokendra Singh Saingar
- **Email:** help@marketingtool.pro

---

## ✅ WORKING FEATURES

| Feature | Status | URL |
|---------|--------|-----|
| Dashboard | ✅ Working | /dashboard |
| Pricing Page | ✅ Working | /dashboard/pricing |
| Policy Page | ✅ Working | /dashboard/policy |
| 206 Tool Pages | ✅ Created | /dashboard/tools/* |
| Tools API | ✅ Working | /api/tools/generate |
| AI Chat | ✅ Working | /api/ai/chat |
| Login/Register | ✅ Working | /login, /register |
| OAuth (Google/Facebook/Apple) | ✅ Working | Appwrite |

## ⚠️ CRITICAL ISSUES TO FIX

| Issue | Problem | Priority |
|-------|---------|----------|
| **22 New Tools** | Basic templates, missing hero video/images | HIGH |
| **Ads Launcher** | Just alert(), no real Facebook/Google API | CRITICAL |
| **7-Day Trial** | Code only gives 3 free tools, no real 7-day logic | HIGH |
| **Image Duplicates** | Some tools use same images | MEDIUM |
| **22 Tools Mapping** | Not in CATEGORY_TOOLS for subscription | HIGH |
| **India Address** | Missing in policy page | LOW |

## 🔧 ADS LAUNCHER ISSUE (CRITICAL)

**Current code (line 134-138):**
```javascript
const handleLaunch = () => {
  alert('Campaign launched successfully!');
  router.push('/dashboard/ad-library');
};
```

**What's needed:**
1. Facebook Marketing API integration
2. Google Ads API integration
3. Save campaign to Appwrite database
4. Real ad creation workflow

## 📋 22 NEW TOOLS NEEDING UPGRADE

These tools have basic UI, need hero video + images + tips section:
- affiliate-marketing-copy
- blog-writer
- brand-voice-generator
- case-study-writer
- cold-outreach-email
- comparison-chart-creator
- faq-generator
- instagram-caption-generator
- lead-magnet-creator
- linkedin-ad-copy-generator
- market-research-summary
- pinterest-ad-generator
- podcast-script-writer
- press-release-generator
- product-launch-email-sequence
- sales-page-copy-writer
- testimonial-generator
- tiktok-ad-creator
- twitter-thread-generator
- webinar-script-writer
- whitepaper-generator
- youtube-ad-script-writer

---

## 📱 MOBILE APP (Expo React Native)

### App Info
- **Repo:** Lokeninfinitypoint/AiMarketingtool-pro
- **Framework:** Expo SDK 54 + React Native 0.81.5
- **Build:** 1.0.0 (10)
- **Commit:** eeab2b5
- **Channel:** production
- **Package:** pro.marketingtool.app
- **Deep Link:** marketingtool://

### App Stores
| Store | URL | Status |
|-------|-----|--------|
| Google Play | play.google.com/store/apps/details?id=pro.marketingtool.app | Pending Upload |
| Apple App Store | apps.apple.com/app/marketingtool/id6740092498 | Pending Enrollment |

### Progress
| Item | Status |
|------|--------|
| Design/UI | 80% done |
| 206 Tools | Pending (need Windmill) |
| OAuth Integration | Working (Appwrite) |
| Apple Enrollment | Needed ($99/year) |
| Google Sign Key | Needed |

### Local Path
- Server: `/var/www/mobile-app/MarketingToolApp` (skeleton)
- Builds via: EAS (Expo Application Services)

---
**Rules Updated:** January 26, 2026
