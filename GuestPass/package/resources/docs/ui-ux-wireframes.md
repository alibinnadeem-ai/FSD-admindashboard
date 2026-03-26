# UI/UX Design & Wireframes - Guest Pass Management System

## Design System

### Brand Colors (FSD City HQ)

```
Primary: #1B4B84 (Deep Blue)
Secondary: #C5A572 (Gold)
Success: #22C55E (Green)
Warning: #F59E0B (Amber)
Error: #EF4444 (Red)
Background: #F8FAFC (Light Gray)
Text Primary: #1E293B (Dark Gray)
Text Secondary: #64748B (Medium Gray)
```

### Typography

```
Headings: Inter, -apple-system, sans-serif
Body: Inter, -apple-system, sans-serif
Monospace: 'Roboto Mono', monospace

H1: 32px/40px, Bold (600)
H2: 24px/32px, SemiBold (600)
H3: 20px/28px, SemiBold (600)
H4: 18px/24px, Medium (500)
Body: 16px/24px, Regular (400)
Small: 14px/20px, Regular (400)
Caption: 12px/16px, Regular (400)
```

### Component Styles

```
Border Radius: 8px (cards), 6px (buttons), 4px (inputs)
Shadow (Cards): 0 1px 3px rgba(0,0,0,0.1)
Shadow (Elevated): 0 4px 6px rgba(0,0,0,0.1)
Spacing: 8px base unit (multiples: 8, 16, 24, 32, 48, 64)
```

---

## User Personas

### 1. Executive (Khalid Noon - CEO)
**Goals:** 
- Quick overview of daily appointments
- Approve/reject walk-ins efficiently
- Review weekly visitor analytics

**Pain Points:**
- Too many interruptions
- Manual approval processes
- No visibility into visitor patterns

### 2. Executive Assistant (Staff Member)
**Goals:**
- Schedule appointments easily
- Manage executive calendar
- Handle visitor communications

**Pain Points:**
- Double-booking conflicts
- Manual pass generation
- Tracking visitor status

### 3. Security Guard (Entry Point)
**Goals:**
- Quick visitor verification
- Register walk-ins fast
- Clear entry/exit records

**Pain Points:**
- Slow manual verification
- Paper-based logs
- No real-time updates

---

## Application Structure

### Navigation Hierarchy

```
┌─────────────────────────────────────────┐
│         EXECUTIVE DASHBOARD             │
├─────────────────────────────────────────┤
│  • Dashboard (Overview)                 │
│  • Today's Schedule                     │
│  • Pending Approvals                    │
│  • Visitor History                      │
│  • Analytics & Reports                  │
│  • Settings                             │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│           STAFF PORTAL                  │
├─────────────────────────────────────────┤
│  • Dashboard                            │
│  • Calendar (Schedule Visits)           │
│  • Visitors Management                  │
│  • Active Visits                        │
│  • Reports                              │
│  • Settings                             │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│        GUARD MOBILE APP (PWA)           │
├─────────────────────────────────────────┤
│  • Scan QR Code                         │
│  • Register Walk-in                     │
│  • Today's Expected Visitors            │
│  • Check-in/Check-out History           │
│  • Emergency Contacts                   │
└─────────────────────────────────────────┘
```

---

## Wireframes

### 1. Executive Dashboard - Main View

