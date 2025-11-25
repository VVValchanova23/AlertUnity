const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.selectDisaster': 'Select a disaster',
    'nav.fire': 'Fire',
    'nav.flood': 'Flood',
    'nav.earthquake': 'Earthquake',
    'nav.hurricane': 'Hurricane',
    'nav.contact': 'Contact',
    'nav.signIn': 'Sign In',
    'nav.joinNow': 'Join Now',
    'nav.reportFire': 'Report',
    'nav.reportFlood': 'Report',
    'nav.reportEarthquake': 'Report',
    'nav.reportHurricane': 'Report',
    'nav.liveMap': 'Live Map',
    'nav.history': 'History',
    'nav.reports': 'Reports',
    'nav.oceanWinds': 'Ocean Winds',
    'nav.windMap': 'Wind Map',
    
    // Index page - Carousel
    'carousel.fire': 'FIRE',
    'carousel.flood': 'FLOOD',
    'carousel.earthquake': 'EARTHQUAKE',
    'carousel.hurricane': 'HURRICANE',
    
    // Hero sections
    'hero.fire.title': 'Protecting Communities Through Early Fire Detection',
    'hero.fire.subtitle': 'Join over 2 million emergency responders, firefighters, and citizens in the world\'s largest fire alert network. Report incidents, receive alerts, and save lives together.',
    'hero.flood.title': 'Protecting Communities Through Early Flood Detection',
    'hero.flood.subtitle': "Join over 2 million emergency responders and citizens in the world's largest flood alert network. Report incidents, receive alerts, and help keep communities safe.",
    'hero.earthquake.title': 'Protecting Communities Through Early Earthquake Alerts',
    'hero.earthquake.subtitle': 'Join thousands of emergency responders and citizens in the world\'s largest earthquake alert network. Receive alerts, report incidents, and stay safe together.',
    'hero.hurricane.title': 'Protecting Communities Through Early Hurricane Warnings',
    'hero.hurricane.subtitle': 'Join thousands of responders and citizens in the world\'s most advanced hurricane alert network. Track storms, receive warnings, and stay safe.',
    
    // Buttons
    'btn.getStarted': 'Get Started Free',
    'btn.viewFeatures': 'View features',
    'btn.seeStatistics': 'See statistics',
    'btn.reportIncident': 'Report an Incident',
    'btn.signUpNow': 'Sign Up Now',
    'btn.learnMore': 'Learn More',
    'btn.currentStatus': 'Current hurricane status',
    'btn.oceanWinds': 'Ocean winds',
    
    // Stats
    'stats.activeUsers': 'Active Users',
    'stats.livesSaved': 'Lives Saved',
    'stats.peopleAssisted': 'People Assisted',
    'stats.evacuationsAssisted': 'Evacuations Assisted',
    'stats.avgResponseTime': 'Average Response Time',
    'stats.avgAlertTime': 'Average Alert Time',
    'stats.avgWarningLeadTime': 'Average Warning Lead Time',
    'stats.systemUptime': 'System Uptime',
    'stats.systemReliability': 'System Reliability',
    
    // Features section
    'features.title.fire': 'Powerful Features for Fire Safety',
    'features.title.flood': 'Powerful Features for Flood Safety',
    'features.title.earthquake': 'Powerful Features for Earthquake Safety',
    'features.title.hurricane': 'Powerful Features for Hurricane Safety',
    'features.subtitle.fire': 'Our comprehensive platform provides everything you need to detect, report, and respond to fire emergencies quickly and effectively.',
    'features.subtitle.flood': 'Our platform gives you everything needed to detect, report, and respond to flood emergencies quickly and effectively.',
    'features.subtitle.earthquake': 'Our platform helps you detect, report, and respond to earthquakes quickly and effectively.',
    'features.subtitle.hurricane': 'Our platform helps communities prepare for incoming storms with precise tracking and alerts.',
    
    'features.realTimeAlerts': 'Real-Time Alerts',
    'features.realTimeAlerts.fire': 'Receive instant notifications about flood incidents in your area with precise location data, water levels, and severity alerts.',
    'features.realTimeAlerts.flood': 'Receive instant notifications about flood incidents in your area with precise location data, water levels, and severity alerts.',
    'features.realTimeAlerts.earthquake': 'Receive instant notifications about earthquakes in your area with precise location and magnitude data.',
    'features.realTimeAlerts.hurricane': 'Receive instant warnings about approaching hurricanes, wind speeds, and threat levels.',
    
    'features.mobileReporting': 'Mobile Reporting',
    'features.mobileReporting.desc': 'Report fires instantly from your smartphone with photos, GPS coordinates, and emergency details.',
    'features.mobileReporting.flood': 'Report floods instantly from your smartphone with photos, GPS coordinates, and emergency details.',
    'features.mobileReporting.earthquake': 'Report seismic activity instantly from your smartphone with location and observations.',
    'features.mobileReporting.hurricane': 'Report storm damage, flooding, and strong wind incidents in real time.',
    
    'features.interactiveMaps': 'Interactive Maps',
    'features.interactiveMaps.fire': 'View real-time fire incidents on detailed maps with weather data, evacuation routes, and safe zones.',
    'features.interactiveMaps.flood': 'View real-time flood zones on maps with weather data, water rise predictions, and safe routes.',
    'features.interactiveMaps.earthquake': 'View real-time earthquake incidents on maps with safe zones and evacuation routes.',
    'features.interactiveMaps.hurricane': 'Track hurricane paths, wind fields, and evacuation zones using interactive maps.',
    
    'features.communityNetwork': 'Community Network',
    'features.communityNetwork.fire': 'Connect with local firefighters, emergency responders, and community volunteers in your area.',
    'features.communityNetwork.flood': 'Connect with local rescue teams, emergency responders, and volunteers in your area.',
    'features.communityNetwork.earthquake': 'Connect with local emergency responders, volunteers, and community members.',
    'features.communityNetwork.hurricane': 'Connect with storm responders, volunteers, and local authorities during hurricanes.',
    
    'features.aiDetection': 'AI Detection',
    'features.aiDetection.fire': 'Advanced AI algorithms analyze satellite imagery and sensor data to detect fires before they spread.',
    'features.aiDetection.flood': 'Advanced AI analyzes satellite and sensor data to detect rising water levels early.',
    'features.aiDetection.earthquake': 'Advanced algorithms analyze seismic data to detect earthquakes early and send alerts.',
    'features.aiDetection.hurricane': 'AI models analyze meteorological data to predict hurricane intensity and path.',
    
    'features.analyticsDashboard': 'Analytics Dashboard',
    'features.analyticsDashboard.fire': 'Track fire trends, response times, and community safety metrics with comprehensive analytics.',
    'features.analyticsDashboard.flood': 'Track flood trends, response times, and safety metrics with detailed analytics.',
    'features.analyticsDashboard.earthquake': 'Track earthquake trends, alert times, and community response with detailed analytics.',
    'features.analyticsDashboard.hurricane': 'View storm history, forecast accuracy, and community preparedness metrics.',
    
    // Gallery section
    'gallery.title.fire': 'Fire Alert Portal in Action',
    'gallery.title.flood': 'Flood Alert Portal in Action',
    'gallery.title.earthquake': 'Earthquake Response in Action',
    'gallery.title.hurricane': 'Hurricane Response in Action',
    'gallery.subtitle.fire': 'See how our platform is making a difference in communities worldwide',
    'gallery.subtitle.flood': 'See how our platform helps communities stay safe',
    'gallery.subtitle.earthquake': 'See how our platform helps communities stay safe and respond quickly.',
    'gallery.subtitle.hurricane': 'See how our platform supports communities during major storms.',
    
    'gallery.detection.fire': 'Wildfire Detection',
    'gallery.detection.flood': 'Flood Monitoring',
    'gallery.detection.earthquake': 'Seismic Detection',
    'gallery.detection.hurricane': 'Storm Tracking',
    'gallery.detection.fire.desc': 'Early detection of wildfires using satellite imagery and AI analysis',
    'gallery.detection.flood.desc': 'Early detection of rising water levels using advanced sensors',
    'gallery.detection.earthquake.desc': 'Early detection of earthquakes using seismic sensors and AI analysis.',
    'gallery.detection.hurricane.desc': 'Real-time monitoring of hurricane movement and wind intensity.',
    
    'gallery.response': 'Emergency Response',
    'gallery.response.fire': 'Coordinated response teams dispatched within minutes of fire detection',
    'gallery.response.flood': 'Rescue teams deployed within minutes of reported flooding',
    'gallery.response.earthquake': 'Coordinated rescue teams dispatched immediately after an earthquake.',
    'gallery.response.hurricane': 'Rescue teams deployed immediately after severe storm impact.',
    
    'gallery.alerts': 'Mobile Alerts',
    'gallery.alerts.desc': 'Instant notifications sent to all users in affected areas',
    'gallery.alerts.earthquake': 'Instant notifications sent to all users in affected areas.',
    'gallery.alerts.hurricane': 'Instant notifications reaching every person in the affected area.',
    
    'gallery.maps': 'Interactive Maps',
    'gallery.maps.fire': 'Real-time fire tracking with evacuation routes and safe zones',
    'gallery.maps.flood': 'Live flood tracking with predicted water flow and safe areas',
    'gallery.maps.earthquake': 'Real-time earthquake tracking with safe zones and evacuation guidance.',
    'gallery.maps.hurricane': 'Live wind maps, storm paths, and evacuation guidance.',
    
    'gallery.community': 'Community Support',
    'gallery.community.fire': 'Local communities working together to prevent and respond to fires',
    'gallery.community.flood': 'Communities united to stay informed and prepared',
    'gallery.community.earthquake': 'Local communities working together to prepare for and respond to earthquakes.',
    'gallery.community.hurricane': 'Local communities coordinating storm readiness and support.',
    
    'gallery.success': 'Success Stories',
    'gallery.success.fire': 'Thousands of lives saved and properties protected worldwide',
    'gallery.success.flood': 'Thousands protected thanks to early flood alerts',
    'gallery.success.earthquake': 'Thousands of lives saved and communities protected worldwide.',
    'gallery.success.hurricane': 'Thousands of families protected thanks to early warnings.',
    
    // CTA section
    'cta.title.fire': 'Ready to Make a Difference?',
    'cta.title.flood': 'Ready to Help Protect Communities?',
    'cta.title.earthquake': 'Stay Safe, Stay Prepared',
    'cta.title.hurricane': 'Stay Safe, Stay Prepared',
    'cta.description.fire': 'Join the Fire Alert Portal community today and help protect lives and property in your area. Every second counts in fire emergencies.',
    'cta.description.flood': 'Join the Flood Alert Portal community today and help safeguard lives and property. Every second matters during floods.',
    'cta.description.earthquake': 'Join the Earthquake Alert Network today and help protect lives in your community. Early alerts save lives.',
    'cta.description.hurricane': 'Join the Hurricane Alert Network and help protect communities from severe storms. Early preparation saves lives.',
    
    // Footer
    'footer.fire.title': 'Fire Alert Portal',
    'footer.flood.title': 'Flood Alert Portal',
    'footer.earthquake.title': 'Earthquake Alert Portal',
    'footer.hurricane.title': 'Hurricane Alert Portal',
    'footer.fire.desc': 'Protecting communities through early fire detection and rapid response coordination. Together, we can save lives and preserve what matters most.',
    'footer.flood.desc': 'Keeping communities safe through early flood detection and fast emergency response.',
    'footer.earthquake.desc': 'Protecting communities through early fire detection and rapid response coordination. Together, we can save lives and preserve what matters most.',
    'footer.hurricane.desc': 'Protecting communities through early hurricane detection and rapid storm response coordination.',
    
    'footer.quickLinks': 'Quick Links',
    'footer.home': 'Home',
    'footer.liveMap': 'Live map',
    'footer.adminPanel': 'Admin Panel',
    'footer.reportFlood': 'Report a flood',
    'footer.hurricaneHistory': 'Hurricane history',
    'footer.oceanMap': 'Ocean map',
    'footer.windMap': 'Wind map',
    
    'footer.resources': 'Resources',
    'footer.statistics': 'Statistics',
    'footer.contact': 'Contact',
    'footer.features': 'Features',
    
    'footer.contactInfo': 'Contact Info',
    'footer.emergencyCenter': 'Emergency Response Center',
    'footer.available247': 'Available 24/7 Worldwide',
    
    // Report forms
    'report.title.fire': 'Report a Fire',
    'report.title.flood': 'Report a Flood',
    'report.title.earthquake': 'Report an Earthquake',
    'report.title.hurricane': 'Report a Hurricane',
    'report.subtitle': 'Help keep your community safe by reporting fire incidents quickly and accurately. Your report will be immediately forwarded to local emergency services.',
    'report.subtitle.flood': 'Help keep your community safe by reporting flood incidents quickly and accurately. Your report will be immediately forwarded to local emergency services.',
    'report.subtitle.earthquake': 'Help keep your community safe by reporting earthquake incidents quickly and accurately. Your report will be immediately forwarded to local emergency services.',
    'report.subtitle.hurricane': 'Help emergency services respond faster by reporting hurricane conditions and damage in your area.',
    
    'report.details': 'Fire Report Details',
    'report.details.flood': 'Flood Report Details',
    'report.details.earthquake': 'Earthquake Report Details',
    'report.details.hurricane': 'Hurricane Report Details',
    
    'report.severity': 'Fire Severity',
    'report.severity.flood': 'Flood Severity',
    'report.severity.earthquake': 'Earthquake Severity',
    'report.severity.hurricane': 'Hurricane Severity',
    'report.severity.high': 'High',
    'report.severity.medium': 'Medium',
    'report.severity.low': 'Low',
    'report.severity.high.fire': 'Large flames, spreading rapidly',
    'report.severity.medium.fire': 'Moderate flames, contained',
    'report.severity.low.fire': 'Small flames, smoldering',
    'report.severity.high.flood': 'Severe flooding, strong currents',
    'report.severity.medium.flood': 'Roads flooded, moderate depth',
    'report.severity.low.flood': 'Light water accumulation in streets and yards',
    'report.severity.high.earthquake': 'Severe shaking, building damage',
    'report.severity.medium.earthquake': 'Strong shaking, items falling',
    'report.severity.low.earthquake': 'Light shaking, minimal damage',
    'report.severity.high.hurricane': 'Extreme winds, major structural damage',
    'report.severity.medium.hurricane': 'Strong winds, moderate damage',
    'report.severity.low.hurricane': 'Light winds, minor debris',
    
    'report.location': 'Fire Location',
    'report.location.flood': 'Flood Location',
    'report.location.earthquake': 'Earthquake Location',
    'report.location.hurricane': 'Hurricane Location',
    'report.latitude': 'Latitude',
    'report.longitude': 'Longitude',
    'report.getCurrentLocation': 'Get My Current Location',
    
    'report.phone': 'Phone Number',
    'report.address': 'Street Address or Description',
    'report.addressPlaceholder': '123 Main St, or nearest landmark',
    'report.addressPlaceholder.generic': 'Street, area, or nearest landmark',
    
    'report.description': 'Fire Description',
    'report.description.flood': 'Flood Description',
    'report.description.earthquake': 'Earthquake Description',
    'report.description.hurricane': 'Hurricane Description',
    'report.descriptionPlaceholder.fire': 'Describe what you see: size of fire, what\'s burning, smoke color, wind direction, etc.',
    'report.descriptionPlaceholder.flood': 'Water depth, flow speed, blocked roads, trapped people, property damage, etc.',
    'report.descriptionPlaceholder.earthquake': 'Duration of shaking, building damage, structural cracks, trapped people, gas leaks, etc.',
    'report.descriptionPlaceholder.hurricane': 'Wind intensity, debris, structural damage, power outages, etc.',
    
    'report.uploadPhotos': 'Upload Photos/Videos',
    'report.uploadText': 'Click to upload or drag files here',
    'report.uploadSubtext': 'Images and videos help emergency responders assess the situation',
    'report.uploadSubtext.damage': 'Images and videos help emergency responders assess the damage',
    
    'report.additionalInfo': 'Additional Information',
    'report.additionalInfoPlaceholder': 'Any other details that might be helpful (people nearby, vehicles involved, etc.)',
    'report.additionalInfoPlaceholder.earthquake': 'Any other details that might be helpful (aftershocks felt, injuries, structural damage, etc.)',
    
    'report.submit': 'Submit Fire Report',
    'report.submit.flood': 'Submit Flood Report',
    'report.submit.earthquake': 'Submit Earthquake Report',
    'report.submit.hurricane': 'Submit Hurricane Report',
    'report.clearForm': 'Clear Form',
    
    // Safety tips
    'safety.title': 'Reporting Guidelines',
    'safety.title.flood': 'Flood Safety Tips',
    'safety.title.earthquake': 'Earthquake Safety Tips',
    'safety.title.hurricane': 'Hurricane Safety Tips',
    
    'safety.emergency': 'Emergency Situations',
    'safety.emergency.desc': 'If this is an active emergency with immediate danger to life or property, call 911 first, then submit this report.',
    'safety.evacuation': 'Evacuation',
    'safety.evacuation.flood': 'Move to higher ground immediately if water levels rise quickly. Follow official evacuation instructions.',
    'safety.evacuation.hurricane': 'Follow evacuation orders immediately. Move inland or to designated shelters.',
    
    'safety.duringShaking': 'During Shaking',
    'safety.duringShaking.desc': 'Drop, Cover, and Hold On. Get under a sturdy desk or table and protect your head and neck.',
    'safety.afterQuake': 'After the Quake',
    'safety.afterQuake.desc': 'Exit the building carefully and move to an open area away from structures. Be prepared for aftershocks.',
    
    'safety.windSafety': 'Wind Safety',
    'safety.windSafety.desc': 'Stay indoors and away from windows. Secure loose outdoor items.',
    'safety.homeSafety': 'Home Safety',
    'safety.homeSafety.flood': 'Turn off electricity and gas if safe to do so. Avoid walking or wading through floodwater indoors.',
    'safety.homeSafety.hurricane': 'Turn off electricity if flooding is likely. Avoid going outside during the storm.',
    'safety.homeSafety.earthquake': 'Check for structural damage, gas leaks, and electrical issues. Do not enter damaged buildings.',
    
    'safety.roadSafety': 'Road Safety',
    'safety.roadSafety.desc': 'Do not attempt to drive through flooded roads. Even shallow water can sweep a vehicle away.',
    'safety.afterStorm': 'After the Storm',
    'safety.afterStorm.desc': 'Watch for downed power lines and unstable debris. Do not return home until officials say it\'s safe.',
    'safety.avoidHazards': 'Avoid Hazards',
    'safety.avoidHazards.desc': 'Stay away from windows, heavy furniture, and exterior walls. Watch for falling debris and damaged power lines.',
    
    'safety.locationAccuracy': 'Location Accuracy',
    'safety.locationAccuracy.desc': 'Provide the most accurate location possible. Use landmarks if exact addresses aren\'t available.',
    'safety.photoGuidelines': 'Photo Guidelines',
    'safety.photoGuidelines.desc': 'Take photos from a safe distance. Include wide shots showing the overall scene and close-ups of specific details.',
    'safety.reportTiming': 'Report Timing',
    'safety.reportTiming.desc': 'Submit reports as soon as it\'s safe to do so. Time-sensitive information helps emergency responders.',
    
    'safety.emergencyContacts': 'Emergency Contacts',
    'safety.emergency112': 'Emergency: 112',
    'safety.nonEmergency': 'Non-Emergency: +359 2 123 4567',
    'safety.reportStatus': 'Report Status: support@firealert.com',
    'safety.reportStatus.flood': 'Report Status: support@floodalert.com',
    'safety.reportStatus.earthquake': 'Report Status: support@earthquakealert.com',
    'safety.reportStatus.hurricane': 'Report Status: support@hurricanealert.com',
    
    // Admin Panel
    'admin.title': 'Admin Panel',
    'admin.search': 'Search users...',
    'admin.exportPDF': 'Export to PDF',
    'admin.firstName': 'First Name',
    'admin.lastName': 'Last Name',
    'admin.role': 'Role',
    'admin.phone': 'Phone',
    'admin.email': 'Email',
    'admin.actions': 'Actions',
    'admin.editUser': 'Edit User',
    'admin.deleteUser': 'Delete User',
    'admin.confirmDeletion': 'Confirm Deletion',
    'admin.deleteWarning': 'This action cannot be undone. The user will be permanently removed from the system.',
    'admin.deleteQuestion': 'Are you sure you want to delete',
    'admin.cancel': 'Cancel',
    'admin.saveChanges': 'Save Changes',
    'admin.citizen': 'Citizen',
    'admin.firefighter': 'Firefighter',
    'admin.admin': 'Admin',
    
    // Auth pages
    'auth.signIn': 'Sign In',
    'auth.signUp': 'Sign Up',
    'auth.changePassword': 'Change Password',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.oldPassword': 'Old Password',
    'auth.newPassword': 'New Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.backToSignIn': 'Back to Sign In',
    'auth.noAccount': 'Don\'t have an account?',
    'auth.hasAccount': 'Already have an account?',
    'auth.registerAlert': 'Register for emergency alerts!',
    'auth.signInHere': 'Sign in here',
    'auth.createAccount': 'Create Account',
    'auth.firstName': 'First Name',
    'auth.lastName': 'Last Name',
    'auth.emailAddress': 'Email Address',
    'auth.phoneNumber': 'Phone Number',
    'auth.selectRole': 'Select Your Role',
    'auth.citizenReporter': 'Citizen Reporter',
    'auth.firefighter': 'Firefighter',
    'auth.selectRegion': 'Select Region',
    'auth.createPassword': 'Create Password',
    'auth.joinResponders': 'Join over',
    'auth.respondersWorldwide': 'emergency responders worldwide',
    
    // Contact page
    'contact.title': 'CONTACT US',
    'contact.subtitle': 'Need help? You are welcome to contact us 24 hours a day and we will answer your questions',
    'contact.visitUs': 'VISIT US',
    'contact.visitDesc': 'Come see us or get in touch – we\'re here to provide assistance, information, and support whenever you need it.',
    'contact.callUs': 'CALL US',
    'contact.callDesc': 'Reach out instantly from your smartphone – share photos, GPS coordinates, and critical details to help us respond fast.',
    'contact.emailUs': 'EMAIL US',
    'contact.emailDesc': 'Send us an email with your questions, fire reports, or feedback. Our team will provide the help and information you need.',
    
    // Features page
    'features.pageTitle': 'FUNCTIONALITIES OF THE SYSTEM',
    'features.pageSubtitle': 'This page presents the main features of our application, created as a project for Information Technology. The goal is to develop a functional system for reporting fires and coordinating teams.',
    'features.autoLocation': 'Automatic Location Detection',
    'features.autoLocation.desc': 'When a report is submitted, the system automatically detects the user\'s location via GPS or IP geolocation. This is crucial for a quick response from teams, eliminating the need to clarify the address and saving valuable time.',
    'features.addPhotos': 'Adding Photos to Reports',
    'features.addPhotos.desc': 'Users can attach photos of the fire or the affected area. This allows responders to assess the scale and specifics of the situation before arriving on-site. The feature is implemented using an HTML input of type \'file\' and JavaScript for visualization.',
    'features.notifications': 'Sending Notifications',
    'features.notifications.desc': 'The system includes an automated notification function to alert responsible parties when a new report is submitted. Notifications can be sent via email (SMTP) or, in the future, through a Telegram bot or notification API.',
    'features.navigation': 'Navigation to the Incident Site',
    'features.navigation.desc': 'Thanks to integration with ArcGIS or Mapbox, teams can receive direct directions to the incident location. This helps reduce response time and avoid delays.',
    'features.database': 'Database Storage',
    'features.database.desc': 'All reports are stored in a database containing critical information—location, date, time, fire type, and status. This is essential for long-term statistics and analysis.',
    'features.analysis': 'Analysis and Statistics',
    'features.analysis.desc': 'The system includes basic statistics: the number of reports per day, types of fires, and distribution by region. Data can be visualized using charts with Chart.js or SVG elements.',
    
    // Statistics page
    'statistics.fire': 'Fire',
    'statistics.flood': 'Flood',
    'statistics.hurricane': 'Hurricane',
    'statistics.earthquake': 'Earthquake',
    'statistics.activeIncidents': 'Active Incidents',
    'statistics.fireStats': 'Fire Statistics',
    'statistics.floodStats': 'Flood Statistics', 
    'statistics.earthquakeStats': 'Earthquake Statistics',
    'statistics.hurricaneStats': 'Hurricane Statistics',
    'statistics.severity': 'Severity Distribution',
    'statistics.monthlyIncidents': 'Monthly Incidents By Severity',
    'statistics.totalReports': 'Total Reports',
    'statistics.hourlyIncidents': 'Hourly Incidents',

    'chart.severity': 'Severity',
    'chart.month': 'Month',
    'chart.hour': 'Hour',
    'chart.reports': 'Reports',
    'chart.incidents': 'Incidents',
    
    // Map pages
    'map.liveActivity.fire': 'Live Fire Activity',
    'map.liveActivity.flood': 'Live Flood Activity',
    'map.liveActivity.earthquake': 'Live Earthquake Activity',
    'map.liveActivity.hurricane': 'Live Hurricane Activity',
    'map.activeFires': 'Active Fires',
    'map.activeFloods': 'Active Floods',
    'map.activeEarthquakes': 'Active Earthquakes',
    'map.activeHurricanes': 'Active Hurricanes',
    'map.highPriority': 'High Priority',
    'map.updated': 'Updated:',
    'map.severity': 'Fire Severity',
    'map.severity.flood': 'Flood Severity',
    'map.severity.earthquake': 'Earthquakes Severity',
    'map.severity.hurricane': 'Hurricane Severity',
    'map.highRisk': 'High Risk',
    'map.mediumRisk': 'Medium Risk',
    'map.lowRisk': 'Low Risk',
    'map.allFires': 'All Fires',
    'map.allFloods': 'All Floods',
    'map.allEarthquakes': 'All Earthquakes',
    'map.allHurricanes': 'All Hurricanes',
    'map.highRiskOnly': 'High Risk Only',
    'map.last24h': 'Last 24h',
    'map.refresh': 'Refresh',
    
    // History pages
    'history.fireHistory': 'Fire Report History',
    'history.globalWildfire': 'Global Wildfire Map',
    'history.selectRegion': 'Select Region:',
    'history.globalView': 'Global View',
    'history.timeRange': 'Time Range:',
    'history.last24hours': 'Last 24 Hours',
    'history.last3days': 'Last 3 Days',
    'history.last7days': 'Last 7 Days',
    'history.last14days': 'Last 14 Days',
    'history.last30days': 'Last 30 Days',
    'history.activeFireDetections': 'Active Fire Detections',
    'history.avgFirePower': 'Average Fire Power (MW)',
    'history.fireIntensity': 'Fire Intensity',
    'history.lowIntensity': 'Low Intensity',
    'history.mediumIntensity': 'Medium Intensity',
    'history.highIntensity': 'High Intensity',
    'history.dataSource': 'Data from NASA FIRMS (MODIS)',
    'history.heightInfo': 'Height = Fire Radiative Power',
    'history.loading': 'Loading Global Fire Data...',
    'history.search': 'Search fire reports...',
    'history.allStatuses': 'All Statuses',
    'history.active': 'Active',
    'history.inactive': 'Inactive',
    'history.falseAlarm': 'False Alarm',
    'history.allSeverities': 'All Severities',
    'history.low': 'Low',
    'history.medium': 'Medium',
    'history.high': 'High',
    'history.getAIFeedback': 'Get AI Feedback',
    'history.dateTime': 'Date/Time',
    'history.location': 'Location',
    'history.reporter': 'Reporter',
    'history.severity': 'Severity',
    'history.status': 'Status',
    'history.description': 'Description',
    'history.reportDetails': 'Fire Report Details',
    'history.reportId': 'Report ID:',
    'history.coordinates': 'Coordinates:',
    'history.reporterContact': 'Reporter Contact:',
    'history.severityLevel': 'Severity Level:',
    'history.currentStatus': 'Current Status:',
    'history.attachedImage': 'Attached Image:',
    'history.close': 'Close',
    'history.updateStatus': 'Update Report Status',
    'history.updateBtn': 'Update Status',
    'history.confirmDeletion': 'Confirm Deletion',
    'history.deleteWarning': 'This action cannot be undone. The fire report will be permanently removed from the system.',
    'history.deleteQuestion': 'Are you sure you want to delete this fire report?',
    'history.deleteReport': 'Delete Report',
    'history.aiFeedback': 'AI Fire Prediction Analysis',
    
    // Regions
    'region.northwestern': 'Northwestern region',
    'region.northern': 'Northern Region',
    'region.northeastern': 'Northeastern Region',
    'region.southwestern': 'Southwestern Region',
    'region.southern': 'Southern Region',
    'region.southeastern': 'Southeastern Region',
    
    // Hurricane history
    'hurricane.history.title': 'Hurricane History',
    'hurricane.history.hurricaneDetails': 'Hurricane Details',
    'hurricane.history.name': 'Name',
    'hurricane.history.season': 'Season',
    'hurricane.history.maxWind': 'Max Wind Speed',
    'hurricane.history.pacific': 'Pacific',
    'hurricane.history.atlantic': 'Atlantic',
    'hurricane.history.exploreHurricanes': 'Explore Hurricanes',
    
    // Ocean wind map
    'ocean.flowControls': 'Flow Controls',
    'ocean.trailWidth': 'Trail width',
    'ocean.trailLength': 'Trail length',
    'ocean.density': 'Density',
    'ocean.flowSpeed': 'Flow speed',
    'ocean.maxPathLength': 'Maximum path length',
    'ocean.flowRepresentation': 'Flow representation',
    'ocean.to': 'To',
    'ocean.from': 'From',
    'ocean.capStyle': 'Cap style',
    'ocean.butt': 'Butt',
    'ocean.round': 'Round',
    'ocean.effectsEnabled': 'Effects enabled',
    
    // Wind map
    'wind.title': 'Wind Flow Tracker',
    'wind.windFlowControls': 'Wind Flow Controls',
    'wind.windInfo': 'Wind Information',
    'wind.dataSource': 'Data Source',
    'wind.date': 'Date',
    'wind.visualization': 'Visualization',
    'wind.nldas': 'NLDAS Hourly',
    'wind.flowRenderer': 'Flow Renderer',
    
    // Earthquake history
    'earthquake.history.title': 'Earthquake History',
    'earthquake.history.searchEarthquakes': 'Search Earthquakes',
    'earthquake.history.country': 'Country (optional)',
    'earthquake.history.countryPlaceholder': 'e.g., Japan, Chile, USA',
    'earthquake.history.minMagnitude': 'Minimum Magnitude',
    'earthquake.history.timeRange': 'Time Range (days)',
    'earthquake.history.maxResults': 'Max Results',
    'earthquake.history.loading': 'Loading earthquakes...',
    'earthquake.history.biggestEarthquakes': 'Biggest Earthquakes',
    'earthquake.history.magnitude': 'Magnitude',
    'earthquake.history.depth': 'Depth',
    'earthquake.history.time': 'Time',
    'earthquake.history.earthquakeDetails': 'Earthquake Details',
    
    // Fire report history
    'fireReport.exportPDF': 'Export to PDF',
    'fireReport.getAIFeedback': 'Get AI Feedback',
    'fireReport.searchReports': 'Search fire reports...',
    'fireReport.reportHistory': 'Fire Report History',
    
    // Modals
    'modal.close': 'Close',
    'modal.cancel': 'Cancel',
    'modal.confirm': 'Confirm',
    'modal.save': 'Save',
    'modal.delete': 'Delete',
    'modal.update': 'Update',
    
    // Notification messages
    'notification.reportSubmitted': 'Report submitted successfully',
    'notification.reportUpdated': 'Report updated',
    'notification.reportDeleted': 'Report deleted',
    'notification.error': 'An error occurred',
    'notification.loginSuccess': 'Login successful',
    'notification.loginFailed': 'Login failed',
    'notification.signupSuccess': 'Signup successful',
    'notification.passwordChanged': 'Password changed',
    
    // Map page elements
    'map.filters': 'Filters',
    'map.showAll': 'Show All',
    'map.showHighPriority': 'Show High Priority',
    'map.showRecent': 'Show Recent',
    'map.clearFilters': 'Clear Filters',
    
    // Form validation messages
    'validation.required': 'This field is required',
    'validation.emailInvalid': 'Invalid email address',
    'validation.passwordTooShort': 'Password must be at least 6 characters',
    'validation.passwordsNoMatch': 'Passwords do not match',
    'validation.phoneInvalid': 'Invalid phone number',
    
    // Loading states
    'loading.pleaseWait': 'Please wait...',
    'loading.loadingData': 'Loading data...',
    'loading.processing': 'Processing...',
    'loading.submitting': 'Submitting...',
    
    // Error messages
    'error.connectionFailed': 'Connection failed',
    'error.tryAgain': 'Try again',
    'error.dataNotFound': 'Data not found',
    'error.unauthorized': 'Unauthorized access',
    'error.sessionExpired': 'Session expired',
    
    // Success messages
    'success.saved': 'Saved successfully',
    'success.updated': 'Updated successfully',
    'success.deleted': 'Deleted successfully',
    'success.submitted': 'Submitted successfully',

    // Regions:
    'region.northAmerica': 'North America',
    'region.southAmerica': 'South America',
    'region.europe': 'Europe',
    'region.africa': 'Africa',
    'region.asia': 'Asia',
    'region.australia': 'Australia',
    'region.russia': 'Russia',
    'region.middleEast': 'Middle East',
    
    // Additional common phrases
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.ok': 'OK',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.finish': 'Finish',
    'common.more': 'More',
    'common.less': 'Less',
    'common.viewMore': 'View More',
    'common.viewLess': 'View Less',
    'common.showMore': 'Show More',
    'common.showLess': 'Show Less',
    'common.readMore': 'Read More',
    'common.readLess': 'Read Less',
    'common.loading': 'Loading',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.date': 'Date',
    'common.time': 'Time',
    'common.name': 'Name',
    'common.type': 'Type',
    'common.status': 'Status',
    'common.all': 'All',
    'common.none': 'None',
    'common.select': 'Select',
    'common.selected': 'Selected',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.download': 'Download',
    'common.upload': 'Upload',
    'common.export': 'Export',
    'common.import': 'Import',
    'common.print': 'Print',
    'common.share': 'Share',
    'common.copy': 'Copy',
    'common.paste': 'Paste',
    'common.cut': 'Cut',
    'common.undo': 'Undo',
    'common.redo': 'Redo',
    'common.reset': 'Reset',
    'common.clear': 'Clear',
    'common.apply': 'Apply',
    'common.settings': 'Settings',
    'common.help': 'Help',
    'common.about': 'About',
    'common.privacy': 'Privacy',
    'common.terms': 'Terms',
    'common.language': 'Language',
    'common.theme': 'Theme',
    'common.profile': 'Profile',
    'common.account': 'Account',
    'common.logout': 'Logout',
    'common.login': 'Login',
    'common.register': 'Register',
    'common.welcome': 'Welcome',
    'common.goodbye': 'Goodbye',
    'common.anonymous': 'Anonymous',
    'common.unknown': 'Unknown',
    'common.noDescription': 'No description provided',
    'common.summary': 'Summary',
    'common.totalReports': 'Total Reports',
    'common.highSeverity': 'High Severity Reports',
    'common.activeReports': 'Active Reports',
    'common.recommendations': 'Recommendations',
    'common.note': 'Note',
    'common.generatedOn': 'Generated on',
    'ai.fallbackMessage': 'Based on the current data, consider monitoring high-severity reports closely and ensure emergency services are prepared for rapid response.',
    'notification.aiUnavailable': 'AI service is currently unavailable. Showing basic analysis.',
    'notification.showingBasic': 'Showing basic analysis instead.',
    
  },
  
  bg: {
    // Навигация
    'nav.home': 'Начало',
    'nav.selectDisaster': 'Бедствия',
    'nav.fire': 'Пожар',
    'nav.flood': 'Наводнение',
    'nav.earthquake': 'Земетресение',
    'nav.hurricane': 'Ураган',
    'nav.contact': 'Контакти',
    'nav.signIn': 'Вход',
    'nav.joinNow': 'Регистрация',
    'nav.reportFire': 'Докладвай',
    'nav.reportFlood': 'Докладвай',
    'nav.reportEarthquake': 'Докладвай',
    'nav.reportHurricane': 'Докладвай',
    'nav.liveMap': 'Карта',
    'nav.history': 'История',
    'nav.reports': 'Доклади',
    'nav.oceanWinds': 'Океани',
    'nav.windMap': 'Ветрове',
    
    // Начална страница - Карусел
    'carousel.fire': 'ПОЖАР',
    'carousel.flood': 'НАВОДНЕНИЕ',
    'carousel.earthquake': 'ЗЕМЕТРЕСЕНИЕ',
    'carousel.hurricane': 'УРАГАН',
    
    // Заглавни секции
    'hero.fire.title': 'Защита на общностите чрез ранно откриване на пожари',
    'hero.fire.subtitle': 'Присъединете се към над 2 милиона спасители, пожарникари и граждани в най-голямата мрежа за оповестяване при пожар. Докладвайте инциденти, получавайте сигнали и спасявайте животи заедно.',
    'hero.flood.title': 'Защита на общностите чрез ранно откриване на наводнения',
    'hero.flood.subtitle': 'Присъединете се към над 2 милиона спасители и граждани в най-голямата мрежа за оповестяване при наводнение. Докладвайте инциденти, получавайте сигнали и помогнете за безопасността на общностите.',
    'hero.earthquake.title': 'Защита на общностите чрез ранни предупреждения за земетресения',
    'hero.earthquake.subtitle': 'Присъединете се към хиляди спасители и граждани в най-голямата мрежа за оповестяване при земетресение. Получавайте сигнали, докладвайте инциденти и останете в безопасност заедно.',
    'hero.hurricane.title': 'Защита на общностите чрез ранни предупреждения за урагани',
    'hero.hurricane.subtitle': 'Присъединете се към хиляди спасители и граждани в най-модерната мрежа за оповестяване при ураган. Следете бурите, получавайте предупреждения и останете в безопасност.',
    
    // Бутони
    'btn.getStarted': 'Започнете безплатно',
    'btn.viewFeatures': 'Вижте функциите',
    'btn.seeStatistics': 'Вижте статистиките',
    'btn.reportIncident': 'Докладвайте инцидент',
    'btn.signUpNow': 'Регистрирайте се сега',
    'btn.learnMore': 'Научете повече',
    'btn.currentStatus': 'Текущо състояние на урагана',
    'btn.oceanWinds': 'Океански ветрове',
    
    // Статистики
    'stats.activeUsers': 'Активни потребители',
    'stats.livesSaved': 'Спасени животи',
    'stats.peopleAssisted': 'Помогнати хора',
    'stats.evacuationsAssisted': 'Подпомогнати евакуации',
    'stats.avgResponseTime': 'Средно време за реакция',
    'stats.avgAlertTime': 'Средно време за сигнал',
    'stats.avgWarningLeadTime': 'Средно време за предупреждение',
    'stats.systemUptime': 'Време на работа на системата',
    'stats.systemReliability': 'Надеждност на системата',
    
    // Секция Функции
    'features.title.fire': 'Мощни функции за пожарна безопасност',
    'features.title.flood': 'Мощни функции за безопасност при наводнение',
    'features.title.earthquake': 'Мощни функции за безопасност при земетресение',
    'features.title.hurricane': 'Мощни функции за безопасност при ураган',
    'features.subtitle.fire': 'Нашата цялостна платформа предоставя всичко необходимо за откриване, докладване и реагиране на пожарни аварии бързо и ефективно.',
    'features.subtitle.flood': 'Нашата платформа ви дава всичко необходимо за откриване, докладване и реагиране на наводнения бързо и ефективно.',
    'features.subtitle.earthquake': 'Нашата платформа ви помага да откриете, докладвате и реагирате на земетресения бързо и ефективно.',
    'features.subtitle.hurricane': 'Нашата платформа помага на общностите да се подготвят за идващи бури с прецизно проследяване и сигнали.',
    
    'features.realTimeAlerts': 'Сигнали в реално време',
    'features.realTimeAlerts.fire': 'Получавайте незабавни известия за инциденти с наводнения във вашия район с прецизни данни за местоположението, нивата на водата и сигнали за сериозност.',
    'features.realTimeAlerts.flood': 'Получавайте незабавни известия за инциденти с наводнения във вашия район с прецизни данни за местоположението, нивата на водата и сигнали за сериозност.',
    'features.realTimeAlerts.earthquake': 'Получавайте незабавни известия за земетресения във вашия район с прецизни данни за местоположението и магнитудата.',
    'features.realTimeAlerts.hurricane': 'Получавайте незабавни предупреждения за приближаващи урагани, скорости на вятъра и нива на заплахата.',
    
    'features.mobileReporting': 'Мобилно докладване',
    'features.mobileReporting.desc': 'Докладвайте пожари незабавно от вашия смартфон със снимки, GPS координати и спешни детайли.',
    'features.mobileReporting.flood': 'Докладвайте наводнения незабавно от вашия смартфон със снимки, GPS координати и спешни детайли.',
    'features.mobileReporting.earthquake': 'Докладвайте сеизмична активност незабавно от вашия смартфон с местоположение и наблюдения.',
    'features.mobileReporting.hurricane': 'Докладвайте щети от бури, наводнения и силни ветрове в реално време.',
    
    'features.interactiveMaps': 'Интерактивни карти',
    'features.interactiveMaps.fire': 'Преглеждайте инциденти с пожари в реално време на подробни карти с метеорологични данни, маршрути за евакуация и безопасни зони.',
    'features.interactiveMaps.flood': 'Преглеждайте зони на наводнения в реално време на карти с метеорологични данни, прогнози за повишаване на водата и безопасни маршрути.',
    'features.interactiveMaps.earthquake': 'Преглеждайте инциденти със земетресения в реално време на карти с безопасни зони и маршрути за евакуация.',
    'features.interactiveMaps.hurricane': 'Следете пътищата на ураганите, ветрови полета и евакуационни зони, използвайки интерактивни карти.',
    
    'features.communityNetwork': 'Обществена мрежа',
    'features.communityNetwork.fire': 'Свържете се с местни пожарникари, спасители и доброволци от общността във вашия район.',
    'features.communityNetwork.flood': 'Свържете се с местни спасителни екипи, спасители и доброволци във вашия район.',
    'features.communityNetwork.earthquake': 'Свържете се с местни спасители, доброволци и членове на общността.',
    'features.communityNetwork.hurricane': 'Свържете се с реагиращи на бури, доброволци и местни власти по време на урагани.',
    
    'features.aiDetection': 'AI откриване',
    'features.aiDetection.fire': 'Усъвършенствани AI алгоритми анализират сателитни изображения и данни от сензори, за да открият пожари преди да се разпространят.',
    'features.aiDetection.flood': 'Усъвършенстваният AI анализира сателитни и сензорни данни, за да открие ранно повишаване на нивата на водата.',
    'features.aiDetection.earthquake': 'Усъвършенствани алгоритми анализират сеизмични данни, за да открият земетресения рано и да изпратят сигнали.',
    'features.aiDetection.hurricane': 'AI моделите анализират метеорологични данни, за да предскажат интензивността и пътя на урагана.',
    
    'features.analyticsDashboard': 'Аналитично табло',
    'features.analyticsDashboard.fire': 'Следете тенденциите на пожарите, времената за реакция и показателите за безопасност на общността с цялостна аналитика.',
    'features.analyticsDashboard.flood': 'Следете тенденциите на наводненията, времената за реакция и показателите за безопасност с подробна аналитика.',
    'features.analyticsDashboard.earthquake': 'Следете тенденциите на земетресенията, времената за предупреждение и реакцията на общността с подробна аналитика.',
    'features.analyticsDashboard.hurricane': 'Преглеждайте историята на бурите, точността на прогнозите и показателите за готовност на общността.',
    
    // Секция Галерия
    'gallery.title.fire': 'Портал за оповестяване при пожар в действие',
    'gallery.title.flood': 'Портал за оповестяване при наводнение в действие',
    'gallery.title.earthquake': 'Реакция при земетресение в действие',
    'gallery.title.hurricane': 'Реакция при ураган в действие',
    'gallery.subtitle.fire': 'Вижте как нашата платформа прави разлика в общностите по целия свят',
    'gallery.subtitle.flood': 'Вижте как нашата платформа помага на общностите да останат в безопасност',
    'gallery.subtitle.earthquake': 'Вижте как нашата платформа помага на общностите да останат в безопасност и да реагират бързо.',
    'gallery.subtitle.hurricane': 'Вижте как нашата платформа подкрепя общностите по време на големи бури.',
    
    'gallery.detection.fire': 'Откриване на пожари',
    'gallery.detection.flood': 'Мониторинг на наводнения',
    'gallery.detection.earthquake': 'Сеизмично откриване',
    'gallery.detection.hurricane': 'Проследяване на бури',
    'gallery.detection.fire.desc': 'Ранно откриване на пожари чрез сателитни изображения и AI анализ',
    'gallery.detection.flood.desc': 'Ранно откриване на повишаване на нивата на водата с помощта на усъвършенствани сензори',
    'gallery.detection.earthquake.desc': 'Ранно откриване на земетресения с помощта на сеизмични сензори и AI анализ.',
    'gallery.detection.hurricane.desc': 'Мониторинг в реално време на движението на урагана и интензивността на вятъра.',
    
    'gallery.response': 'Спешна реакция',
    'gallery.response.fire': 'Координирани екипи за реакция, изпратени в рамките на минути след откриване на пожара',
    'gallery.response.flood': 'Спасителни екипи, разгърнати в рамките на минути след докладвано наводнение',
    'gallery.response.earthquake': 'Координирани спасителни екипи, изпратени незабавно след земетресение.',
    'gallery.response.hurricane': 'Спасителни екипи, разгърнати незабавно след тежко въздействие на бурята.',
    
    'gallery.alerts': 'Мобилни сигнали',
    'gallery.alerts.desc': 'Незабавни известия, изпратени до всички потребители в засегнатите райони',
    'gallery.alerts.earthquake': 'Незабавни известия, изпратени до всички потребители в засегнатите райони.',
    'gallery.alerts.hurricane': 'Незабавни известия, достигащи до всеки човек в засегнатия район.',
    
    'gallery.maps': 'Интерактивни карти',
    'gallery.maps.fire': 'Проследяване на пожари в реално време с маршрути за евакуация и безопасни зони',
    'gallery.maps.flood': 'Проследяване на наводнения на живо с прогнозиран поток на водата и безопасни райони',
    'gallery.maps.earthquake': 'Проследяване на земетресения в реално време с безопасни зони и насоки за евакуация.',
    'gallery.maps.hurricane': 'Карти на ветровете на живо, пътища на бурите и насоки за евакуация.',
    
    'gallery.community': 'Обществена подкрепа',
    'gallery.community.fire': 'Местни общности, работещи заедно за предотвратяване и реакция на пожари',
    'gallery.community.flood': 'Общности, обединени да останат информирани и подготвени',
    'gallery.community.earthquake': 'Местни общности, работещи заедно за подготовка и реакция на земетресения.',
    'gallery.community.hurricane': 'Местни общности, координиращи готовността за буря и подкрепа.',
    
    'gallery.success': 'Истории на успеха',
    'gallery.success.fire': 'Хиляди спасени животи и защитени имоти по целия свят',
    'gallery.success.flood': 'Хиляди защитени благодарение на ранните сигнали за наводнение',
    'gallery.success.earthquake': 'Хиляди спасени животи и защитени общности по целия свят.',
    'gallery.success.hurricane': 'Хиляди семейства, защитени благодарение на ранните предупреждения.',
    
    // CTA секция
    'cta.title.fire': 'Готови ли сте да направите разлика?',
    'cta.title.flood': 'Готови ли сте да помогнете за защитата на общностите?',
    'cta.title.earthquake': 'Останете в безопасност, останете подготвени',
    'cta.title.hurricane': 'Останете в безопасност, останете подготвени',
    'cta.description.fire': 'Присъединете се към общността на портала за оповестяване при пожар днес и помогнете за защитата на животи и имущество във вашия район. Всяка секунда е важна при пожарни аварии.',
    'cta.description.flood': 'Присъединете се към общността на портала за оповестяване при наводнение днес и помогнете за защитата на животи и имущество. Всяка секунда е важна по време на наводнения.',
    'cta.description.earthquake': 'Присъединете се към мрежата за оповестяване при земетресение днес и помогнете за защитата на животи във вашата общност. Ранните сигнали спасяват животи.',
    'cta.description.hurricane': 'Присъединете се към мрежата за оповестяване при ураган и помогнете за защитата на общностите от тежки бури. Ранната подготовка спасява животи.',
    
    // Футър
    'footer.fire.title': 'Портал за оповестяване при пожар',
    'footer.flood.title': 'Портал за оповестяване при наводнение',
    'footer.earthquake.title': 'Портал за оповестяване при земетресение',
    'footer.hurricane.title': 'Портал за оповестяване при ураган',
    'footer.fire.desc': 'Защита на общностите чрез ранно откриване на пожари и бърза координация на реакцията. Заедно можем да спасим животи и да запазим най-важното.',
    'footer.flood.desc': 'Поддържане на безопасността на общностите чрез ранно откриване на наводнения и бърза спешна реакция.',
    'footer.earthquake.desc': 'Защита на общностите чрез ранно откриване на пожари и бърза координация на реакцията. Заедно можем да спасим животи и да запазим най-важното.',
    'footer.hurricane.desc': 'Защита на общностите чрез ранно откриване на урагани и бърза координация на реакцията при буря.',
    
    'footer.quickLinks': 'Бързи връзки',
    'footer.home': 'Начало',
    'footer.liveMap': 'Карта на живо',
    'footer.adminPanel': 'Админ панел',
    'footer.reportFlood': 'Докладвай наводнение',
    'footer.hurricaneHistory': 'История на ураганите',
    'footer.oceanMap': 'Океанска карта',
    'footer.windMap': 'Карта на ветровете',
    
    'footer.resources': 'Ресурси',
    'footer.statistics': 'Статистики',
    'footer.contact': 'Контакти',
    'footer.features': 'Функции',
    
    'footer.contactInfo': 'Информация за контакт',
    'footer.emergencyCenter': 'Център за спешна реакция',
    'footer.available247': 'Достъпни 24/7 по целия свят',
    
    // Формуляри за докладване
    'report.title.fire': 'Докладвай пожар',
    'report.title.flood': 'Докладвай наводнение',
    'report.title.earthquake': 'Докладвай земетресение',
    'report.title.hurricane': 'Докладвай ураган',
    'report.subtitle': 'Помогнете да поддържате безопасността на вашата общност, като докладвате инциденти с пожари бързо и точно. Вашият доклад ще бъде незабавно препратен до местните спешни служби.',
    'report.subtitle.flood': 'Помогнете да поддържате безопасността на вашата общност, като докладвате инциденти с наводнения бързо и точно. Вашият доклад ще бъде незабавно препратен до местните спешни служби.',
    'report.subtitle.earthquake': 'Помогнете да поддържате безопасността на вашата общност, като докладвате инциденти със земетресения бързо и точно. Вашият доклад ще бъде незабавно препратен до местните спешни служби.',
    'report.subtitle.hurricane': 'Помогнете на спешните служби да реагират по-бързо, като докладвате условията на урагана и щетите във вашия район.',
    
    'report.details': 'Детайли на доклада за пожар',
    'report.details.flood': 'Детайли на доклада за наводнение',
    'report.details.earthquake': 'Детайли на доклада за земетресение',
    'report.details.hurricane': 'Детайли на доклада за ураган',
    
    'report.severity': 'Сериозност на пожара',
    'report.severity.flood': 'Сериозност на наводнението',
    'report.severity.earthquake': 'Сериозност на земетресението',
    'report.severity.hurricane': 'Сериозност на урагана',
    'report.severity.high': 'Висока',
    'report.severity.medium': 'Средна',
    'report.severity.low': 'Ниска',
    'report.severity.high.fire': 'Големи пламъци, бързо разпространение',
    'report.severity.medium.fire': 'Умерени пламъци, овладян',
    'report.severity.low.fire': 'Малки пламъци, тлеещ',
    'report.severity.high.flood': 'Тежко наводнение, силни течения',
    'report.severity.medium.flood': 'Наводнени пътища, умерена дълбочина',
    'report.severity.low.flood': 'Леко натрупване на вода по улиците и дворовете',
    'report.severity.high.earthquake': 'Тежко разклащане, щети по сгради',
    'report.severity.medium.earthquake': 'Силно разклащане, падащи предмети',
    'report.severity.low.earthquake': 'Леко разклащане, минимални щети',
    'report.severity.high.hurricane': 'Екстремни ветрове, големи структурни щети',
    'report.severity.medium.hurricane': 'Силни ветрове, умерени щети',
    'report.severity.low.hurricane': 'Леки ветрове, незначителни отломки',
    
    'report.location': 'Местоположение на пожара',
    'report.location.flood': 'Местоположение на наводнението',
    'report.location.earthquake': 'Местоположение на земетресението',
    'report.location.hurricane': 'Местоположение на урагана',
    'report.latitude': 'Ширина',
    'report.longitude': 'Дължина',
    'report.getCurrentLocation': 'Вземете моето текущо местоположение',
    
    'report.phone': 'Телефонен номер',
    'report.address': 'Улица или описание',
    'report.addressPlaceholder': 'ул. Главна 123, или най-близък ориентир',
    'report.addressPlaceholder.generic': 'Улица, район или най-близък ориентир',
    
    'report.description': 'Описание на пожара',
    'report.description.flood': 'Описание на наводнението',
    'report.description.earthquake': 'Описание на земетресението',
    'report.description.hurricane': 'Описание на урагана',
    'report.descriptionPlaceholder.fire': 'Опишете какво виждате: размер на пожара, какво гори, цвят на дима, посока на вятъра и др.',
    'report.descriptionPlaceholder.flood': 'Дълбочина на водата, скорост на потока, блокирани пътища, хора в капан, щети по имущество и др.',
    'report.descriptionPlaceholder.earthquake': 'Продължителност на разклащането, щети по сгради, структурни пукнатини, хора в капан, теч на газ и др.',
    'report.descriptionPlaceholder.hurricane': 'Интензивност на вятъра, отломки, структурни щети, спиране на електричеството и др.',
    
    'report.uploadPhotos': 'Качване на снимки/видеа',
    'report.uploadText': 'Кликнете, за да качите или плъзнете файлове тук',
    'report.uploadSubtext': 'Изображения и видеа помагат на спасителите да оценят ситуацията',
    'report.uploadSubtext.damage': 'Изображения и видеа помагат на спасителите да оценят щетите',
    
    'report.additionalInfo': 'Допълнителна информация',
    'report.additionalInfoPlaceholder': 'Всякакви други детайли, които могат да бъдат полезни (хора наблизо, превозни средства и др.)',
    'report.additionalInfoPlaceholder.earthquake': 'Всякакви други детайли, които могат да бъдат полезни (усещани вторични трусове, наранявания, структурни щети и др.)',
    
    'report.submit': 'Изпрати доклад за пожар',
    'report.submit.flood': 'Изпрати доклад за наводнение',
    'report.submit.earthquake': 'Изпрати доклад за земетресение',
    'report.submit.hurricane': 'Изпрати доклад за ураган',
    'report.clearForm': 'Изчисти формуляра',
    
    // Съвети за безопасност
    'safety.title': 'Насоки за докладване',
    'safety.title.flood': 'Съвети за безопасност при наводнение',
    'safety.title.earthquake': 'Съвети за безопасност при земетресение',
    'safety.title.hurricane': 'Съвети за безопасност при ураган',
    
    'safety.emergency': 'Спешни ситуации',
    'safety.emergency.desc': 'Ако това е активна аварийна ситуация с непосредствена опасност за живота или имуществото, обадете се първо на 112, след това подайте този доклад.',
    'safety.evacuation': 'Евакуация',
    'safety.evacuation.flood': 'Преместете се на по-високо място незабавно, ако нивата на водата се повишават бързо. Следвайте официалните инструкции за евакуация.',
    'safety.evacuation.hurricane': 'Следвайте заповедите за евакуация незабавно. Преместете се навътре в сушата или в определени убежища.',
    
    'safety.duringShaking': 'По време на разклащане',
    'safety.duringShaking.desc': 'Сгънете се, прикрийте се и се задръжте. Скрийте се под здраво бюро или маса и защитете главата и врата си.',
    'safety.afterQuake': 'След земетресението',
    'safety.afterQuake.desc': 'Излезте внимателно от сградата и се преместете на открито място далеч от конструкциите. Бъдете подготвени за вторични трусове.',
    
    'safety.windSafety': 'Безопасност от вятър',
    'safety.windSafety.desc': 'Останете на закрито и далеч от прозорците. Закрепете неплътни външни предмети.',
    'safety.homeSafety': 'Домашна безопасност',
    'safety.homeSafety.flood': 'Изключете електричеството и газа, ако е безопасно да го направите. Избягвайте да ходите или газите през наводнена вода на закрито.',
    'safety.homeSafety.hurricane': 'Изключете електричеството, ако е вероятно наводнение. Избягвайте да излизате по време на бурята.',
    'safety.homeSafety.earthquake': 'Проверете за структурни щети, течове на газ и електрически проблеми. Не влизайте в повредени сгради.',
    
    'safety.roadSafety': 'Пътна безопасност',
    'safety.roadSafety.desc': 'Не се опитвайте да шофирате през наводнени пътища. Дори плитката вода може да отнесе превозно средство.',
    'safety.afterStorm': 'След бурята',
    'safety.afterStorm.desc': 'Внимавайте за паднали електропроводи и нестабилни отломки. Не се връщайте у дома, докато длъжностни лица не кажат, че е безопасно.',
    'safety.avoidHazards': 'Избягвайте опасности',
    'safety.avoidHazards.desc': 'Стойте далеч от прозорци, тежки мебели и външни стени. Внимавайте за падащи отломки и повредени електропроводи.',
    
    'safety.locationAccuracy': 'Точност на местоположението',
    'safety.locationAccuracy.desc': 'Предоставете възможно най-точното местоположение. Използвайте ориентири, ако точните адреси не са налични.',
    'safety.photoGuidelines': 'Насоки за снимки',
    'safety.photoGuidelines.desc': 'Правете снимки от безопасно разстояние. Включете широки кадри, показващи цялата сцена, и близки планове на конкретни детайли.',
    'safety.reportTiming': 'Време за докладване',
    'safety.reportTiming.desc': 'Подавайте доклади веднага щом е безопасно да го направите. Чувствителната към времето информация помага на спасителите.',
    
    'safety.emergencyContacts': 'Спешни контакти',
    'safety.emergency112': 'Спешна помощ: 112',
    'safety.nonEmergency': 'Не е спешно: +359 2 123 4567',
    'safety.reportStatus': 'Състояние на доклада: support@firealert.com',
    'safety.reportStatus.flood': 'Състояние на доклада: support@floodalert.com',
    'safety.reportStatus.earthquake': 'Състояние на доклада: support@earthquakealert.com',
    'safety.reportStatus.hurricane': 'Състояние на доклада: support@hurricanealert.com',
    
    // Админ панел
    'admin.title': 'Админ панел',
    'admin.search': 'Търсене на потребители...',
    'admin.exportPDF': 'Експорт в PDF',
    'admin.firstName': 'Име',
    'admin.lastName': 'Фамилия',
    'admin.role': 'Роля',
    'admin.phone': 'Телефон',
    'admin.email': 'Имейл',
    'admin.actions': 'Действия',
    'admin.editUser': 'Редактирай потребител',
    'admin.deleteUser': 'Изтрий потребител',
    'admin.confirmDeletion': 'Потвърждаване на изтриването',
    'admin.deleteWarning': 'Това действие не може да бъде отменено. Потребителят ще бъде окончателно премахнат от системата.',
    'admin.deleteQuestion': 'Сигурни ли сте, че искате да изтриете',
    'admin.cancel': 'Отказ',
    'admin.saveChanges': 'Запази промените',
    'admin.citizen': 'Гражданин',
    'admin.firefighter': 'Пожарникар',
    'admin.admin': 'Администратор',
    
    // Страници за удостоверяване
    'auth.signIn': 'Вход',
    'auth.signUp': 'Регистрация',
    'auth.changePassword': 'Смяна на паролата',
    'auth.email': 'Имейл',
    'auth.password': 'Парола',
    'auth.oldPassword': 'Стара парола',
    'auth.newPassword': 'Нова парола',
    'auth.confirmPassword': 'Потвърди паролата',
    'auth.backToSignIn': 'Обратно към влизането',
    'auth.noAccount': 'Нямате акаунт?',
    'auth.hasAccount': 'Вече имате акаунт?',
    'auth.registerAlert': 'Регистрирайте се за спешни сигнали!',
    'auth.signInHere': 'Влезте тук',
    'auth.createAccount': 'Създай акаунт',
    'auth.firstName': 'Име',
    'auth.lastName': 'Фамилия',
    'auth.emailAddress': 'Имейл адрес',
    'auth.phoneNumber': 'Телефонен номер',
    'auth.selectRole': 'Изберете вашата роля',
    'auth.citizenReporter': 'Гражданин докладчик',
    'auth.firefighter': 'Пожарникар',
    'auth.selectRegion': 'Изберете регион',
    'auth.createPassword': 'Създайте парола',
    'auth.joinResponders': 'Присъединете се към над',
    'auth.respondersWorldwide': 'спасители по целия свят',
    
    // Страница за контакти
    'contact.title': 'СВЪРЖЕТЕ СЕ С НАС',
    'contact.subtitle': 'Нуждаете се от помощ? Можете да се свържете с нас 24 часа в денонощието и ние ще отговорим на въпросите ви',
    'contact.visitUs': 'ПОСЕТЕТЕ НИ',
    'contact.visitDesc': 'Елате да ни видите или се свържете – ние сме тук, за да предоставим помощ, информация и подкрепа, когато имате нужда.',
    'contact.callUs': 'ОБАДЕТЕ НИ СЕ',
    'contact.callDesc': 'Свържете се незабавно от вашия смартфон – споделете снимки, GPS координати и критични детайли, за да ни помогнете да реагираме бързо.',
    'contact.emailUs': 'ИЗПРАТЕТЕ НИ ИМЕЙЛ',
    'contact.emailDesc': 'Изпратете ни имейл с вашите въпроси, доклади за пожари или обратна връзка. Нашият екип ще предостави необходимата помощ и информация.',
    
    // Страница за функции
    'features.pageTitle': 'ФУНКЦИОНАЛНОСТИ НА СИСТЕМАТА',
    'features.pageSubtitle': 'Тази страница представя основните функции на нашето приложение, създадено като проект по информационни технологии. Целта е да се разработи функционална система за докладване на пожари и координиране на екипи.',
    'features.autoLocation': 'Автоматично откриване на местоположението',
    'features.autoLocation.desc': 'Когато се подаде доклад, системата автоматично открива местоположението на потребителя чрез GPS или IP геолокация. Това е от решаващо значение за бърза реакция от екипите, елиминиране на необходимостта от изясняване на адреса и спестяване на ценно време.',
    'features.addPhotos': 'Добавяне на снимки към докладите',
    'features.addPhotos.desc': 'Потребителите могат да прикачат снимки на пожара или засегнатата зона. Това позволява на реагиращите да оценят мащаба и спецификата на ситуацията преди пристигането на място. Функцията е реализирана чрез HTML вход от тип \'file\' и JavaScript за визуализация.',
    'features.notifications': 'Изпращане на известия',
    'features.notifications.desc': 'Системата включва автоматизирана функция за известяване, за да предупреди отговорните страни, когато се подаде нов доклад. Известията могат да се изпращат чрез имейл (SMTP) или в бъдеще чрез Telegram бот или API за известия.',
    'features.navigation': 'Навигация до мястото на инцидента',
    'features.navigation.desc': 'Благодарение на интеграцията с ArcGIS или Mapbox, екипите могат да получат директни указания до мястото на инцидента. Това помага за намаляване на времето за реакция и избягване на забавяния.',
    'features.database': 'Съхранение в база данни',
    'features.database.desc': 'Всички доклади се съхраняват в база данни, съдържаща критична информация – местоположение, дата, час, тип пожар и състояние. Това е от съществено значение за дългосрочни статистики и анализ.',
    'features.analysis': 'Анализ и статистики',
    'features.analysis.desc': 'Системата включва основни статистики: броя доклади на ден, видове пожари и разпределение по региони. Данните могат да се визуализират с помощта на диаграми с Chart.js или SVG елементи.',
    
    // Страница за статистики
    'statistics.fire': 'Пожар',
    'statistics.flood': 'Наводнение',
    'statistics.hurricane': 'Ураган',
    'statistics.earthquake': 'Земетресение',
    'statistics.activeIncidents': 'Активни инциденти',
    'statistics.fireStats': 'Статистики за пожари',
    'statistics.floodStats': 'Статистики за наводнения', 
    'statistics.earthquakeStats': 'Статистики за земетресения',
    'statistics.hurricaneStats': 'Статистики за урагани',
    'statistics.severity': 'Разпределение на тежестта',
    'statistics.monthlyIncidents': 'Месечни инциденти по сериозност',
    'statistics.totalReports': 'Общо доклади',
    'statistics.hourlyIncidents': 'Почасови инциденти',
    
    'chart.severity': 'Тежест',
    'chart.month': 'Месец',
    'chart.hour': 'Час',
    'chart.reports': 'Доклади',
    'chart.incidents': 'Случаи',
    
    // Страници с карти
    'map.liveActivity.fire': 'Пожарна активност на живо',
    'map.liveActivity.flood': 'Активност на наводнения на живо',
    'map.liveActivity.earthquake': 'Активност на земетресения на живо',
    'map.liveActivity.hurricane': 'Активност на урагани на живо',
    'map.activeFires': 'Активни пожари',
    'map.activeFloods': 'Активни наводнения',
    'map.activeEarthquakes': 'Активни земетресения',
    'map.activeHurricanes': 'Активни урагани',
    'map.highPriority': 'Висок приоритет',
    'map.updated': 'Актуализирано:',
    'map.severity': 'Сериозност на пожара',
    'map.severity.flood': 'Сериозност на наводнението',
    'map.severity.earthquake': 'Сериозност на земетресенията',
    'map.severity.hurricane': 'Сериозност на урагана',
    'map.highRisk': 'Висок риск',
    'map.mediumRisk': 'Среден риск',
    'map.lowRisk': 'Нисък риск',
    'map.allFires': 'Всички пожари',
    'map.allFloods': 'Всички наводнения',
    'map.allEarthquakes': 'Всички земетресения',
    'map.allHurricanes': 'Всички урагани',
    'map.highRiskOnly': 'Само висок риск',
    'map.last24h': 'Последните 24ч',
    'map.refresh': 'Опресни',
    
    // Страници с история
    'history.fireHistory': 'История на докладите за пожари',
    'history.globalWildfire': 'Глобална карта на пожарите',
    'history.selectRegion': 'Изберете регион:',
    'history.globalView': 'Глобален изглед',
    'history.timeRange': 'Времеви диапазон:',
    'history.last24hours': 'Последните 24 часа',
    'history.last3days': 'Последните 3 дни',
    'history.last7days': 'Последните 7 дни',
    'history.last14days': 'Последните 14 дни',
    'history.last30days': 'Последните 30 дни',
    'history.activeFireDetections': 'Активни открития на пожари',
    'history.avgFirePower': 'Средна сила на пожара (MW)',
    'history.fireIntensity': 'Интензивност на пожара',
    'history.lowIntensity': 'Ниска интензивност',
    'history.mediumIntensity': 'Средна интензивност',
    'history.highIntensity': 'Висока интензивност',
    'history.dataSource': 'Данни от NASA FIRMS (MODIS)',
    'history.heightInfo': 'Височина = Радиационна мощност на пожара',
    'history.loading': 'Зареждане на глобални данни за пожари...',
    'history.search': 'Търсене на доклади за пожари...',
    'history.allStatuses': 'Всички състояния',
    'history.active': 'Активен',
    'history.inactive': 'Неактивен',
    'history.falseAlarm': 'Фалшива тревога',
    'history.allSeverities': 'Всички сериозности',
    'history.low': 'Ниска',
    'history.medium': 'Средна',
    'history.high': 'Висока',
    'history.getAIFeedback': 'Получи AI обратна връзка',
    'history.dateTime': 'Дата/Час',
    'history.location': 'Местоположение',
    'history.reporter': 'Докладчик',
    'history.severity': 'Сериозност',
    'history.status': 'Състояние',
    'history.description': 'Описание',
    'history.reportDetails': 'Детайли на доклада за пожар',
    'history.reportId': 'ID на доклада:',
    'history.coordinates': 'Координати:',
    'history.reporterContact': 'Контакт на докладчика:',
    'history.severityLevel': 'Ниво на сериозност:',
    'history.currentStatus': 'Текущо състояние:',
    'history.attachedImage': 'Прикачено изображение:',
    'history.close': 'Затвори',
    'history.updateStatus': 'Актуализиране на състоянието на доклада',
    'history.updateBtn': 'Актуализирай състоянието',
    'history.confirmDeletion': 'Потвърждаване на изтриването',
    'history.deleteWarning': 'Това действие не може да бъде отменено. Докладът за пожар ще бъде окончателно премахнат от системата.',
    'history.deleteQuestion': 'Сигурни ли сте, че искате да изтриете този доклад за пожар?',
    'history.deleteReport': 'Изтрий доклада',
    'history.aiFeedback': 'AI анализ на прогнозата за пожар',
    
    // Региони
    'region.northwestern': 'Северозападен region',
    'region.northern': 'Северен регион',
    'region.northeastern': 'Североизточен регион',
    'region.southwestern': 'Югозападен регион',
    'region.southern': 'Южен регион',
    'region.southeastern': 'Югоизточен регион',
    
    // История на урагани
    'hurricane.history.title': 'История на ураганите',
    'hurricane.history.hurricaneDetails': 'Детайли за урагана',
    'hurricane.history.name': 'Име',
    'hurricane.history.season': 'Сезон',
    'hurricane.history.maxWind': 'Максимална скорост на вятъра',
    'hurricane.history.pacific': 'Тихи океан',
    'hurricane.history.atlantic': 'Атлантически океан',
    'hurricane.history.exploreHurricanes': 'Разгледай урагани',
    
    // Карта с океански ветрове
    'ocean.flowControls': 'Контроли на потока',
    'ocean.trailWidth': 'Ширина на следата',
    'ocean.trailLength': 'Дължина на следата',
    'ocean.density': 'Плътност',
    'ocean.flowSpeed': 'Скорост на потока',
    'ocean.maxPathLength': 'Максимална дължина на пътя',
    'ocean.flowRepresentation': 'Представяне на потока',
    'ocean.to': 'Към',
    'ocean.from': 'От',
    'ocean.capStyle': 'Стил на края',
    'ocean.butt': 'Тъп',
    'ocean.round': 'Закръглен',
    'ocean.effectsEnabled': 'Ефекти включени',
    
    // Карта с ветрове
    'wind.title': 'Проследяване на ветровия поток',
    'wind.windFlowControls': 'Контроли на ветровия поток',
    'wind.windInfo': 'Информация за вятъра',
    'wind.dataSource': 'Източник на данни',
    'wind.date': 'Дата',
    'wind.visualization': 'Визуализация',
    'wind.nldas': 'NLDAS почасово',
    'wind.flowRenderer': 'Рендер на потока',
    
    // История на земетресения
    'earthquake.history.title': 'История на земетресенията',
    'earthquake.history.searchEarthquakes': 'Търсене на земетресения',
    'earthquake.history.country': 'Държава (по избор)',
    'earthquake.history.countryPlaceholder': 'напр., Япония, Чили, САЩ',
    'earthquake.history.minMagnitude': 'Минимална магнитуда',
    'earthquake.history.timeRange': 'Времеви диапазон (дни)',
    'earthquake.history.maxResults': 'Максимални резултати',
    'earthquake.history.loading': 'Зареждане на земетресения...',
    'earthquake.history.biggestEarthquakes': 'Най-големи земетресения',
    'earthquake.history.magnitude': 'Магнитуда',
    'earthquake.history.depth': 'Дълбочина',
    'earthquake.history.time': 'Време',
    'earthquake.history.earthquakeDetails': 'Детайли за земетресението',
    
    // История на докладите за пожари
    'fireReport.exportPDF': 'Експорт в PDF',
    'fireReport.getAIFeedback': 'Получи AI обратна връзка',
    'fireReport.searchReports': 'Търсене на доклади за пожари...',
    'fireReport.reportHistory': 'История на докладите за пожари',
    
    // Модали
    'modal.close': 'Затвори',
    'modal.cancel': 'Отказ',
    'modal.confirm': 'Потвърди',
    'modal.save': 'Запази',
    'modal.delete': 'Изтрий',
    'modal.update': 'Актуализирай',
    
    // Нотификации
    'notification.reportSubmitted': 'Докладът е изпратен успешно',
    'notification.reportUpdated': 'Докладът е актуализиран',
    'notification.reportDeleted': 'Докладът е изтрит',
    'notification.error': 'Възникна грешка',
    'notification.loginSuccess': 'Успешно влизане',
    'notification.loginFailed': 'Влизането неуспешно',
    'notification.signupSuccess': 'Регистрацията е успешна',
    'notification.passwordChanged': 'Паролата е променена',
    
    // Елементи на картата
    'map.filters': 'Филтри',
    'map.showAll': 'Покажи всички',
    'map.showHighPriority': 'Покажи високи приоритети',
    'map.showRecent': 'Покажи скорошни',
    'map.clearFilters': 'Изчисти филтрите',
    
    // Форма
    'validation.required': 'Това поле е задължително',
    'validation.emailInvalid': 'Невалиден имейл адрес',
    'validation.passwordTooShort': 'Паролата трябва да е поне 6 символа',
    'validation.passwordsNoMatch': 'Паролите не съвпадат',
    'validation.phoneInvalid': 'Невалиден телефонен номер',
    
    // Зареждане
    'loading.pleaseWait': 'Моля изчакайте...',
    'loading.loadingData': 'Зареждане на данни...',
    'loading.processing': 'Обработване...',
    'loading.submitting': 'Изпращане...',
    
    // Грешки
    'error.connectionFailed': 'Неуспешна връзка',
    'error.tryAgain': 'Опитайте отново',
    'error.dataNotFound': 'Данните не са намерени',
    'error.unauthorized': 'Неоторизиран достъп',
    'error.sessionExpired': 'Сесията изтече',
    
    // Успех
    'success.saved': 'Запазено успешно',
    'success.updated': 'Актуализирано успешно',
    'success.deleted': 'Изтрито успешно',
    'success.submitted': 'Изпратено успешно',

    // Региони:
    'region.northAmerica': 'Северна Америка',
    'region.southAmerica': 'Южна Америка',
    'region.europe': 'Европа',
    'region.africa': 'Африка',
    'region.asia': 'Азия',
    'region.australia': 'Австралия',
    'region.russia': 'Русия',
    'region.middleEast': 'Близък Изток',
    
    'common.yes': 'Да',
    'common.no': 'Не',
    'common.ok': 'OK',
    'common.back': 'Назад',
    'common.next': 'Напред',
    'common.previous': 'Предишен',
    'common.finish': 'Завърши',
    'common.more': 'Повече',
    'common.less': 'По-малко',
    'common.viewMore': 'Виж повече',
    'common.viewLess': 'Виж по-малко',
    'common.showMore': 'Покажи повече',
    'common.showLess': 'Покажи по-малко',
    'common.readMore': 'Прочети повече',
    'common.readLess': 'Прочети по-малко',
    'common.loading': 'Зареждане',
    'common.search': 'Търсене',
    'common.filter': 'Филтър',
    'common.sort': 'Сортиране',
    'common.date': 'Дата',
    'common.time': 'Час',
    'common.name': 'Име',
    'common.type': 'Тип',
    'common.status': 'Състояние',
    'common.all': 'Всички',
    'common.none': 'Няма',
    'common.select': 'Избери',
    'common.selected': 'Избрано',
    'common.edit': 'Редактирай',
    'common.delete': 'Изтрий',
    'common.view': 'Виж',
    'common.download': 'Изтегли',
    'common.upload': 'Качи',
    'common.export': 'Експорт',
    'common.import': 'Импорт',
    'common.print': 'Печат',
    'common.share': 'Сподели',
    'common.copy': 'Копирай',
    'common.paste': 'Постави',
    'common.cut': 'Изрежи',
    'common.undo': 'Отмени',
    'common.redo': 'Върни',
    'common.reset': 'Нулирай',
    'common.clear': 'Изчисти',
    'common.apply': 'Приложи',
    'common.settings': 'Настройки',
    'common.help': 'Помощ',
    'common.about': 'За нас',
    'common.privacy': 'Поверителност',
    'common.terms': 'Условия',
    'common.language': 'Език',
    'common.theme': 'Тема',
    'common.profile': 'Профил',
    'common.account': 'Акаунт',
    'common.logout': 'Изход',
    'common.login': 'Вход',
    'common.register': 'Регистрация',
    'common.welcome': 'Добре дошли',
    'common.goodbye': 'Довиждане',
    'common.anonymous': 'Анонимен',
    'common.unknown': 'Неизвестен',
    'common.noDescription': 'Няма предоставено описание',
    'common.summary': 'Резюме',
    'common.totalReports': 'Общо доклади',
    'common.highSeverity': 'Доклади с висока сериозност',
    'common.activeReports': 'Активни доклади',
    'common.recommendations': 'Препоръки',
    'common.note': 'Забележка',
    'common.generatedOn': 'Генерирано на',
    'ai.fallbackMessage': 'Въз основа на текущите данни, обмислете внимателното наблюдение на доклади с висока сериозност и осигурете готовност на спешните служби за бърза реакция.',
    'notification.aiUnavailable': 'AI услугата временно не е налична. Показва се основен анализ.',
    'notification.showingBasic': 'Показва се основен анализ вместо това.'
    
    }
};

