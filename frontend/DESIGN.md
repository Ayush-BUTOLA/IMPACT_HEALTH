# Impact Health — Design System & Visual Architecture

## 1. Design Philosophy & Aesthetic Principles
Impact Health’s frontend architecture combines Swiss editorial clarity with medical-grade precision and responsive warmth.
- **Zero AI-Slop**: Every element serves an authentic clinical or informational purpose. No generic placeholder cards or redundant gradients.
- **Content Integrity**: All headings, service descriptions, statistical data, partner lists, leadership bios, and FAQs are 100% locked and verbatim.
- **Double-Bezel Architecture**: Clean container framing (`.bezel-outer` and `.bezel-inner`) gives elements a tactile, high-end feel.
- **Micro-Interactions**: Gentle spring easing (`cubic-bezier(0.16, 1, 0.3, 1)`) with `active:scale-[0.98]` tactile button feedback. Respects `prefers-reduced-motion`.

---

## 2. Four Audience Visual Worlds

### 1. School Health Services (`.theme-school`)
- **Tone**: Approachable, educational, safe, student-focused.
- **Palette**: Emerald (`#059669`) & Cyan/Teal (`#0D9488`), soft mint washes (`#F0FDFA`).
- **Layout**: Structured tables for campus pillars, clear pediatric health checkup timelines, and accessible safety tags.

### 2. Corporate Health Services (`.theme-corporate`)
- **Tone**: Structured, enterprise-grade, precise, executive.
- **Palette**: Steel Slate (`#0B132B`) & Sky Blue (`#0284C7`), crisp grids (`#F0F9FF`).
- **Layout**: Occupational compliance checklists, annual corporate health package cards, and workplace wellness milestones.

### 3. Patients & Families (`.theme-patients`)
- **Tone**: Reassuring, human-first, accessible, warm.
- **Palette**: Primary Blue (`#0066FF`), soft sapphire washes (`#EFF6FF`), dark slate typography.
- **Layout**: Clear pricing badges (starting at INR 199/- per month), seamless doctor-connect options, and 24/7 care coordination highlights.

### 4. Healthcare Practitioners (`.theme-practitioners`)
- **Tone**: Clinical authority, high-precision, diagnostic rigor.
- **Palette**: Indigo/Sapphire (`#4F46E5`), clinical purples (`#EEF2FF`).
- **Layout**: EMR integration highlights, CME accreditation frameworks, and specialized physician tools.

---

## 3. Page-Aware Background Layering
The `PageBackground` component adapts subtly per route:
- **Home**: Light atmospheric wash (`#F0F7FF`) with subtle 30px dot grid and soft radial focus.
- **About**: Architectural subtle grid with warm slate lighting.
- **Services Directory**: Neutral gateway with category accent highlights.
- **School Health**: Soft teal/emerald ambient aura with 32px radial grid.
- **Corporate Health**: Precision dual-axis linear grid (`#0284C7` at 48px).
- **Patient Support**: Reassuring soft blue mesh with warm ambient depth.
- **Contact**: Clean, distraction-free neutral canvas.

---

## 4. Typography Scale & Hierarchy
- **Font Stack**: System sans-serif with geometric display headlines (`font-display font-bold`), clean body text (`font-sans`), and tabular numbers / badges (`font-mono`).
- **Heading 1**: 48px–64px bold, tracking `-0.03em`, leading `1.12`.
- **Heading 2**: 32px–40px bold, tracking `-0.02em`, leading `1.2`.
- **Heading 3**: 20px–24px bold, tracking tight.
- **Body Regular**: 14px–16px, leading `1.6`, high contrast (`#0F172A` / `#475569`).
- **Badges / Mono Labels**: 11px–12px uppercase, tracking `0.08em`–`0.14em`.

---

## 5. Verified Core Information (Content Lock)
- **Support Contact**: `connect@impacthealth.co.in` | `+91 9667835909`
- **Headquarters**: `473/B1/P, Kokila Lane-4, Pokhariput, Bhubaneswar, Odisha 751020`
- **Grievance Officer**: Ashish Rawat (`ashish.rawat@impacthealth.co.in`, Mayur Vihar Phase III, New Delhi - 110096)
- **Leadership**: Anshuman Sahoo (CEO), Ashish Rawat (CIO), Dr. Gunjan D. Khare (MO)
- **Scale Metrics**: 80% Preventable Cases, 200+ Service Cities, 2L+ Patients Assisted, 1M+ Consultations, ~60% Cost Reduction, 400+ Daily Consults.