```
┌──────────────────────────────────────────────────────────────────┐
│  [FSD City Logo]        Guest Pass System      [Khalid Noon ▾] │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Dashboard    Pending Approvals (3)    Reports    Settings       │
│  ────────                                                         │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  Today's Overview - Wednesday, December 4, 2024             │ │
│  │                                                             │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │ │
│  │  │   15     │  │    8     │  │    3     │  │    4     │  │ │
│  │  │ Scheduled│  │ Checked  │  │ Pending  │  │ Completed│  │ │
│  │  │  Visits  │  │   In     │  │ Approval │  │          │  │ │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌────────────────────────────────┐  ┌────────────────────────┐ │
│  │  Pending Walk-in Approvals     │  │  Today's Schedule      │ │
│  │  ──────────────────────────    │  │  ──────────────        │ │
│  │                                 │  │                        │ │
│  │  🔴 URGENT                     │  │  09:00 AM              │ │
│  │  Sara Ahmed                     │  │  Ahmed Khan            │ │
│  │  XYZ Enterprises               │  │  ABC Corp - Q Review   │ │
│  │  Purpose: Partnership Discuss.  │  │  ● Checked In         │ │
│  │                                 │  │  ─────────────────     │ │
│  │  [✓ Approve] [✗ Reject]       │  │  10:30 AM              │ │
│  │                                 │  │  Bilal Hassan          │ │
│  │  ─────────────────────────      │  │  Tech Solutions        │ │
│  │  🟡 Ali Hassan                 │  │  ⏳ Scheduled         │ │
│  │  Tech Corp                      │  │  ─────────────────     │ │
│  │  Purpose: Technical Review      │  │  02:00 PM              │ │
│  │  [✓ Approve] [✗ Reject]       │  │  Fatima Malik          │ │
│  │                                 │  │  Finance Audit         │ │
│  │  ─────────────────────────      │  │  ⏳ Scheduled         │ │
│  │  View All (3)                   │  │                        │ │
│  └────────────────────────────────┘  │  View Full Schedule    │ │
│                                       └────────────────────────┘ │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  Visitor Analytics - This Week                              │ │
│  │                                                             │ │
│  │  [Line Chart: Visits by Day]                               │ │
│  │                                                             │ │
│  │  Mon  Tue  Wed  Thu  Fri  Sat  Sun                        │ │
│  │   12   18   15   20   22    8    5                         │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

### 2. Staff Portal - Schedule Visit

```
┌──────────────────────────────────────────────────────────────────┐
│  [FSD City Logo]     Staff Portal          [Ayesha Khan ▾]     │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Dashboard    Calendar    Visitors    Active Visits    Reports   │
│              ────────                                             │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  Schedule New Visit                         [Save] [Cancel]  │ │
│  │  ─────────────────                                           │ │
│  │                                                              │ │
│  │  Visitor Information                                         │ │
│  │  ──────────────────                                          │ │
│  │                                                              │ │
│  │  ● Existing Visitor   ○ New Visitor                        │ │
│  │                                                              │ │
│  │  [Search visitors...                                    🔍]  │ │
│  │                                                              │ │
│  │  Selected: Ahmed Khan                                        │ │
│  │  📧 ahmed.khan@example.com  📱 +92-300-1234567             │ │
│  │  🏢 ABC Corporation - Marketing Director                    │ │
│  │  Previous visits: 5 times                                    │ │
│  │                                                              │ │
│  │  ────────────────────────────────────────────────────        │ │
│  │                                                              │ │
│  │  Executive/Host Details                                      │ │
│  │  ─────────────────────                                       │ │
│  │                                                              │ │
│  │  Meeting with: [Khalid Noon - CEO                      ▾]   │ │
│  │  Department:   [Executive Management                   ▾]   │ │
│  │  Location:     [Building A - Floor 5 Reception         ▾]   │ │
│  │                                                              │ │
│  │  ────────────────────────────────────────────────────        │ │
│  │                                                              │ │
│  │  Visit Schedule                                              │ │
│  │  ──────────────                                              │ │
│  │                                                              │ │
│  │  Date:         [10 Dec 2024                            📅]  │ │
│  │  Start Time:   [02:00 PM                               🕐]  │ │
│  │  End Time:     [03:30 PM                               🕐]  │ │
│  │  Duration:     90 minutes                                    │ │
│  │                                                              │ │
│  │  Purpose:                                                    │ │
│  │  ┌──────────────────────────────────────────────────────┐   │ │
│  │  │ Quarterly business review meeting to discuss         │   │ │
│  │  │ Q4 performance and 2025 strategy                     │   │ │
│  │  └──────────────────────────────────────────────────────┘   │ │
│  │                                                              │ │
│  │  Additional Details                                          │ │
│  │  ─────────────────                                           │ │
│  │                                                              │ │
│  │  Number of Guests:     [1        ]                          │ │
│  │  ☑ Visitor has vehicle                                      │ │
│  │  Vehicle Registration: [LEA-1234  ]                         │ │
│  │  Meeting Room:         [Conference Room A                ▾] │ │
│  │  ☑ Send email & SMS notification                           │ │
│  │                                                              │ │
│  │  Special Instructions:                                       │ │
│  │  ┌──────────────────────────────────────────────────────┐   │ │
│  │  │ Visitor requires parking access. Please ensure       │   │ │
│  │  │ parking pass is ready upon arrival.                  │   │ │
│  │  └──────────────────────────────────────────────────────┘   │ │
│  │                                                              │ │
│  │                            [Cancel]  [Schedule Visit]        │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

### 3. Guard Mobile App - QR Scanner

