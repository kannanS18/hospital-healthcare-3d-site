import React from 'react';
import { useVerticalStore } from '../store/useVerticalStore';
import {
  Heart,
  Brain,
  Dna,
  ShieldAlert,
  Cpu,
  Stethoscope,
  Baby,
  Activity,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

const DEPARTMENTS = [
  {
    id: 'cardio',
    name: 'Cardiovascular & Thoracic Surgery',
    icon: Heart,
    tag: 'INSTITUTE OF CARDIOLOGY',
    desc: 'Comprehensive adult and pediatric cardiac surgery, minimally invasive transcatheter valve replacement (TAVR), arrhythmia ablation, and advanced coronary revascularization.',
    procedures: ['Robotic Mitral Valve Repair', 'TAVR Catheter Implantation', 'Electrophysiology 3D Ablation', 'Coronary Bypass (OPCAB)'],
    chair: 'Dr. Maya Thorne, MD, FACC',
    stats: '99.8% Surgical Success Rate',
  },
  {
    id: 'neuro',
    name: 'Neurology & Neurosurgical Sciences',
    icon: Brain,
    tag: 'NEUROSCIENCES',
    desc: 'Sub-millimeter cranial neuronavigation, stroke intervention within golden hour, deep brain stimulation (DBS) for movement disorders, and minimally invasive spinal decompression.',
    procedures: ['Endovascular Stroke Thrombectomy', 'Image-Guided Cranial Resection', 'Spine Microdiscectomy', 'Deep Brain Stimulation'],
    chair: 'Dr. Aris Thorne, MD, PhD',
    stats: '<18 min Door-to-Needle Time',
  },
  {
    id: 'onco',
    name: 'Comprehensive Cancer Center & Immunotherapy',
    icon: Dna,
    tag: 'ONCOLOGY',
    desc: 'Precision targeted cancer therapies, CAR-T cell infusion protocols, next-generation genomic tumor profiling, and stereotactic CyberKnife radiosurgery.',
    procedures: ['CAR-T Cell Cellular Therapy', 'Targeted Genomic Immunotherapy', 'CyberKnife Radiosurgery', 'Intraoperative Radiation'],
    chair: 'Dr. Sarah Jenkins, MD, PhD',
    stats: '75+ Active Clinical Trials',
  },
  {
    id: 'ortho',
    name: 'Orthopedics & Robotic Joint Reconstruction',
    icon: Activity,
    tag: 'ORTHOPEDICS',
    desc: 'Robotic-assisted MAKO total knee and anterior hip replacement, arthroscopic sports medicine reconstruction, and pediatric spinal deformity correction.',
    procedures: ['Robotic MAKO Hip Arthroplasty', 'ACL Ligament Autograft Repair', 'Cervical Disc Arthroplasty', 'Rotator Cuff Arthroscopy'],
    chair: 'Dr. David Chen, MD, FAAOS',
    stats: 'Same-Day Discharge Available',
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics & Neonatal Intensive Care (NICU)',
    icon: Baby,
    tag: 'PEDIATRICS',
    desc: 'Level-IV neonatal intensive care unit, pediatric cardiology, developmental medicine, and round-the-clock emergency pediatric trauma response.',
    procedures: ['Neonatal Critical ECMO', 'Pediatric Heart Catheterization', 'Adolescent Sports Care', 'Gentle Sedation Diagnostics'],
    chair: 'Dr. Priya Sharma, MD, FAAP',
    stats: 'Family-Centered Private Rooms',
  },
  {
    id: 'robotics',
    name: 'da Vinci Robotic Surgical Center',
    icon: Cpu,
    tag: 'MINIMALLY INVASIVE',
    desc: 'Multi-arm da Vinci Xi robotic consoles delivering 10x 3D magnification and tremor-filtered micro-wrist articulation for urology, gynecology, and general surgery.',
    procedures: ['Robotic Prostatectomy', 'Robotic Colorectal Resection', 'Robotic Bariatric Surgery', 'Single-Incision Cholecystectomy'],
    chair: 'Dr. Robert Torres, MD, FACS',
    stats: 'Over 2,500 Robotic Cases',
  },
  {
    id: 'emergency',
    name: 'Level-1 Emergency & Trauma Institute',
    icon: ShieldAlert,
    tag: 'EMERGENCY & TRAUMA',
    desc: 'Certified Level-1 state trauma facility featuring on-site attending trauma teams, 24/7 dedicated CT/MRI imaging, and rooftop emergency heliport intake.',
    procedures: ['Immediate Resuscitation Bays', 'Massive Transfusion Protocol', 'Rapid Burn Stabilization', 'Critical Poisoning Control'],
    chair: 'Dr. Marcus Brody, MD',
    stats: 'Under 4 Min Door-to-Doctor',
  },
  {
    id: 'diagnostics',
    name: 'Advanced Diagnostic Radiology & 3T MRI',
    icon: Stethoscope,
    tag: 'IMAGING & RADIOLOGY',
    desc: 'Ultra-high field 3.0-Tesla silent MRI, dual-energy spectral CT, automated 3D breast ultrasound, and high-resolution digital radiomic imaging.',
    procedures: ['3-Tesla Neuro & Cardiac MRI', 'Low-Dose Spectral CT Scans', 'PET-CT Oncology Staging', 'FibroScan Liver Elastography'],
    chair: 'Dr. Evelyn Montgomery, MD',
    stats: 'Same-Day Digital Results',
  },
];

export function DepartmentsPage() {
  const setActivePage = useVerticalStore((state) => state.setActivePage);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-wide">
          Institutes & Specialties
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Clinical Departments & Centers of Excellence
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Integrated multidisciplinary institutes combining robotic precision, translational research, and compassionate patient care.
        </p>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {DEPARTMENTS.map((dept) => {
          const Icon = dept.icon;
          return (
            <div
              key={dept.id}
              className="p-7 rounded-3xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 uppercase tracking-wider">
                    {dept.tag}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {dept.name}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{dept.desc}</p>

                {/* Key Procedures */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Key Procedures & Innovations:
                  </h4>
                  <div className="grid grid-cols-2 gap-1.5">
                    {dept.procedures.map((proc, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span className="truncate">{proc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Department Footer */}
              <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wide block">Department Chair:</span>
                  <span className="text-xs font-bold text-slate-800">{dept.chair}</span>
                </div>
                <button
                  onClick={() => setActivePage('appointments')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md shadow-emerald-600/15"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
