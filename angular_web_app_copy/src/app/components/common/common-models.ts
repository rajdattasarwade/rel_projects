export const MENU_MASTER: any = [
  {
    name: 'home',
    displayName: 'Home',
    route: 'home',
    icon: 'home',
    isVisible: true
  },
  {
    name: 'people',
    displayName: 'People',
    route: '/people',
    icon: 'group',
    isVisible: true
  },
  {
    name: 'leaveAttendance',
    displayName: 'Leave and Attendance',
    route: 'leave-and-attendance',
    icon: 'card_travel',
    isVisible: true
  },
  {
    name: 'payroll',
    displayName: 'Payroll',
    route: 'payroll',
    icon: 'payment',
    isVisible: true
  },
  {
    name: 'reimbursements',
    displayName: 'Reimbursements',
    route: 'reimbursements',
    icon: 'payments',
    isVisible: true
  },
  {
    name: 'rewardsRecognition',
    displayName: 'Rewards & Recognition',
    route: 'rewardsRecognition',
    icon: 'emoji_emotions',
    isVisible: true
  },
  {
    name: 'empEmgagement',
    displayName: 'Employee Engagement',
    route: 'empEngagement',
    icon: 'sports_esports',
    isVisible: true
  },
  {
    name: 'learning',
    displayName: 'Learning',
    route: 'learning',
    icon: 'school',
    iconImage: 'sidebar-ico learning-sidebar-ico',
    isVisible: true
  },
  {
    name: 'benefits',
    displayName: 'Benefits',
    route: 'benefits',
    icon: 'card_membership',
    isVisible: true
  }
];

export class IconsModel {
  icon: string;
  iconText: string;
  iconImageUrl: string;
  action: string;
  constructor(icon, iconText, iconImageUrl, action) {
    this.icon = icon;
    this.iconText = iconText;
    this.iconImageUrl = iconImageUrl;
    this.action = action;
  }
}
export class MarketIconsModel {
  icon: string;
  action: string;
  constructor(icon, action) {
    this.icon = icon;
    this.action = action;
  }
}