```
┌────────────────────────────┐
│  ☰  Guest Pass Scanner     │
├────────────────────────────┤
│                            │
│  ┌────────────────────────┐│
│  │                        ││
│  │    [QR Code Camera]    ││
│  │                        ││
│  │    ┌──────────────┐    ││
│  │    │              │    ││
│  │    │   [Target]   │    ││
│  │    │              │    ││
│  │    └──────────────┘    ││
│  │                        ││
│  │  Align QR code within  ││
│  │  the frame to scan     ││
│  └────────────────────────┘│
│                            │
│  ───────  OR  ───────      │
│                            │
│  [Enter Pass Number]       │
│                            │
│  ┌────────────────────────┐│
│  │ GC-2024-12-           ││
│  └────────────────────────┘│
│                            │
│     [Verify Manually]      │
│                            │
│  ──────────────────────    │
│                            │
│  📋 Today's Expected (15)  │
│  👤 Register Walk-in       │
│  ✓ Recent Scans (23)       │
│                            │
└────────────────────────────┘
```

### 4. QR Scan Result - Success

```
┌────────────────────────────┐
│  ← Back                    │
├────────────────────────────┤
│                            │
│      ✅ ENTRY GRANTED      │
│                            │
│  ┌────────────────────────┐│
│  │   [Visitor Photo]      ││
│  └────────────────────────┘│
│                            │
│  Ahmed Khan                │
│  ABC Corporation           │
│                            │
│  ──────────────────────    │
│                            │
│  Pass: GC-2024-12-0045     │
│  Meeting: Khalid Noon      │
│  Title: CEO                │
│  Purpose: Q4 Review        │
│  Time: 2:00 PM - 3:30 PM   │
│  Location: Floor 5, Rm 501 │
│                            │
│  Valid Until: 6:00 PM      │
│                            │
│  ──────────────────────    │
│                            │
│    [✓ Confirm Check-in]    │
│                            │
│  Notes (Optional):         │
│  ┌────────────────────────┐│
│  │                        ││
│  └────────────────────────┘│
│                            │
└────────────────────────────┘
```

### 5. Walk-in Registration Form

```
┌────────────────────────────┐
│  ← Back   Register Walk-in │
├────────────────────────────┤
│                            │
│  Visitor Details           │
│  ──────────────            │
│                            │
│  Full Name *               │
│  ┌────────────────────────┐│
│  │                        ││
│  └────────────────────────┘│
│                            │
│  Phone Number *            │
│  ┌────────────────────────┐│
│  │ +92-                   ││
│  └────────────────────────┘│
│                            │
│  CNIC                      │
│  ┌────────────────────────┐│
│  │ _____-_______-_        ││
│  └────────────────────────┘│
│                            │
│  Company                   │
│  ┌────────────────────────┐│
│  │                        ││
│  └────────────────────────┘│
│                            │
│  📷 Take Photo             │
│                            │
│  Meeting Details           │
│  ──────────────            │
│                            │
│  Meeting with: *           │
│  [Select Executive...   ▾] │
│                            │
│  Purpose: *                │
│  ┌────────────────────────┐│
│  │                        ││
│  │                        ││
│  └────────────────────────┘│
│                            │
│  ☑ Requires Approval       │
│                            │
│    [Cancel]  [Register]    │
│                            │
└────────────────────────────┘
```

### 6. Weekly Scrutiny Report

```
┌──────────────────────────────────────────────────────────────────┐
│  FSD City HQ - Weekly Visitor Scrutiny Report                  │
│  Week: December 2-8, 2024                    [📥 Export PDF]     │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Executive Summary                                                │
│  ────────────────                                                 │
│                                                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │   145    │  │   120    │  │    25    │  │    5     │        │
│  │  Total   │  │Scheduled │  │ Walk-ins │  │ No-Shows │        │
│  │  Visits  │  │          │  │          │  │          │        │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘        │
│                                                                   │
│  By Executive                                                     │
│  ────────────                                                     │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ Executive           │ Scheduled │ Walk-ins │ Total │ Avg Min││
│  ├─────────────────────────────────────────────────────────────┤ │
│  │ Khalid Noon - CEO   │    35     │     8    │   43  │   45   ││
│  │ Salman Gillani - MD │    28     │     5    │   33  │   38   ││
│  │ Rehan Gillani       │    22     │     4    │   26  │   42   ││
│  │ Shahnawaz - Dir Ops │    18     │     3    │   21  │   35   ││
│  │ Others              │    17     │     5    │   22  │   40   ││
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  Daily Breakdown                                                  │
│  ───────────────                                                  │
│                                                                   │
│  [Bar Chart: Visits by Day]                                      │
│                                                                   │
│  Mon: ████████████████ 18                                        │
│  Tue: ██████████████████████ 25                                  │
│  Wed: ███████████████████ 22                                     │
│  Thu: ████████████████████████ 28                                │
│  Fri: ██████████████████████████ 30                              │
│  Sat: ████████ 12                                                │
│  Sun: ██████ 10                                                  │
│                                                                   │
│  Top Visitors                                                     │
│  ────────────                                                     │
│                                                                   │
│  1. Ahmed Khan (ABC Corp) - 4 visits                             │
│  2. Sara Ahmed (XYZ Ent) - 3 visits                              │
│  3. Ali Hassan (Tech Solutions) - 3 visits                       │
│                                                                   │
│  Security Notes                                                   │
│  ──────────────                                                   │
│                                                                   │
│  • No security incidents reported                                │
│  • 2 visitors required additional verification                   │
│  • Average check-in time: 2.3 minutes                            │
│                                                                   │
│                                         [📥 Download]  [📧 Email]│
└──────────────────────────────────────────────────────────────────┘
```

