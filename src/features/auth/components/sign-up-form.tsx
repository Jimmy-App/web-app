"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { 
  ArrowLeft, Upload, Check, User, 
  Image as ImageIcon, ChevronDown 
} from "lucide-react";

import { Button } from "@/components/ui/button";

// --- TYPES ---
type Step = 1 | 2 | 3;

// --- HELPERS FOR DATE ---
const months = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];
const currentYear = new Date().getFullYear();
// Робимо діапазон років (наприклад, від 18 до 100 років)
const years = Array.from({ length: 100 }, (_, i) => (currentYear - i).toString());

// --- JIMMY DESIGN SYSTEM COMPONENTS ---

const JimmyInput = ({ className, ...props }: any) => (
  <div className="w-full space-y-1.5">
    <input
      {...props}
      className={`h-[52px] w-full rounded-[14px] border border-transparent bg-[#F3F4F6] px-4 text-base text-[#1F2937] placeholder:text-[#9CA3AF] outline-none transition-all duration-200 focus:bg-white focus:border-[#7C3AED] focus:shadow-[0_0_0_4px_rgba(124,58,237,0.1)] ${className}`}
    />
  </div>
);

const JimmySelect = ({ value, onChange, options, placeholder, className }: any) => (
  <div className={`w-full relative ${className}`}>
    <div className="relative h-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-[52px] w-full appearance-none rounded-[14px] border border-transparent bg-[#F3F4F6] px-4 text-base text-[#1F2937] outline-none transition-all focus:bg-white focus:border-[#7C3AED] focus:shadow-[0_0_0_4px_rgba(124,58,237,0.1)] cursor-pointer ${!value ? 'text-[#9CA3AF]' : ''}`}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt} className="text-[#1F2937]">{opt}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
        <ChevronDown size={16} />
      </div>
    </div>
  </div>
);

// --- ASSETS ---
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26l.81-.58z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

// --- DATA ---
const countries = ["United States", "United Kingdom", "Canada", "Ukraine", "Germany", "France", "Poland"];
const plans = [
  { id: "Starter", title: "Starter", price: "Free", desc: "Launch your first space" },
  { id: "Scale", title: "Scale", price: "$29", desc: "For growing teams" },
  { id: "Elite", title: "Elite", price: "$99", desc: "Advanced workflows" },
];

export function SignUpForm() {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    email: "", password: "", confirm: "",
    firstName: "", lastName: "", 
    dobDay: "", dobMonth: "", dobYear: "",
    country: "",
    avatar: null as File | null,
    spaceLogo: null as File | null,
    spaceName: "", spaceDesc: "", plan: "Starter"
  });

  // --- DYNAMIC DATE LOGIC ---
  
  // 1. Calculate max days in selected month/year
  const daysInMonth = useMemo(() => {
    // Default to 31 if month not selected
    if (!formData.dobMonth) return 31;
    
    const monthIndex = months.indexOf(formData.dobMonth);
    // If year not selected, assume leap year (2024) so user can pick Feb 29
    const year = formData.dobYear ? parseInt(formData.dobYear) : 2024; 
    
    // JS Date magic: Day 0 of next month is the last day of current month
    return new Date(year, monthIndex + 1, 0).getDate();
  }, [formData.dobMonth, formData.dobYear]);

  // 2. Generate array of strings ["1", "2", ... "28/29/30/31"]
  const dayOptions = useMemo(() => {
    return Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
  }, [daysInMonth]);

  // 3. Auto-fix: If user selected "31" then switched to "Feb", clear the day
  useEffect(() => {
    if (formData.dobDay && parseInt(formData.dobDay) > daysInMonth) {
      setFormData(prev => ({ ...prev, dobDay: "" }));
    }
  }, [daysInMonth, formData.dobDay]);


  // Helpers
  const stepTitle = useMemo(() => ["Create Account", "Coach Profile", "Coach Space"][step - 1], [step]);
  const stepDesc = useMemo(() => [
    "Start your journey with Jimmy today.",
    "Tell us a bit about yourself.",
    "Set up your public coaching hub."
  ][step - 1], [step]);

  const initials = useMemo(() => {
    const f = formData.firstName[0] || "";
    const l = formData.lastName[0] || "";
    return (f + l).toUpperCase();
  }, [formData.firstName, formData.lastName]);

  // Navigation
  const handleNext = () => setStep((p) => Math.min(p + 1, 3) as Step);
  const handleBack = () => setStep((p) => Math.max(p - 1, 1) as Step);
  const handleGoogleLogin = () => console.log("Google Login Triggered");

  return (
    <div className="flex min-h-screen w-full bg-white">
      
      {/* --- LEFT COLUMN: FORM --- */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16 xl:px-24 overflow-y-auto h-screen">
        <div className="mx-auto w-full max-w-[480px]">
          
          {/* HEADER */}
          <div className="mb-10 text-center sm:text-left">
            <img src="/assets/logo-login.svg" alt="Jimmy" className="h-10 w-auto mb-8 mx-auto sm:mx-0" />
            
            <div className="flex gap-2 mb-2">
              {[1, 2, 3].map((s) => (
                <div 
                  key={s} 
                  className={`h-1.5 flex-1 rounded-full transition-all duration-500 ease-out ${s <= step ? "bg-[#7C3AED]" : "bg-[#F3F4F6]"}`} 
                />
              ))}
            </div>
            <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF] mb-6">
                <span className={step >= 1 ? "text-[#7C3AED]" : ""}>Account</span>
                <span className={step >= 2 ? "text-[#7C3AED]" : ""}>Profile</span>
                <span className={step >= 3 ? "text-[#7C3AED]" : ""}>Space</span>
            </div>

            <h1 className="text-3xl font-bold text-[#1F2937]">{stepTitle}</h1>
            <p className="mt-2 text-[#6B7280]">{stepDesc}</p>
          </div>

          {/* STEP 1: ACCOUNT */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              <Button 
                variant="outline" 
                onClick={handleGoogleLogin}
                className="h-[54px] w-full rounded-full border-[#E5E7EB] bg-white text-base font-bold text-[#1F2937] hover:bg-[#F9FAFB] hover:text-black active:scale-[0.98]"
              >
                <GoogleIcon />
                Continue with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-[#E5E7EB]" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-[#9CA3AF] font-bold tracking-widest">Or</span>
                </div>
              </div>

              <div className="space-y-4">
                <JimmyInput placeholder="Email Address" value={formData.email} onChange={(e: any) => setFormData({...formData, email: e.target.value})} />
                <JimmyInput type="password" placeholder="Password" value={formData.password} onChange={(e: any) => setFormData({...formData, password: e.target.value})} />
                <JimmyInput type="password" placeholder="Confirm Password" value={formData.confirm} onChange={(e: any) => setFormData({...formData, confirm: e.target.value})} />
              </div>
              
              <Button className="h-[54px] w-full rounded-full bg-[#7C3AED] text-base font-bold text-white shadow-lg hover:bg-[#6D28D9] active:scale-[0.98]" onClick={handleNext}>
                Continue
              </Button>
              
              <p className="text-center text-sm text-[#9CA3AF]">
                Already have an account? <Link href="/auth/sign-in" className="font-semibold text-[#1F2937] hover:underline">Log in</Link>
              </p>
            </div>
          )}

          {/* STEP 2: COACH PROFILE */}
          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-5 p-4 rounded-[20px] bg-white border border-[#E5E7EB] shadow-sm">
                <label className="relative group cursor-pointer shrink-0">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F3F4F6] border-2 border-[#E5E7EB] overflow-hidden transition-transform group-hover:scale-105">
                    {formData.avatar ? (
                      <img src={URL.createObjectURL(formData.avatar)} className="h-full w-full object-cover" alt="Avatar" />
                    ) : initials ? (
                      <span className="text-2xl font-bold text-[#7C3AED]">{initials}</span>
                    ) : (
                      <User size={32} className="text-[#9CA3AF]" />
                    )}
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && setFormData({...formData, avatar: e.target.files[0]})} />
                  <div className="absolute bottom-0 right-0 bg-[#1F2937] text-white p-1.5 rounded-full border-2 border-white shadow-sm"><Upload size={12} /></div>
                </label>
                <div>
                  <h3 className="font-bold text-[#1F2937]">Profile Photo</h3>
                  <p className="text-sm text-[#6B7280]">Upload a clear photo used for your space.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <JimmyInput placeholder="First Name" value={formData.firstName} onChange={(e: any) => setFormData({...formData, firstName: e.target.value})} />
                  <JimmyInput placeholder="Last Name" value={formData.lastName} onChange={(e: any) => setFormData({...formData, lastName: e.target.value})} />
                </div>
                
                {/* DATE OF BIRTH SELECTORS */}
                <div className="grid grid-cols-4 gap-3">
                    <div className="col-span-1">
                        <JimmySelect 
                            placeholder="Day" 
                            options={dayOptions} 
                            value={formData.dobDay} 
                            onChange={(v: string) => setFormData({...formData, dobDay: v})} 
                        />
                    </div>
                    <div className="col-span-2">
                        <JimmySelect 
                            placeholder="Month" 
                            options={months} 
                            value={formData.dobMonth} 
                            onChange={(v: string) => setFormData({...formData, dobMonth: v})} 
                        />
                    </div>
                    <div className="col-span-1">
                        <JimmySelect 
                            placeholder="Year" 
                            options={years} 
                            value={formData.dobYear} 
                            onChange={(v: string) => setFormData({...formData, dobYear: v})} 
                        />
                    </div>
                </div>

                <JimmySelect placeholder="Select Country" options={countries} value={formData.country} onChange={(v: string) => setFormData({...formData, country: v})} />
              </div>

              <div className="flex gap-4 pt-4">
                <Button variant="outline" className="h-[54px] w-[54px] rounded-full border-[#E5E7EB] p-0 hover:bg-[#F3F4F6] text-[#1F2937]" onClick={handleBack}><ArrowLeft size={24} /></Button>
                <Button className="h-[54px] flex-1 rounded-full bg-[#7C3AED] text-base font-bold text-white shadow-md hover:bg-[#6D28D9] active:scale-[0.98]" onClick={handleNext}>Continue</Button>
              </div>
            </div>
          )}

          {/* STEP 3: COACH SPACE */}
          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-6">
                <div className="flex items-center gap-5 p-5 rounded-[20px] border border-[#E5E7EB] bg-white shadow-sm">
                  <label className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[16px] bg-[#F9FAFB] border border-[#E5E7EB] cursor-pointer hover:border-[#7C3AED]/50 transition-all overflow-hidden group">
                    {formData.spaceLogo ? <img src={URL.createObjectURL(formData.spaceLogo)} className="h-full w-full object-cover" alt="Space Logo" /> : <ImageIcon size={28} className="text-[#9CA3AF] group-hover:text-[#7C3AED]" />}
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && setFormData({...formData, spaceLogo: e.target.files[0]})} />
                  </label>
                  <div className="flex-1">
                    <JimmyInput placeholder="Space Name (e.g. Iron Gym)" value={formData.spaceName} onChange={(e: any) => setFormData({...formData, spaceName: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-1.5">
                   <textarea 
                     placeholder="Space Description. Tell clients about your methodology..." 
                     className="min-h-[120px] w-full rounded-[14px] border border-transparent bg-[#F3F4F6] p-4 text-base text-[#1F2937] placeholder:text-[#9CA3AF] outline-none transition-all focus:bg-white focus:border-[#7C3AED] focus:shadow-[0_0_0_4px_rgba(124,58,237,0.1)] resize-none"
                     value={formData.spaceDesc}
                     onChange={e => setFormData({...formData, spaceDesc: e.target.value})}
                   />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3 px-1">
                    <span className="text-sm font-semibold text-[#9CA3AF] uppercase tracking-wider">Select Plan</span>
                    <a href="#" className="text-xs font-bold text-[#7C3AED] hover:underline">COMPARE PLANS</a>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {plans.map((p) => {
                        const isSelected = formData.plan === p.id;
                        return (
                          <button
                            key={p.id}
                            onClick={() => setFormData({...formData, plan: p.id as any})}
                            className={`relative flex flex-col justify-between rounded-[16px] border-2 p-4 text-left transition-all duration-200 ${isSelected ? "border-[#7C3AED] bg-[#7C3AED]/5 shadow-sm" : "border-[#E5E7EB] bg-white hover:border-[#D1D5DB]"}`}
                          >
                            <div className="space-y-1">
                                <h4 className="font-bold text-sm text-[#1F2937]">{p.title}</h4>
                                <p className="text-[10px] text-[#6B7280] leading-tight">{p.desc}</p>
                            </div>
                            <div className="mt-3 flex items-end justify-between">
                                <span className="font-bold text-[#1F2937]">{p.price}</span>
                                {isSelected && <div className="h-5 w-5 rounded-full bg-[#7C3AED] flex items-center justify-center"><Check size={10} className="text-white" strokeWidth={3} /></div>}
                            </div>
                          </button>
                        )
                    })}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <Button variant="outline" className="h-[54px] w-[54px] rounded-full border-[#E5E7EB] p-0 hover:bg-[#F3F4F6] text-[#1F2937]" onClick={handleBack}><ArrowLeft size={24} /></Button>
                <Button className="h-[54px] flex-1 rounded-full bg-[#7C3AED] text-base font-bold text-white shadow-lg hover:bg-[#6D28D9] active:scale-[0.98]" onClick={() => console.log(formData)}>Launch Space 🚀</Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- RIGHT COLUMN: VISUAL PREVIEW --- */}
      <div className="hidden w-1/2 flex-col items-center justify-center bg-[#F9FAFB] lg:flex relative overflow-hidden border-l border-gray-100 h-screen sticky top-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute top-[-20%] right-[-20%] h-[600px] w-[600px] rounded-full bg-[#7C3AED]/5 blur-3xl"></div>
        <div className="absolute bottom-[-20%] left-[-20%] h-[600px] w-[600px] rounded-full bg-[#F59E0B]/5 blur-3xl"></div>

        <div className="relative z-10 w-full max-w-[420px] animate-in fade-in zoom-in-95 duration-700">
            <div className="mb-6 flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] shadow-sm border border-gray-100">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
                    </span>
                    Live Preview
                </span>
            </div>

            <div className="relative overflow-hidden rounded-[40px] bg-white shadow-2xl border-[8px] border-white ring-1 ring-black/5 h-[640px]">
                {step === 1 && (
                    <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white">
                        <div className="h-24 w-24 rounded-[24px] bg-[#F9FAFB] flex items-center justify-center mb-6">
                            <img src="/assets/logo-login.svg" className="h-12 w-auto opacity-50 grayscale" alt="Logo" />
                        </div>
                        <h3 className="text-xl font-bold text-[#1F2937]">Welcome to Jimmy</h3>
                        <p className="text-sm text-[#9CA3AF] mt-2 max-w-[200px]">Your personal coaching operating system.</p>
                    </div>
                )}

                {step === 2 && (
                    <div className="h-full bg-[#F9FAFB] p-6 flex items-center justify-center">
                        <div className="w-full bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 rounded-full bg-[#F3F4F6] overflow-hidden border-2 border-white shadow-md flex items-center justify-center">
                                    {formData.avatar ? <img src={URL.createObjectURL(formData.avatar)} className="h-full w-full object-cover" alt="Avatar Preview" /> : <User size={24} className="text-gray-300"/>}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[#1F2937]">{formData.firstName || "Your"} {formData.lastName || "Name"}</h3>
                                    <p className="text-sm text-[#7C3AED] font-medium">Head Coach</p>
                                </div>
                            </div>
                            <div className="mt-6 flex gap-2">
                                <div className="h-2 flex-1 rounded-full bg-[#F3F4F6]"></div>
                                <div className="h-2 w-1/3 rounded-full bg-[#F3F4F6]"></div>
                            </div>
                            <div className="mt-3 h-2 w-1/2 rounded-full bg-[#F3F4F6]"></div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="relative h-full bg-white overflow-hidden">
                        <div className="px-6 pt-10">
                            <div className="h-20 w-20 rounded-[20px] bg-white border-4 border-white shadow-sm flex items-center justify-center overflow-hidden mb-3">
                                {formData.spaceLogo ? <img src={URL.createObjectURL(formData.spaceLogo)} className="h-full w-full object-cover" alt="Space Logo" /> : <span className="text-2xl font-bold text-[#7C3AED]">{formData.spaceName?.[0] || "S"}</span>}
                            </div>
                            
                            <h2 className="text-2xl font-bold text-[#1F2937] leading-tight mb-1">{formData.spaceName || "Space Name"}</h2>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-xs font-medium text-[#6B7280]">by {formData.firstName || "Coach"} {formData.lastName}</span>
                                <Check size={12} className="text-[#7C3AED]" />
                            </div>

                            <div className="h-px w-full bg-gray-100 mb-4" />
                            
                            <p className="text-sm text-[#4B5563] leading-relaxed">
                                {formData.spaceDesc || "This is where your space description will appear. Clients will see this when they visit your profile."}
                            </p>

                            <div className="mt-6 space-y-3">
                                <div className="h-16 rounded-[16px] bg-[#F9FAFB] border border-[#E5E7EB]"></div>
                                <div className="h-16 rounded-[16px] bg-[#F9FAFB] border border-[#E5E7EB]"></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>

    </div>
  );
}