"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  X, MapPin, Clock, DollarSign, CheckCircle2, Search,
  ArrowRight, Send, Briefcase, Brain, Code2, BarChart3,
  Users, Rocket, Upload, ExternalLink, ChevronLeft, ChevronRight,
  Building2, Layers,
} from "lucide-react";

// ─────────────────────────────────────────────────────────
// Types & constants
// ─────────────────────────────────────────────────────────
export interface Job {
  id: string; title: string; category: string; location: string;
  type: string; level: string; salary: string; description: string;
  responsibilities: string[]; requirements: string[]; tags: string[];
}

interface Cat { id: string; label: string; icon: React.ElementType; color: string; count: number; }

const CATS: Cat[] = [
  { id: "engineering", label: "Engineering",      icon: Code2,     color: "#00D4FF", count: 12 },
  { id: "research",    label: "AI Research",      icon: Brain,     color: "#9B4DFF", count: 9  },
  { id: "product",     label: "Product & Design", icon: Rocket,    color: "#00D4FF", count: 7  },
  { id: "business",    label: "Business & Sales", icon: BarChart3, color: "#C084FC", count: 8  },
  { id: "operations",  label: "Operations & HR",  icon: Users,     color: "#9B4DFF", count: 6  },
];

const LEVEL_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  Entry:        { bg: "rgba(0,212,255,0.08)",   border: "rgba(0,212,255,0.25)",  text: "#2DD4BF" },
  Mid:          { bg: "rgba(0,212,255,0.08)",   border: "rgba(0,212,255,0.25)",  text: "#00D4FF" },
  "Mid-Senior": { bg: "rgba(155,77,255,0.1)",   border: "rgba(155,77,255,0.3)",  text: "#C084FC" },
  Senior:       { bg: "rgba(155,77,255,0.1)",   border: "rgba(155,77,255,0.3)",  text: "#C084FC" },
  Manager:      { bg: "rgba(0,212,255,0.1)",    border: "rgba(0,212,255,0.35)",  text: "#00D4FF" },
  Director:     { bg: "rgba(155,77,255,0.15)",  border: "rgba(155,77,255,0.45)", text: "#9B4DFF" },
  VP:           { bg: "rgba(155,77,255,0.15)",  border: "rgba(155,77,255,0.45)", text: "#9B4DFF" },
  Principal:    { bg: "rgba(155,77,255,0.18)",  border: "rgba(155,77,255,0.5)",  text: "#C084FC" },
  Internship:   { bg: "rgba(0,212,255,0.06)",   border: "rgba(0,212,255,0.2)",   text: "#2DD4BF" },
};

const FI = "w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-400 border bg-[rgba(255,255,255,0.05)] focus:outline-none focus:ring-2 transition-all";
const FN = `${FI} border-[rgba(255,255,255,0.1)] hover:border-[rgba(0,212,255,0.4)] focus:border-[rgba(0,212,255,0.6)] focus:ring-[rgba(0,212,255,0.12)]`;
const FE = `${FI} border-red-500/60 focus:ring-red-500/20`;
const LB = "block text-[10px] font-mono font-700 tracking-[0.22em] uppercase text-gray-300 mb-2";

const PER_PAGE = 9;

