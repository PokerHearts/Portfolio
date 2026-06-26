const projectData = [
  {
    id: "MOD_01",
    category: "ai-systems",
    strategy: {
      title: "AI Voice Mock Interview Simulator & Portal",
      desc: "An interactive, serverless AI voice simulator developed for intensive mock interview training. Candidate resumes are parsed directly in the browser via PDF.js, triggering a real-time voice activity Hindi/English conversation loop (Web Audio/Speech APIs) featuring noise calibration and interruption-handling to model real-world high-pressure interviews.",
      outcomeLabel: "Operational Purpose & Cost",
      outcomeText: "Operates as a high-fidelity training sandbox; scales at ~$0.05 API cost per interview simulation, logging comprehensive performance feedback and scoring metrics to a central Sheets database.",
      tech: ["Gemini API", "Web Audio API", "PDF.js", "Apps Script"],
      cta: { text: "Deep-Dive Case Study", key: "hrVoice" }
    },
    product: {
      title: "AI Voice Mock Interview Simulator",
      badge: "AI Product",
      problem: "Candidates lack realistic, adaptive, real-time sandboxes to practice verbal delivery under pressure.",
      users: "108+ team members and corporate candidates.",
      solution: "Interactive, voice-first mock interview training portal using Web Audio and generative AI.",
      decisions: "Used browser-side PDF.js parsing to keep user data private and minimize server compute costs, combined with Speech API VAD calibration.",
      kpi: "API Cost per Interview",
      outcome: "Lowered costs to ~$0.05 per interview, capturing 100% of feedback markers."
    },
    research: {
      title: "Investigating LLM-Assisted Quality Evaluation in Decentralized Telecalling Environments",
      badge: "Research Investigation",
      theme: "AI-Augmented Decision Making",
      question: "How can decentralized telecalling environments leverage LLMs to democratize quality assurance without high computational overhead?",
      methodology: "Designed a Web Audio capture pipeline synced with LLM event parsing to grade voice transcripts against script parameters.",
      contribution: "Provides an empirical model for local speech-to-text inference and scoring, eliminating centralized sample audits."
    },
    transformation: {
      title: "Enterprise Voice Screening Digitization",
      badge: "AI Transformation",
      stream: "AI Transformation",
      before: "Manual screening by recruiters, causing long hiring lags and high coordination friction.",
      after: "AI-driven automated voice screening sandbox.",
      change: "Conducted interactive workshops for recruiting staff, showing how AI filters low-fit profiles and frees their time for high-value interviews.",
      value: "Reduced manual screening hours by 70%, with 100% database capture of candidate profiles."
    }
  },
  {
    id: "MOD_02",
    category: "ai-systems",
    strategy: {
      title: "AI-Powered Call QA Analysis System",
      desc: "An automated evaluation engine processing over 1,200 recordings daily (800 minutes of voice data) from 12 decentralized telecalling units. Analyzes audio transcripts to provide highly structured feedback on customer tone, script alignment, purchase intent, and next-action pipelines.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Eliminated manual QA sampling, driving 100% evaluation coverage and automated feedback loops for team leads.",
      tech: ["LLM Analytics", "Audio Pipelines", "Apps Script", "Drive API"],
      cta: { text: "Deep-Dive Case Study", key: "callQA" }
    },
    product: {
      title: "AI Call QA Analyst",
      badge: "Speech AI Product",
      problem: "Manual QA audits covered <2% of daily recordings, leaving agent execution errors undetected.",
      users: "12 decentralized telecalling units, auditing 1,200 daily records.",
      solution: "Speech-to-text transcript processing engine analyzing objections, script alignment, and tone.",
      decisions: "Restructured pipeline with a rate-limited task queuing matrix to handle API thresholds for 800 daily audio minutes.",
      kpi: "QA Coverage Rate",
      outcome: "Achieved 100% evaluation coverage, saving 360 hours of manual evaluation monthly."
    },
    research: {
      title: "Automating Organizational Auditing in Speech Channels Using Large Language Models",
      badge: "Research Investigation",
      theme: "AI-Augmented Decision Making",
      question: "What metrics optimize the consistency of LLM-based evaluations on customer intent and agent script adherence?",
      methodology: "Evaluated 1,200 records daily using semantic prompt templates, calculating Spearman correlation against human QA graders.",
      contribution: "Shows high correlation (r > 0.85) between prompt-engineered evaluators and professional auditors in localized language dialects."
    },
    transformation: {
      title: "QA Auditing Automation Initiative",
      badge: "AI Transformation",
      stream: "AI Transformation",
      before: "Manual checking of a 2% random sample of daily calls, leaving compliance issues hidden.",
      after: "Automated batch speech processing covering 100% of call recordings.",
      change: "Trained QA supervisors to interpret live Looker dashboards, shifting their role from call listening to targeted agent coaching.",
      value: "100% audit coverage, saving 360 hours/month and triggering real-time compliance alerts."
    }
  },
  {
    id: "MOD_03",
    category: "fullstack",
    strategy: {
      title: "B2B Order Booking Workspace",
      desc: "A serverless, mobile-optimized B2B order portal designed to replace scattered communication channels. Features client-side state caching, custom token authentication, catalog search engines, and real-time client-side PDF invoicing.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Slashed recurring booking loops by >60% while running at absolute zero operating cost via serverless hosting.",
      tech: ["Vanilla JS", "jsPDF", "Edge Cache", "Token Auth"],
      cta: { text: "Deep-Dive Case Study", key: "b2bOrder" }
    },
    product: {
      title: "B2B Sales Portal",
      badge: "Core Workspace",
      problem: "Scattered order collections via text/emails caused invoice errors and delayed booking (avg. 8 mins/order).",
      users: "Field sales agents and distributor reps.",
      solution: "Serverless web workspace with Edge caching, custom SKU filtering, and instant PDF invoice compilation.",
      decisions: "Bypassed heavy database costs by building secure client-side caching linked to serverless Apps Script endpoints.",
      kpi: "Average Booking Time",
      outcome: "Reduced booking time from 8 minutes to 45 seconds, with 100% ordering accuracy."
    },
    research: {
      title: "Low-Cost Mobile Workspaces: Caching and Authentication in Serverless B2B Frameworks",
      badge: "Research Investigation",
      theme: "Information Systems",
      question: "How can enterprise field-sales platforms establish transactional integrity at zero infrastructure cost?",
      methodology: "Built and evaluated a client-side Edge cached token-auth model over stateless HTTP endpoints.",
      contribution: "Establishes a zero-cost infrastructure framework for field agents, maintaining data consistency without database sessions."
    },
    transformation: {
      title: "B2B Sales Digitization Project",
      badge: "Operational Digitization",
      stream: "Operational Digitization",
      before: "Field agents wrote orders on paper or sent messages, leading to manual transcription errors.",
      after: "Integrated mobile order portal with instant invoice generation.",
      change: "Equipped agents with the mobile workspace and created real-time sync with dispatch.",
      value: "Slashed transaction booking loop by 60% with zero hardware/operating server costs."
    }
  },
  {
    id: "MOD_04",
    category: "supply-ops",
    strategy: {
      title: "Predictive Inventory & PO Optimizer",
      desc: "A strategic stock governance dashboard tracking absolute inventories, batch histories, safety margins, and active backlogs. Integrates a predictive reordering engine driven by safety thresholds and rolling averages, combined with complete vendor PO lifecycle tracking.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Reduced chronic shortages from 17 to 2, optimizing stock rotation and driving 20% sales expansion.",
      tech: ["Predictive Math", "Lifecycle Tracking", "Data Modeling"]
    },
    product: {
      title: "Inventory & PO Optimizer",
      badge: "Supply Product",
      problem: "Frequent stockouts and overstocking tied up capital and limited regional sales velocity.",
      users: "Supply chain managers and procurement officers.",
      solution: "Analytics dashboard tracking batch history and calculating reorder recommendations.",
      decisions: "Implemented safety stock formulations based on supplier lead-time variance rather than simple static caps.",
      kpi: "Chronic Shortages",
      outcome: "Reduced shortages from 17 to 2, accelerating stock rotation and enabling a 20% sales expansion."
    },
    research: {
      title: "Exploring Forecasting-Driven Inventory Governance in SME Distribution Systems",
      badge: "Research Investigation",
      theme: "Operations Research",
      question: "How do rolling-average demand models perform compared to fixed-reorder boundary systems in volatile supply chains?",
      methodology: "Analyzed historical distribution records to simulate stock levels under varying safety stock models.",
      contribution: "Provides a mathematical framework for reducing capital locks in distributor networks under lead-time variance."
    },
    transformation: {
      title: "Predictive Stock Optimizer Initiative",
      badge: "Decision Intelligence",
      stream: "Decision Intelligence",
      before: "Ad-hoc stock checks and manual PO creation, causing regular stockouts of key SKUs.",
      after: "Dashboard tracking batches, backlogs, and recommending reorder schedules.",
      change: "Conducted weekly supply reviews, training managers to act on recommended reorders.",
      value: "Chronic stock shortages fell by 88%, boosting stock rotation and sales velocity."
    }
  },
  {
    id: "MOD_05",
    category: "extensions",
    strategy: {
      title: "Looker Studio Real-Time Refresher",
      desc: "A custom Chrome extension engineered to bypass the native 15-minute Looker Studio data caching limits. Injects background event runners to trigger real-time, non-invasive dashboard database queries while completely preserving user-selected filters, pivots, and screen scroll coordinates.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Enabled real-time, live operational telemetry monitoring for senior executives during key cycles.",
      tech: ["Chrome Extension API", "DOM Injection", "Session Sync"]
    },
    product: {
      title: "Looker Real-Time Refresher",
      badge: "Chrome Extension",
      problem: "Native 15-minute caching limits prevented executive monitoring of live sales operations.",
      users: "Senior executives and operations controllers.",
      solution: "Chrome extension injecting background scripts to force data refreshes without losing filter states.",
      decisions: "Chose DOM event injection over full page reloading to prevent disruption to user viewports and active scroll ranges.",
      kpi: "Telemetry Query Lag",
      outcome: "Reduced telemetry lag from 15 minutes to instantaneous, real-time live monitoring."
    },
    research: {
      title: "Client-Side Caching Overrides in Visual Telemetry Dashboards",
      badge: "Research Investigation",
      theme: "Information Systems",
      question: "Can DOM manipulation bypass visual caching boundaries without causing server-side rate limits?",
      methodology: "Injected event loops into Looker's rendering frame, measuring network traffic and query success rates.",
      contribution: "Demonstrates a client-side override method for dashboard queries, enabling low-latency data rendering without UI disruptions."
    },
    transformation: {
      title: "Live Telemetry Enablement",
      badge: "Process Automation",
      stream: "Process Automation",
      before: "Dashboard limits forced managers to wait 15 minutes for operations updates.",
      after: "Chrome extension providing non-disruptive, live telemetry refresh.",
      change: "Deployed the extension to the executive team, creating a dashboard monitoring terminal in the operations room.",
      value: "Enabled real-time operational response during peak sales and transit hours."
    }
  },
  {
    id: "MOD_06",
    category: "fullstack",
    strategy: {
      title: "OmniReader — Spatial Reader Workspace",
      desc: "A premium, ultra-fast client-side document reading environment processing EPUB, PDF, and DOCX extensions. Built with local storage state management, dynamic semantic outlines, text-to-speech rendering, full-text instant index indexing, and adaptive layout themes.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Zero server-load cost architecture keeping reading sessions fully private and localized inside client sandboxes.",
      tech: ["EPUB.js", "Scale-Free", "Local Indexing"],
      cta: { text: "Deploy Reader Portal", url: "https://reader.pokerhearts.in" }
    },
    product: {
      title: "OmniReader Document Workspace",
      badge: "Scale-Free Product",
      problem: "Standard document readers require heavy servers for parsing, creating privacy concerns and server overhead.",
      users: "Readers processing EPUB, PDF, and DOCX files.",
      solution: "Fully client-side reader with full-text search, outline indexing, and TTS rendering.",
      decisions: "Opted for client-side file reading, storing reading configurations in IndexedDB to protect data privacy.",
      kpi: "Server Infrastructure Cost",
      outcome: "Reduced server operating costs to $0.00 while maintaining private, localized reading sandboxes."
    },
    research: {
      title: "Cognitive Outline Navigation in Browser-Based E-Readers",
      badge: "Research Investigation",
      theme: "Information Systems",
      question: "How does client-side outline generation affect visual search performance and user text retention?",
      methodology: "Measured document scanning speeds on client-parsed outlines versus linear reading panes.",
      contribution: "Validates the effectiveness of local semantic indexing in enhancing navigation speed in browser environments."
    },
    transformation: {
      title: "OmniReader Platform",
      badge: "Operational Digitization",
      stream: "Operational Digitization",
      before: "Corporate document reviewing relied on scattered PDF readers, leaking text coordinates.",
      after: "Central, client-side, privacy-focused e-reading platform.",
      change: "Migrated review processes to the local sandbox workspace, ensuring documents stay on user systems.",
      value: "Achieved 100% data privacy compliance at zero server hosting overhead."
    }
  },
  {
    id: "MOD_07",
    category: "supply-ops",
    strategy: {
      title: "End-to-End Sales Control System",
      desc: "An operations tracking system managing order pipelines from entry to transit, delivery verification, and exception logging. Includes trigger alerts and structured task assignments for dispatch supervisors.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Decreased order-to-dispatch transit lag by 30% and enhanced final delivery success metrics by 15%.",
      tech: ["Workflow Design", "Lead Time Optimization", "Exception Handlers"]
    },
    product: {
      title: "Sales Dispatch & Control Hub",
      badge: "Operations Product",
      problem: "Poor tracking of order dispatch pipelines led to delivery delays and high transit exception rates.",
      users: "Dispatch supervisors and delivery controllers.",
      solution: "Transit tracking workspace with exception logs, SLA timers, and automated team assignments.",
      decisions: "Designed the system with color-coded transit status blocks to prioritize resolving critical exception delays.",
      kpi: "Order-to-Dispatch Lag",
      outcome: "Decreased dispatch lag by 30% and improved delivery success rates by 15%."
    },
    research: {
      title: "Modeling Transit Anomalies in Decentralized Logistics Systems",
      badge: "Research Investigation",
      theme: "Organizational Systems",
      question: "What exceptions cause the highest dispatch delays in local distributor hubs?",
      methodology: "Logged and categorized 10,000 order transit paths, running ANOVA on exception categories and delay outcomes.",
      contribution: "Categorizes operational transit bottlenecks, validating automated escalation alerts as a solution."
    },
    transformation: {
      title: "Sales Dispatch Digitization",
      badge: "Operational Digitization",
      stream: "Operational Digitization",
      before: "Manual entry of dispatch states and verbal supervisor handoffs, causing log delays.",
      after: "Central tracking portal with automated exception and escalation logging.",
      change: "Redesigned warehouse dispatch routines, establishing digital check-ins for all outgoing vehicles.",
      value: "Slashed order transit lags by 30% while raising final delivery metrics by 15%."
    }
  },
  {
    id: "MOD_08",
    category: "supply-ops",
    strategy: {
      title: "Task Matrix & Performance Scoring",
      desc: "An enterprise execution matrix linking periodic staff tasks to individual performance logs, structuring a feedback loop from assignment to final scoring evaluation.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Lifted general SLA compliance and task completion indices by 40% across administrative departments.",
      tech: ["Performance Systems", "Scoring Math"]
    },
    product: {
      title: "Staff Performance Matrix",
      badge: "Internal Tool",
      problem: "Lack of structured task tracking caused missed deadlines and subjective performance reviews.",
      users: "Administrative managers and department staff.",
      solution: "Task accountability matrix linking regular deliverables to objective performance logs.",
      decisions: "Used a relative score distribution model rather than absolute marks to prevent grading inflation across teams.",
      kpi: "SLA Compliance Rate",
      outcome: "Increased administrative SLA compliance by 40% using automated performance logging."
    },
    research: {
      title: "Evaluating Objective Feedback Loops in Administrative Operations",
      badge: "Research Investigation",
      theme: "Organizational Systems",
      question: "How does periodic performance logging affect task completion times in non-sales departments?",
      methodology: "Conducted a pre-post study of task compliance rates before and after implementing structured matrix scoring.",
      contribution: "Shows that transparent performance evaluation models significantly reduce task completion latency (p < 0.05)."
    },
    transformation: {
      title: "Task Execution Restructuring",
      badge: "Process Automation",
      stream: "Governance & Control",
      before: "Verbal delegation and retrospective reviews, causing delayed reports and disputes.",
      after: "Structured performance matrix matching roles to weekly tasks.",
      change: "Introduced gamified monthly reviews based on matrix outcomes, rewarding high-performance metrics.",
      value: "Boosted department SLA compliance by 40%, inverting task neglect rates."
    }
  },
  {
    id: "MOD_09",
    category: "supply-ops",
    strategy: {
      title: "District Monopoly & Control System",
      desc: "A dynamic territory mapping and management database tracking monopoly allocations, local sales performance, warning triggers, and automated contract termination logs.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Streamlined regional governance and automated warnings for underperforming territory allocations.",
      tech: ["Territory Mapping", "Data Automation", "SLA Warnings"]
    },
    product: {
      title: "Territory Governance System",
      badge: "Governance Tool",
      problem: "Overlapping territory allocations caused dealer disputes, diluting brand pricing margins.",
      users: "Territory sales managers and legal compliance teams.",
      solution: "Dealer mapping database monitoring monopoly boundaries and sales performance thresholds.",
      decisions: "Implemented automated warnings that fire as soon as regional dealer volumes drop below local targets.",
      kpi: "Dealer Disputes Resolved",
      outcome: "Resolved overlapping distribution disputes, automating contract compliance checks."
    },
    research: {
      title: "Territory Governance Models in SME Franchise Distribution",
      badge: "Research Investigation",
      theme: "Organizational Systems",
      question: "What territory parameters minimize dealer channel conflict and pricing erosion?",
      methodology: "Analyzed spatial distribution patterns of dealer networks, mapping pricing compliance against distance and volume.",
      contribution: "Formulates a spatial control method for franchise operations, demonstrating the benefits of hard boundary rules."
    },
    transformation: {
      title: "Dealer Control Digitization",
      badge: "Governance & Control",
      stream: "Governance & Control",
      before: "Scribbled lists and verbal agreements of dealership allocations, causing boundary disputes.",
      after: "Database linking dealer locations, contract terms, and warning thresholds.",
      change: "Created a formal geographic database of allocations, training managers to verify overlaps before new contracts.",
      value: "Streamlined regional dealer governance, resolving channel overlaps and price erosion."
    }
  },
  {
    id: "MOD_10",
    category: "supply-ops",
    strategy: {
      title: "Short Product & Restock Trigger",
      desc: "A real-time database capturing unfulfilled client demand during order placement and linking it with active inventory updates to auto-alert sales agents as soon as items return to stock.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Recovered previously lost repeat orders by instantly pushing availability notifications to regional reps.",
      tech: ["Inventory Triggers", "Lead Recovery", "Event Hooks"]
    },
    product: {
      title: "Restock Notification Engine",
      badge: "Sales Product",
      problem: "When items went out of stock, client orders were cancelled and salesmen forgot to re-pitch when items returned.",
      users: "Sales agents and inventory controllers.",
      solution: "Demand capture database linking unfulfilled sales orders to inventory arrival hooks for automated alerts.",
      decisions: "Created direct WhatsApp/Email alert triggers for regional reps rather than passive dashboard markers.",
      kpi: "Recovered Sales Orders",
      outcome: "Bypassed order losses by notifying agents the moment items hit the shelves."
    },
    research: {
      title: "Demand Backlogging and Recovery in SME Distribution Channels",
      badge: "Research Investigation",
      theme: "Operations Research",
      question: "Can localized alert loops recover backlogged order demand during stockouts?",
      methodology: "Measured conversion success of backlogged orders notified within 24 hours of restock against standard lists.",
      contribution: "Shows that prompt recovery notification models significantly increase buyer retention (p < 0.01) after stockouts."
    },
    transformation: {
      title: "Lost Demand Capture Project",
      badge: "Operational Digitization",
      stream: "Operational Digitization",
      before: "Out-of-stock items were deleted from orders, with zero tracking of missed revenue.",
      after: "Database capturing short product requests, linked to incoming stock alerts.",
      change: "Instructed order bookers to log every short item, aligning the workflow with stock arrivals.",
      value: "Recovered previously lost sales, creating a reliable ledger of unfilled demand."
    }
  },
  {
    id: "MOD_11",
    category: "supply-ops",
    strategy: {
      title: "Lead Quality & De-duplication Engine",
      desc: "A validation pipeline utilizing regular expression validation and dynamic cross-referencing algorithms to clean and de-duplicate contact database sheets before CRM entry.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Eliminated ~25% database clutter and duplicate lead allocations, preserving CRM record hygiene.",
      tech: ["Regex Parsers", "Data Cleaning", "CRM Validation"]
    },
    product: {
      title: "Lead Cleaning Engine",
      badge: "Data Product",
      problem: "Duplicate client data uploads caused salesmen to pitch to the same contacts, creating friction.",
      users: "CRM administrators and lead generation leads.",
      solution: "Lead cleaning pipeline with regex validation and dynamic cross-reference matching.",
      decisions: "Implemented fuzzy phone number normalization to catch duplicates using different formats.",
      kpi: "CRM Clutter Reduced",
      outcome: "Cleaned contact files before database import, removing 25% duplicate and invalid entries."
    },
    research: {
      title: "Heuristic Data Cleaning in Low-Resource CRM Integrations",
      badge: "Research Investigation",
      theme: "Information Systems",
      question: "What matching thresholds balance de-duplication accuracy with computation cost in SME databases?",
      methodology: "Tested regex and levenshtein distance parameters on 50,000 sales records to identify duplicates.",
      contribution: "Provides a practical cleaning protocol for resource-constrained companies lacking dedicated data tools."
    },
    transformation: {
      title: "CRM Lead Sanitation Initiative",
      badge: "Process Automation",
      stream: "Process Automation",
      before: "Manual upload of lists, causing duplicate records and split customer logs.",
      after: "Pipeline using regular expressions and cross-matching to clean leads before entry.",
      change: "Set a strict upload workflow: all lists must pass through the de-duplication script before import.",
      value: "Preserved CRM integrity, preventing duplicate calls and saving agent time."
    }
  },
  {
    id: "MOD_12",
    category: "supply-ops",
    strategy: {
      title: "Vendor Payables Ledger Dashboard",
      desc: "A secure cash outflow dashboard organizing payments, credit timelines, and validation logs, featuring automated alerts on upcoming invoice maturities.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Optimized working capital visibility and avoided delay penalties across 40+ corporate supply vendors.",
      tech: ["Finance Tracking", "Maturity Alerts", "Cash Flow Ops"]
    },
    product: {
      title: "Vendor Payables Hub",
      badge: "Finance Product",
      problem: "Delayed invoices led to late penalties and interrupted manufacturer supply channels.",
      users: "Accounts payable teams and finance heads.",
      solution: "Outflow dashboard tracking credit periods, validation files, and maturity timers.",
      decisions: "Built a calendar view showing daily cash requirements to prevent sudden working capital locks.",
      kpi: "Supplier Late Penalties",
      outcome: "Avoided late penalties across 40+ vendors, keeping credit channels open."
    },
    research: {
      title: "Optimizing Working Capital in Supply Networks through Cash Outflow Modeling",
      badge: "Research Investigation",
      theme: "Operations Research",
      question: "How do credit maturity alerts affect distributor cash reserves and credit ratings?",
      methodology: "Analyzed cash flows and payment cycles before and after implementing maturity dashboards.",
      contribution: "Shows the impact of credit maturity visibility on improving supplier relationship metrics."
    },
    transformation: {
      title: "Accounts Payable Digitization",
      badge: "Governance & Control",
      stream: "Governance & Control",
      before: "Physical invoice filing and calendar notes, leading to missed vendor payment deadlines.",
      after: "Secure outflow dashboard tracking credit periods, maturities, and payment statuses.",
      change: "Digitized vendor records and set up weekly reviews based on automated invoice warnings.",
      value: "Optimized capital visibility, avoiding penalties across 40+ supply vendors."
    }
  },
  {
    id: "MOD_13",
    category: "supply-ops",
    strategy: {
      title: "Complaint Management & Escalation Engine",
      desc: "A multi-level trouble ticketing system routing client and operational complaints to corresponding team leads with built-in escalation timers.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Slashed average complaint resolution cycle times by 48 hours via structured department escalation triggers.",
      tech: ["Escalation Logic", "SLA Tracking", "Ticketing Pipelines"]
    },
    product: {
      title: "Complaint Escalation Hub",
      badge: "SLA Product",
      problem: "Client complaints got stuck in employee email boxes, causing long resolution times.",
      users: "Customer support agents and operations heads.",
      solution: "Ticketing dashboard routing logs to departments with built-in escalation warnings.",
      decisions: "Set up warning escalations that alert division heads if a ticket stays open past 24 hours.",
      kpi: "Avg. Resolution Time",
      outcome: "Slashed average complaint resolution time by 48 hours via automated escalations."
    },
    research: {
      title: "Escalation Dynamics in Multi-Tier Service Operations",
      badge: "Research Investigation",
      theme: "Organizational Systems",
      question: "How do warning loops impact ticket resolution times in decentralized operations?",
      methodology: "Tracked ticket lifecycles across teams, measuring the impact of escalation warnings on completion speed.",
      contribution: "Demonstrates the benefits of automated warning loops in resolving administrative delays."
    },
    transformation: {
      title: "Complaint Resolution Redesign",
      badge: "Operational Digitization",
      stream: "Operational Digitization",
      before: "Client complaints were sent to different emails, with no central ticket tracking.",
      after: "Central ticketing portal with automated team routing and escalations.",
      change: "Set up a direct complaint channel for clients, routing tickets to team leads.",
      value: "Slashed resolution cycles by 48 hours, improving client trust metrics."
    }
  },
  {
    id: "MOD_14",
    category: "supply-ops",
    strategy: {
      title: "Unified Inventory, Batch & Collections Ledger",
      desc: "A comprehensive operational dataset model unifying inventory records, production batch lifetimes, and cash collections into a consolidated corporate reporting layer.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Consolidated three previously isolated data streams into a single source of truth for boardroom reviews.",
      tech: ["SQL-Like Querying", "Data Blending", "Integrations"]
    },
    product: {
      title: "Unified Operations Ledger",
      badge: "Data Portal",
      problem: "Siloed data in sales, stock, and cash ledgers made it hard to review weekly performance.",
      users: "Boardroom executives and finance controllers.",
      solution: "Integrated ledger blending stock batches, invoices, and payment data.",
      decisions: "Chose to merge data at the report layer rather than altering underlying system databases to prevent sync errors.",
      kpi: "Report Processing Time",
      outcome: "Consolidated three isolated systems into a single dashboard for executive meetings."
    },
    research: {
      title: "Data Blending in Fragmented Legacy Enterprise Architectures",
      badge: "Research Investigation",
      theme: "Information Systems",
      question: "How can legacy records be merged to support real-time executive decision-making?",
      methodology: "Compared data loading speeds of live database queries against batch blended dashboards.",
      contribution: "Validates a lightweight blending approach for legacy systems, avoiding database migrations."
    },
    transformation: {
      title: "Operational Data Integration",
      badge: "Operational Digitization",
      stream: "Operational Digitization",
      before: "Excel files from different departments had to be manually merged for weekly meetings.",
      after: "Automated database blending compiling stock, batches, and cash into one screen.",
      change: "Standardized data schemas across sales, warehouse, and finance teams.",
      value: "Replaced manual consolidation, saving hours of weekly Excel work."
    }
  },
  {
    id: "MOD_15",
    category: "ai-systems",
    strategy: {
      title: "SCOT Predictive Purchase Pattern Dashboard",
      desc: "A behavior-driven predictive dashboard analyzing historical B2B purchase frequencies to calculate and forecast future reorder timelines per client.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Enabled predictive sales calling across 500+ SKUs by anticipating client restocking cycles.",
      tech: ["Data Modeling", "Looker Studio", "Predictive Demand"]
    },
    product: {
      title: "SCOT Purchase Predictor",
      badge: "Analytics Product",
      problem: "Sales calls were reactive, missing dealer inventory exhaustion moments.",
      users: "Sales reps and regional managers.",
      solution: "Predictive dashboard tracking customer purchasing histories to estimate future restocking dates.",
      decisions: "Utilized client-specific demand waves rather than national averages to customize sales calling triggers.",
      kpi: "Predictive Pitch Accuracy",
      outcome: "Enabled predictive sales calling across 500+ SKUs, increasing client repeat buys."
    },
    research: {
      title: "Modeling Customer Purchasing Behavior and Credit Risk in B2B SME Systems",
      badge: "Research Investigation",
      theme: "Predictive Analytics",
      question: "Can transaction anomalies predict dealer credit defaults before they occur?",
      methodology: "Analyzed credit periods and payment lags on 2,000 accounts, running classification trees for risk indicators.",
      contribution: "Develops a credit scoring system for small-scale distributors, lowering payment risks."
    },
    transformation: {
      title: "Predictive Sales Transformation",
      badge: "Decision Intelligence",
      stream: "Decision Intelligence",
      before: "Sales reps waited for dealers to call, losing orders to competitors.",
      after: "Dashboard showing clients whose inventories are likely running low.",
      change: "Trained agents to make proactive sales calls based on dashboard restocking dates.",
      value: "Boosted outbound sales conversions and improved client purchase rates."
    }
  },
  {
    id: "MOD_16",
    category: "extensions",
    strategy: {
      title: "Android Call Recording Synchronizer",
      desc: "A custom background mobile script running localized file system hooks on Android devices to safely ingest and sync call audio recordings straight to secure Drive folders.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Secured 100% data compliance capture rates for the call quality evaluation pipeline across 12 remote agents.",
      tech: ["Android Automation", "Drive API", "Background Hooks"]
    },
    product: {
      title: "Android Call Sync Agent",
      badge: "Operations Tool",
      problem: "Remote agents forgot to upload recording files, breaking the call QA analysis cycle.",
      users: "12 remote telecalling agents.",
      solution: "Android background script monitoring directory creations and syncing files to Drive.",
      decisions: "Faced with mobile OS sleep cycles, designed a deferred check-in process that restarts upload threads.",
      kpi: "Call Capture Compliance",
      outcome: "Secured 100% call capture compliance, feeding recordings into the AI QA evaluator."
    },
    research: {
      title: "Low-Latency Synchronizations in Mobile Enterprise Environments",
      badge: "Research Investigation",
      theme: "Information Systems",
      question: "How can mobile apps sync media assets under battery restrictions and limited networks?",
      methodology: "Compared upload completion rates of foreground uploads versus background hook scripts.",
      contribution: "Shows how mobile OS directory watchers can be set up to secure media assets without high battery drain."
    },
    transformation: {
      title: "Call Compliance Digitization",
      badge: "Process Automation",
      stream: "Process Automation",
      before: "Manual sharing of audio files over chat, causing lost files and compliance risks.",
      after: "Background mobile script uploading calls automatically to cloud folder.",
      change: "Installed the sync script on agent phones and automated upload validation.",
      value: "Raised QA compliance rate to 100%, feeding the speech analysis pipeline."
    }
  },
  {
    id: "MOD_17",
    category: "supply-ops",
    strategy: {
      title: "Control Sample Lifecycle Monitor",
      desc: "A quality audit logging environment tracing periodic product control samples, cross-referencing batch numbers and expiration schedules.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Achieved 100% structural alignment with regulatory quarterly pharmaceutical quality audit sheets.",
      tech: ["SOP Logging", "Lifecycle Tracking", "QC Audits"]
    },
    product: {
      title: "Control Sample Tracker",
      badge: "Quality Product",
      problem: "Tracking physical control samples in pharmaceutical batches was manual, risking audit failures.",
      users: "Quality control officers and warehouse managers.",
      solution: "Digital logging environment cross-referencing batch IDs and sample locations.",
      decisions: "Used automated status flags to highlight expiring control samples before quarterly audit cycles.",
      kpi: "Audit Compliance Score",
      outcome: "Secured 100% compliance alignment with regulatory quality audit requirements."
    },
    research: {
      title: "Traceability Models in Regulated Small-Scale Production Batching",
      badge: "Research Investigation",
      theme: "Operations Research",
      question: "How do database batch-tracking models impact audit readiness in chemical distribution?",
      methodology: "Analyzed audit times and retrieval error rates under paper logs versus digital tracking databases.",
      contribution: "Proves that digital batch-referencing models significantly reduce information retrieval times in audits."
    },
    transformation: {
      title: "QC Audit Digitization",
      badge: "Governance & Control",
      stream: "Governance & Control",
      before: "Control samples were catalogued in paper books, causing delays during audits.",
      after: "Digital logging interface linking batch IDs and sample locations.",
      change: "Established check-in routines in the QA room, matching batches to locations in real time.",
      value: "Removed manual audit delays, securing 100% compliance with regulators."
    }
  },
  {
    id: "MOD_18",
    category: "extensions",
    strategy: {
      title: "Dynamic Google Form Prefill System",
      desc: "An automated URL parameter builder that dynamically injects client metadata and context IDs into form links, eliminating duplicate entry needs.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Eliminated manual entry typos by field operators submitting inventory status sheets.",
      tech: ["URL Parameters", "Google Forms", "Automation"]
    },
    product: {
      title: "Dynamic Form Prefill Engine",
      badge: "Operations Tool",
      problem: "Field agents wasted time re-typing customer IDs and SKU info on mobile inventory sheets.",
      users: "Field operators and warehouse staff.",
      solution: "URL parameter builder injecting metadata into forms based on dealer selection.",
      decisions: "Decided to build prefill links client-side to prevent server-side wait states for agents.",
      kpi: "Operator Typo Rates",
      outcome: "Cut entry times and eliminated manual typos on incoming inventory sheets."
    },
    research: {
      title: "Reducing Entry Friction in Mobile Field Ingestion Services",
      badge: "Research Investigation",
      theme: "Information Systems",
      question: "How does pre-populating fields impact data accuracy and submission speed in mobile contexts?",
      methodology: "Compared submission speed and error rates of empty forms against prefilled URL forms.",
      contribution: "Confirms that parameter pre-population significantly lowers error rates and increases submission rates."
    },
    transformation: {
      title: "Field Form Automation Project",
      badge: "Process Automation",
      stream: "Process Automation",
      before: "Warehouse agents typed name, ID, and dates on every report, leading to entry typos.",
      after: "Dynamic prefill links that inject client metadata automatically.",
      change: "Trained operators to open prefilled links directly from their CRM cards.",
      value: "Reduced form submission times and prevented client ID mismatch errors."
    }
  },
  {
    id: "MOD_19",
    category: "supply-ops",
    strategy: {
      title: "Dynamic Sales Incentive & Commission Calculator",
      desc: "An automated commission engine tracking regional sales tiers, growth metrics, and milestone payout ratios for field forces, replacing fragile excel sheets.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Standardized commission tracking, providing absolute computational accuracy and cutting processing latency.",
      tech: ["Apps Script", "Commission Math", "Dynamic Ledgers"]
    },
    product: {
      title: "Sales Commission Engine",
      badge: "Internal Tool",
      problem: "Calculating complex commission tiers on Excel sheets took days, leading to payment disputes.",
      users: "HR managers, sales executives, and accounting teams.",
      solution: "Apps Script commission engine calculating tiers and payout ratios from sales logs.",
      decisions: "Used a single source of truth sales table to calculate commissions, resolving mismatches.",
      kpi: "Payroll Disputes",
      outcome: "Reduced commission processing times from 4 days to instant, eliminating payroll disputes."
    },
    research: {
      title: "Designing Incentive Frameworks in Large Decentralized Sales Channels",
      badge: "Research Investigation",
      theme: "Operations Research",
      question: "Can automated incentive transparency change sales behavior and drive channel growth?",
      methodology: "Tracked weekly sales changes after launching the transparent commission ledger.",
      contribution: "Shows that sharing real-time payout estimations increases salesman motivation and volumes."
    },
    transformation: {
      title: "Incentive Calculation Automation",
      badge: "Process Automation",
      stream: "Process Automation",
      before: "Calculations on spreadsheets at month-end, creating payout delays.",
      after: "Automated script that runs weekly sales data to show accrued commissions.",
      change: "Migrated commission calculations to the automated script, publishing results on agents' sheets.",
      value: "Replaced manual Excel work, providing transparency and cutting processing latency."
    }
  },
  {
    id: "MOD_20",
    category: "supply-ops",
    strategy: {
      title: "Dynamic Freight & Logistical Cost Estimator",
      desc: "A shipping cost calculator evaluating volumetric weights, dimensions, geographical transit zones, and fuel surcharges to generate transport quotes.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Slashed transport quoting lag times and eliminated shipping invoice discrepancies.",
      tech: ["Volumetric Math", "Logistical Costing", "Transit Analysis"]
    },
    product: {
      title: "Freight Cost Estimator",
      badge: "Logistics Product",
      problem: "Manual freight calculations led to delays in client quotes and shipping invoice discrepancies.",
      users: "Logistics coordinators and dispatch planners.",
      solution: "Shipping calculator evaluating sizes, weights, and fuel rates to estimate costs.",
      decisions: "Pre-loaded regional transport tables to speed up offline quotes for field operators.",
      kpi: "Quoting Lag Time",
      outcome: "Slashed quote times and removed shipping invoice errors."
    },
    research: {
      title: "Heuristic Cost Allocation Models in SME Freight Operations",
      badge: "Research Investigation",
      theme: "Operations Research",
      question: "What pricing heuristics balance quoting speed with margin protection in shipping?",
      methodology: "Analyzed transport invoices, comparing actual costs with predicted surcharge models.",
      contribution: "Provides a shipping cost model that projects transport margins without heavy logistics software."
    },
    transformation: {
      title: "Logistical Cost Digitization",
      badge: "Operational Digitization",
      stream: "Governance & Control",
      before: "Verbal quotes from carriers, causing discrepancies in client bills.",
      after: "Calculator evaluating volumes, weight, and fuel surcharges.",
      change: "Set a workflow requiring all shipping invoices to be validated by the calculator before payment.",
      value: "Removed client invoicing discrepancies, ensuring margins are protected."
    }
  },
  {
    id: "MOD_21",
    category: "supply-ops",
    strategy: {
      title: "Promotional Input Allocation & Budget Tracker",
      desc: "An allocation dashboard modeling marketing sample distributions, regional promotional expenses, and material allocations against net sales returns.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Enforced strict budgetary limits on sales promo allocations and boosted material spending efficiency.",
      tech: ["Allocation Logic", "Marketing ROI", "Budget Ledgers"]
    },
    product: {
      title: "Promo Input Allocator",
      badge: "Marketing Product",
      problem: "Field agents distributed marketing samples without limits, causing budget overruns.",
      users: "Marketing managers and regional sales managers.",
      solution: "Allocation dashboard matching sample distribution against regional sales budgets.",
      decisions: "Set hard allocation limits that adjust dynamically based on regional sales volumes.",
      kpi: "Promotional Budget Overruns",
      outcome: "Enforced limits on promo materials, keeping distribution costs within budget."
    },
    research: {
      title: "Resource Allocation Models in Distributed Field Marketing Campaigns",
      badge: "Research Investigation",
      theme: "Operations Research",
      question: "How does capping promotional allocations impact localized sales growth in dealer channels?",
      methodology: "Tracked sales before and after introducing dynamic allocation limits in dealer regions.",
      contribution: "Demonstrates that dynamic allocation caps save budget without hurting sales momentum."
    },
    transformation: {
      title: "Marketing Budget Governance",
      badge: "Governance & Control",
      stream: "Governance & Control",
      before: "Sales reps requested promotional materials without caps, exceeding annual budgets.",
      after: "Dashboard showing materials distributed, sales returns, and allocation limits.",
      change: "Linked material orders to the allocation system, blocking over-budget requests.",
      value: "Enforced promo budgets, optimizing spending efficiency."
    }
  },
  {
    id: "MOD_22",
    category: "supply-ops",
    strategy: {
      title: "Party Performance & Client Health Analytics",
      desc: "A comprehensive B2B client analysis system tracking historical purchasing logs, rotation speed, aging accounts receivables, and credit risk factors.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Provides high-value management alerts on top-performing client accounts and early payment delays.",
      tech: ["Looker Studio", "Health Scoring", "AR Analytics"]
    },
    product: {
      title: "Client Health Dashboard",
      badge: "Analytics Product",
      problem: "Late dealer payments caused cash flow squeezes that were detected too late.",
      users: "Credit risk officers and sales directors.",
      solution: "B2B client tracking system monitoring purchase frequencies, credit timelines, and risk factors.",
      decisions: "Built an alert loop that flags clients when their payment lag exceeds credit terms by 7 days.",
      kpi: "Late Payments Flagged",
      outcome: "Optimized payment collection times, giving directors early warning of credit issues."
    },
    research: {
      title: "Modeling Customer Purchasing Behavior and Credit Risk in B2B SME Systems",
      badge: "Research Investigation",
      theme: "Predictive Analytics",
      question: "Can transaction anomalies predict dealer credit defaults before they occur?",
      methodology: "Analyzed credit periods and payment lags on 2,000 accounts, running classification trees for risk indicators.",
      contribution: "Develops a credit scoring system for small-scale distributors, lowering payment risks."
    },
    transformation: {
      title: "Credit Risk Analytics Project",
      badge: "Decision Intelligence",
      stream: "Decision Intelligence",
      before: "Late payments were tracked on spreadsheets, causing collection delays.",
      after: "Live credit risk dashboard tracking payment logs and aging collections.",
      change: "Trained credit controllers to monitor dashboard flags and follow up on early warning alerts.",
      value: "Improved cash flow visibility and reduced credit collections lag."
    }
  }
]