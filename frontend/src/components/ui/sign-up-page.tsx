'use client'

import React, { useState } from 'react'
import { Eye, EyeOff, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import BrandLogo from '@/components/BrandLogo'

export function SignUpPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [selectedRole, setSelectedRole] = useState<'patient' | 'doctor'>('patient')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    agreeTerms: true
  })
  const [isSuccess, setIsSuccess] = useState(false)

  const roles = [
    { id: 'patient', label: 'Patient' },
    { id: 'doctor', label: 'Doctor' },
  ] as const

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Signup submitted:', { ...formData, role: selectedRole })
    setIsSuccess(true)
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex flex-col md:flex-row">
      {/* Left Panel - Visual & Value Proposition */}
      <div className="flex-1 relative overflow-hidden min-h-[300px] md:min-h-screen">
        {/* Back to Home Button */}
        <div className="absolute top-6 left-6 z-10">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/50 text-white cursor-pointer shadow-md transition-all border border-white/10"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Button>
        </div>

        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1200&auto=format&fit=crop&q=80"
            alt="Impact Health Modern Facility"
            className="w-full h-full object-cover select-none"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1584515979963-22877af2e1ad?w=1200&auto=format&fit=crop&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/45 to-slate-900/20 pointer-events-none" />
          
          {/* Overlay Text Details */}
          <div className="absolute bottom-10 left-10 right-10 text-white space-y-3 z-10 hidden sm:block">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-300 bg-emerald-950/70 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-400/30 inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Clinical Ecosystem
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white drop-shadow-sm">
              Empowering 100,000+ Lives Across India
            </h2>
            <p className="text-xs lg:text-sm text-slate-300 max-w-md leading-relaxed">
              Join leading academic institutions, corporate workforces, and patients accessing verified preventive care and medical infrastructure.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-3 max-w-md">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
                <div className="text-lg font-bold text-white">22+</div>
                <div className="text-xs text-slate-300">Specialized Services</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
                <div className="text-lg font-bold text-white">99.8%</div>
                <div className="text-xs text-slate-300">Clinical Compliance</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Registration Form */}
      <div className="flex-1 flex items-center justify-center bg-white p-6 sm:p-10 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-md py-6">
          {isSuccess ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Registration Complete!</h2>
              <p className="text-sm text-gray-600 max-w-sm mx-auto">
                Welcome to Impact Health. An activation link and account details have been sent to <span className="font-semibold text-gray-800">{formData.email}</span>.
              </p>
              <div className="pt-4">
                <Button
                  type="button"
                  variant="royal"
                  size="xl"
                  onClick={() => navigate('/login')}
                  className="w-full"
                >
                  Proceed to Sign In
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6 text-left">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="inline-block mb-4 focus:outline-none hover:opacity-90 transition cursor-pointer"
                  aria-label="Impact Health Home"
                >
                  <BrandLogo className="h-9 sm:h-10" />
                </button>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Create Account
                </h1>
                <p className="text-gray-600 text-sm flex items-center gap-1.5 flex-wrap">
                  <span>Already have an account?</span>
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => navigate('/login')}
                    className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer underline text-sm p-0 h-auto"
                  >
                    Sign in
                  </Button>
                </p>
              </div>

              {/* Role Selector Tabs */}
              <div className="mb-6 text-left">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  I am registering as:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={`py-2.5 px-4 text-sm font-medium rounded-xl border transition-all text-center cursor-pointer flex items-center justify-center gap-2 ${
                        selectedRole === role.id
                          ? 'border-[#0066FF] bg-blue-50/90 text-[#0066FF] shadow-xs font-semibold ring-1 ring-[#0066FF]'
                          : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                      }`}
                    >
                      {role.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder={selectedRole === 'doctor' ? "e.g. Dr. Ananya Sharma" : "e.g. Rahul Verma"}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm text-gray-900"
                    required
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@organization.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm text-gray-900"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm text-gray-900"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Minimum 8 characters"
                      minLength={8}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm text-gray-900"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-full text-gray-500 transition cursor-pointer"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-500" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms Checkbox */}
                <div className="pt-1">
                  <label className="flex items-start space-x-2.5 text-xs text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5 cursor-pointer shrink-0"
                      required
                    />
                    <span>
                      I agree to the{' '}
                      <button
                        type="button"
                        onClick={() => navigate('/privacy-policy')}
                        className="text-blue-600 hover:underline font-medium p-0 h-auto inline"
                      >
                        Privacy Policy
                      </button>{' '}
                      and HIPAA-compliant healthcare terms.
                    </span>
                  </label>
                </div>

                {/* Submit button using shadcn Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="royal"
                    size="xl"
                    className="w-full shadow-md hover:shadow-lg transition-all"
                  >
                    Create Account
                  </Button>
                </div>

                {/* Divider */}
                <div className="relative my-5">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-white text-gray-500 uppercase tracking-wider">
                      or sign up with
                    </span>
                  </div>
                </div>

                {/* Social Buttons using shadcn Button */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="xl"
                    onClick={() => alert("Google Single Sign-On simulation.")}
                    className="w-full flex items-center justify-center font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="text-xs sm:text-sm truncate">Google</span>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="xl"
                    onClick={() => alert("GitHub Single Sign-On simulation.")}
                    className="w-full flex items-center justify-center font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <svg className="w-5 h-5 shrink-0" fill="#24292f" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="text-xs sm:text-sm truncate">GitHub</span>
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SignUpPage;
