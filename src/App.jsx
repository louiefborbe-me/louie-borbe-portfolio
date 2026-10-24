import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail, Menu, X, CheckCircle2, AlertCircle,
  Loader2, Code2, Database, Smartphone, Globe, ShoppingCart, BarChart3,
  Calendar, Wrench, Briefcase, GraduationCap, ChevronRight
} from "lucide-react";

const formId = import.meta.env.VITE_FORMSPREE_FORM_ID;
const formspreeUrl = `https://formspree.io/f/${formId}`;

const navItems = ["Home","About","Services","Solutions","Skills","Experience","Projects","FAQ","Contact"];

const serviceTypes = ["Website Development","POS System","Inventory Management","Custom Business Software","Mobile Application","Database/API Integration","Website Maintenance","Other"];

const services = [
  { icon: Globe, title: "Website Development", desc: "Responsive, modern websites tailored to your business goals." },
  { icon: Code2, title: "Custom Web Applications & Business Systems", desc: "Custom web applications, admin dashboards, authentication, and business workflow solutions." },
  { icon: Smartphone, title: "Mobile Application Development", desc: "Cross-platform mobile applications built with Flutter and Dart." },
  { icon: Database, title: "Database & API Integration", desc: "Database integration, REST APIs, and reliable backend data management." },
  { icon: Wrench, title: "WordPress Development & Website Maintenance", desc: "WordPress website updates, content management, troubleshooting, and ongoing maintenance." },
  { icon: CheckCircle2, title: "Attendance & Management Systems", desc: "QR-based attendance tracking, student management workflows, and database-powered information systems." },
];

const solutions = [
  { icon: ShoppingCart, title: "POS System (Example)", desc: "Sales tracking, receipts, and daily reports concept." },
  { icon: BarChart3, title: "Inventory Management (Example)", desc: "Stock monitoring and low-stock alerts concept." },
  { icon: BarChart3, title: "Business Reporting (Example)", desc: "Revenue and operations reports concept." },
  { icon: Calendar, title: "Booking System (Example)", desc: "Appointment scheduling and calendar concept." },
  { icon: Globe, title: "Business Website (Example)", desc: "Marketing site with contact and services concept." },
  { icon: Smartphone, title: "Mobile App (Example)", desc: "On-the-go management companion concept." },
];

const skills = [
  "Java","C#","Python","JavaScript","Dart",
  "HTML","CSS","Node.js","REST APIs","Authentication",
  "Flutter","Android Studio",
  "Supabase","PostgreSQL","MySQL","SQL Server","MongoDB",
  "VS Code","Git","GitHub","WordPress CMS","Unity","SAP S/4HANA"
];

function Nav() {
  const [open,setOpen]=useState(false);
  const scrollTo=(id)=>{document.getElementById(id)?.scrollIntoView({behavior:"smooth"});setOpen(false);};
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#080d17]/80 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <button onClick={()=>scrollTo("home")} className="font-bold text-green-400">Louie Borbe</button>
        <div className="hidden md:flex gap-6 text-sm">
          {navItems.map(n=>(
            <button key={n} onClick={()=>scrollTo(n.toLowerCase())} className="hover:text-green-400 transition">{n}</button>
          ))}
        </div>
        <button onClick={()=>scrollTo("contact")} className="hidden md:inline-flex bg-green-500 hover:bg-green-600 text-black font-semibold px-4 py-2 rounded-lg text-sm">Start a Project</button>
        <button className="md:hidden" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
      </div>
      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-2">
          {navItems.map(n=>(
            <button key={n} onClick={()=>scrollTo(n.toLowerCase())} className="text-left py-1">{n}</button>
          ))}
          <button onClick={()=>scrollTo("contact")} className="bg-green-500 text-black font-semibold px-4 py-2 rounded-lg mt-2">Start a Project</button>
        </div>
      )}
    </nav>
  );
}

function Section({id,children,className=""}) {
  return <section id={id} className={`py-20 px-4 ${className}`}><div className="max-w-6xl mx-auto">{children}</div></section>;
}

