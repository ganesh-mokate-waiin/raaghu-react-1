import Children from "react";
const MainMenu = [
  {
    "key": "0",
    "label": "Dashboard",
    "icon": "home",
    "path": "/raaghu-Dashboard",
    "subTitle": "Statistics and reports",
  },
  {
    "key": "2",
    "label": "Saas",
    "icon": "saas",
    "children": [
      {
        "key": "2-0",
        "label": "Tenants",
        "icon": "bullet",
        "path": "/raaghu-Tenant",
        "subTitle": "Manage your tenants",
      },
      {
        "key": "2-1",
        "label": "Editions",
        "icon": "bullet",
        "path": "/raaghu-Edition",
        "subTitle": "Manage editions and features of the application",
      },
    ],
  },
  {
    "key": "3",
    "label": "Administration",
    "icon": "administration",
    "children": [
      {
        "key": "3-0",
        "label": "IdentityManagement",
        "icon": "bullet",
        "children": [
          {
            "key": "3-0-0",
            "label": "OrganizationUnits",
            "icon": "bullet",
            "path": "/raaghu-Organization-Unit",
            "subTitle": "Use organization units to organize users and entities",
          },
          {
            "key": "3-0-1",
            "label": "Roles",
            "icon": "bullet",
            "path": "/raaghu-Role",
            "subTitle": "Use roles to group permissions",
          },
          {
            "key": "3-0-2",
            "label": "Users",
            "icon": "bullet",
            "path": "/raaghu-Users",
            "subTitle": "Manage users and permissions",
          },
          {
            "key": "3-0-3",
            "label": "Claim Types",
            "icon": "bullet",
            "path": "/raaghu-Claim-Types",
            "subTitle": "Manage users and permissions",
          },
          {
            "key": "3-0-4",
            "label": "Security-logs",
            "icon": "bullet",
            "path": "/raaghu-Security-Logs",
            "subTitle": "Manage users and permissions",
          },
        ],
      },
      {
        "key": "3-1",
        "label": "Open Iddict",
        "icon": "bullet",
        "children": [
          {
            "key": "3-1-0",
            "label": "Application",
            "icon": "bullet",
            "path": "/raaghu-Applications",
            "subTitle": "Use organization units to organize users and entities",
          },
          {
            "key": "3-1-1",
            "label": "Scopes",
            "icon": "bullet",
            "path": "/raaghu-Api-Scope",
            "subTitle": "Use organization units to organize users and entities",
          },
        ],
      },
      {
        "key": "3-2",
        "label": "LanguageManagement",
        "icon": "bullet",
        "children": [
          {
            "key": "3-2-0",
            "label": "Language",
            "icon": "bullet",
            "path": "/raaghu-Language",
            "subTitle": "Manage user interface languages",
          },
          {
            "key": "3-2-1",
            "label": "LanguageTexts",
            "icon": "bullet",
            "path": "/raaghu-Language-Text",
            "subTitle": "Manage user interface languages",
          },
        ],
      },
      {
        "key": "3-3",
        "label": "TextTemplates",
        "icon": "bullet",
        "path": "/raaghu-Text-Template",
        "subTitle": "Manage user interface languages",
      },
      {
        "key": "3-4",
        "label": "AuditLogs",
        "icon": "bullet",
        "path": "/raaghu-Audit-Logs",
        "subTitle": "",
      },
      {
        "key": "3-5",
        "label": "Settings",
        "icon": "bullet",
        "path": "/raaghu-Settings",
        "subTitle": "Show and change application settings",
      },
      {
        "key": "3-6",
        "label": "Blogging",
        "icon": "bullet",
        "children": [
          {
            "key": "3-6-0",
            "label": "Blogging",
            "icon": "bullet",
            "path": "/raaghu-Blogger",
            "subTitle": "Blogs, Posts, Articles",
          },
        ],
      },
    ],
  },
  {
    "key": "4",
    "label": "FileManagement",
    "icon": "file_management",
    "path": "/raaghu-File-Management",
    "subTitle": "Manages the details of the files and folders respectively",
  },
  {
    
    "key": "5",
    "label": "Forms",
    "icon": "forms",
    "path": "/raaghu-Forms",
    "subTitle": "Forms",
  },
  {
    "key": "6",
    "label": "Payment Management",
    "icon": "payment",
    "children": [
      {
        "key": "6-0-0",
        "label": "Payment Plans",
        "icon": "bullet",
        "path": "/raaghu-PaymentPlans",
        "subTitle": "Payment Plans",
      },
      {
        "key": "6-0-1",
        "label": "Payment Requests",
        "icon": "bullet",
        "path": "/raaghu-PaymentRequests",
        "subTitle": "Payment Requests",
      }
    ]
  },
  {
    "key": "7",
    "label": "Cms",
    "icon": "cms",
    "children": [
      {
        "key": "7-0-0",
        "label": "Blogs",
        "icon": "bullet",
        "path": "/raaghu-Blogs",
        "subTitle": "Manage your blogs",
      },
      {
        "key": "7-0-1",
        "label": "Polls",
        "icon": "bullet",
        "path": "/raaghu-Polls",
        "subTitle": "Blogs, Posts, Articles",
      },
      {
        "key": "7-0-2",
        "label": "Url Forwarding",
        "icon": "bullet",
        "path": "/raaghu-Url-Forwarding",
        "subTitle": "Blogs, Posts, Articles",
      },
      {
        "key": "7-0-3",
        "label": "Comments",
        "icon": "bullet",
        "path": "/raaghu-Comments",
        "subTitle": "Comments",
      },
      {
        "key": "7-0-4",
        "label": "Tags",
        "icon": "bullet",
        "path": "/raaghu-Tags",
        "subTitle": "tags",
      },
      {
        "key": "7-0-5",
        "label": "Menus",
        "icon": "bullet",
        "path": "/raaghu-Menus",
        "subTitle": "menus"
      },
      {
        "key": "7-0-6",
        "label": "Blog Posts",
        "icon": "bullet",
        "path": "/raaghu-Blog-Post",
        "subTitle": "subtitle here"
      },
      {
        "kay": "7-0-7",
        "label": "Global Resources",
        "icon": "bullet",
        "path": "/raaghu-GlobalResources",
        "subTitle": "Global Resources",
      },
      {
        "key": "7-0-8",
        "label": "News letters",
        "icon": "bullet",
        "path": "/raaghu-Newsletters",
        "subTitle": "Newsletters"
      },
      {
        "key": "7-0-9",
        "label": "Pages",
        "icon": "bullet",
        "path": "/raaghu-Pages",
        "subTitle": "subtitle here"
      }
    ]
  }
];

export default MainMenu;