---

## User Workflows

### Workflow 1: Scheduled Visit (Happy Path)

```
┌─────────────────────────────────────────────────────────┐
│                   SCHEDULED VISIT FLOW                  │
└─────────────────────────────────────────────────────────┘

1. STAFF SCHEDULING
   ↓
   Staff logs into portal
   ↓
   Clicks "Schedule Visit"
   ↓
   Searches/Adds visitor details
   ↓
   Selects executive, date/time
   ↓
   Enters purpose & special instructions
   ↓
   Clicks "Schedule Visit"
   ↓
   System generates QR pass
   ↓
   Email/SMS sent to visitor
   ↓
   Calendar updated for executive

2. VISITOR ARRIVAL (Day of Visit)
   ↓
   Visitor arrives at gate
   ↓
   Shows QR code (phone/printed)
   ↓
   Guard scans QR code
   ↓
   System validates pass
   ↓
   ✅ Pass Valid → Entry granted
   ↓
   Guard confirms check-in
   ↓
   Real-time notification to executive
   ↓
   Visitor proceeds to meeting

3. VISITOR DEPARTURE
   ↓
   Visitor returns to gate
   ↓
   Guard scans QR code
   ↓
   System records check-out
   ↓
   Visit duration calculated
   ↓
   Audit log updated
   ↓
   (Optional) Feedback request sent
```

### Workflow 2: Walk-in Visit

```
┌─────────────────────────────────────────────────────────┐
│                    WALK-IN VISIT FLOW                   │
└─────────────────────────────────────────────────────────┘

1. WALK-IN ARRIVAL
   ↓
   Visitor arrives without appointment
   ↓
   Guard opens "Register Walk-in" form
   ↓
   Captures: Name, Phone, CNIC, Company
   ↓
   Takes visitor photo
   ↓
   Visitor states purpose & executive to meet
   ↓
   System checks executive availability
   ↓
   
2A. IF EXECUTIVE REQUIRES APPROVAL
   ↓
   System sends approval request
   ↓
   Push notification to executive
   ↓
   Email/SMS to executive
   ↓
   Executive reviews request
   ↓
   
   2A1. IF APPROVED
   ↓
   System generates temporary pass
   ↓
   QR code created (valid 2 hours)
   ↓
   Notification to guard
   ↓
   Visitor checked in
   ↓
   Proceeds to meeting

   2A2. IF REJECTED
   ↓
   Notification to guard
   ↓
   Guard informs visitor
   ↓
   (Optional) Reschedule offered
   ↓
   Visitor logged but not admitted

2B. IF NO APPROVAL REQUIRED
   ↓
   System auto-generates pass
   ↓
   Visitor checked in immediately
   ↓
   Executive notified
   ↓
   Proceeds to meeting
```

### Workflow 3: Pass Verification (Security Check)

```
┌─────────────────────────────────────────────────────────┐
│                  PASS VERIFICATION FLOW                 │
└─────────────────────────────────────────────────────────┘

GUARD SCANS QR CODE
↓
System decrypts QR data
↓
┌─────────────────────────────┐
│ VALIDATION CHECKS           │
├─────────────────────────────┤
│ 1. Pass exists in database? │
│ 2. Pass active/not revoked? │
│ 3. Within valid time range? │
│ 4. Executive available?     │
│ 5. Visitor not blacklisted? │
│ 6. Max entries not exceeded?│
└─────────────────────────────┘
↓
┌──────────────┬──────────────┐
│   ALL PASS   │   ANY FAIL   │
│      ✅      │      ❌      │
└──────────────┴──────────────┘
        │              │
        ↓              ↓
   GRANT ENTRY    DENY ENTRY
        │              │
        ↓              ↓
   Green Screen   Red Screen
   "Welcome!"     "Invalid Pass"
        │              │
        ↓              ↓
   Check-in       Log Attempt
   Recorded       Alert Security
        │              │
        ↓              ↓
   Notification   (Optional)
   to Executive   Manual Override
        │
        ↓
   Visitor
   Enters
```

