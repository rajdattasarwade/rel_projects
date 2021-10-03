export class Config {
  public static domainUrl = 'https://pre-sharearide.ril.com';
  public static userId = '';
  public static relianceEmailId = '';
  public static employeeName = '';
  public static contactNumber = '';
  public static managerId = '';
  public static bUnit = '';
  public static assignProfileId = [];
  public static isMobileDevice = false;
  public static isMobileViewport = window.innerWidth < 768 ? true : false;
  public static addBounceEffectOnEva: boolean = true;
  public static approvalsCount = 0;
  public static notificationCount = 0;
  public static isEvaNotificationCounterSet = false;
  public static initialChipsEvaBackend = [];
  public static isCordova = false;
  public static isManager = false;
  public static loggedIn = false;
  public static apiVersion = '1.0';
  public static baseUrl = "http://lt0091095.in.ril.com:8081/api/" ;
  public static currentBot = '';
  public static surveyUrl =
    'http://dev.webselfcare.jio.com:8888/cs/jio/employement_survey_validate?meid=';
  public static themeId = 'black-grey';
  public static essUrl = 'http://ess.ril.com/';
  public static emailregex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public static pancardregex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
  public static onlyAlphabetsRegex = /^[a-zA-z]*$/;
  public static alphaNumbericRegex = /^[a-zA-z0-9]*$/;
  public static onlynumberregex = /^[0-9]*$/;
  public static backoffInterval = 0;
  public static limit = 20;
  public static days = 7;
  public static defaultStatusBarColorCode = '#3E659A';
  public static defaultFooterBgColorCode = '#fafafa';
  public static onChatbot: boolean = false;
  public static rilUserClass = 'ril-user';
  public static ouUserClass = 'ou-user';
  public static landingUrl = '';
  public static isRecruiter: boolean = false;
  public static isHiringManager: boolean = false;
  public static profileData:any;
  public static mhereCordovaLinks = {
    android_link:
      'https://play.google.com/store/apps/details?id=com.jio.lbs.mhere&hl=en_IN',
    ios_link: 'https://apps.apple.com/in/app/intune-company-portal/id719171358',
    android_package_id: 'com.jio.lbs.mhere',
    ios_package_id: 'comlbsjiomherepro ://',
  };
  public static mhereDesktopErrorMsg =
    'M-here pro will be only available via Mobile';

  //for beta and prod
  // public static travelPlanExternalLink="https://fiori.ril.com/sap/bc/ui5_ui5/ui2/ushell/shells/abap/Fiorilaunchpad.html?saml2=disabled&sap-ushell-config-url%3Dcfg%2Fsap%2FCacheBuster.json&sap-theme=ZRIL_HC_BASE%40%2Fsap%2Fpublic%2Fbc%2Fthemes%2F~client-586&sap-ushell-config=headerless#ZHR_ESS-travelexpense?appAct=travelguestcar&semObj=ZHR_ESS";

  //for sit and uat
  public static missionKurukshetraExternalLink =
    'https://mk.ril.com/servlet/hype/IMT?userAction=BrowseCurrentUser&templateName=MenuItem';
  public static hydTravelPlanExternalLink =
    'https://fioriqa.ril.com/sap/bc/ui5_ui5/ui2/ushell/shells/abap/Fiorilaunchpad.html?saml2=disabled#ZHR_ESS-travel';
  public static retailTravelPlanExternalLink =
    'https://rrfioriqa.ril.com/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html?sap-client=220&sap-ushell-config=headerless&sap-theme=ZRRL_BASE%40%2fsap%2fpublic%2fbc%2fthemes%2f~client-220&saml2=disabled#ZHCM_RR-TrvReq?appAct=travelguestcar&semObj=ZHCM_RR';
  public static retailESSLink =
    'https://rrfioriqa.ril.com/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html?sap-client=220&sap-ushell-config=headerless&sap-theme=ZRRL_BASE%40%2fsap%2fpublic%2fbc%2fthemes%2f~client-220&saml2=disabled#';
  public static hydESSLink =
    'https://fioriqa.ril.com/sap/bc/ui5_ui5/ui2/ushell/shells/abap/Fiorilaunchpad.html?saml2=disabled#';
  public static jioSmslESSLink =
    'https://fioriqa.ril.com/sap/bc/ui5_ui5/ui2/ushell/shells/jio/Fiorilaunchpad.html?sap-ushell-config-url%3Dcfg%2Fsap%2FCacheBuster.json&sap-theme=ZRJIL_SFDC_BASE1%40%2Fsap%2Fpublic%2Fbc%2Fthemes%2F~client-386&saml2idp=https://login.jioconnect.com/oamfed/idp/samlv20#';
  public static jioCoreESSLink =
    'https://fioriqa.ril.com/sap/bc/ui5_ui5/ui2/ushell/shells/abap/Fiorilaunchpad.html?saml2=disabled&sap-client=386&sap-language=EN#';
  public static nwCoreESSLink =
    'https://ess.nw18.com/sap/bc/ui5_ui5/sap/zhr_essnew_lp/index.html?saml2=disabled';
  public static fileExtensionMimeType = new Map([
    ['pdf', 'application/pdf'],
    [
      'xlsx',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
    ['xls', 'application/vnd.ms-excel'],
    ['png', 'image/png'],
    ['jpg', 'image/jpg'],
    ['jpeg', 'image/jpeg'],
    ['bmp', 'image/bmp'],
    ['csv', 'text/csv'],
    ['gif', 'image/gif'],
    ['txt', 'text/plain'],
    ['doc', 'application/msword'],
    [
      'docx',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    ['msg', 'application/vnd.ms-outlook'],
  ]);
  public static botIdentifier = {
    MY_HR: 'myHR',
    LVA: 'lva',
    LMS: 'lms',
    COVID: 'covid',
  };
  public static get GOOGLE_MAPS_API_KEY(): string {
    return 'AIzaSyCvQqnwg1QHVm6xuaK8klX1KSH3Gi80DLI';
  }
  public static avtarUrl = 'https://mobcontent.ril.com/picture/';
  public static share_a_ride_url =
    'http://nodejs.centralindia.cloudapp.azure.com/#/login';
  public static lms_url = 'https://runiversity.ril.com';
  public static raadya_url = 'https://r-aadya.ril.com';
  public static discover_reliance_url = 'http://discover.ril.com/';
  public static specialLeaveTypes = [
    'Special Leave',
    'Parental Leave',
    'Special Purpose Leave',
  ];
  public static apim_header = '';
  public static ws02_auth_url =
    Config.domainUrl + '/samlsso?spEntityID=NGQCLNT386';
  public static logoutUrl = 'https://fioriqa.ril.com/sap/public/bc/icf/logoff';
  public static learningHoursUrl =
    'https://idm.jioconnect.com/jiosso/login-page.jsp?contextType=external&username=string&password=secure_string&challenge_url=https%3A%2F%2Fidm.jioconnect.com%3A443%2Fjiosso%2Flogin-page.jsp&request_id=-6463967050978554440&authn_try_count=0&locale=en_US&resource_url=%252Fuser%252Floginsso';
  public static survey_url = 'https://hrs523020.typeform.com/to/At7FHd';
  public static timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
  public static ISTtimezoneOffset = 19800000;

  public static elastic_search = Config.domainUrl + '/';
  public static userAppData = undefined;
  public static userProfileData: any = {};
  public static cleverTapUserObj = {};
  public static serviceEndPoint = Config.domainUrl + '/hrva';
  public static candidatebotEndPoint = Config.domainUrl + '/ijp';
  public static isUserOnChatBot = false;
  public static elasticSearchCount = 100;
  public static googleApiUrl =
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyB_72v9LQ4pGHv1rTbewHq3czKD5PM_kRY';
  public static gamification_url = Config.domainUrl + 'game/';
  public static switchLoader = false;
  public static clevertap = {};
  public static currentcategory = '';
  public static tts_flag = false;
  public static isiOSDevice =
    !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)
      ? true
      : false;
  public static workBoardExternalLink =
    'https://www.myworkboard.com/wb/goal/index';
  public static headerBackClickHandler = undefined;
  public static navigateBackClickHandler = undefined;
  public static trippinBackClickHandler = undefined;
  public static workBoardLinks = {
    android_link:
      'https://play.google.com/store/apps/details?id=com.workboard.android.app',
    ios_link:
      'https://itunes.apple.com/us/app/workboard-for-iphone/id828807118?mt=8',
  };
  public static bUnitJio = {
    users: [
      {
        P19507440: 'JIO',
      },
      {
        P30501933: 'JIO',
      },
      {
        P10061933: 'JIO',
      },
    ],
  };
  public static haptikScriptsUrl = [
    'https://toolassets.haptikapi.com/platform/javascript-xdk/production/loader.js',
  ];
  public static haptikSignedUp = false;
  public static showLaunchMsg;
  public static haptikSettings = {};
  public static signUpObj = {};
  public static haptikAutoOpen = false;
  public static lms_haptik_obj = null;
  public static socialDistancingConfig = {
    message:
      'We have detected a live Bluetooth device near you. We recommend safe social distancing due to Covid-19.',
    locationInterval: 25000,
    serviceUrl: 'https://pre-sharearide.ril.com/haptik/pathtracking',
    title: 'Social Distancing',
  };
  public static poaExtLink = 'https://ircmsv2.ril.com/POA';
  public static get APP_DATE_TIME_FORMATS(): any {
    return {
      APP_DATE_FORMAT: 'dd/MM/yyyy',
      APP_TIME_FORMAT: 'HH:mm',
      APP_TIME_FORMAT_LONG: 'HH:mm:ss',
      APP_DATE_TIME_FORMAT: 'dd/MM/yyyy HH:mm',
      APP_DAY_MONTH_FORMAT: 'EEE, MMM dd',
      APP_TIME_FORMAT_MERIDIEM: 'hh:mm a',
      APP_DATE_FORMAT_TEXT: 'dd MMM yyyy',
      APP_MONTH_YEAR_FORMAT: 'MMMM y',
      APP_DATE_MONTH_FORMAT: 'd MMM',
      APP_DATE_MONTH_YEAR_FORMAT: 'd MMM y',
      APP_SHORT_MONTH_YEAR_FORMAT: 'MMM, y',
    };
  }
  public static feedbackCategory = {
    great: 'Great',
    good: 'Good',
    ok: 'OK, can be better',
    needImp: 'Needs Improvement',
    terrible: 'Terrible',
    greatQ: 'What worked well?',
    goodQ: 'What can be improved?',
    terribleQ: 'What went wrong?',
  };
  public static serviceCategories = {
    'OM , HIRE & ONBOARD': {
      icon: 'ico-om-hire-onboard',
      name: 'OM , Hire & Onboard',
      iconClass: 'om-hire-onboard',
      desp:
        'Focuses on OM, end-to-end delivery of hiring and onboarding top talent to relevant roles within the organization',
    },
    'ENGAGE & PERFORM': {
      icon: 'ico-ea-perform',
      name: 'Engage , Align & Perform',
      iconClass: 'ea-perform',
      desp:
        'Manage work and deliverables, aligned to business strategy. Give and receive feedback',
    },
    'LEARN & GROW': {
      icon: 'ico-learn-grow',
      name: 'Learn & Grow',
      iconClass: 'learn-grow',
      desp:
        'One stop solution for bringing the global best content at one place, thereby empowering you to take charge of your own development anytime, anywhere, any device',
    },
    'LEAD & EXCEL': {
      icon: 'ico-lead-excel',
      name: 'Lead & Excel',
      iconClass: 'lead-excel',
      desp:
        'Tailor made talent interventions provisioning talent on-demand, systematic career paths and talent analytics',
    },
    'EMPLOYEE SERVICES': {
      icon: 'ico-emp-service',
      name: 'Employee Services',
      iconClass: 'emp-service',
      desp:
        'An easy & on-the-go access to your daily tasks at the click on a button',
    },
    'REWARD & RECOGNIZE': {
      icon: 'ico-reward-recognize',
      name: 'Reward & Recognize',
      iconClass: 'reward-recognize',
      desp:
        'Services that relate to employee compensation (fixed pay, choice pay, retirals), reimbursements, benefits and recognition of efforts towards excellence and desired values & behaviours',
    },
    // "CORPORATE SERVICES": {
    //   icon: "ico-corporate-services",
    //   name: "Corporate Services",
    //   iconClass: "corporate-services",
    //   desp: "A bouquet of services to make your workplace experience better"
    // },
    SECURITY: {
      icon: 'ico-security',
      name: 'Security',
      iconClass: 'security',
      desp: "Services related to Employee's security",
    },
    'MY FUNCTIONAL SERVICES': {
      icon: 'ico-functional-services',
      name: 'My Functional Services',
      iconClass: 'functional-services',
      desp:
        'Repository of Services that based on Employee’s respective Role &  Functions',
    },
  };

  public static serch_icon_classes = {
    'apply a leave': 'ico-plan-my-leave',
    'plan my leave': 'ico-plan-my-leave',
    'leave reconciliation & history': 'ico-leave-reconciliation-history',
    'claims and reimbursements': 'ico-my-reimbursement',
    'my reimbursement': 'ico-my-reimbursement',
    payslip: 'ico-payslip',
    'view payslip': 'ico-payslip',
    'regularize my attendance': 'ico-regularise-attendance',
    'regularization history': 'ico-regularization-history',
    'regularization summary': 'ico-regularise-attendance',
    'medical services': 'ico-medical-service',
    'pme reports': 'ico-medical-service',
    'consult doctor': 'ico-medical-service',
    'schedule pme': 'ico-medical-service',
    'manage my attendance': 'ico-manage-my-attendance',
    approvals: 'ico-approvals',
    'team leave schedule': 'ico-team-attendance',
    'team punch report': 'ico-team-attendance',
    'team attendance': 'ico-team-attendance',
    'holiday calendar': 'ico-holiday-calendar',
    'view holiday calendar': 'ico-holiday-calendar',
    'bonafide letters': 'ico-bonafide-letter',
    'my learning': 'ico-my-learning',
    trippin: 'ico-share-a-ride',
    'digital form 16': 'ico-form16',
    'r-aadya': 'ico-r-aadya',
    workboard: 'ico-workboard',
    'generate visitor pass': 'ico-vms',
    'employee directory': 'ico-employee-directory',
    'total pay statement': 'ico-ctc-statement',
    'tax projection': 'ico-tax-projection',
    'power of attorney': 'ico-power-of-attorney',
    'learning recommendations': 'ico-learning-recommendation',
    'enroll for leadership program': 'ico-enroll-leadership-program',
    'leadership programs': 'ico-enroll-leadership-program',
    'search learning content': 'ico-search-learning',
    'national pension scheme': 'ico-nps',
    'medibuddy cards': 'ico-dhs',
    'internal job posting': 'ico-internal-job-posting',
    'my vehicle log book': 'ico-vehicle-log',
    'my retirals': 'ico-my-retirals',
    'my compensation details': 'ico-compensation-details',
    'company vehicle scheme': 'ico-clv',
    'manage e-file': 'ico-manage-e-file',
    'my organization relationship': 'ico-organization-relationship',
    'enroll for voluntary pf': 'ico-vpf',
    'education assistance': 'ico-educational-assistance',
    'submit an idea': 'ico-submit-an-idea',
    'input choice pay': 'ico-input-choice',
    'my insurance': 'ico-my-insurance',
    'my claims and insurance': 'ico-my-insurance',
    'certify own data': 'ico-update-profile',
    'my hr': 'ico-my-hr',
    'book meeting room': 'ico-book-meeting-room',
    'book astro turf': 'ico-book-astro-turf',
    'declare investments': 'ico-my-investments',
    'refer a friend': 'ico-refer-a-friend',
    'define job description': 'ico-define-job-description',
    'my visa application': 'ico-visa-application',
    'manage shift': 'ico-manage-shift',
    'team & self-expense report': 'ico-my-expense',
    course: 'ico-search-course',
    'news, announcements & circulars': 'upcoming-events',
    'employee communications & notices': 'upcoming-events',
    'r university': 'ico-my-learning',
    'view policies': 'ico-view-policies',
    'income tax declaration': 'ico-my-investments',
    'retiral benefits': 'ico-retirals-benefits',
    'discover reliance': 'ico-discover-reliance',
    'portals, websites & useful links': 'ico-portals-web-useful-link',
    'company news & spotlight': 'ico-ril-news-spotlight',
    survey: 'ico-survey',
    'request id card': 'ico-request-id-card',
    'date wise absence': 'ico-date-wise-absence',
    'games & challenges': 'ico-gamification',
    'time report (self)': 'ico-time-report-self',
    'separation request - self': 'ico ico-separation',
    'avail mobile connection': 'ico-my-mobile-connection',
    'photo id card approval': 'ico-hrbp-photo-id-card-approval',
    'r-sammaan': 'ico-r-sammaan',
    'r-performance': 'ico-r-performance',
    'loans & advances': 'ico-loans-advances',
    'hc confirmation process': 'ico-hc-confirmation-process',
    'manage my retirals': 'ico-manage-my-retirals',
    'my mobile connection': 'ico-my-mobile-connection',
    'time report (team)': 'ico-time-report-team',
    'hrbp to view employee profile': 'ico-hrbp-to-view-employee-profile',
    'track training completion': 'ico-track-training-completion',
    'position creation': 'ico-position-creation',
    'sim noc letter': 'ico-sim-noc-letter',
    'create hiring requisition': 'ico-create-hiring-requisition',
    'hr operations support service': 'ico-manage-om-request',
    'data validation': 'ico-data-certification',
    'my investments': 'ico-my-investments',
    'manage my tax': 'ico-manage-my-tax',
    'vehicle pass management': 'ico-vehicle-pass-management',
    'manage separation': 'ico-manage-separation',
    'my ril experience': 'ico-my-ril-experience',
    'person portrait': 'ico-person-portrait',
    'travel plan': 'ico-travel-plan',
    'm here': 'ico-m-here',
    'recruiter service': 'ico-recruiter-portal',
    'relicord by rls': 'ico-relicord',
    'e-learning': 'ico-e-learning',
    'training document upload': 'ico-training-document-upload',
    'family card': 'ico-family-card',
    'approval classical': 'ico-approval-classical',
    'my hr admin': 'ico-my-hr-admin',
    'organisation structure': 'ico-organisation-structure',
    'employee data dashboard': 'ico-employee-data-dashboard',
    'recruiter portal': 'ico-recruiter-portal',
    newsletter: 'ico-newsletters',
    'leave encashment': 'ico-leave-encashment',
    'offers withdrawn': 'ico-offers-withdrawn',
    'agency billing': 'ico-agency-billing',
    'offers onboarded last month': 'ico-offers-onboarded-last-month',
    'esos grant 2007': 'ico-esos-grant-2007',
    'esos administrative service': 'ico-esos-administrative-service',
    'my timesheet': 'ico-my-timesheet',
    'time sheet entry': 'ico-time-sheet-entry',
    'performance differentiation discussions':
      'ico-performance-differentiation-discussions',
    compensation: 'ico-compensation',
    'competency assurance system new': 'ico-competency-assurance-system-new',
    'pathfinder career path': 'ico-pathfinder-career-path',
    'educational assistance': 'ico-education-assistance',
    'separation/extension process': 'ico-separation-extension-hc-orgwide',
    'travel dashboard': 'ico-travel-dashboard',
    'document verification': 'ico-document-verification',
    'candidate search': 'ico-candidate-search',
    'admin recruitment dashboard': 'ico-admin-recruitment-dashboard',
    'admin recruiter workbench': 'ico-admin-recruitment-workbench',
    'hiring errors': 'ico-hiring-errors',
    'hrbp services': 'ico-hrbp-services',
    'hrbp separation overview': 'ico-hrbp-e-separation',
    'dues clearance': 'ico-dues-clearance',
    'digital personal file': 'ico-digital-personal-file',
    'retirals inward system': 'ico-retiral-inward-system',
    'retirals inward status': 'ico-retiral-inward-status',
    'retirals approval': 'ico-retiral-approval',
    'fc & a services': 'ico-fc-a-services',
    'cov services': 'ico-cov-services',
    'superannuation contribution': 'ico-superannuation-contribution',
    'just asq': 'ico-my-hr',
    'recruitment approval': 'ico-recruitment-approval',
    'students enrolment': 'ico-students-enrolment',
    'recruitment dashboard': 'ico-recruitment-dashboard',
    'my insurance retail': 'ico-my-insurance',
    'interview assistant jio': 'ico-interview-assistant-jio',
    'candidate onboarding': 'ico-candidate-onboarding',
    'pre-assessment session': 'ico-pre-assessment-session-jio',
  };
  public static errorHandler = {
    '0': 'There was an HTTP error. The server is not reachable. Status code: 0',

    '300':
      'There was an HTTP error. the request has more than one possible response. The user agent or user should choose one of them. Status code:300',
    '301':
      'There was an HTTP error. The URI of the requested resource has been changed. Status code: 301',
    '302':
      'There was an HTTP error. The URI of the requested resource has been changed temporarily. New changes in the URI might be made in the future. Therefore, this same URI should be used by the client in future requests. Status code: 302',
    '303':
      'There was an HTTP error. The server sent this response to direct the client to get the requested resource to another URI with a GET request. Status code: 303',
    '304':
      'There was an HTTP error.  The client that the response has not been modified, so the client can continue to use the same cached version of the response. Status code: 304',
    '305':
      'There was an HTTP error. The requested response must be accessed by a proxy. This response code is not largely supported for security reasons. Status code: 305',
    '307':
      'There was an HTTP error. The requested resource resides temporarily under a different URI. Since the redirection MAY be altered on occasion, the client SHOULD continue to use the Request-URI for future requests. This response is only cacheable if indicated by a Cache-Control or Expires header field. Status code: 307',
    '308':
      'There was an HTTP error. The requested resource is now permanently located at another URI, specified by the Location: HTTP Response header. Status code: 308',

    '400':
      "There was an HTTP error. The user's request contains incorrect syntax. Status code: 400",
    '401':
      'There was an HTTP error. The requested file requires authentication (a username and password). Status code: 401',
    '403':
      "There was an HTTP error. The server will not allow the visitor to access the requested file. If a visitor receives this code unexpectedly, you should check the file's permission settings, or check whether the file has been protected. Status code: 403",
    '404':
      'There was an HTTP error. The server could not find the file that the visitor requested maybe URL is mistyped. Status code: 404',
    '405':
      'There was an HTTP error. The method specified in the Request-Line is not allowed for the resource identified by the Request-URI. The response MUST include an Allow header containing a list of valid methods for the requested resource. Status code: 405',
    '406':
      'There was an HTTP error. The resource identified by the request is only capable of generating response entities which have content characteristics not acceptable according to the accept headers sent in the request. Status code: 406',
    '407':
      'There was an HTTP error. The client must first authenticate itself. Status code: 407',
    '408':
      'There was an HTTP error. The client did not produce a request within the time that the server was prepared to wait. The client MAY repeat the request without modifications at any later time. Status code: 408',
    '409':
      'There was an HTTP error. The request could not be completed due to a conflict with the current state of the resource. Status code: 409',
    '410':
      'There was an HTTP error. The requested resource is no longer available at the server and no forwarding address is known. Status code: 410',
    '411':
      'There was an HTTP error. The server refuses to accept the request without a defined Content- Length. Status code: 411',
    '412':
      'There was an HTTP error. The precondition given in one or more of the request-header fields evaluated to false when it was tested on the server. Status code: 412',
    '413':
      'There was an HTTP error. The server is refusing to process a request because the request entity is larger than the server is willing or able to process. Status code: 413',
    '414':
      'There was an HTTP error. The server is refusing to service the request because the Request-URI is longer than the server is willing to interpret. Status code: 414',
    '415':
      'There was an HTTP error. The server is refusing to service the request because the entity of the request is in a format not supported by the requested resource for the requested method. Status code: 415',

    '500':
      'There was an HTTP error. The server encountered an unexpected condition which prevented it from fulfilling the request. Status code: 500',
    '501':
      'There was an HTTP error. The server does not support the functionality required to fulfill the request. Status code: 501',
    '502':
      'There was an HTTP error. The server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed in attempting to fulfill the request. Status code: 502',
    '503':
      'There was an HTTP error. The server is unable to handle requests due to a temporary overload or due to the server being temporarily closed for maintenance. Status code: 503',
    '504':
      'There was an HTTP error. a server somewhere along the chain does not receive a timely response from a server further up the chain. Status code: 504',
    '505':
      'There was an HTTP error. The server refuses to support the HTTP protocol that has been specified by the client computer. Status code: 505',
  };

  public static availableThemes: any = [
    {
      imageSrc: [
        [
          '/hrservices/assets/images/theme-img/Blue-White-Home-Page.jpg',
          '/hrservices/assets/images/theme-img/Desktop-Blue-White-Home-Page.jpg',
        ],
        [
          '/hrservices/assets/images/theme-img/Blue-White-Landing-Page.png',
          '/hrservices/assets/images/theme-img/Desktop-Blue-White-Service-Page.jpg',
        ],
      ],
      title: 'Blue-White(Default)',
      id: 'blue-white',
      statusBarColor: '#34659e',
      footerBgColor: '#fafafa',
      active: true,
    },
    {
      imageSrc: [
        [
          '/hrservices/assets/images/theme-img/Black-Grey-Home-Page.jpg',
          '/hrservices/assets/images/theme-img/Desktop-Black-Grey-Home-Page.jpg',
        ],
        [
          '/hrservices/assets/images/theme-img/Black-Grey-Landing-Page.png',
          '/hrservices/assets/images/theme-img/Desktop-Black-Grey-Service-Page.jpg',
        ],
      ],
      title: 'Black-Grey',
      id: 'black-grey',
      statusBarColor: '#262626',
      footerBgColor: '#3a3a3a',
      active: true,
    },
    {
      imageSrc: [
        [
          '/hrservices/assets/images/theme-img/Blue-Neon-Home-Page.jpg',
          '/hrservices/assets/images/theme-img/Desktop-Blue-Neon-Home-Page.jpg',
        ],
        [
          '/hrservices/assets/images/theme-img/Blue-Neon-Landing-Page.png',
          '/hrservices/assets/images/theme-img/Desktop-Blue-Neon-Service-Page.jpg',
        ],
      ],
      title: 'Blue-Neon',
      id: 'blue-neon',
      statusBarColor: '#012F69',
      footerBgColor: '#032349',
      active: true,
    },
  ];

  public static coachmarks = {
    DHS: {
      path: 'assets/coachmarks/dhs_coachmarks.json',
      navbarOverlapFlag: false,
    },
    DHS_HOSPITAL_INITIAL: {
      path: 'assets/coachmarks/dhs_hospitals_coachmarks.json',
      navbarOverlapFlag: false,
    },
    MANAGE_MY_ATTENDANCE: {
      path: 'assets/coachmarks/manage_attendance_coachmarks.json',
      navbarOverlapFlag: false,
    },
    LEARNING_RECOMMENDATION: {
      path: 'assets/coachmarks/learning_recommendations.json',
      navbarOverlapFlag: false,
    },
    'coverage-overview': {
      path: 'assets/coachmarks/coverage_overview_coachmarks.json',
      navbarOverlapFlag: false,
    },
    'claim-history': {
      path: 'assets/coachmarks/insurance_history_coachmarks.json',
      navbarOverlapFlag: false,
    },
    MY_INVESTMENTS: {
      path: 'assets/coachmarks/my_investments_coachmarks.json',
      navbarOverlapFlag: false,
    },
    vehicleCreate: {
      path: 'assets/coachmarks/vlb_1.json',
      navbarOverlapFlag: false,
    },
    vehicleHistory: {
      path: 'assets/coachmarks/vlb_2.json',
      navbarOverlapFlag: false,
    },
    report_accident: {
      path: 'assets/coachmarks/report_accident_coachmarks.json',
      navbarOverlapFlag: false,
    },
    vlb_date_picker: {
      path: 'assets/coachmarks/vlb_date_picker.json',
      navbarOverlapFlag: true,
      noScroll: true,
      documentLevel: true,
    },
    // "LEARNING_RECOMMENDATIONS": {"path": "assets/coachmarks/learning_recommendations.json" ,"navbarOverlapFlag": false},
    // "LEARNING_RECOMMENDATIONS": {"path": "assets/coachmarks/learning_recommendations.json" ,"navbarOverlapFlag": false},
    // "LEARNING_RECOMMENDATIONS": {"path": "assets/coachmarks/learning_recommendations.json" ,"navbarOverlapFlag": false},
    PME_SCHEDULE: {
      path: 'assets/coachmarks/medical_services.json',
      navbarOverlapFlag: false,
    },
    PME_APPOINTMENTS: {
      path: 'assets/coachmarks/medical_services_pme_appointments.json',
      navbarOverlapFlag: false,
    },
    CONSULT_DOCTOR_BOOK: {
      path: 'assets/coachmarks/consult_doctor_book.json',
      navbarOverlapFlag: false,
    },
    CONSULT_DOCTOR_APPT: {
      path: 'assets/coachmarks/consult_doctor_appt.json',
      navbarOverlapFlag: false,
    },
  };
  public static loadBUConfiguration; //Used to load BUConfiguration class acc to bUnit.
}