// ─────────────────────────────────────────────────────────
// Apply Modal
// ─────────────────────────────────────────────────────────
function ApplyModal({ job, onClose }: { job: Job; onClose: () => void }) {
  const [form, setForm] = useState({ fn:"",ln:"",email:"",phone:"",li:"",gh:"",why:"",src:"" });
  const [errs, setErrs] = useState<Record<string,string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [file, setFile] = useState("");

  const set = (k: string, v: string) => {
    setForm(f=>({...f,[k]:v}));
    if (errs[k]) setErrs(e=>{const n={...e};delete n[k];return n;});
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const e2: Record<string,string> = {};
    if (!form.fn.trim())    e2.fn    = "Required";
    if (!form.ln.trim())    e2.ln    = "Required";
    if (!form.email.trim()) e2.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e2.email = "Invalid email";
    if (!form.why.trim()) e2.why  = "Please share why you're interested";
    if (!file)            e2.file = "Please attach your resume";
    if (Object.keys(e2).length) { setErrs(e2); return; }
    setErrs({}); setBusy(true);
    await new Promise(r=>setTimeout(r,1800));
    setBusy(false); setDone(true);
  };

  const cat   = CATS.find(c=>c.id===job.category);
  const color = cat?.color ?? "#00D4FF";

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6"
      style={{background:"rgba(2,4,14,0.92)",backdropFilter:"blur(20px)"}}
      onClick={e=>{if(e.target===e.currentTarget)onClose();}}>

      <motion.div
        initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} exit={{opacity:0,y:40}}
        transition={{type:"spring",damping:32,stiffness:380}}
        className="relative w-full sm:max-w-xl max-h-[95vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl"
        style={{
          background:"#0d1530",
          border:"1px solid rgba(255,255,255,0.1)",
          boxShadow:`0 -8px 60px rgba(0,0,0,0.6),0 0 0 1px rgba(255,255,255,0.04),0 0 100px ${color}18`,
        }}>
        {/* top bar */}
        <div className="h-1 rounded-t-3xl" style={{background:`linear-gradient(90deg,${color},${color==="#00D4FF"?"#9B4DFF":"#00D4FF"})`}}/>

        <AnimatePresence mode="wait">
          {done ? (
            <motion.div key="done" initial={{opacity:0}} animate={{opacity:1}}
              className="flex flex-col items-center text-center py-16 px-8">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                style={{background:"rgba(0,212,255,0.1)",border:"1.5px solid rgba(0,212,255,0.45)",boxShadow:"0 0 48px rgba(0,212,255,0.2)"}}>
                <CheckCircle2 className="w-9 h-9 text-[#00D4FF]"/>
              </div>
              <h3 className="font-display font-700 text-white text-2xl mb-3">Application Received!</h3>
              <p className="text-[rgba(232,243,255,0.6)] text-base mb-1 max-w-xs">
                You applied for <strong className="text-white">{job.title}</strong>.
              </p>
              <p className="text-[rgba(232,243,255,0.75)] text-sm mb-8 max-w-xs">
                Our recruiting team reviews every application and responds within 3 business days.
              </p>
              <div className="flex gap-3 flex-wrap justify-center">
                <Button variant="primary" size="md" onClick={onClose}>Browse More Roles</Button>
                <Button variant="ghost"   size="md" href="/about">About AI Brigade</Button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{opacity:0}} animate={{opacity:1}}>
              <div className="flex items-start justify-between px-7 pt-7 pb-5 border-b border-[rgba(255,255,255,0.07)]">
                <div>
                  <p className="text-[10px] font-mono font-700 tracking-[0.22em] uppercase mb-1.5" style={{color}}>
                    {cat?.label} · {job.type}
                  </p>
                  <h2 className="font-display font-700 text-white text-xl leading-snug">{job.title}</h2>
                  <p className="text-sm font-700 mt-1" style={{color}}>{job.salary}</p>
                </div>
                <button onClick={onClose}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-[rgba(232,243,255,0.75)] hover:text-white transition-all hover:bg-white/5"
                  style={{border:"1px solid rgba(255,255,255,0.09)"}}>
                  <X className="w-4 h-4"/>
                </button>
              </div>

              <form onSubmit={submit} className="px-7 py-6 space-y-4" noValidate>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={LB}>First Name <span className="text-[#00D4FF]">*</span></label>
                    <input type="text" value={form.fn} onChange={e=>set("fn",e.target.value)} placeholder="Jane" className={errs.fn?FE:FN}/>
                    {errs.fn&&<p className="mt-1 text-xs text-red-400">{errs.fn}</p>}
                  </div>
                  <div>
                    <label className={LB}>Last Name <span className="text-[#00D4FF]">*</span></label>
                    <input type="text" value={form.ln} onChange={e=>set("ln",e.target.value)} placeholder="Smith" className={errs.ln?FE:FN}/>
                    {errs.ln&&<p className="mt-1 text-xs text-red-400">{errs.ln}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={LB}>Email <span className="text-[#00D4FF]">*</span></label>
                    <input type="email" value={form.email} onChange={e=>set("email",e.target.value)} placeholder="jane@co.com" className={errs.email?FE:FN}/>
                    {errs.email&&<p className="mt-1 text-xs text-red-400">{errs.email}</p>}
                  </div>
                  <div>
                    <label className={LB}>Phone</label>
                    <input type="tel" value={form.phone} onChange={e=>set("phone",e.target.value)} placeholder="+1 (415) 000-0000" className={FN}/>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={LB}>LinkedIn</label>
                    <div className="relative">
                      <ExternalLink className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[rgba(232,243,255,0.60)]"/>
                      <input type="url" value={form.li} onChange={e=>set("li",e.target.value)} placeholder="linkedin.com/in/you" className={FN+" pl-9"}/>
                    </div>
                  </div>
                  <div>
                    <label className={LB}>GitHub / Portfolio</label>
                    <div className="relative">
                      <ExternalLink className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[rgba(232,243,255,0.60)]"/>
                      <input type="url" value={form.gh} onChange={e=>set("gh",e.target.value)} placeholder="github.com/you" className={FN+" pl-9"}/>
                    </div>
                  </div>
                </div>

                {/* Resume upload */}
                <div>
                  <label className={LB}>Resume / CV <span className="text-[#00D4FF]">*</span></label>
                  <label className="flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all duration-200"
                    style={{
                      border:errs.file?"1px solid rgba(239,68,68,0.55)":file?"1px solid rgba(0,212,255,0.45)":"1px solid rgba(255,255,255,0.1)",
                      background:file?"rgba(0,212,255,0.07)":"rgba(255,255,255,0.04)",
                    }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{background:file?"rgba(0,212,255,0.15)":"rgba(255,255,255,0.06)",border:`1px solid ${file?"rgba(0,212,255,0.4)":"rgba(255,255,255,0.1)"}`,color:file?"#00D4FF":"rgba(232,243,255,0.35)"}}>
                      {file?<CheckCircle2 className="w-4 h-4"/>:<Upload className="w-4 h-4"/>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-600 truncate" style={{color:file?"#fff":"rgba(232,243,255,0.45)"}}>
                        {file||"Upload PDF, DOCX — max 10 MB"}
                      </p>
                      {file&&<p className="text-[11px] text-[rgba(232,243,255,0.70)] mt-0.5">Attached ✓</p>}
                    </div>
                    <input type="file" accept=".pdf,.doc,.docx" className="hidden"
                      onChange={e=>{const f=e.target.files?.[0];if(f){setFile(f.name);setErrs(er=>{const n={...er};delete n.file;return n;});}}}/>
                  </label>
                  {errs.file&&<p className="mt-1 text-xs text-red-400">{errs.file}</p>}
                </div>

                <div>
                  <label className={LB}>Why this role? <span className="text-[#00D4FF]">*</span></label>
                  <textarea value={form.why} onChange={e=>set("why",e.target.value)} rows={4}
                    placeholder={`What excites you about the ${job.title} role at AI Brigade?`}
                    className={(errs.why?FE:FN)+" resize-none"}/>
                  {errs.why&&<p className="mt-1 text-xs text-red-400">{errs.why}</p>}
                </div>

                <div>
                  <label className={LB}>How did you find us?</label>
                  <select value={form.src} onChange={e=>set("src",e.target.value)}
                    className={FN+" appearance-none cursor-pointer"} style={{background:"#0c1228",color:form.src?"#fff":"rgba(232,243,255,0.28)"}}>
                    <option value="" style={{background:"#0c1228"}}>Select one</option>
                    {["LinkedIn","Indeed","Referral","GitHub","Conference","Google","Other"].map(o=>(
                      <option key={o} value={o} style={{background:"#0c1228"}}>{o}</option>
                    ))}
                  </select>
                </div>

                <p className="text-[rgba(232,243,255,0.65)] text-xs">
                  By submitting you agree to our <a href="/privacy" className="text-[#00D4FF] hover:underline">Privacy Policy</a>.
                  {" "}NDAs available on request.
                </p>

                <Button type="submit" variant="primary" size="lg" loading={busy}
                  iconRight={<Send className="w-4 h-4"/>} className="w-full">
                  Submit Application
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────
// Job Detail Panel
// ─────────────────────────────────────────────────────────
function JobDetail({ job, onApply }: { job: Job; onApply: () => void }) {
  const cat   = CATS.find(c=>c.id===job.category);
  const color = cat?.color ?? "#00D4FF";
  const lc    = LEVEL_COLORS[job.level] ?? LEVEL_COLORS["Senior"];

  return (
    <div className="rounded-2xl overflow-hidden sticky top-28"
      style={{
        background:"#0d1530",
        border:`1px solid ${color}28`,
        boxShadow:`0 0 0 1px rgba(255,255,255,0.03),0 32px 80px rgba(0,0,0,0.55),0 0 60px ${color}12`,
      }}>
      {/* Color top bar */}
      <div className="h-1.5" style={{background:`linear-gradient(90deg,${color},${color==="#00D4FF"?"#9B4DFF":"#00D4FF"})`}}/>

      {/* Header */}
      <div className="p-7 border-b border-[rgba(255,255,255,0.07)]"
        style={{background:`radial-gradient(ellipse 120% 80% at 0% 0%,${color}0E,transparent)`}}>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="text-[10px] font-mono font-700 tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
            style={{background:lc.bg,border:`1px solid ${lc.border}`,color:lc.text}}>
            {job.level}
          </span>
          <span className="text-[10px] font-mono font-700 tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
            style={{background:`${color}14`,border:`1px solid ${color}32`,color}}>
            {cat?.label}
          </span>
          <span className="text-[10px] font-mono font-700 tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
            style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(232,243,255,0.5)"}}>
            {job.type}
          </span>
        </div>

        <h2 className="font-display font-700 text-white leading-snug mb-6"
          style={{fontSize:"1.3rem"}}>
          {job.title}
        </h2>

        {/* Info rows */}
        <div className="space-y-3 mb-7">
          {/* Salary — most prominent */}
          <div className="flex items-center gap-3 rounded-xl px-4 py-3.5"
            style={{background:`${color}0E`,border:`1px solid ${color}22`}}>
            <DollarSign className="w-4 h-4 flex-shrink-0" style={{color}}/>
            <span className="font-display font-700 text-white text-lg">{job.salary}</span>
            <span className="ml-auto text-[10px] font-mono text-[rgba(232,243,255,0.75)] uppercase tracking-wider">Compensation</span>
          </div>
          <div className="flex items-center gap-3 px-1">
            <MapPin className="w-4 h-4 flex-shrink-0 text-[rgba(232,243,255,0.70)]"/>
            <span className="text-sm text-[rgba(232,243,255,0.62)]">{job.location}</span>
          </div>
          <div className="flex items-center gap-3 px-1">
            <Building2 className="w-4 h-4 flex-shrink-0 text-[rgba(232,243,255,0.70)]"/>
            <span className="text-sm text-[rgba(232,243,255,0.62)]">AI Brigade · {cat?.label}</span>
          </div>
        </div>

        <Button variant="primary" size="lg" className="w-full" onClick={onApply}
          iconRight={<ArrowRight className="w-4 h-4"/>}>
          Apply for This Role
        </Button>
      </div>

      {/* Scrollable body */}
      <div className="overflow-y-auto" style={{maxHeight:"50vh"}}>
        <div className="px-7 py-6 space-y-6">
          <div>
            <h4 className="flex items-center gap-2 text-[10px] font-mono font-700 tracking-[0.28em] uppercase text-[rgba(232,243,255,0.75)] mb-3">
              <Layers className="w-3 h-3"/> Overview
            </h4>
            <p className="text-[rgba(232,243,255,0.75)] text-sm leading-[1.8]">{job.description}</p>
          </div>

          {job.responsibilities.length>0&&(
            <div>
              <h4 className="flex items-center gap-2 text-[10px] font-mono font-700 tracking-[0.28em] uppercase text-[rgba(232,243,255,0.75)] mb-4">
                <Layers className="w-3 h-3"/> What You&apos;ll Do
              </h4>
              <ul className="space-y-3">
                {job.responsibilities.map((r,i)=>(
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-[7px] flex-shrink-0" style={{background:color,boxShadow:`0 0 6px ${color}`}}/>
                    <span className="text-[rgba(232,243,255,0.7)] text-sm leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {job.requirements.length>0&&(
            <div>
              <h4 className="flex items-center gap-2 text-[10px] font-mono font-700 tracking-[0.28em] uppercase text-[rgba(232,243,255,0.75)] mb-4">
                <CheckCircle2 className="w-3 h-3"/> Requirements
              </h4>
              <ul className="space-y-3">
                {job.requirements.map((r,i)=>(
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-[3px]" style={{color}}/>
                    <span className="text-[rgba(232,243,255,0.7)] text-sm leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h4 className="text-[10px] font-mono font-700 tracking-[0.28em] uppercase text-[rgba(232,243,255,0.75)] mb-3">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {job.tags.map(t=>(
                <span key={t} className="text-[11px] font-mono px-2.5 py-1 rounded-lg text-[rgba(232,243,255,0.65)]"
                  style={{border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.05)"}}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="px-7 pb-7">
          <Button variant="outline" size="md" className="w-full" onClick={onApply} iconRight={<Send className="w-4 h-4"/>}>
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Job Row (list-style card)
// ─────────────────────────────────────────────────────────
function JobRow({ job, selected, onSelect, onApply }:{
  job:Job; selected:boolean; onSelect:()=>void; onApply:()=>void;
}) {
  const cat   = CATS.find(c=>c.id===job.category);
  const color = cat?.color ?? "#00D4FF";
  const lc    = LEVEL_COLORS[job.level] ?? LEVEL_COLORS["Senior"];

  return (
    <motion.div
      layout initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{duration:0.14}}
      onClick={onSelect}
      className="group relative rounded-2xl cursor-pointer transition-all duration-200 overflow-hidden"
      style={{
        background: selected ? "rgba(14,20,42,1)" : "rgba(11,15,28,0.85)",
        border: selected ? `1.5px solid ${color}50` : "1px solid rgba(255,255,255,0.07)",
        boxShadow: selected
          ? `0 0 0 1px ${color}18,0 12px 40px rgba(0,0,0,0.5),0 0 30px ${color}0A`
          : "0 2px 8px rgba(0,0,0,0.2)",
      }}>

      {/* Selected left bar */}
      {selected && (
        <div className="absolute left-0 inset-y-0 w-[3px]"
          style={{background:`linear-gradient(to bottom,${color},${color==="#00D4FF"?"#9B4DFF":"#00D4FF"})`}}/>
      )}

      {/* Hover gradient */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{background:`radial-gradient(ellipse 70% 50% at 0% 50%,${color}06,transparent)`}}/>

      <div className={`flex items-center gap-5 p-5 ${selected?"pl-6":""}`}>

        {/* Category icon badge */}
        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{background:`${color}12`,border:`1px solid ${color}28`,color}}>
          {(() => { const Icon = cat?.icon as React.FC<{className?:string}>; return <Icon className="w-5 h-5"/>; })()}
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-1.5">
            <h3 className="font-display font-700 text-base leading-snug truncate pr-2"
              style={{color:selected?"#fff":"rgba(232,243,255,0.9)"}}>
              {job.title}
            </h3>
            {/* Salary on the right */}
            <span className="font-display font-700 text-sm flex-shrink-0" style={{color}}>
              {job.salary}
            </span>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            {/* Level badge - violet */}
            <span className="text-[9px] font-mono font-700 tracking-[0.18em] uppercase px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-400 border border-violet-500/30">
              {job.level}
            </span>
            {/* Department badge - cyan */}
            <span className="text-[9px] font-mono font-700 tracking-[0.18em] uppercase px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              {cat?.label ?? job.category}
            </span>
            {/* Employment type badge - green */}
            <span className="text-[9px] font-mono font-700 tracking-[0.18em] uppercase px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
              {job.type}
            </span>
            {/* Divider */}
            <span className="text-[rgba(232,243,255,0.50)] text-xs">·</span>
            <span className="flex items-center gap-1 text-[11px] font-mono text-[rgba(232,243,255,0.75)]">
              <MapPin className="w-3 h-3"/> {job.location}
            </span>
          </div>
        </div>

        {/* Right: Apply + chevron */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={e=>{e.stopPropagation();onApply();}}
            className="px-4 py-2 rounded-xl font-display font-600 text-xs transition-all duration-200 hidden sm:flex items-center gap-1.5 active:scale-[0.97]"
            style={{
              background: selected ? `linear-gradient(135deg,${color},${color==="#00D4FF"?"#0088BB":"#7B2FE0"})` : `${color}12`,
              border: `1px solid ${color}${selected?"55":"22"}`,
              color: selected ? (color==="#00D4FF"?"#050e1f":"#fff") : color,
              boxShadow: selected ? `0 4px 16px ${color}30` : "none",
            }}>
            Apply
            <ArrowRight className="w-3 h-3"/>
          </button>
          <ChevronRight className="w-4 h-4 transition-all duration-200 group-hover:translate-x-0.5"
            style={{color:selected?color:"rgba(232,243,255,0.2)"}}/>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────
// Pagination
// ─────────────────────────────────────────────────────────
function Pagination({ page, total, perPage, onChange }:{
  page:number; total:number; perPage:number; onChange:(p:number)=>void;
}) {
  const pages = Math.ceil(total/perPage);
  if (pages<=1) return null;

  const getRange = () => {
    const delta = 2;
    const range: (number|"...")[] = [];
    for (let i=1;i<=pages;i++) {
      if (i===1||i===pages||Math.abs(i-page)<=delta) range.push(i);
      else if (range[range.length-1]!=="...") range.push("...");
    }
    return range;
  };

  return (
    <div className="flex items-center justify-between pt-6 border-t border-[rgba(255,255,255,0.07)]">
      <p className="text-[11px] font-mono text-[rgba(232,243,255,0.75)]">
        Showing {Math.min((page-1)*perPage+1,total)}–{Math.min(page*perPage,total)} of {total} roles
      </p>

      <div className="flex items-center gap-1.5">
        <button onClick={()=>onChange(page-1)} disabled={page===1}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          style={{border:"1px solid rgba(255,255,255,0.09)",background:"rgba(255,255,255,0.04)",color:"rgba(232,243,255,0.6)"}}>
          <ChevronLeft className="w-4 h-4"/>
        </button>

        {getRange().map((p,i)=>
          p==="..." ? (
            <span key={`e${i}`} className="w-9 h-9 flex items-center justify-center text-[rgba(232,243,255,0.65)] text-sm">…</span>
          ) : (
            <button key={p} onClick={()=>onChange(p as number)}
              className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-600 text-sm transition-all"
              style={{
                background: page===p ? "linear-gradient(135deg,#00D4FF,#0099CC)" : "rgba(255,255,255,0.04)",
                border: page===p ? "1px solid rgba(0,212,255,0.5)" : "1px solid rgba(255,255,255,0.09)",
                color: page===p ? "#050e1f" : "rgba(232,243,255,0.6)",
                boxShadow: page===p ? "0 4px 16px rgba(0,212,255,0.3)" : "none",
              }}>
              {p}
            </button>
          )
        )}

        <button onClick={()=>onChange(page+1)} disabled={page===pages}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          style={{border:"1px solid rgba(255,255,255,0.09)",background:"rgba(255,255,255,0.04)",color:"rgba(232,243,255,0.6)"}}>
          <ChevronRight className="w-4 h-4"/>
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────
export default function CareersClient({ jobs }: { jobs: Job[] }) {
  const [activeCat, setActiveCat] = useState("all");
  const [query,     setQuery]     = useState("");
  const [page,      setPage]      = useState(1);
  const [sel,       setSel]       = useState<Job>(jobs[0]);
  const [modal,     setModal]     = useState<Job|null>(null);

  // Re-filter
  const filtered = jobs.filter(j=>{
    const mc = activeCat==="all" || j.category===activeCat;
    const q  = query.toLowerCase();
    const ms = !q || j.title.toLowerCase().includes(q) || j.tags.some(t=>t.toLowerCase().includes(q)) || j.level.toLowerCase().includes(q);
    return mc&&ms;
  });

  // Reset page on filter change
  useEffect(()=>{ setPage(1); },[activeCat,query]);

  const pages     = Math.ceil(filtered.length/PER_PAGE);
  const pageSlice = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);

  const changePage = (p: number) => {
    setPage(p);
    document.getElementById("open-roles")?.scrollIntoView({behavior:"smooth",block:"start"});
  };

  return (
    <div id="open-roles">
      {/* ── Sticky toolbar ── */}
      <div className="sticky top-[72px] lg:top-[80px] z-30"
        style={{background:"rgba(6,9,22,0.97)",backdropFilter:"blur(24px)",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
        <div className="container-custom">
          {/* Search row */}
          <div className="pt-4 pb-3 border-b border-[rgba(255,255,255,0.05)]">
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00D4FF]"/>
                <input value={query} onChange={e=>setQuery(e.target.value)}
                  placeholder="Search by title, skill, or level…"
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl text-sm text-white placeholder:text-gray-400 border-2 bg-[rgba(0,212,255,0.06)] focus:outline-none focus:ring-0 transition-all"
                  style={{borderColor:"rgba(0,212,255,0.35)",boxShadow:"0 0 0 0 rgba(0,212,255,0)"}}
                  onFocus={e=>{e.currentTarget.style.borderColor="rgba(0,212,255,0.7)";e.currentTarget.style.boxShadow="0 0 20px rgba(0,212,255,0.15)";}}
                  onBlur={e=>{e.currentTarget.style.borderColor="rgba(0,212,255,0.35)";e.currentTarget.style.boxShadow="none";}}
                />
              </div>
              {(query||activeCat!=="all") && (
                <button onClick={()=>{setQuery("");setActiveCat("all");}}
                  className="text-xs font-mono text-[rgba(232,243,255,0.75)] hover:text-[#00D4FF] transition-colors underline underline-offset-2 whitespace-nowrap">
                  Clear all
                </button>
              )}
              <span className="ml-auto text-xs font-mono text-[rgba(232,243,255,0.70)] whitespace-nowrap hidden sm:block">
                <span className="text-white font-700">{filtered.length}</span> role{filtered.length!==1?"s":""}
              </span>
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-none">
            {[{id:"all",label:"All Roles",color:"rgba(255,255,255,0.7)",count:jobs.length,icon:Briefcase},...CATS].map(c=>{
              const Icon = c.icon as React.FC<{className?:string}>;
              const on   = activeCat===c.id;
              return (
                <button key={c.id} onClick={()=>setActiveCat(c.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl font-display font-600 text-sm transition-all duration-150 whitespace-nowrap flex-shrink-0"
                  style={{
                    background: on ? `${c.color}14` : "transparent",
                    border: on ? `1px solid ${c.color}45` : "1px solid transparent",
                    color: on ? c.color : "rgba(232,243,255,0.45)",
                  }}>
                  <Icon className="w-3.5 h-3.5"/>
                  {c.label}
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md"
                    style={{background:on?`${c.color}22`:"rgba(255,255,255,0.07)",color:on?c.color:"rgba(232,243,255,0.35)"}}>
                    {c.id==="all"?jobs.length:(c as Cat).count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Board ── */}
      <div className="container-custom py-8">
        {filtered.length===0 ? (
          <div className="text-center py-32 rounded-2xl"
            style={{border:"1px solid rgba(255,255,255,0.07)",background:"rgba(11,15,28,0.6)"}}>
            <Briefcase className="w-12 h-12 mx-auto mb-4 text-[rgba(232,243,255,0.35)]"/>
            <p className="font-display font-700 text-white text-xl mb-2">No roles found</p>
            <p className="text-[rgba(232,243,255,0.75)] text-sm mb-6">Try adjusting your search or category</p>
            <Button variant="outline" size="sm" onClick={()=>{setQuery("");setActiveCat("all");}}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_440px] gap-8 items-start">

            {/* ── Left: list + pagination ── */}
            <div>
              {/* Page info */}
              {pages>1&&(
                <p className="text-[11px] font-mono text-[rgba(232,243,255,0.70)] mb-4">
                  Page {page} of {pages}
                </p>
              )}

              {/* Job rows */}
              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {pageSlice.map(j=>(
                    <JobRow key={j.id} job={j} selected={sel?.id===j.id}
                      onSelect={()=>setSel(j)} onApply={()=>setModal(j)}/>
                  ))}
                </AnimatePresence>
              </div>

              {/* Pagination */}
              <div className="mt-6">
                <Pagination page={page} total={filtered.length} perPage={PER_PAGE} onChange={changePage}/>
              </div>
            </div>

            {/* ── Right: detail ── */}
            <div className="hidden lg:block">
              <AnimatePresence mode="wait">
                <motion.div key={sel?.id}
                  initial={{opacity:0,x:16}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-16}}
                  transition={{duration:0.16}}>
                  <JobDetail job={sel} onApply={()=>setModal(sel)}/>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      {/* Apply modal */}
      <AnimatePresence>
        {modal&&<ApplyModal job={modal} onClose={()=>setModal(null)}/>}
      </AnimatePresence>
    </div>
  );
}