---

## Mobile App Screens (Guard/Reception)

### Screen Flow Map

```
┌─────────────┐
│   Login     │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│  Dashboard  │ ← Home
└──────┬──────┘
       │
       ├───────┐
       │       │
       ↓       ↓
┌──────────┐ ┌──────────────┐
│QR Scanner│ │Register Walk-in│
└────┬─────┘ └──────┬───────┘
     │              │
     ↓              ↓
┌──────────┐ ┌──────────────┐
│  Result  │ │ Approval Wait│
│  Screen  │ └──────┬───────┘
└────┬─────┘        │
     │              ↓
     ↓         ┌─────────┐
┌──────────┐   │Generate │
│Check-in/ │   │  Pass   │
│Check-out │   └─────────┘
└──────────┘
```

### Dashboard Features

```
┌────────────────────────────┐
│  Dashboard                 │
├────────────────────────────┤
│                            │
│  🔍 Scan QR Code           │
│                            │
│  👤 Register Walk-in       │
│                            │
│  ──────────────────────    │
│                            │
│  Today's Expected (15)     │
│  ───────────────────       │
│                            │
│  09:00  Ahmed Khan         │
│         → Khalid Noon      │
│                            │
│  10:30  Sara Ahmed         │
│         → Salman Gillani   │
│                            │
│  [View All]                │
│                            │
│  ──────────────────────    │
│                            │
│  ✓ Checked In Today (12)   │
│  ⏳ Currently Inside (8)   │
│  🚫 Rejected (1)           │
│                            │
│  ──────────────────────    │
│                            │
│  Recent Activity           │
│  ───────────────           │
│                            │
│  12:45  Bilal Hassan ✓     │
│  11:30  Fatima Malik ✓     │
│  10:15  Ali Raza ✓         │
│                            │
└────────────────────────────┘
```

---

## Component Library

### 1. Pass Card Component

```
┌────────────────────────────────────┐
│  GC-2024-12-0045                   │
│                                    │
│  ┌──────────┐  Ahmed Khan         │
│  │  [Photo] │  ABC Corporation     │
│  │          │                      │
│  └──────────┘  Meeting: Khalid Noon│
│                                    │
│  📅 Dec 10, 2024  🕐 2:00-3:30 PM │
│  📍 Floor 5, Room 501              │
│                                    │
│  [QR Code]                         │
│                                    │
│  Valid Until: 6:00 PM              │
│  Status: ⏳ Scheduled              │
└────────────────────────────────────┘
```

### 2. Approval Request Card

```
┌────────────────────────────────────┐
│  🔴 URGENT - Walk-in Request       │
│                                    │
│  Sara Ahmed                        │
│  XYZ Enterprises - Business Dev    │
│                                    │
│  Purpose: Partnership Discussion   │
│  Time: Now (12:30 PM)              │
│                                    │
│  ──────────────────────────────    │
│                                    │
│  [✓ Approve]      [✗ Reject]      │
└────────────────────────────────────┘
```

### 3. Status Badges

```
⏳ Scheduled     (Gray)
✓ Checked In    (Green)
⏱ In Progress   (Blue)
✓ Completed     (Green)
🔴 Pending      (Red)
❌ Rejected     (Red)
🚫 Cancelled    (Gray)
⚠ No Show      (Orange)
```

---

## Responsive Design

### Breakpoints

```
Mobile:  < 768px
Tablet:  768px - 1024px
Desktop: > 1024px
```

### Mobile Adaptations

- Stack cards vertically
- Bottom navigation bar for guard app
- Swipe gestures for actions
- Larger touch targets (48px minimum)
- Simplified tables → cards

---

## Accessibility

### WCAG 2.1 AA Compliance

- Color contrast ratio ≥ 4.5:1
- Keyboard navigation support
- Screen reader compatibility
- Focus indicators on interactive elements
- Alt text for all images
- ARIA labels for complex components

---

## Animation & Transitions

```
Page Transitions: 200ms ease-in-out
Button Hover: 150ms ease
Modal Open: 250ms ease-out
Toast Notifications: Slide in 300ms
Loading Spinners: Continuous rotation
```

---

**Design Version:** 1.0  
**Last Updated:** December 2024  
**Design Lead:** Ali Bin Nadeem, Technology Consultant
