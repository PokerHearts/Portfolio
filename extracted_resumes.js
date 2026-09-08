/**
 * Unified Profile & Single Resume Data
 * Pratap Jindal — Management Analyst | Business Operations & Systems
 * Master Source: Pratap_Jindal_Resume.pdf
 */

const masterProfile = {
  name: "Pratap Jindal",
  roleTitle: "Management Analyst — Operations & Business Systems",
  roleSubtitle: "Architecting Decision Infrastructure · Streamlining Supply Chains · Automating Workflows",
  summary: "Management Analyst with 3+ years of experience improving business operations through process redesign, executive management reporting, inventory optimisation, and automated business systems. Co-designed and deployed an 18+ module internal analytics platform serving as the primary decision-support layer for an 80+ member organization, reduced manual reporting effort by approximately 70–80%, improved inventory turnover ratio by 20%, and sustained ~98% stock accuracy across multi-company operations. MBA graduate (CGPA 8.83/10) and UGC NET Assistant Professor Qualified.",
  resumeFile: "Pratap_Jindal_Resume.pdf",
  contact: {
    email: "pratapjindal812@gmail.com",
    phone: "+91 70090 19719",
    location: "Mohali / Panchkula, India",
    mobility: "Open to relocation to Australia, Europe & North America",
    linkedin: "https://linkedin.com/in/pratap-jindal/",
    portfolio: "https://pokerhearts.in"
  },
  stats: [
    { value: "18+", label: "Modules Built", detail: "Internal analytics platform" },
    { value: "₹75 Cr", label: "Monthly Revenue", detail: "BFIL 72-member division" },
    { value: "80%", label: "Manual Effort Saved", detail: "Google Apps Script pipelines" },
    { value: "98%", label: "Stock Accuracy", detail: "Sustained inventory health" },
    { value: "20%", label: "ITR Improvement", detail: "500 to ~400 SKU rationalization" },
    { value: "8.83", label: "MBA CGPA", detail: "UGC NET Qualified" }
  ],
  competencyPillars: [
    {
      category: "Business Analysis & Systems",
      icon: "analytics",
      skills: ["Business Analysis", "MIS & Management Reporting", "Looker Studio (13 Dashboards)", "Advanced Google Sheets", "Excel & Financial Modelling", "Root-Cause Analysis"]
    },
    {
      category: "Automation & Engineering",
      icon: "automation",
      skills: ["Google Apps Script", "Workflow Automation", "Chrome Extension Development", "Email Ingestion Pipelines", "ERP / CRM Systems (MARG, OMEGA)", "Web Audio & LLM APIs"]
    },
    {
      category: "Operations & Supply Chain",
      icon: "operations",
      skills: ["Inventory Rationalisation", "Shortage Escalation Protocols", "Reconciliation Systems", "Demand Planning", "Process Mapping", "SOP Development"]
    },
    {
      category: "Leadership & Governance",
      icon: "leadership",
      skills: ["Division Leadership (72 Members)", "Managing 7,500+ Clients", "Cross-Functional Governance", "Digital Capability Training (30+ Staff)", "Stakeholder Reporting", "Change Management"]
    }
  ],
  experience: [
    {
      title: "Management Analyst – Business Analytics & Operations",
      org: "Group Biopolis (Biopolis + Ultrapolis)",
      location: "Panchkula, India",
      date: "SEP 2023 – PRESENT",
      bullets: [
        "Co-led the design and rollout of an 18-module internal analytics platform covering Sales, CRM, Inventory, Finance, Attendance, and Employee Performance, now serving as the primary decision-support layer for an 80+ member organisation.",
        "Developed 13 Looker Studio dashboards for sales operations, lead verification, inventory, purchasing, and vendor performance.",
        "Reduced manual reporting effort by approximately 70–80% through workflow automation covering data refresh, email-to-data ingestion, timestamps, and operational logging.",
        "Led inventory rationalisation across 500+ SKUs, reducing active lines to ~400, cutting concurrent shortage complaints from 17 to 2, and improving inventory turnover ratio by 20%.",
        "Maintained approximately 98% stock accuracy across two companies through structured monitoring and cross-company reconciliation.",
        "Designed MIS outputs and operational systems that converted raw data into decision-ready information for senior management.",
        "Trained 30+ non-technical employees and developed SOPs, training guides, and system documentation to support organisation-wide adoption."
      ]
    },
    {
      title: "Divisional Manager",
      org: "Bharat Financial Inclusion Limited (IndusInd Bank Subsidiary)",
      location: "Ludhiana, India",
      date: "SEP 2022 – FEB 2023",
      bullets: [
        "Managed a 72-member field division serving 7,500+ clients across 10 operational regions.",
        "Delivered INR 75 Cr monthly sales targets consistently within 2 days of each cycle.",
        "Reviewed field productivity, target achievement, customer servicing, and divisional performance to identify operational bottlenecks.",
        "Diagnosed chronic low field throughput using Maslow's Hierarchy of Needs, redesigning the engagement model to hit 40% of target in a single weekend.",
        "Prepared performance reports and operational insights for executive leadership."
      ]
    },
    {
      title: "Customer Delight Intern",
      org: "Zolostays Property Solutions Limited",
      location: "India",
      date: "FEB 2021 – MAY 2021",
      bullets: [
        "Managed 2,000+ support cases with 99.95% processing accuracy and 95% SLA compliance.",
        "Reduced refund-delay tickets by approximately 60% through process documentation and workflow improvements."
      ]
    }
  ],
  education: [
    {
      degree: "Master of Business Administration (MBA)",
      institution: "Mittal School of Business & NSE Academy, Lovely Professional University",
      period: "2021 – 2023",
      score: "CGPA: 8.83 / 10"
    },
    {
      degree: "Bachelor of Business Administration (BBA)",
      institution: "Mittal School of Business, Lovely Professional University",
      period: "2018 – 2021",
      score: "CGPA: 8.36 / 10"
    }
  ],
  certifications: [
    "UGC NET – Assistant Professor Qualified",
    "NCFM Financial Modelling | Valuation & Forecasting",
    "Data Visualization & Communication with Tableau – Duke University",
    "Understanding Financial Markets – University of Geneva",
    "Introduction to Financial Markets – Indian School of Business (ISB)",
    "Investment Analysis & Portfolio Management",
    "Equity Derivatives & Options Trading Strategies"
  ]
};

// Aliases for seamless compatibility
const resumeData = {
  default: masterProfile,
  leadership: masterProfile,
  operations: masterProfile,
  analytics: masterProfile
};