class LanguageManager {
  constructor() {
    this.currentLang = localStorage.getItem('language') || 'en';
    this.init();
  }

  init() {
    this.createLanguageButton();
    this.translatePage();
  }

  createLanguageButton() {
    if (document.getElementById('langToggleBtn')) return;

    const btn = document.createElement('button');
    btn.id = 'langToggleBtn';
    btn.className = 'theme-toggle';
    btn.setAttribute('aria-label', 'Toggle language');
    btn.style.marginLeft = '8px';
    btn.innerHTML = this.getButtonContent();

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.insertAdjacentElement('afterend', btn);
    } else {
      document.body.appendChild(btn);
    }

    btn.addEventListener('click', () => this.toggleLanguage());
  }

  getButtonContent() {
    return `<span class="theme-icon">${this.currentLang === 'en' ? '🇪🇳' : '🇧🇬'}</span>`;
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'bg' : 'en';
    localStorage.setItem('language', this.currentLang);

    const btn = document.getElementById('langToggleBtn');
    if (btn) btn.innerHTML = this.getButtonContent();

    this.playThemeAnimation();
    
    setTimeout(() => this.translatePage(), 300);
  }

  playThemeAnimation() {
    const theme = document.documentElement.getAttribute('data-theme') || 'fire';
    const baseTheme = theme.replace('-light', '');

    switch(baseTheme) {
      case 'fire':
        this.fireAnimation();
        break;
      case 'flood':
        this.floodAnimation();
        break;
      case 'hurricane':
        this.fireAnimation();
        break;
      case 'earthquake':
        this.fireAnimation();
        break;
      default:
        this.fireAnimation();
    }
  }

  fireAnimation() {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        el.style.transform = 'translateY(-20px) scale(0.8)';
        el.style.opacity = '0';
        el.style.filter = 'blur(3px)';
        el.style.textShadow = '0 0 20px var(--accent-primary), 0 0 40px var(--accent-secondary)';
        
        setTimeout(() => {
          el.style.transform = 'translateY(0) scale(1)';
          el.style.opacity = '1';
          el.style.filter = 'blur(0)';
          el.style.textShadow = '';
        }, 300);
      }, index * 20);
    });
  }

  floodAnimation() {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.style.transition = 'all 0.5s ease-in-out';
        el.style.transform = 'translateY(30px)';
        el.style.opacity = '0';
        el.style.filter = 'blur(5px)';
        
        const ripple = document.createElement('div');
        ripple.style.cssText = `
          position: absolute;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--accent-primary), transparent);
          top: 50%;
          left: 0;
          animation: wave 0.6s ease-out;
        `;
        
        if (el.style.position !== 'absolute' && el.style.position !== 'fixed') {
          el.style.position = 'relative';
        }
        el.appendChild(ripple);
        
        setTimeout(() => {
          el.style.transform = 'translateY(0)';
          el.style.opacity = '1';
          el.style.filter = 'blur(0)';
          ripple.remove();
        }, 300);
      }, index * 25);
    });

    if (!document.getElementById('wave-animation-style')) {
      const style = document.createElement('style');
      style.id = 'wave-animation-style';
      style.textContent = `
        @keyframes wave {
          0% { transform: translateY(-10px) scaleX(0); opacity: 0; }
          50% { transform: translateY(0) scaleX(1); opacity: 1; }
          100% { transform: translateY(10px) scaleX(0); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
    
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.style.transition = 'none';
      }, index * 10);
    });
  }

  translatePage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.t(key);
      if (translation) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = translation;
        } else {
          el.textContent = translation;
        }
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const translation = this.t(key);
      if (translation) el.placeholder = translation;
    });

    document.documentElement.lang = this.currentLang;
  }

  t(key) {
    return translations?.[this.currentLang]?.[key] || key;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new LanguageManager());
} else {
  new LanguageManager();
}
