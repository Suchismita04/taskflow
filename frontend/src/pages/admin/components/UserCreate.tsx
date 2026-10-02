import { useState, type FormEvent } from "react";
import {
    ArrowLeft,
    ArrowRight,
    Check,
    CheckCircle2,
    Circle,
    Eye,
    EyeOff,
    Shield,
    User,
} from "lucide-react";

export type NewUser = {
    firstName: string;
    lastName: string;
    username: string;
    accountType: "administrator" | "standard";
    email: string;
};

type UserCreateProps = {
    onCreate: (user: NewUser) => void;
};

export default function UserCreate({ onCreate }: UserCreateProps) {
    const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [accountType, setAccountType] = useState<NewUser["accountType"]>("standard");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const hasMinLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    const passwordScore = Number(hasMinLength) + Number(hasNumber) + Number(hasSpecialChar);
    const passwordStrength = passwordScore === 3 ? "Strong" : passwordScore === 2 ? "Medium" : "Weak";

    const handleStep1Next = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!firstName.trim() || !lastName.trim()) {
            setError("Please fill in both your first name and last name.");
            return;
        }
        setError(null);
        setCurrentStep(2);
    };

    const handleStep2Next = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!username.trim()) {
            setError("Please enter a username.");
            return;
        }
        setError(null);
        setCurrentStep(3);
    };

    const handleCreate = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!email.trim() || !password || !confirmPassword) {
            setError("Please provide an email address, password, and password confirmation.");
            return;
        }
        if (!hasMinLength || !hasNumber || !hasSpecialChar) {
            setError("Please meet all password requirements.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setError(null);
        onCreate({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            username: username.trim(),
            accountType,
            email: email.trim(),
        });
    };

    const steps = ["Personal", "Setup", "Security"] as const;

    return (
        <section className="mr-auto w-full max-w-5xl rounded-[3px] border border-[#d5d5d5] bg-white px-6 py-7 text-[#111] sm:px-12 sm:py-9">
            <h1 className="border-b border-[#ededed] pb-4 text-lg font-bold uppercase tracking-[-0.03em]">Create User</h1>

            <div className="mx-auto mt-8 w-full max-w-md">
                <div className="text-center">
                    <h2 className="text-2xl font-extrabold text-slate-900">
                        {currentStep === 1 && "Personal Details"}
                        {currentStep === 2 && "Configure Profile"}
                        {currentStep === 3 && "Security Details"}
                    </h2>
                    <p className="mt-2 text-xs text-slate-500">
                        {currentStep === 1 && "Enter the user's name."}
                        {currentStep === 2 && "Set up the user's workspace identity."}
                        {currentStep === 3 && "Create secure sign-in credentials."}
                    </p>
                </div>

                <div className="mb-8 mt-8 flex items-center justify-between px-2">
                    {steps.map((step, index) => (
                        <div className="contents" key={step}>
                            <div className="flex flex-col items-center">
                                <div className={`flex size-8 items-center justify-center rounded-full text-xs font-bold transition ${
                                    currentStep >= index + 1
                                        ? "bg-[#0F172A] text-white shadow-xs"
                                        : "border border-slate-300 bg-white text-slate-400"
                                }`}>
                                    {currentStep > index + 1 ? <Check className="size-4" /> : index + 1}
                                </div>
                                <span className={`mt-1.5 text-xs ${
                                    currentStep === index + 1
                                        ? "font-bold text-[#0F172A]"
                                        : currentStep > index + 1
                                            ? "font-semibold text-slate-700"
                                            : "font-medium text-slate-400"
                                }`}>
                                    {step}
                                </span>
                            </div>
                            {index < steps.length - 1 && (
                                <div className={`mx-2 -mt-4 h-0.5 flex-1 transition ${
                                    currentStep > index + 1 ? "bg-[#0F172A]" : "bg-slate-200"
                                }`} />
                            )}
                        </div>
                    ))}
                </div>

                {error && <div role="alert" className="mb-4 border border-red-200/60 bg-red-50 p-3 text-xs font-medium text-red-600">{error}</div>}

                {currentStep === 1 && (
                    <form onSubmit={handleStep1Next} className="space-y-4">
                        <label className="block text-xs font-semibold text-slate-700">
                            First Name
                            <input value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="Enter first name" required className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm font-normal text-slate-800 outline-none placeholder:text-slate-400 transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-100" />
                        </label>
                        <label className="block text-xs font-semibold text-slate-700">
                            Last Name
                            <input value={lastName} onChange={(event) => setLastName(event.target.value)} placeholder="Enter last name" required className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm font-normal text-slate-800 outline-none placeholder:text-slate-400 transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-100" />
                        </label>
                        <button type="submit" className="mt-4 w-full rounded-lg bg-[#0C2A4A] py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#071D35]">Next</button>
                    </form>
                )}

                {currentStep === 2 && (
                    <form onSubmit={handleStep2Next} className="space-y-5">
                        <label className="block text-xs font-semibold text-slate-700">
                            Username
                            <span className="relative mt-1.5 flex items-center">
                                <span className="absolute left-3 text-sm text-slate-400">@</span>
                                <input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="johndoe" required className="w-full rounded-lg border border-slate-200 bg-slate-50/60 py-2.5 pl-8 pr-3.5 text-sm font-normal text-slate-800 outline-none placeholder:text-slate-400 transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-100" />
                            </span>
                        </label>
                        <fieldset>
                            <legend className="mb-2 text-xs font-semibold text-slate-700">Account Type</legend>
                            <div className="grid gap-3 sm:grid-cols-2">
                                {(["administrator", "standard"] as const).map((type) => (
                                    <button key={type} type="button" aria-pressed={accountType === type} onClick={() => setAccountType(type)} className={`flex flex-col rounded-xl border p-3.5 text-left transition ${
                                        accountType === type ? "border-[#0F172A] bg-slate-50/80 ring-1 ring-[#0F172A]" : "border-slate-200 bg-white hover:border-slate-300"
                                    }`}>
                                        <span className="flex items-center justify-between">
                                            <span className="flex size-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700">{type === "administrator" ? <Shield className="size-4" /> : <User className="size-4" />}</span>
                                            <span className={`flex size-4 items-center justify-center rounded-full border ${accountType === type ? "border-[#0F172A] bg-[#0F172A]" : "border-slate-300 bg-white"}`}>
                                                {accountType === type && <span className="size-1.5 rounded-full bg-white" />}
                                            </span>
                                        </span>
                                        <span className="mt-3 text-xs font-bold text-slate-900">{type === "administrator" ? "Administrator" : "Standard User"}</span>
                                        <span className="mt-1 text-[11px] leading-relaxed text-slate-500">{type === "administrator" ? "Full access to workspace settings and member management." : "Access to assigned tasks, projects, and collaboration tools."}</span>
                                    </button>
                                ))}
                            </div>
                        </fieldset>
                        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                            <button type="button" onClick={() => { setError(null); setCurrentStep(1); }} className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900"><ArrowLeft className="size-3.5" />Back</button>
                            <button type="submit" className="flex items-center gap-1.5 rounded-lg bg-[#2E1A29] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800">Continue<ArrowRight className="size-3.5" /></button>
                        </div>
                    </form>
                )}

                {currentStep === 3 && (
                    <form onSubmit={handleCreate} className="space-y-4">
                        <label className="block text-xs font-semibold text-slate-700">
                            Email Address
                            <span className="relative mt-1.5 flex items-center">
                                <span className="absolute left-3 text-sm text-slate-400">@</span>
                                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" required className="w-full rounded-lg border border-slate-200 bg-slate-50/60 py-2.5 pl-8 pr-3.5 text-sm font-normal text-slate-800 outline-none placeholder:text-slate-400 transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-100" />
                            </span>
                        </label>

                        <div>
                            <label htmlFor="create-user-password" className="block text-xs font-semibold text-slate-700">Password</label>
                            <span className="relative mt-1.5 flex items-center">
                                <input id="create-user-password" type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" required className="w-full rounded-lg border border-slate-200 bg-slate-50/60 py-2.5 pl-3.5 pr-10 text-sm font-normal text-slate-800 outline-none placeholder:text-slate-400 transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-100" />
                                <button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute right-3 text-slate-400 hover:text-slate-600" aria-label="Toggle password visibility">{showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button>
                            </span>
                        </div>

                        <div className="mt-2.5 flex items-center justify-between gap-2">
                            <div className="flex flex-1 gap-1.5">
                                {[1, 2, 3].map((level) => <div key={level} className={`h-1.5 flex-1 rounded-full transition ${passwordScore >= level ? "bg-[#0F172A]" : "bg-slate-200"}`} />)}
                            </div>
                            <span className="text-[11px] font-semibold text-slate-600">{passwordStrength}</span>
                        </div>
                        <div className="space-y-1.5 text-xs text-slate-600">
                            {[
                                [hasMinLength, "At least 8 characters"],
                                [hasNumber, "Contains a number"],
                                [hasSpecialChar, "Contains a special character"],
                            ].map(([satisfied, requirement]) => (
                                <div key={requirement as string} className="flex items-center gap-1.5">
                                    {satisfied ? <CheckCircle2 className="size-3.5 text-emerald-600" /> : <Circle className="size-3.5 text-slate-300" />}
                                    <span className={satisfied ? "font-medium text-slate-700" : "text-slate-500"}>{requirement}</span>
                                </div>
                            ))}
                        </div>

                        <div>
                            <label htmlFor="create-user-confirm-password" className="block text-xs font-semibold text-slate-700">Confirm Password</label>
                            <span className="relative mt-1.5 flex items-center">
                                <input id="create-user-confirm-password" type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Re-enter password" required className="w-full rounded-lg border border-slate-200 bg-slate-50/60 py-2.5 pl-3.5 pr-10 text-sm font-normal text-slate-800 outline-none placeholder:text-slate-400 transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-100" />
                                <button type="button" onClick={() => setShowConfirmPassword((visible) => !visible)} className="absolute right-3 text-slate-400 hover:text-slate-600" aria-label="Toggle confirm password visibility">{showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button>
                            </span>
                        </div>

                        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                            <button type="button" onClick={() => { setError(null); setCurrentStep(2); }} className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900"><ArrowLeft className="size-3.5" />Back</button>
                            <button type="submit" className="rounded-lg bg-[#2E1A29] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800">Create User</button>
                        </div>
                    </form>
                )}
            </div>
        </section>
    );
}