export default function App() {
  const [form,setForm]=useState({name:"",email:"",projectType:"",description:"",budget:"",deadline:"",notes:""});
  const [status,setStatus]=useState("idle");
  const [error,setError]=useState("");
  const isConfigured = formId && formId !== "your_form_id_here";

  const preselect=(type)=>{
    setForm(f=>({...f,projectType:type}));
    document.getElementById("contact")?.scrollIntoView({behavior:"smooth"});
  };

  const validate=()=>{
    if(!form.name.trim()) return "Name is required";
    if(!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Valid email is required";
    if(!form.projectType) return "Project type is required";
    if(!form.description.trim()) return "Project description is required";
    return "";
  };

  const submit=async(e)=>{
    e.preventDefault();
    if(status==="loading") return;
    const v=validate();
    if(v){setError(v);return;}
    const isConfigured = formId && formId !== "your_form_id_here";
    if(!isConfigured){setError("Form is not configured. Set VITE_FORMSPREE_FORM_ID.");return;}
    setStatus("loading"); setError("");
    try {
      const res=await fetch(formspreeUrl,{
        method:"POST",
        headers:{"Content-Type":"application/json","Accept":"application/json"},
        body:JSON.stringify(form)
      });
      if(res.ok){setStatus("success");}
      else {const d=await res.json().catch(()=>({})); setError(d.error||"Submission failed. Please try again."); setStatus("error");}
    } catch (err) { setError("Network error: " + (err?.message || "Please try again.")); setStatus("error"); }
  };

  return (
    <div className="min-h-screen bg-[#080d17] text-white">
      <Nav/>
      <Section id="home" className="pt-32">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-center">
          <img src="/1000010420.jpg" alt="Portrait of Louie Frank Borbe" className="mx-auto mb-6 w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-green-500" />          <h1 className="text-4xl md:text-6xl font-bold">Louie Frank Borbe</h1>
          <p className="mt-4 text-xl text-green-400">Freelance Web & Software Developer</p>
          <p className="mt-4 max-w-2xl mx-auto text-gray-300">I build custom digital solutions based on your business requirements — websites, POS, inventory, and more.</p>
          <div className="mt-8 flex justify-center gap-4">
            <button onClick={()=>document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})} className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-lg">Start a Project</button>
            <a href="mailto:louie.f.borbe@gmail.com" className="border border-green-500 text-green-400 px-6 py-3 rounded-lg hover:bg-green-500/10">Email Me</a>
          </div>
        </motion.div>
      </Section>

      <Section id="about" className="text-center">
        <h2 className="text-3xl font-bold mb-6">About</h2>
        <p className="text-gray-300 max-w-3xl mx-auto text-center">BS Information Technology graduate from STI College Legazpi, Batch 2026, based in Legazpi City, Albay, Philippines. Freelance web developer with experience building responsive websites, web applications, authentication flows, database integrations, and WordPress solutions. Former WordPress developer and licensing intern at Quanby Solutions Inc., handling website maintenance, updates, troubleshooting, and licensing support. I help businesses turn requirements into reliable, user-friendly digital products.</p>
      </Section>

      <Section id="services">
        <h2 className="text-3xl font-bold mb-8">Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map(s=>(
            <div key={s.title} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-green-500/50 transition">
              <s.icon className="text-green-400 mb-3" size={28}/>
              <h3 className="font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm">{s.desc}</p>
              <button onClick={()=>preselect(s.title==="Website Development"?"Website Development":s.title==="Custom Web Applications & Business Systems"?"Custom Business Software":s.title==="Mobile Application Development"?"Mobile Application":s.title==="Database & API Integration"?"Database/API Integration":s.title==="WordPress Development & Website Maintenance"?"Website Maintenance":"Other")} className="mt-4 text-green-400 text-sm flex items-center gap-1">Request this <ChevronRight size={14}/></button>
            </div>
          ))}
        </div>
      </Section>

      <Section id="solutions">
        <h2 className="text-3xl font-bold mb-2">Example Solutions</h2>
        <p className="text-gray-400 mb-8">Concepts of what I can build — not completed client projects.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {solutions.map(s=>(
            <div key={s.title} className="bg-white/5 border border-white/10 rounded-xl p-6">
              <s.icon className="text-green-400 mb-3" size={28}/>
              <h3 className="font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="skills">
        <h2 className="text-3xl font-bold mb-8">Skills</h2>
        <div className="flex flex-wrap gap-3">
          {skills.map(s=>(<span key={s} className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm">{s}</span>))}
        </div>
      </Section>

      <Section id="experience">
        <h2 className="text-3xl font-bold mb-8">Experience</h2>
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2"><Briefcase className="text-green-400"/><h3 className="font-semibold">Freelance Web Developer — 2026–Present</h3></div>
            <p className="text-gray-400 text-sm">Web development, authentication, database integration, responsive interfaces, and custom requirements.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2"><Briefcase className="text-green-400"/><h3 className="font-semibold">Quanby Solutions Inc. — WordPress Developer & Licensing Intern, Feb–May 2026</h3></div>
            <p className="text-gray-400 text-sm">Website maintenance, WordPress updates, troubleshooting, and licensing support.</p>
          </div>
        </div>
      </Section>

      <Section id="projects">
        <h2 className="text-3xl font-bold mb-8">Academic Project</h2>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2"><GraduationCap className="text-green-400"/><h3 className="font-semibold">Oro-High Portal: E-Learning and Attendance Information System</h3></div>
          <p className="text-gray-400 text-sm">Academic project involving attendance management, role-based access, QR workflows, and database integration.</p>
        </div>
        <h3 className="text-xl font-bold mt-10 mb-4">Work Process</h3>
        <ol className="space-y-2 text-gray-300 list-decimal list-inside">
          <li>Inquiry</li><li>Requirements discussion</li><li>Quotation</li><li>Development</li><li>Testing and revisions</li><li>Delivery</li>
        </ol>
        <h3 className="text-xl font-bold mt-10 mb-4">Pricing</h3>
        <p className="text-gray-300">Custom quotations based on scope, complexity, and requirements. Pricing may vary depending on tools, licenses, subscriptions, hosting, and other third-party services, and these choices are decided with the client. No fixed prices.</p>
      </Section>

      <Section id="cta" className="text-center">
        <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-10">
          <h2 className="text-3xl font-bold mb-4">Let's work together</h2>
          <p className="text-gray-300 mb-6">Have a project in mind? Tell me your requirements and I'll help you build it.</p>
          <button onClick={()=>document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})} className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-lg">Start a Project</button>
        </div>
      </Section>
      <Section id="contact">
        <h2 className="text-3xl font-bold mb-8">Contact</h2>
        {!isConfigured && (
          <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/40 rounded-lg text-yellow-300 text-sm">
            Form is not configured. Set VITE_FORMSPREE_FORM_ID in .env.local.
          </div>
        )}
        {status==="success" ? (
          <div className="p-6 bg-green-500/10 border border-green-500/40 rounded-lg text-green-300 flex items-center gap-3">
            <CheckCircle2/> Thank you! Your message was sent successfully.
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4 max-w-2xl">
            <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3" placeholder="Client name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
            <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3" placeholder="Client email *" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
            <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white" value={form.projectType} onChange={e=>setForm({...form,projectType:e.target.value})}>
              <option value="" className="bg-[#080d17] text-white">Project type *</option>
              {serviceTypes.map(t=><option key={t} value={t} className="bg-[#080d17] text-white">{t}</option>)}
            </select>
            <textarea className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3" rows={5} placeholder="Project description and requirements *" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
            <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3" placeholder="Optional budget in PHP (or 'Not sure yet')" value={form.budget} onChange={e=>setForm({...form,budget:e.target.value})}/>
            <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3" placeholder="Optional preferred deadline" value={form.deadline} onChange={e=>setForm({...form,deadline:e.target.value})}/>
            <textarea className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3" rows={3} placeholder="Optional additional notes" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/>
            {error && <p className="text-red-400 text-sm flex items-center gap-2"><AlertCircle size={16}/>{error}</p>}
            <button type="submit" disabled={status==="loading"} className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-lg flex items-center gap-2 disabled:opacity-50">
              {status==="loading" && <Loader2 className="animate-spin" size={18}/>} Send Message
            </button>
          </form>
        )}
        <div className="mt-8 space-y-2 text-gray-300">
          <p><Mail className="inline mr-2 text-green-400" size={16}/><a href="mailto:louie.f.borbe@gmail.com" className="hover:text-green-400">louie.f.borbe@gmail.com</a></p>
          <p><a href="https://github.com/LouieBorbs" target="_blank" rel="noreferrer" className="hover:text-green-400">GitHub</a></p>
          <p><a href="https://www.linkedin.com/in/louie-frank-borbe-b7a183385" target="_blank" rel="noreferrer" className="hover:text-green-400">LinkedIn</a></p>          <p><a href="https://web.facebook.com/louiefrank.borbe" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">Facebook: Louie Frank Borbe</a></p>
        </div>
      </Section>

      <Section id="faq" className="text-center">
        <h2 className="text-3xl font-bold mb-8">FAQ</h2>
        <div className="max-w-3xl mx-auto space-y-4 text-left">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6"><h3 className="font-semibold mb-2">How do we start?</h3><p className="text-gray-400 text-sm">Send an inquiry with your requirements; I'll discuss scope and provide a quotation.</p></div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6"><h3 className="font-semibold mb-2">Do you offer fixed prices?</h3><p className="text-gray-400 text-sm">No, pricing depends on scope, complexity, and required tools or licenses.</p></div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6"><h3 className="font-semibold mb-2">Can we meet in person or via Zoom?</h3><p className="text-gray-400 text-sm">Yes, I'm available for face-to-face meetings in Legazpi City or online calls.</p></div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6"><h3 className="font-semibold mb-2">Do you provide ongoing support?</h3><p className="text-gray-400 text-sm">Yes, maintenance and support can be included based on agreement.</p></div>
        </div>
      </Section>
      <footer className="border-t border-white/10 py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6 text-sm text-gray-400">
          <div>© 2026 Louie Frank Borbe</div>
          <div className="flex gap-4">
            {navItems.map(n=>(<button key={n} onClick={()=>document.getElementById(n.toLowerCase())?.scrollIntoView({behavior:"smooth"})} className="hover:text-green-400">{n}</button>))}
          </div>
          <div className="flex gap-4">
            <a href="mailto:louie.f.borbe@gmail.com" className="hover:text-green-400">Email</a>
            <a href="https://github.com/LouieBorbs" target="_blank" rel="noreferrer" className="hover:text-green-400">GitHub</a>
            <a href="https://www.linkedin.com/in/louie-frank-borbe-b7a183385" target="_blank" rel="noreferrer" className="hover:text-green-400">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}


























